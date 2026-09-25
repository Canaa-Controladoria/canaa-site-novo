import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "@/components/site/CTAButton";
import { CountUp } from "@/components/site/CountUp";
import { GrowBars } from "@/components/site/GrowBars";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SolutionCard } from "@/components/site/SolutionCard";
import { TestimonialsGrid } from "@/components/site/TestimonialsGrid";
import { Shorts } from "@/components/site/Shorts";
import { Faq } from "@/components/site/Faq";
import { PostCard } from "@/components/blog/PostCard";
import { ProposalForm } from "@/components/forms/ProposalForm";
import { solutions, site } from "@/lib/site";
import { getRecentPosts } from "@/lib/blog";
import { listPublishedShorts } from "@/lib/shorts";

export const revalidate = 0;

const solutionCopy: Record<string, string> = {
  "report-estrategico": "Escolhemos os principais reports para o sucesso da sua empresa, em uma única tela de comando.",
  "cubo-de-resultado": "Enxergue seu resultado por produto, cliente, vendedor, região e ramo de negócio.",
  "gestao-por-squad": "Equipe direcionada para gerar resultado através de OKRs e KPIs, com método ágil.",
  "gestao-para-giro": "Gestão de caixa levada a sério para a sustentabilidade financeira da sua empresa.",
  "gestao-de-futuro": "Orçamento bottom-up, cenários e projeções para decisões conscientes sobre o amanhã.",
  valuation: "Metodologias consagradas — DCF e múltiplos — para saber quanto vale o seu negócio.",
  "estrutura-de-controladoria": "Formação de equipe, diagnóstico e implantação do setor de FP&A.",
  training: "Capacitação de gestores e equipes com foco em performance financeira.",
};

const pillars = [
  {
    letter: "F",
    color: "#004b84",
    title: "Finanças",
    body: "Caixa e capital de giro sob controle, orçamento que se cumpre e visão de futuro.",
    items: ["Fluxo de caixa e capital de giro", "Orçamento e FP&A", "Valuation"],
  },
  {
    letter: "C",
    color: "#c33628",
    title: "Contabilidade",
    body: "Números confiáveis são a base de qualquer decisão. Sem eles, o resto é palpite.",
    items: ["Demonstrações confiáveis", "Compliance fiscal", "Conciliação"],
  },
  {
    letter: "O",
    color: "#cb5f08",
    title: "Operação",
    body: "Indicadores do chão da empresa conectados ao resultado financeiro.",
    items: ["KPIs operacionais", "Produtividade e processos", "Squads de resultado"],
  },
];

const controllerSteps = [
  {
    title: "Diagnóstico de FP&A e controladoria",
    body: "Pontos fortes e lacunas de processos, ferramentas e equipe.",
  },
  {
    title: "Estrutura e dados",
    body: "Plano de contas gerencial, BI e indicadores dos 3 pilares.",
  },
  {
    title: "Rotina de reports",
    body: "Análises que viram ação, não só relatório.",
  },
  {
    title: "Squads e reuniões de resultado",
    body: "OKRs, KPIs e acompanhamento próximo com a diretoria.",
  },
];

const clientLogos = Array.from({ length: 32 }, (_, i) => `logo${i + 1}`);

