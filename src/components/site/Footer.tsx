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
        <Link href="/politica-de-privacidade-2" className="hover:text-white">
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
}
