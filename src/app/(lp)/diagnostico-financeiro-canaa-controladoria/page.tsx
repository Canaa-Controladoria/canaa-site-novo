import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Testimonials } from "@/components/site/Testimonials";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Diagnóstico Financeiro para sua empresa",
  description:
    "Descubra como o Diagnóstico Financeiro Canaã ajuda sua empresa a identificar riscos, otimizar resultados e fortalecer sua gestão.",
};

const diagnosisLink = whatsappLink(
  "Olá! Quero fazer o Diagnóstico Financeiro da Canaã Controladoria para minha empresa."
);

const advantages = [
  "Análise detalhada do seu fluxo de caixa com confidencialidade",
  "Relatório 100% entendível (sem jargões complexos)",
  "Foco em resultados (não apenas números, mas ações)",
  "Equipe especializada em negócios do seu porte",
  "Diagnóstico personalizado (nada de informações genéricas)",
];

export default function DiagnosticoFinanceiroPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-16 text-center">
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-navy-800">
          Sua empresa está realmente saudável financeiramente?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-600">
          Identifique riscos, oportunidades e fortaleça seus resultados com o Diagnóstico Financeiro Canaã — um
          raio-X personalizado das finanças do seu negócio.
        </p>
        <a
          href={diagnosisLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-accent-content hover:bg-accent-700"
        >
          Fazer diagnóstico agora
        </a>
      </section>

      <section className="bg-base-200 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            align="center"
            eyebrow="60% das empresas fecham por falta de controle financeiro"
            title="A Canaã analisa a saúde financeira da sua empresa e entrega relatórios claros"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Pontos críticos a corrigir", "Oportunidades escondidas nos números", "Plano de ação personalizado"].map(
              (item) => (
                <div key={item} className="rounded-box border border-base-300 bg-base-100 p-5 text-center text-sm font-medium text-navy-700">
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Vantagens"
              title="Um diagnóstico que revela desde desperdícios até novas fontes de lucro"
            />
            <ul className="mt-6 space-y-3">
              {advantages.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-navy-700">
                  <span className="mt-0.5 text-accent">✓</span>
                  {a}
                </li>
              ))}
            </ul>
            <a href={diagnosisLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-content hover:bg-accent-700">
              Solicitar diagnóstico financeiro
            </a>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-box border border-base-300">
            <Image
              src="https://canaacontroladoria.com.br/wp-content/uploads/2025/03/diagnostico-financeiro-1.png"
              alt="Canaã Controladoria e Diagnóstico Financeiro"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Depoimentos" title="O que dizem nossos clientes" dark />
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <SectionHeading
          align="center"
          title="Sua empresa merece crescer com segurança"
          lede="Agende seu diagnóstico financeiro hoje mesmo. Não perca a chance de transformar seus números em decisões inteligentes."
        />
        <a href={diagnosisLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-accent-content hover:bg-accent-700">
          Garanta seu diagnóstico financeiro agora
        </a>
      </section>
    </>
  );
}
