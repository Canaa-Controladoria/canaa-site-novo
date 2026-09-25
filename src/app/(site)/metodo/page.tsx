import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CountUp } from "@/components/site/CountUp";

export const metadata: Metadata = {
  title: "Método Canaã: Finanças, Contabilidade e Operação",
  description:
    "Conheça o método de controladoria da Canaã: os 3 pilares, o Ciclo de Resultado, as etapas de implantação e as competências do nosso time.",
};

const pillars = [
  {
    color: "#004b84",
    title: "Finanças",
    body: "Caixa, capital de giro, orçamento, FP&A e valuation.",
  },
  {
    color: "#c33628",
    title: "Contabilidade",
    body: "Demonstrações confiáveis, compliance e conciliação.",
  },
  {
    color: "#cb5f08",
    title: "Operação",
    body: "KPIs operacionais ligados ao resultado.",
  },
];

const ciclo = [
  {
    n: "1",
    title: "Enxergar",
    body: "Mapeamos os processos e escolhemos os poucos indicadores operacionais que realmente mexem no resultado.",
  },
  {
    n: "2",
    title: "Conectar",
    body: "Ligamos cada indicador à margem e ao caixa: o que a produtividade de hoje significa no resultado de amanhã.",
  },
  {
    n: "3",
    title: "Agir",
    body: "Reunião de resultado com a diretoria e squads com dono, meta e prazo para atacar cada desvio.",
  },
  {
    n: "4",
    title: "Acompanhar",
    body: "OKRs e KPIs revisados todo mês, ajustando a rota até o novo jeito de trabalhar virar cultura.",
  },
];

const etapas = [
  {
    label: "Etapa 1",
    title: "Imersão",
    body: "Vivemos a rotina da empresa por dentro para entender como o resultado é gerado de verdade.",
  },
  {
    label: "Etapa 2",
    title: "Estrutura",
    body: "Indicadores, painéis de BI e rituais de gestão desenhados junto com o seu time.",
  },
  {
    label: "Etapa 3",
    title: "Rotina assistida",
    body: "Seguimos monitorando de perto, com reuniões de resultado e squads, até o novo jeito de trabalhar virar cultura.",
  },
];

const canaaWay = [
  {
    title: "Três pilares, uma só leitura",
    body: "Finanças, Contabilidade e Operação analisadas juntas. O problema de caixa é rastreado até onde ele nasce.",
  },
  {
    title: "Dentro da empresa, não à distância",
    body: "Imersão na rotina e reuniões presenciais de resultado. Conhecemos o negócio por dentro, não só pelo relatório.",
  },
  {
    title: "Todo número vira ação",
    body: "Cada análise termina em um plano com dono, meta e prazo, tocado pelos squads junto com o seu time.",
  },
  {
    title: "Uma rotina que fica",
    body: "Deixamos processos, indicadores e cultura de gestão funcionando na empresa, para o resultado se sustentar.",
  },
  {
    title: "Liderança presente do início ao fim",
    body: "A Dra. Ana Luísa, fundadora da Canaã, acompanha pessoalmente cada cliente, da imersão às reuniões de resultado. Quem desenhou o método está na mesa quando as decisões são tomadas.",
  },
];

const softSkills = [
  {
    title: "Comunicação assertiva",
    body: "Priorizamos uma comunicação clara e objetiva, facilitando o entendimento e a tomada de decisões.",
  },
  {
    title: "Método ágil para gestão de projetos",
    body: "Utilizamos metodologias ágeis para garantir que os projetos sejam gerenciados de forma eficiente e eficaz, sempre com foco em resultados. Fazemos acontecer.",
  },
];

