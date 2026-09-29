# design-sync notes

## Repo shape

`canaa` is a Next.js 16 marketing/blog app (`private: true`), not a standalone
component-library package. `package.json` has no `main`/`module`/`exports`
and there is no `dist/` build — the converter runs in **synth-entry mode**
(scanning `src/` directly) rather than importing a published build.

## Scope decision (2026-09-21)

Of 25 components under `src/components/`, 16 import `next/link` and/or
`next/navigation` (`useRouter`, etc.), which require the Next.js App Router
context to run. Outside a real Next app (esbuild bundle + headless chromium)
these throw ("invariant: expected app router to be mounted") rather than
degrading gracefully — design-sync has no built-in Next.js router shim.

**Excluded** (router-dependent, or in PostViewTracker's case: renders `null`,
no visual surface): DeletePostButton, LogoutButton, PostEditorForm,
BlogSidebar, CategoryPills, PostCard, PostSidebar, PostViewTracker,
ProposalForm, CTAButton, Footer, Header, Logo, MobileNav, SolutionCard,
ThankYouContent. Excluded via `componentSrcMap: {"<Name>": null}` in config.

**Synced** (8, self-contained — no router/navigation deps): ImageUploadField,
RichTextEditor, JobApplicationForm, NewsletterForm, LedgerChart,
SectionHeading, SolutionIcon, Testimonials.

