## Setup

No provider or root wrapper is required — these components read no React
context. Load once per page:

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

```jsx
const { SectionHeading, LedgerChart } = window.Canaa;
```

## Styling idiom: Tailwind v4 utilities + daisyUI, brand tokens as color names

This system styles with **Tailwind utility classes directly on elements** —
no CSS-in-JS, no styled-components, no BEM. Brand colors are exposed as
named Tailwind color scales (defined via `@theme` in the source, verbatim in
`_ds_bundle.css`), and structural chrome (inputs, file pickers) comes from
daisyUI component classes layered under the same utility system. Compose
new layout/glue the same way: pick classes from this vocabulary, don't
invent new hex values or px paddings.

**Brand color scale** (use these over raw hex):

| Class | Value | Use |
|---|---|---|
| `bg-navy-950` | `#252d48` | darkest brand navy — page-level dark bands (footer, chart panels) |
| `bg-navy-900` / `text-navy-900` (same as `-800`/`-700`) | `#004b84` | brand blue — also `primary`/`neutral` |
| `text-navy-600` | `#5b6478` | secondary/muted text on light backgrounds |
| `text-secondary` (aka `text-blue-mist`) | `#8da2d0` | muted text and eyebrows *on dark backgrounds* |
| `bg-accent` / `text-accent` | `#c33628` | brand accent — primary CTAs, links, active states (same value as `error`) |
| `text-ember-600` | `#cb5f08` | secondary orange accent |
| `bg-ember-700` | `#a94e06` | ember-600 hover state |
| `bg-base-100` / `bg-base-200` / `border-base-300` | `#fff` / `#f4f6fa` / `#e1e6ef` | daisyUI neutral surface scale — cards, page background, borders |

**daisyUI semantic roles** (theme `canaa`, also usable): `primary`
(`#004b84`), `secondary` (`#8da2d0`), `accent` (`#c33628`), `success`
(`#1f8a5b`), `warning` (`#fcbc45`), `error` (`#c33628`, same as `accent`),
`info` (`#434d75`) — each has a matching `-content` foreground color (e.g.
`text-accent-content` on `bg-accent`).

**Structural classes**: `rounded-box` (the brand corner radius — prefer over
`rounded-lg`/`rounded-xl`), `input`, `file-input`, `carousel` /
`carousel-item` (daisyUI). Typography is a **single family, Open Sans**,
for everything — `font-display`, `font-mono`, and default body text all
resolve to the same `--font-open-sans` now; there is no longer a separate
display or monospace face, so don't rely on `font-display`/`font-mono` for
visual differentiation (weight/size/tracking/uppercase still do the work,
e.g. eyebrows use `uppercase tracking-wide`).

**Dark-context components**: some components (e.g. `NewsletterForm`) are
authored assuming a `bg-navy-900` parent and use white/translucent text —
they render unstyled-looking on a plain white background by design. Wrap
them in a `bg-navy-900` container, matching how the source app composes
them (inside its `Footer`).

## Where the truth lives

Read `_ds_bundle.css` (via `styles.css`'s import) for the full compiled
Tailwind + daisyUI output — every class and token above is verbatim from
there. Per-component usage examples: `components/<group>/<Name>/<Name>.prompt.md`.

## Example

```jsx
const { SectionHeading, LedgerChart } = window.Canaa;

function ResultsSection() {
  return (
    <section className="bg-base-100 p-8">
      <SectionHeading
        eyebrow="Resultado"
        title="Crescimento sustentável, mês após mês"
        lede="Acompanhamento contínuo do resultado acumulado da sua empresa."
      />
      <div className="mt-6 max-w-xl">
        <LedgerChart />
      </div>
    </section>
  );
}
```