const hardSkills = [
  {
    title: "Inteligência financeira e de controladoria",
    body: "Profundo conhecimento e experiência na elaboração de relatórios financeiros, utilizando sistemas avançados como BI, SQL e queries para entregar informações completas e apoiar a gestão na tomada de decisões.",
  },
  {
    title: "Expertise para aumento de resultado",
    body: "Nossa experiência nos permite identificar e implementar estratégias que aumentam significativamente os resultados financeiros da sua empresa.",
  },
  {
    title: "Gestão de times em squad (Pelotão de Força)",
    body: "Criação e gestão de squads dentro da empresa, focados na melhoria contínua dos resultados e na eficiência dos processos.",
  },
  {
    title: "Domínio de indicadores principais (KPIs e OKRs)",
    body: "Trabalhamos diretamente com a direção para monitorar e melhorar os principais indicadores de desempenho, alinhando todas as áreas aos objetivos estratégicos.",
  },
];

const whyCanaa = [
  {
    title: "Segurança e credibilidade",
    body: "Experiência com os desafios de médias e grandes organizações.",
  },
  {
    title: "Mais viável economicamente",
    body: "Menos tempo e custo do que montar uma equipe interna, com visão de fora que cobra resultado.",
  },
  {
    title: "Acompanhamento constante",
    body: "Indicadores mensuráveis e reuniões presenciais de resultado.",
  },
  {
    title: "Metodologia e ferramentas próprias",
    body: "Uma cultura de rotinas financeiras que fica viva dentro da empresa.",
  },
  {
    title: "Você livre para focar no negócio",
    body: "Expertise financeira dedicada enquanto você lidera o core business.",
  },
];

const faq = [
  {
    question: "Vou conseguir entender os relatórios?",
    answer:
      "Sim. Os relatórios da Canaã são feitos para quem decide, não para contadores. Cada número vem com o que ele significa para o negócio e qual decisão ele pede. Nas reuniões presenciais de resultado, explicamos os indicadores junto com você até que a leitura fique natural.",
  },
  {
    question: "A Canaã ensina processos para a minha empresa?",
    answer:
      "Sim, e essa é uma parte central do nosso trabalho. Na etapa de Estrutura, organizamos e documentamos os processos financeiros, contábeis e operacionais. Na Rotina assistida, acompanhamos o seu time aplicando esses processos no dia a dia até que funcionem sem depender da gente.",
  },
  {
    question: "Consigo dar continuidade sozinho?",
    answer:
      "Esse é o objetivo. A implantação foi pensada para deixar na empresa processos, indicadores e uma cultura de gestão que continuam funcionando. Você pode seguir com a Canaã no acompanhamento contínuo, mas não fica refém dela.",
  },
];

