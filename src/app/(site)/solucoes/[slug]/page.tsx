import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTAButton } from "@/components/site/CTAButton";
import { GiroCharts } from "@/components/site/GiroCharts";
import { KpiGauges } from "@/components/site/KpiGauges";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SolutionIcon } from "@/components/site/SolutionIcon";
import { ProposalForm } from "@/components/forms/ProposalForm";
import { getSolutionSlugs, solutionsContent } from "@/lib/solutions-content";

export function generateStaticParams() {
  return getSolutionSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const content = solutionsContent[slug];
    if (!content) return {};
    return { title: content.seoTitle, description: content.seoDescription };
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = solutionsContent[slug];
  if (!content) notFound();

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16">
        <div className="max-w-3xl">
          <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-blue-mist-light">
            <SolutionIcon slug={content.slug} />
          </span>
          {content.eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember-600 mb-3">{content.eyebrow}</p>
          )}
          <h1 className="font-display text-4xl leading-tight text-navy-800">{content.heroTitle}</h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-600">{content.heroLede}</p>
          <div className="mt-8">
            <CTAButton href="#proposta">Solicite uma proposta</CTAButton>
          </div>
        </div>

        {content.highlights && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {content.highlights.map((h) => (
              <div key={h.title} className="rounded-box border border-base-300 bg-base-200 p-6">
                <h2 className="font-display text-lg text-navy-800">{h.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{h.body}</p>
              </div>
            ))}
          </div>
        )}

        {content.slug === "report-estrategico" && (
          <div className="mt-12 flex flex-col items-center gap-6">
            <video
              src="/videos/bi-mockup-lap.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-2xl rounded-box border border-base-300"
            />
            <Image
              src="/images/power-bi-mobile-apps-all-up.png"
              alt="BI Canaã no celular, tablet e computador"
              width={580}
              height={276}
              className="w-full max-w-xl"
            />
          </div>
        )}
      </section>

      {content.slug === "gestao-por-squad" && <KpiGauges />}
      {content.slug === "gestao-para-giro" && <GiroCharts />}

      <section className="bg-base-200 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={content.topicsHeading} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.topics.map((t) => (
              <div key={t.title} className="rounded-box bg-base-100 border border-base-300 p-6">
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-navy-800">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CTAButton href="/solucoes" variant="outline">
              Conheça nossas soluções em controladoria
            </CTAButton>
          </div>
        </div>
      </section>

      <section id="proposta" className="py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            title={content.proposalHeading}
            lede="Informe seus dados de contato e retornaremos o quanto antes. Nossos especialistas em controladoria para resultados estão preparados para ajudar você e sua empresa a atingirem seus objetivos."
          />
          <div className="rounded-box border border-base-300 bg-base-100 p-8">
            <ProposalForm source={`solucoes-${content.slug}`} />
          </div>
        </div>
      </section>
    </>
  );
}
