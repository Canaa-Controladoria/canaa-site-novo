import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site } from "@/lib/site";

const solutionLinks = [
  { label: "Controller terceirizado", href: "/solucoes/controller-terceirizado" },
  { label: "Consultoria financeira", href: "/solucoes/consultoria-financeira" },
  { label: "BI e Report Estratégico", href: "/solucoes/report-estrategico" },
  { label: "Valuation", href: "/solucoes/valuation" },
];

const companyLinks = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Dra. Ana Luísa Amorim", href: "/quem-somos#fundadora" },
  { label: "Insights", href: "/blog" },
  { label: "Programa de Trainee", href: "/trabalhe-conosco" },
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
            A Canaã Controladoria é uma empresa de controladoria outsourcing e consultoria financeira, fundada pela
            Dra. Ana Luísa Amorim. Atua como controller terceirizado de médias empresas, integrando Finanças,
            Contabilidade e Operação.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-accent hover:text-accent"
            >
              ig
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-accent hover:text-accent"
            >
              in
            </a>
            {site.social.youtube && (
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-accent hover:text-accent"
              >
                yt
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-3">Soluções</p>
          <ul className="space-y-2 text-sm">
            {solutionLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/60 mb-3">Empresa</p>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
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
            <li>{site.hours}.</li>
            <li>
              <Link href="/contato" className="font-semibold hover:text-white">
                Fale conosco →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="ledger-rule ledger-rule--dark" />

      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}. Copyright © {new Date().getFullYear()}. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/politica-de-privacidade-2" className="hover:text-white">
            Política de Privacidade
          </Link>
          <a
            href="https://github.com/devpablo-sa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Desenvolvido por Pablo
          </a>
        </div>
      </div>
    </footer>
  );
}