export default function MetodoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-16 sm:pb-20">
          <p className="text-sm text-blue-mist">
            <Link href="/" className="hover:text-white">
              Início
            </Link>{" "}
            / <span className="font-semibold text-white">Método Canaã</span>
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-blue-mist">Método Canaã</p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-light leading-[1.1] sm:text-5xl">
            Método de controladoria Canaã: <strong className="font-extrabold">Finanças, Contabilidade e Operação</strong>{" "}
            no mesmo ciclo.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-mist-light">
            Como a Canaã atua como controller terceirizado e braço de controladoria da sua empresa: método próprio,
            time dedicado e acompanhamento de perto até o resultado aparecer.
          </p>
          <div className="mt-8 flex flex-wrap gap-10 border-t border-white/15 pt-7">
            <div>
              <span className="mb-2.5 block h-[3px] w-7 rounded-sm bg-gradient-to-r from-accent to-ember-600" />
              <p className="font-display text-2xl font-extrabold tabular-nums">
                <CountUp end={10} prefix="+" suffix=" anos" />
              </p>
              <p className="mt-1 text-sm text-blue-mist">em controladoria outsourcing</p>
            </div>
            <div>
              <span className="mb-2.5 block h-[3px] w-7 rounded-sm bg-gradient-to-r from-accent to-ember-600" />
              <p className="font-display text-2xl font-extrabold tabular-nums">
                <CountUp end={94} suffix="%" />
              </p>
              <p className="mt-1 text-sm text-blue-mist">de satisfação dos clientes</p>
            </div>
            <div>
              <span className="mb-2.5 block h-[3px] w-7 rounded-sm bg-gradient-to-r from-accent to-ember-600" />
              <p className="font-display text-2xl font-extrabold tabular-nums">
                <CountUp end={91} suffix="%" />
              </p>
              <p className="mt-1 text-sm text-blue-mist">relatam mais controle e crescimento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proposta de valor */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Nossa proposta de valor" title="Liderança que integra. Experiência que destrava." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
              <div className="h-1.5 bg-navy-900" />
              <div className="flex flex-col gap-3 p-9">
                <strong className="text-xl text-navy-900">Liderança que interliga as áreas da empresa</strong>
                <p className="text-base leading-relaxed text-navy-600">
                  Nosso time lidera a integração eficiente e eficaz das diversas áreas da sua empresa.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
              <div className="h-1.5 bg-navy-900" />
              <div className="flex flex-col gap-3 p-9">
                <strong className="text-xl text-navy-900">Capacidade de acelerar e destravar</strong>
                <p className="text-base leading-relaxed text-navy-600">
                  Com nossa expertise, aceleramos processos e removemos pontos críticos com as melhores práticas de
                  governança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Método */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Nosso método"
          title="A controladoria como guardiã da estratégia"
          lede="Toda empresa que atendemos é olhada pelos três pilares ao mesmo tempo — porque um problema de caixa quase sempre nasce na operação."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="overflow-hidden rounded-box border border-base-300 bg-base-100">
              <div className="h-1.5" style={{ background: p.color }} />
              <div className="flex flex-col gap-2.5 p-8">
                <strong className="text-xl text-navy-900">{p.title}</strong>
                <p className="text-base leading-relaxed text-navy-600">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ciclo de resultado */}
      <section id="ciclo" className="bg-[#fdf7f2] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Pilar Operação · Como fazemos"
              title={
                <>
                  Da estratégia ao chão da empresa: o <strong className="font-extrabold">Ciclo de Resultado Canaã</strong>
                </>
              }
            />
            <p className="max-w-md text-lg leading-relaxed text-navy-600">
              Indicador que não muda nenhuma decisão é só um número. Por isso a operação entra no mesmo ciclo que o
              caixa e a contabilidade.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
            {ciclo.map((step, i) => (
              <div key={step.n} className="flex flex-1 items-stretch gap-3">
                <div className="flex flex-1 flex-col gap-3 rounded-box border border-[#efd9c6] bg-base-100 p-7">
                  <span className="text-sm font-bold tracking-wide text-ember-700">{step.n}</span>
                  <strong className="text-2xl font-bold text-navy-900">{step.title}</strong>
                  <p className="text-base leading-relaxed text-navy-600">{step.body}</p>
                </div>
                {i < ciclo.length - 1 && (
                  <span aria-hidden className="hidden shrink-0 self-center text-2xl text-ember-600 lg:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-center justify-center gap-2.5 text-sm font-semibold text-ember-700">
            <span aria-hidden>↻</span>
            O ciclo recomeça a cada mês, com metas mais ambiciosas
          </p>
        </div>
      </section>

      {/* Como implantamos */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Como trabalhamos"
              title={
                <>
                  Da estratégia ao chão da empresa, <strong className="font-extrabold">com a gente ao lado</strong>
                </>
              }
            />
            <a href="#ciclo" className="whitespace-nowrap text-base font-bold text-navy-900 hover:underline">
              Rever o Ciclo de Resultado ↑
            </a>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {etapas.map((e) => (
              <div key={e.label} className="flex flex-col gap-2.5 border-t-[3px] border-ember-600 pt-5">
                <span className="text-xs font-bold tracking-wide text-ember-700">{e.label.toUpperCase()}</span>
                <strong className="text-xl text-navy-900">{e.title}</strong>
                <p className="text-base leading-relaxed text-navy-600">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Canaã Way + competências */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Canaã Way" title="Nossa forma de fazer" />
        <div className="mt-10 flex flex-col gap-10 border-b border-base-300 pb-14">
          <p className="max-w-4xl font-display text-3xl font-light leading-snug text-navy-900 sm:text-4xl">
            Em muitas empresas, o número chega <strong className="font-extrabold">tarde demais para mudar alguma coisa.</strong>{" "}
            A Canaã traz o número para a hora da decisão, com:
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {canaaWay.map((c) => (
              <div key={c.title} className="flex flex-col gap-3.5">
                <span className="h-1 w-10 rounded-full bg-gradient-to-r from-accent to-ember-600" />
                <strong className="text-lg leading-snug text-navy-900">{c.title}</strong>
                <p className="text-sm leading-relaxed text-navy-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-display mt-14 text-2xl font-light text-navy-900">Competências do nosso time</h3>
        <div className="mt-6 grid gap-12 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-wide text-accent">SOFT SKILLS</span>
            {softSkills.map((s, i) => (
              <div key={s.title} className="flex gap-5 border-b border-base-300 py-6">
                <span className="w-7 shrink-0 font-mono text-base font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <strong className="text-lg text-navy-900">{s.title}</strong>
                  <p className="text-base leading-relaxed text-navy-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-wide text-ember-700">HARD SKILLS</span>
            {hardSkills.map((s, i) => (
              <div key={s.title} className="flex gap-5 border-b border-base-300 py-6">
                <span className="w-7 shrink-0 font-mono text-base font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <strong className="text-lg text-navy-900">{s.title}</strong>
                  <p className="text-base leading-relaxed text-navy-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que a Canaã */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 lg:flex-row">
          <div className="w-full shrink-0 lg:w-[380px]">
            <SectionHeading eyebrow="Como trabalhamos" title="Por que as empresas escolhem a Canaã" />
          </div>
          <ol className="flex flex-1 flex-col">
            {whyCanaa.map((r, i) => (
              <li key={r.title} className="flex gap-6 border-b border-base-300 py-6 last:border-b-0">
                <span className="w-8 shrink-0 font-mono text-base font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <strong className="text-lg text-navy-900">{r.title}</strong>
                  <span className="text-base leading-relaxed text-navy-600">{r.body}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Compromisso */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-start">
          <p className="w-full shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-blue-mist lg:w-[280px]">
            Nosso compromisso
          </p>
          <div className="flex flex-col gap-6">
            <p className="text-2xl font-bold leading-snug sm:text-3xl">
              Soluções de controladoria que permitem que você se concentre no que faz de melhor: gerir e expandir o
              seu negócio.
            </p>
            <p className="text-lg leading-relaxed text-blue-mist-light">
              Com a nossa abordagem, você terá uma equipe dedicada e altamente qualificada ao seu lado, pronta para
              impulsionar seu crescimento e sucesso.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="w-full shrink-0 lg:w-[380px]">
            <SectionHeading
              eyebrow="Perguntas frequentes"
              title={
                <>
                  O que os gestores <strong className="font-extrabold">perguntam antes de começar</strong>
                </>
              }
              lede="Ficou alguma dúvida? Fale com a nossa equipe no diagnóstico."
            />
          </div>
          <ol className="flex flex-1 flex-col">
            {faq.map((f, i) => (
              <li key={f.question} className="flex gap-6 border-b border-base-300 py-8 last:border-b-0">
                <span className="w-8 shrink-0 pt-1 font-mono text-base font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl font-bold text-navy-900 sm:text-2xl">{f.question}</h3>
                  <p className="text-base leading-relaxed text-navy-600">{f.answer}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-start gap-8 rounded-box bg-navy-900 p-10 text-white sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <h2 className="font-display max-w-xl text-3xl font-light leading-tight sm:text-4xl">
            Pronto para colocar o método <strong className="font-extrabold">para rodar na sua empresa</strong>?
          </h2>
          <Link
            href="/lp-controller-cfo"
            className="inline-flex shrink-0 items-center rounded-lg bg-accent px-8 py-3.5 text-base font-bold text-accent-content shadow-md shadow-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-lg hover:shadow-accent/30"
          >
            Agendar diagnóstico
          </Link>
        </div>
      </section>
    </>
  );
}
