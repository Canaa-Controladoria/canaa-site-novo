import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { CTAButton } from "./CTAButton";
import { NavLink } from "./NavLink";
import { mainNav, solutions, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-base-100/95 backdrop-blur border-b border-base-300">
      <div className="hidden md:block bg-navy-900 text-blue-mist-light">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 text-xs">
          <span className="font-sans">{site.addressShort}</span>
          <a href={`tel:+55${site.phoneWhatsapp.slice(2)}`} className="font-mono tabular-nums hover:text-white">
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Logo />

        <nav className="hidden md:flex items-center gap-7">
          {mainNav.map((item) =>
            item.label === "Soluções" ? (
              <div key={item.href} className="dropdown dropdown-hover">
                <NavLink
                  href={item.href}
                  tabIndex={0}
                  className="text-sm font-medium text-navy-800 hover:text-accent transition-colors"
                >
                  Soluções
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
                className="text-sm font-medium text-navy-800 hover:text-accent transition-colors"
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <CTAButton href="/lp-controller-cfo" className="hidden md:inline-flex">
            Solicitar proposta
          </CTAButton>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
