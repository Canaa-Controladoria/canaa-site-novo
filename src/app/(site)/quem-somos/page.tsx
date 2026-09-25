import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CountUp } from "@/components/site/CountUp";
import { ProposalForm } from "@/components/forms/ProposalForm";
import { site } from "@/lib/site";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Controladoria para Resultados: Quem Somos e Como Atuamos",
  description:
    "Com mais de uma década de atuação, a Canaã é uma empresa de controladoria para resultados que impulsiona o crescimento das empresas.",
};

const media = [
  {
    videoId: "Hs-AsAdHHoo",
    podcast: "[Nome do podcast 1]",
    topic: "[Tema do episódio 1]",
    date: "[data]",
  },
  {
    videoId: "QjSqJtOgCbw",
    podcast: "[Nome do podcast 2]",
    topic: "[Tema do episódio 2]",
    date: "[data]",
  },
].map((m) => ({ ...m, href: `https://www.youtube.com/watch?v=${m.videoId}` }));

const values = [
  {
    title: "Segurança",
    body: "Lidamos com informações sensíveis e respeitamos profundamente essa confiança. Firmamos compromisso com resultados mensuráveis, com uma equipe de sólido conhecimento financeiro que trabalha junto com o seu time.",
  },
  {
    title: "Transparência",
    body: "Ouvimos, alinhamos e envolvemos todos os níveis da empresa. Nosso trabalho é fundamentado em dados e todos os processos ficam claros para a gestão.",
  },
  {
    title: "Proximidade",
    body: "Nossa maior proposta de valor é estar imersos no seu negócio, acompanhando de perto equipes e resultados, com simplicidade na relação e foco na sua satisfação.",
  },
];

const team = [
  { name: "[Nome]", role: "[Cargo]" },
  { name: "[Nome]", role: "[Cargo]" },
  { name: "[Nome]", role: "[Cargo]" },
  { name: "[Nome]", role: "[Cargo]" },
];