**Also dropped**: WhatsAppButton. It imports `@/lib/site`, whose `site`
object reads `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_SITE_URL`
**at module scope** (eager evaluation on import, not inside a function).
`process` doesn't exist in a browser/headless-chromium context, and the
converter's esbuild pass only defines `process.env.NODE_ENV` (in
`lib/bundle.mjs`, hardcoded) — not arbitrary `NEXT_PUBLIC_*` vars, which Next
itself would normally inline at its own build time via webpack/Turbopack's
DefinePlugin equivalent (bypassed here since we bundle raw `src/` directly,
not Next's compiled client output). Since all synced components ship in
**one shared `_ds_bundle.js`**, this one module's top-level crash took down
`window.Canaa` for every component, not just WhatsAppButton — confirmed by
`package-validate.mjs` failing `[BUNDLE_EXPORT]` for all 9 with identical
`ReferenceError: process is not defined` render errors before this was
excluded. `lib/bundle.mjs`/`lib/emit.mjs` are the two files the skill
explicitly disallows forking (output-contract files), so adding a custom
esbuild `define` for these vars isn't available without violating that.
**Re-sync candidate**: if a future design-sync version exposes an
`extraDefine`-style config knob, WhatsAppButton can be re-added.

### Why `srcDir` points at `.design-sync/entry-src/`, not `src/`

Synth-entry mode (no `dist/`, no `.d.ts`) builds its bundle entry by
re-exporting **every** `.tsx`/`.jsx` file under `cfg.srcDir`, unfiltered by
`componentSrcMap` (that map only filters the *component list/docs*, not the
entry bundle — see `source-kit.mjs` `resolvePackage()`, the `comps =
srcFiles.filter(...)` line). Pointing `srcDir` at `src/` therefore tried to
bundle the whole app — `src/app/**` (pages/layouts importing `next/font`,
server actions), `src/lib/db.ts` (`better-sqlite3`, `fs`, `path`), `src/lib/
{blog,admin-blog,auth}.ts` (`import "server-only"`) — and esbuild failed on
unresolvable Node/server-only imports.

Fix: `.design-sync/entry-src/` holds one tiny stub file per synced
component (`export { Name } from "@/components/.../Name"`), and `srcDir`
points there instead of `src/`. The stub only re-exports the real component
(the real, unmodified source still gets bundled — this is not a
reimplementation), but nothing else under `src/` gets pulled into the entry
file. `componentSrcMap` still pins each name to its *real* path (not the
stub) so group/JSDoc enrichment reads from the real component's directory
(`relative()` between absolute paths resolves correctly even though the stub
and the real file live in different trees).

**If a synced component is added/removed**: add/remove its stub file in
`.design-sync/entry-src/` AND its `componentSrcMap` entry — the two must
stay in sync, since the stub controls what's bundled and the map controls
naming/grouping/docs.

## Styling / fonts

Tailwind v4 (CSS-first, `@import "tailwindcss"` + `@plugin "daisyui"`) in
`src/app/globals.css`, no separate build step of its own. `cssEntry` is
pointed at the compiled CSS chunk produced by running the repo's own
`next build` (`npm run build`).

**2026-09-29 re-sync: font/palette overhaul (commit `552852b`, "adopt
client color palette and Open Sans typography").** Two things changed that
required config + `conventions.md` fixes:

- **Font stack collapsed to a single family, Open Sans** (previously
  Fraunces + IBM Plex Sans + IBM Plex Mono, three distinct faces). All of
  `--font-display`/`--font-mono`/`--font-sans` now alias `--font-open-sans`
  — `font-display`/`font-mono` classes still exist but no longer produce a
  visually distinct face, only weight/size/tracking differ now.
- **`next build` now emits fonts in a SEPARATE CSS chunk from the main
  Tailwind/daisyUI chunk** (previously both were in one chunk `cssEntry`
  alone could cover). `cssEntry` only covers the Tailwind/tokens chunk now
  (identify by: no `@font-face` rules, has `--tw-*` custom properties, ~4x
  larger of the two `.next/static/chunks/*.css` files); the font-face
  chunk (has `@font-face` rules, one `font-family`) must be wired via
  `cfg.extraFonts`, or `[FONT_MISSING]` fires. **Re-verify this file
  pairing on every re-sync** — chunk hashes AND which-chunk-has-what can
  both change between builds; don't assume last sync's file/role mapping
  still holds.
- **Color palette reshuffled**, not just renamed: `accent` moved from
  orange (`#cb5f08`) to red (`#c33628`, same value as `error` — apparently
  intentional, both are brand-red now); the `navy-700`/`navy-800`/`navy-900`
  utilities collapsed to a single flat blue `#004b84` (same as `primary`/
  `neutral`); the actual darkest navy is now `navy-950` (`#252d48`), a role
  `navy-900` used to hold. `conventions.md`'s color table was rewritten
  against the fresh `_ds_bundle.css` (grep `--color-*:#` in it to re-verify
  next time) — if this reshuffles again, recheck every hex in that table,
  not just the ones that look wrong.
- **The anchor's diff does NOT track stale fonts.** `.sync-diff.json`'s
  `upload.deletePaths` is component-scoped (regrouped/removed components
  only) — it reported `[]` even though this rebuild dropped 27 old
  Fraunces/IBM Plex `.woff2` files that the previous sync had uploaded.
  **On every re-sync, manually diff `list_files`'s `fonts/*.woff2` against
  the fresh `ds-bundle/fonts/*.woff2`** and delete anything remote-only
  (a small follow-up `finalize_plan` with `deletes: ["fonts/**"]` is
  enough — no need to touch `writes`). Same risk likely applies to
  `tokens/**` and `guidelines/**` if this repo ever populates those.
- **daisyUI dropped the `-bordered` modifier** (`input-bordered`,
  `file-input-bordered` no longer exist as classes — `.input`/`.file-input`
  are bordered by default now in whatever daisyUI version this pulled).
  Fixed in `conventions.md`.

## Setup required before re-syncing

1. **`node_modules/canaa` must be a self-referencing junction to the repo
   root**, so `--node-modules ./node_modules` (needed for real deps: react,
   @tiptap/*, etc.) and `PKG_DIR` (needed for `srcDir`/`cssEntry`/
   `componentSrcMap` resolution, which is always computed as
   `join(NODE_MODULES, PKG)`) can both be satisfied by one `--node-modules`
   flag — this repo is a standalone app, not an installed/workspace package,
   so no such self-reference exists by default. Recreate if missing
   (Windows, no admin needed):
   `cmd /c "mklink /J node_modules\canaa ."` (run from the repo root — the
   target `.` must resolve relative to the repo root, not to `node_modules`
   itself, easy to get backwards).
2. **`npm run build` must be run fresh** before each sync (`buildCmd` in
   config.json) to produce the compiled CSS/fonts `cssEntry` points at.
3. **`cssEntry` (and now `extraFonts`) are content-hashed filenames**
   (`.next/static/chunks/<hash>.css`) that **change on every `next
   build`** — after step 2, re-check `.next/static/chunks/*.css` (as of
   2026-09-29 there are **two** production CSS chunks, not one — see
   "Styling / fonts" above for how to tell them apart) and update both
   `cfg.cssEntry` and `cfg.extraFonts` in config.json if the hashes
   changed, before running the converter.
4. **`.ds-sync/` (staged converter scripts + its own `node_modules`) is
   gitignored and not durable** — re-stage from the skill's base dir
   (`cp -r <skill-base-dir>/{package-build.mjs,package-validate.mjs,package-capture.mjs,resync.mjs,lib,storybook} .ds-sync/`)
   and `npm i esbuild ts-morph @types/react` inside it before running
   anything.
5. **Playwright/chromium version is pinned to what's cached locally.**
   This machine had chromium builds 1228 and 1234 cached (no bare
   `playwright` package pre-installed) — `playwright`/`playwright-core`
   `1.62.0` matches build 1234. A different machine (or this one after a
   Playwright cache clear) may need a different pinned version — check
   `~/.cache/ms-playwright/` (or `%LOCALAPPDATA%\ms-playwright` on Windows)
   for cached `chromium-<build>` dirs, then find the playwright-core version
   whose `browsers.json` names that build revision before installing.

## Re-sync risks

- If `src/components/*` gains new router-dependent components, or an
  excluded component's imports change, `componentSrcMap` may need updating
  (new components appear via auto-discovery unless explicitly excluded).
- No Storybook, no `.d.ts` exports, no reference render — `.d.ts` prop
  contracts come from synth-entry scanning of `src/`, which is weaker than a
  real published build's type declarations.
- The repo now has `.git` (it didn't when this file was first written) —
  the durable set (`config.json`, `NOTES.md`, `conventions.md`, `previews/`,
  `entry-src/`) is committed as of the 2026-09-22 initial sync. The
  `node_modules/canaa` self-link and `.ds-sync/` staged scripts are
  gitignored machine state and still need recreating per the setup steps
  above on a fresh clone.
- The design system's font stack and color palette are apparently still
  actively evolving (see "Styling / fonts" above) — expect `conventions.md`
  drift on the next few re-syncs too; always re-verify its hex/class claims
  against the fresh `_ds_bundle.css` rather than assuming last sync's table
  still holds.
- Only 8 of 25 app components are synced; if the user wants more later
  (e.g. WhatsAppButton once a `define` hook exists, or any router-dependent
  component once/if a Next router shim becomes available), re-derive scope
  from the "Scope decision" section above rather than re-auditing from
  scratch.
