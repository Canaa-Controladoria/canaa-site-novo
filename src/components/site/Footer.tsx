import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { NavLink } from "./NavLink";
import { site, mainNav } from "@/lib/site";

const quickLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre nós", href: "/quem-somos" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Conteúdos", href: "/blog" },
  { label: "Contato", href: "/contato" },
  { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-blue-mist-light">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="ledger-rule ledger-rule--dark mb-6" />
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="font-display text-lg text-white">Inscreva-se na newsletter</p>
            <p className="text-sm">Receba as novidades e conteúdos exclusivos diretamente em seu e-mail.</p>
          </div>
          <div className="sm:w-80">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="ledger-rule ledger-rule--dark" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl text-white">Canaã</span>
          <p className="mt-3 text-sm">
            Controladoria outsourcing, há mais de uma década atuando no mercado com metodologia orientada a
            resultados.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-accent hover:text-accent"
            >
              in
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-accent hover:text-accent"
            >
              ig
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-3">Acesso rápido</p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} className="hover:text-white">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-3">Contato</p>
          <ul className="space-y-2 text-sm">
            <li>{site.address}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:+55${site.phoneWhatsapp.slice(2)}`} className="font-mono tabular-nums hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-3">Atendimento</p>
          <p className="text-sm">{site.hours}.</p>
          <nav className="mt-4 hidden lg:block">
            {mainNav.slice(1, 3).map((l) => (
              <Link key={l.href} href={l.href} className="mr-4 text-sm hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">Como chegar</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-mist-light hover:text-white"
          >
            Abrir no Google Maps →
          </a>
        </div>
        <div className="overflow-hidden rounded-box border border-white/10">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.name)}&t=m&z=16&output=embed&iwloc=near`}
            className="h-44 w-full md:h-56"
            loading="lazy"
            title={`Mapa de localização — ${site.name}`}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="ledger-rule ledger-rule--dark" />

      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}. Copyright © {new Date().getFullYear()}. Todos os direitos reservados.
        </p>
        <Link href="/politica-de-privacidade-2" className="hover:text-white">
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
}