export default function QuemSomosPage() {
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
            / <span className="font-semibold text-white">Quem somos</span>
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-blue-mist">Quem somos</p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-light leading-[1.1] sm:text-5xl">
            Há mais de uma década sendo a controladoria de médias empresas.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-mist-light">
            A Canaã é uma empresa de controladoria outsourcing e consultoria financeira de Ribeirão Preto. Nosso
            trabalho é garantir que os números da sua empresa sejam confiáveis — e que virem decisão.
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

      {/* Sobre */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Sobre a Canaã Controladoria para Resultados"
            title="Da consultoria financeira tradicional à controladoria que entrega resultado"
          />
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-navy-800">
              Para atender às demandas práticas do mercado, optamos por migrar da consultoria financeira tradicional
              para fornecer soluções tangíveis em controladoria e resultados.
            </p>
            <p className="text-lg leading-relaxed text-navy-600">
              Atuamos como um <strong className="text-navy-900">braço de controladoria complementar</strong> ou como{" "}
              <strong className="text-navy-900">equipe de outsourcing</strong>, monitorando de perto os indicadores
              essenciais para que você possa concentrar-se no seu negócio e alcançar crescimento efetivo.
            </p>
            <div className="rounded-2xl bg-gradient-to-br from-accent to-ember-600 p-[3px]">
              <div className="flex flex-col gap-4 rounded-[13px] bg-base-100 p-9">
                <span className="text-xs font-bold tracking-wide text-accent">NO QUE ACREDITAMOS</span>
                <p className="text-xl font-semibold leading-relaxed text-ember-700">
                  “Toda empresa merece ter um sólido controle financeiro, porque é ele que pavimenta o caminho para
                  o sucesso.”
                </p>
                <p className="text-base leading-relaxed text-navy-600">
                  Fazemos isso estando próximos dos nossos clientes, monitorando continuamente equipes e zelando
                  pelos seus resultados, com ferramentas próprias e sólida expertise financeira.
                </p>
                <a href="#proposta" className="self-start text-base font-bold text-accent hover:underline">
                  Quer conversar e crescer com a gente? →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fundadora */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center">
          <div className="flex aspect-[4/5] w-full shrink-0 items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200 p-10 text-center text-sm text-navy-500 lg:w-[380px]">
            [Foto profissional da Dra. Ana Luísa Amorim]
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <SectionHeading eyebrow="Fundadora" title="Dra. Ana Luísa Amorim" />
            <span className="text-xl font-semibold text-navy-900">Especialista em Controladoria Estratégica</span>
            <p className="text-base leading-relaxed text-navy-600">
              [História da fundação da Canaã: formação, trajetória profissional, o problema que viu nas empresas e
              o que a levou a criar o método dos 3 pilares.]
            </p>
            <blockquote className="rounded-box bg-base-200 px-7 py-6 text-xl font-semibold leading-relaxed text-navy-900">
              “Controladoria não é relatório. É a ferramenta que amarra a estratégia da empresa ao que acontece na
              operação.”
            </blockquote>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-navy-900 px-5 py-2.5 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:text-white hover:shadow-md"
              >
                LinkedIn
              </a>
              <a
                href="#imprensa"
                className="inline-flex items-center rounded-lg border border-navy-900 px-5 py-2.5 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-900 hover:text-white hover:shadow-md"
              >
                Podcasts e entrevistas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimento GTM */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="w-full shrink-0 lg:w-[280px]">
            <SectionHeading eyebrow="Depoimento" title="Cliente desde 2015" />
          </div>
          <figure className="flex flex-1 flex-col gap-6 rounded-box border border-base-300 bg-base-100 p-9">
            <blockquote className="text-xl font-semibold leading-relaxed text-navy-900">
              “Sua abordagem personalizada e comprometida com nossos objetivos financeiros tem sido essencial para
              a nossa sustentabilidade e sucesso. Agradecemos profundamente pela parceria contínua e pelo impacto
              positivo que teve e tem na trajetória da nossa empresa.”
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-base font-extrabold text-white">
                LR
              </span>
              <span className="flex flex-col">
                <strong className="text-base text-navy-900">Luiz Fernando Ruffo</strong>
                <span className="text-sm text-navy-500">CEO · GTM</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Na mídia */}
      <section id="imprensa" className="bg-base-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Na mídia" title="Podcasts e entrevistas" />
            <p className="max-w-sm text-base leading-relaxed text-navy-600">
              Conversas em que a Dra. Ana Luísa fala sobre controladoria, gestão e resultado nas empresas.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {media.map((m) => (
              <a
                key={m.href}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 text-navy-800 transition-colors hover:border-accent"
              >
                <div className="relative flex h-56 items-center justify-center bg-navy-900">
                  <Image
                    src={`https://i.ytimg.com/vi/${m.videoId}/hqdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy-900/45" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-white">
                    Podcast · YouTube
                  </span>
                  <span className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white transition-transform group-hover:scale-105">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#004b84">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-7">
                  <span className="text-sm font-bold text-navy-900">{m.podcast}</span>
                  <strong className="text-xl leading-snug text-navy-900">{m.topic}</strong>
                  <span className="text-sm text-navy-600">Dra. Ana Luísa Amorim, convidada · {m.date}</span>
                  <span className="mt-1.5 text-sm font-bold text-navy-900">Assistir ao episódio →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Para quem trabalhamos"
              title={
                <>
                  Gestores de <strong className="font-extrabold">médias empresas</strong>.
                </>
              }
            />
            <p className="text-lg leading-relaxed text-navy-600">
              Nosso cliente é o empresário em evolução: a empresa já está madura e agora precisa profissionalizar a
              gestão financeira e ter controle real dos números para atingir os objetivos estratégicos.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-accent to-ember-600 p-[3px]">
            <div className="flex flex-col gap-3 rounded-[13px] bg-base-100 p-9">
              <span className="text-sm font-bold tracking-wide text-ember-700">PERFIL DE FATURAMENTO</span>
              <span className="font-display text-3xl font-light leading-snug text-accent">
                entre <strong className="font-bold">R$ 5 milhões</strong> e{" "}
                <strong className="font-bold">R$ 100 milhões</strong> por ano
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-6 rounded-box bg-navy-900 p-10 text-white sm:flex-row sm:items-start">
          <strong className="shrink-0 text-2xl font-bold sm:w-64">Quando a Canaã faz sentido</strong>
          <p className="text-lg leading-relaxed text-blue-mist-light">
            Quando a empresa precisa entender melhor os custos, ter um orçamento detalhado, mais controle sobre a
            operação e uma visão real e segura dos números — geralmente porque está prestes a dar um novo passo:
            ganhar escala, decidir um investimento ou abrir espaço para um novo sócio ou investidor.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Nossos valores" title="O que guia cada entrega" />
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-3.5">
              <div className="flex items-center gap-3.5">
                <span className="h-9 w-1 rounded-full bg-gradient-to-b from-accent to-ember-600" />
                <strong className="font-display text-2xl font-light text-navy-900">{v.title}</strong>
              </div>
              <p className="text-base leading-relaxed text-navy-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chamada método */}
      <section className="bg-base-100 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <strong className="font-display text-2xl font-light text-navy-900">
              Quer saber <strong className="font-bold">como trabalhamos</strong>?
            </strong>
            <span className="text-base leading-relaxed text-navy-600">
              Conheça o método dos 3 pilares, as etapas de implantação e as competências do nosso time.
            </span>
          </div>
          <Link
            href="/metodo"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-navy-900 px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg"
          >
            Conhecer o Método Canaã
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Equipe */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Equipe" title="Quem cuida dos seus números" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex aspect-[4/5] items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200 text-sm text-navy-500">
                [foto]
              </div>
              <strong className="text-lg text-navy-900">{member.name}</strong>
              <span className="-mt-2 text-sm text-navy-600">{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trainee */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-start gap-8 rounded-box bg-navy-900 p-10 text-white sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-mist">Programa de trainee</p>
            <h2 className="font-display text-3xl font-light leading-tight">Quer aprender controladoria na prática?</h2>
            <p className="text-base leading-relaxed text-blue-mist-light">
              [Descrição do Programa de Trainee: para quem é, o que se aprende e quando abrem as inscrições.]
            </p>
          </div>
          <Link
            href="/trabalhe-conosco"
            className="inline-flex shrink-0 items-center rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-navy-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-mist-light hover:shadow-lg"
          >
            Conhecer o programa
          </Link>
        </div>
      </section>

      {/* Onde estamos */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col gap-4">
            <SectionHeading eyebrow="Onde estamos" title="Ribeirão Preto–SP" />
            <p className="text-base leading-relaxed text-navy-600">{site.address}</p>
            <p className="text-base leading-relaxed text-navy-600">
              {site.phoneDisplay} · {site.email}
              <br />
              {site.hours}.
            </p>
            <a
              href={`tel:+55${site.phoneWhatsapp.slice(2)}`}
              className="inline-flex w-fit items-center rounded-lg bg-navy-900 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg"
            >
              Ligar {site.phoneDisplay}
            </a>
          </div>
          <div className="w-full shrink-0 overflow-hidden rounded-box border border-base-300 lg:w-[420px]">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.name)}&t=m&z=16&output=embed&iwloc=near`}
              className="h-full min-h-[280px] w-full"
              loading="lazy"
              title={`Mapa de localização — ${site.name}`}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Proposal form */}
      <section id="proposta" className="bg-base-200 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Solicite uma proposta"
            title="Solicite uma proposta com a Canaã"
            lede="Preencha o formulário e retornaremos seu contato o quanto antes."
          />
          <div className="rounded-box border border-base-300 bg-base-100 p-8">
            <ProposalForm source="quem-somos" />
          </div>
        </div>
      </section>
    </>
  );
}
