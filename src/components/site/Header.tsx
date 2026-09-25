import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { mainNav, solutions } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-navy-900 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo dark />

        <nav className="hidden md:flex items-center gap-8">
          {mainNav.map((item) =>
            item.label === "Soluções" ? (
              <div key={item.href} className="dropdown dropdown-hover">
                <NavLink
                  href={item.href}
                  tabIndex={0}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-mist-light hover:text-white transition-colors"
                >
                  Soluções
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </NavLink>
                <ul className="dropdown-content menu z-40 w-72 rounded-box bg-base-100 p-2 shadow-lg border border-base-300">
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/solucoes/${s.slug}`} className="flex flex-col items-start py-2">
                        <span className="text-sm font-semibold text-navy-800">{s.title}</span>
                        <span className="text-xs text-navy-500">{s.short}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-blue-mist-light hover:text-white transition-colors"
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/lp-controller-cfo"
            className="hidden md:inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-content shadow-md shadow-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-lg hover:shadow-accent/30 md:ml-4"
          >
            Solicitar proposta
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