export default async function HomePage() {
  const recentPosts = getRecentPosts(3);
  const shorts = listPublishedShorts(8);

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
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="fade-rise">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-ember-600" />
              Controladoria · Finanças · Contabilidade · Operação
            </div>
            <h1 className="font-display mt-7 text-4xl sm:text-5xl font-light leading-[1.14] tracking-tight">
              Controladoria que dá <strong className="font-extrabold">clareza</strong>, autoridade que gera{" "}
              <strong className="font-extrabold text-amber-400">resultado</strong>.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-blue-mist-light">
              Somos a extensão financeira de médias empresas que querem decisões seguras, números confiáveis e uma
              gestão orientada por dados — não por achismo.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CTAButton href="/lp-controller-cfo">Solicitar proposta</CTAButton>
              <CTAButton href="/solucoes" variant="ghost-light">
                Conhecer soluções →
              </CTAButton>
            </div>
            <div className="mt-11 flex flex-wrap gap-10 border-t border-white/15 pt-7">
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
                <p className="mt-1 text-sm text-blue-mist">mais controle e crescimento</p>
              </div>
            </div>
          </div>

          <div className="fade-rise relative" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -top-4 right-4 z-10 rotate-2 rounded-lg bg-accent px-4 py-2 text-xs font-extrabold text-accent-content shadow-lg">
              +19,2% vs. meta
            </div>
            <div className="rounded-box border border-white/10 bg-white/[0.06] p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Resultado consolidado · mês</p>
                <span className="h-2 w-2 rounded-full bg-ember-600" />
              </div>
              <div className="mt-5">
                <GrowBars values={[38, 55, 46, 82, 64, 95]} />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] text-blue-mist">
                {["Fev", "Mar", "Abr", "Mai", "Jun", "Jul"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3.5">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3.5">
                  <p className="text-lg font-extrabold">42,3%</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-blue-mist">
                    Margem de contribuição
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3.5">
                  <p className="text-lg font-extrabold">R$ 8,2M</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-blue-mist">
                    Faturamento realizado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova social — clientes */}
      <section className="bg-base-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 sm:flex-row">
          <span className="shrink-0 text-sm font-semibold text-navy-600">Empresas que confiam na Canaã</span>
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-base-100 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-base-100 to-transparent" />
            <div className="flex w-max animate-marquee items-center gap-4">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="relative h-12 w-24 shrink-0 rounded-box bg-base-200 p-2 transition-transform duration-200 hover:scale-110"
                >
                  <Image
                    src={`https://canaacontroladoria.com.br/wp-content/uploads/2024/05/${name}.png`}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Método 3 pilares */}
      <section id="metodo" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Método Canaã · 3 pilares"
            title="Controladoria é a guardiã da estratégia. E ela se sustenta em três pilares."
          />
          <p className="max-w-md text-lg leading-relaxed text-navy-600">
            A maioria das empresas olha só um pedaço dos números. Nós conectamos os três — e amarramos o que foi
            planejado ao que acontece na operação.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.letter} className="flex flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
              <div className="h-1.5" style={{ background: p.color }} />
              <div className="flex flex-1 flex-col gap-4 p-9">
                <span className="font-mono text-4xl font-semibold" style={{ color: p.color }}>
                  {p.letter}
                </span>
                <h3 className="text-2xl font-extrabold text-navy-800">{p.title}</h3>
                <p className="text-base leading-relaxed text-navy-600">{p.body}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-navy-800">
                  {p.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {p.letter === "O" && (
                  <Link href="/metodo#ciclo" className="text-sm font-bold text-ember-700 hover:underline">
                    Como fazemos: o Ciclo de Resultado →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-box bg-base-200 p-6 text-base font-semibold text-navy-800 sm:gap-5">
          <span>Estratégia</span>
          <span aria-hidden className="text-navy-800">
            ⟶
          </span>
          <span className="rounded-md bg-navy-900 px-4 py-2 text-white">Controladoria (F + C + O)</span>
          <span aria-hidden className="text-navy-800">
            ⟶
          </span>
          <span>Operação</span>
          <span aria-hidden className="text-navy-800">
            ⟶
          </span>
          <span>Resultado</span>
        </div>
      </section>

      {/* Soluções */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Soluções"
          title="Soluções de controladoria e consultoria financeira"
          lede="Cada solução tem página própria, pensada para quem pesquisa exatamente esse problema no Google."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <SolutionCard key={s.slug} slug={s.slug} title={s.title} description={solutionCopy[s.slug]} />
          ))}
        </div>
      </section>

      {/* Controller terceirizado */}
      <section className="bg-navy-900 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Controller terceirizado" title="A controladoria de uma grande empresa, no tamanho da sua." dark />
            <p className="text-lg leading-relaxed text-blue-mist-light">
              Em vez de depender de um único controller interno, sua empresa conta com uma equipe Canaã dedicada —
              diagnóstico, estrutura, relatórios e reuniões de resultado com a diretoria.
            </p>
            <Link
              href="/lp-controller-cfo"
              className="group inline-flex w-fit items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-navy-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-mist-light hover:shadow-lg"
            >
              Como funciona o controller terceirizado
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <ol className="flex flex-col gap-3.5">
            {controllerSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5 rounded-box bg-white/[0.08] p-6">
                <span className="font-mono text-xl font-semibold text-blue-mist">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1.5">
                  <strong className="text-lg">{step.title}</strong>
                  <span className="text-sm leading-relaxed text-blue-mist-light">{step.body}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Autoridade */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex aspect-[4/5] w-full shrink-0 items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200 p-10 text-center text-sm text-navy-500 lg:w-[380px]">
            [Foto profissional da Dra. Ana Luísa Amorim — retrato em ambiente de escritório, luz natural]
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <SectionHeading eyebrow="Quem lidera" title="Dra. Ana Luísa Amorim" />
            <span className="text-xl font-semibold text-navy-900">Especialista em Controladoria Estratégica</span>
            <blockquote className="rounded-box bg-base-200 px-7 py-6 text-xl font-semibold leading-relaxed text-navy-900">
              “Controladoria não é relatório. É a ferramenta que amarra a estratégia da empresa ao que acontece na
              operação.”
            </blockquote>
            <p className="text-base leading-relaxed text-navy-600">
              [Mini-bio: formação, trajetória, certificações e o que motivou a criação do método dos 3 pilares.]
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-navy-900 px-5 py-2.5 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:text-white hover:shadow-md"
              >
                Seguir no LinkedIn
              </a>
              <Link
                href="/quem-somos"
                className="inline-flex items-center rounded-lg border border-navy-900 px-5 py-2.5 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:text-white hover:shadow-md"
              >
                Palestras e imprensa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Clientes" title="O que dizem as empresas que confiam na Canaã" />
        <div className="mt-10">
          <TestimonialsGrid />
        </div>
      </section>

      {/* Shorts */}
      {shorts.length > 0 && (
        <section id="shorts" className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="Shorts" title="Controladoria em 1 minuto" />
          <div className="mt-10">
            <Shorts shorts={shorts} />
          </div>
        </section>
      )}

      {/* Insights */}
      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Insights" title="Controladoria na prática" />
            <CTAButton href="/blog" variant="outline">
              Ver todos os artigos →
            </CTAButton>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[380px]">
            <SectionHeading
              eyebrow="Perguntas frequentes"
              title="Consultoria financeira e controller: o que você precisa saber"
            />
          </div>
          <Faq />
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-start gap-8 rounded-box bg-navy-900 p-10 text-white sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="font-display text-3xl font-light leading-tight sm:text-4xl">
              Sua empresa sabe exatamente onde ganha e onde perde dinheiro?
            </h2>
            <p className="text-lg text-blue-mist-light">Comece por um diagnóstico de controladoria com a equipe Canaã.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <CTAButton href="#proposta">Agendar diagnóstico</CTAButton>
            <a
              href={`tel:+55${site.phoneWhatsapp.slice(2)}`}
              className="inline-flex items-center justify-center rounded-lg border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-navy-900 hover:shadow-md"
            >
              Ligar {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Proposal form */}
      <section id="proposta" className="bg-base-200 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Solicite uma proposta"
            title="Fale com nossos especialistas"
            lede="Preencha o formulário e retornaremos seu contato o quanto antes. Nossos especialistas em controladoria financeira para resultados estão preparados para ajudar você e sua empresa a atingirem seus objetivos."
          />
          <div className="rounded-box border border-base-300 bg-base-100 p-8">
            <ProposalForm source="home" />
          </div>
        </div>
      </section>
    </>
  );
}
