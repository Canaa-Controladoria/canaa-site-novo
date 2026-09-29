import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ControllerFaq } from "@/components/site/ControllerFaq";
import { ControllerLeadForm } from "@/components/forms/ControllerLeadForm";

export const metadata: Metadata = {
  title: "Controller Terceirizado para Médias Empresas | Canaã Controladoria",
  description:
    "Tenha um controller terceirizado dedicado à sua empresa: diagnóstico de FP&A, BI dos 3 pilares e reuniões de resultado com a diretoria.",
};

const deliverables = [
  {
    category: "FINANÇAS",
    title: "Fluxo de caixa e capital de giro",
    body: "Projeção e acompanhamento para decidir com antecedência.",
  },
  {
    category: "FINANÇAS",
    title: "Orçamento e FP&A",
    body: "Realizado × orçado com análise de desvios.",
  },
  {
    category: "CONTABILIDADE",
    title: "Demonstrações gerenciais",
    body: "DRE gerencial e conciliações confiáveis.",
  },
  {
    category: "OPERAÇÃO",
    title: "KPIs e OKRs",
    body: "Indicadores operacionais ligados ao resultado.",
  },
  {
    category: "OPERAÇÃO",
    title: "Cubo de Resultado",
    body: "Margem por produto, cliente e vendedor.",
  },
  {
    category: "DADOS",
    title: "BI Canaã",
    body: "Painéis em BI, SQL e queries atualizados.",
  },
];

const steps = [
  { n: "01", label: "Diagnóstico", body: "Mapeamos processos, ferramentas e equipe financeira." },
  { n: "02", label: "Estrutura", body: "Montamos a base de dados e os painéis dos 3 pilares." },
  { n: "03", label: "Rotina", body: "Relatórios e análises com recomendação de ação." },
  { n: "04", label: "Resultado", body: "Reuniões com a diretoria e squads de melhoria." },
];

const comparison = [
  { criterio: "Quem executa", interno: "Uma pessoa", canaa: "Equipe dedicada" },
  { criterio: "Método", interno: "Depende da experiência individual", canaa: "Método 3 Pilares, testado em [nº] empresas" },
  { criterio: "Ferramentas", interno: "A empresa precisa contratar", canaa: "BI Canaã incluso" },
  { criterio: "Continuidade", interno: "Férias e saídas interrompem a rotina", canaa: "Rotina mantida pela equipe" },
];

export default function ControllerTerceirizadoPage() {
  return (
    <>
      {/* Hero + formulário */}
      <section id="diagnostico" className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        <p className="text-sm text-navy-500">
          <Link href="/" className="hover:text-navy-800">
            Início
          </Link>{" "}
          /{" "}
          <Link href="/solucoes" className="hover:text-navy-800">
            Soluções
          </Link>{" "}
          / <span className="font-semibold text-navy-800">Controller terceirizado</span>
        </p>
        <div className="mt-8 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-600">Controladoria outsourcing</p>
            <h1 className="font-display text-4xl leading-tight text-navy-800 sm:text-5xl">
              Controller terceirizado para médias empresas
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-navy-600">
              Uma equipe Canaã dedicada à controladoria da sua empresa: Finanças, Contabilidade e Operação conectadas
              em uma rotina de dados, relatórios e reuniões de resultado.
            </p>
            <ul className="flex flex-col gap-3 text-base text-navy-800">
              {[
                "Diagnóstico de FP&A e controladoria no início",
                "BI com os indicadores dos 3 pilares",
                "Reuniões de resultado com a diretoria",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004b84" strokeWidth="2.2">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ControllerLeadForm />
        </div>
      </section>

      {/* O que entrega */}
      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="O que o controller terceirizado Canaã entrega" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <div key={d.title} className="flex flex-col gap-2.5 rounded-box border border-base-300 bg-base-100 p-7">
                <span className="font-mono text-xs font-bold tracking-wide text-accent">{d.category}</span>
                <strong className="text-lg text-navy-900">{d.title}</strong>
                <p className="text-sm leading-relaxed text-navy-600">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-navy-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="Como funciona" dark />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-2.5 border-t-2 border-blue-mist pt-5">
                <span className="font-mono text-sm text-blue-mist">
                  {s.n} · {s.label.toUpperCase()}
                </span>
                <p className="text-base leading-relaxed text-blue-mist-light">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading title="Controller interno ou terceirizado?" />
        <div className="mt-10 overflow-x-auto rounded-box border border-base-300">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-base-200 text-navy-900">
              <tr>
                <th className="px-7 py-4 font-bold">Critério</th>
                <th className="px-7 py-4 font-bold">Controller interno</th>
                <th className="px-7 py-4 font-bold text-accent">Controller terceirizado Canaã</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.criterio} className="border-t border-base-300">
                  <td className="px-7 py-4 font-semibold text-navy-900">{row.criterio}</td>
                  <td className="px-7 py-4 text-navy-600">{row.interno}</td>
                  <td className="px-7 py-4 text-navy-800">{row.canaa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading title="Dúvidas sobre controller terceirizado" />
        <div className="mt-10">
          <ControllerFaq />
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-start gap-8 rounded-box bg-navy-900 p-10 text-white sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <h2 className="font-display max-w-xl text-3xl font-light leading-tight sm:text-4xl">
            Tenha a controladoria de uma grande empresa, sem montar o departamento do zero.
          </h2>
          <a
            href="#diagnostico"
            className="inline-flex shrink-0 items-center rounded-lg bg-accent px-8 py-3.5 text-base font-bold text-accent-content shadow-md shadow-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-lg hover:shadow-accent/30"
          >
            Agendar diagnóstico
          </a>
        </div>
      </section>
    </>
  );
}
