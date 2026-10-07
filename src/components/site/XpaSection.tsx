import { SectionHeading } from "@/components/site/SectionHeading";

const PILARES = [
  "Orçamentos mais realistas",
  "Previsões rápidas e dinâmicas",
  "Times alinhados em uma única visão estratégica",
  "Decisões baseadas em dados conectados",
];

interface Etapa {
  label: string;
  title: string;
  body: string;
  items?: string[];
  footer: string;
}

const ETAPAS: Etapa[] = [
  {
    label: "Etapa 1",
    title: "Integração entre áreas",
    body: "O primeiro passo é conectar os dados e metas de todas as áreas:",
    items: [
      "Financeiro: DFC, DRE, fluxo de caixa projetado",
      "Comercial: vendas, volumes, preços e metas",
      "Operacional: produção, insumos, capacidade",
      "RH: custos de pessoal, produtividade, turnover",
      "Compras e Estoque: custos, prazos e demanda",
    ],
    footer: "Tudo passa a conversar — o que antes era feito em planilhas isoladas passa a ser um modelo único e integrado.",
  },
  {
    label: "Etapa 2",
    title: "Planejamento contínuo (Rolling Forecast)",
    body: "O XP&A substitui o orçamento engessado por previsões dinâmicas. As projeções são revisadas mensalmente ou trimestralmente. Se as vendas caem 8%, o modelo ajusta automaticamente o caixa, o ponto de equilíbrio e o impacto no lucro.",
    footer: "Resultado: a empresa age antes, e não depois.",
  },
  {
    label: "Etapa 3",
    title: "Painéis de controle e análise",
    body: "A controladoria passa a atuar com painéis inteligentes de KPIs, que mostram:",
    items: [
      "Margem por produto, cliente ou unidade",
      "Ponto de equilíbrio atualizado",
      "Resultado operacional por área",
      "Geração de caixa e endividamento",
      "Metas versus realizado",
    ],
    footer: "Esses indicadores alimentam o processo de decisão em tempo real — e transformam dados em ação.",
  },
  {
    label: "Etapa 4",
    title: "Simulação de cenários",
    body: "Um dos maiores diferenciais do XP&A é a capacidade de testar o futuro antes de vivê-lo:",
    items: ["“E se aumentarmos preços em 5%?”", "“E se o dólar subir?”", "“E se contratarmos mais vendedores?”"],
    footer: "O modelo mostra o impacto no caixa, na margem e no resultado — e dá segurança para decidir com velocidade e precisão.",
  },
  {
    label: "Etapa 5",
    title: "Decisão colaborativa e ágil",
    body: "O XP&A faz com que a empresa ande mais sem o dono. Decisões deixam de ser centralizadas e baseadas em intuição — passam a ser colaborativas, orientadas a dados e revisadas em ciclos curtos. As áreas se reúnem periodicamente (sprints de planejamento) para:",
    items: ["Rever resultados reais", "Ajustar previsões", "Corrigir desvios", "Reforçar metas conjuntas"],
    footer: "O planejamento deixa de ser um documento — e passa a ser uma estratégia viva.",
  },
];

export function XpaSection() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="XP&A"
          title="Você já ouviu falar em XP&A?"
          lede="XP&A (Extended Planning & Analysis) é a evolução natural do FP&A tradicional. Ele conecta o planejamento financeiro ao planejamento operacional de toda a empresa — vendas, RH, marketing, supply chain — em um fluxo único, integrado, ágil e colaborativo."
        />

        <p className="mt-8 max-w-3xl font-display text-2xl font-light leading-snug text-navy-900 sm:text-3xl">
          Enquanto o FP&A olha para os números, <strong className="font-extrabold">o XP&A olha para o negócio como um todo.</strong>
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((p) => (
            <div key={p} className="flex flex-col gap-3 rounded-box border border-base-300 bg-base-200 p-5">
              <span className="h-1 w-8 rounded-full bg-gradient-to-r from-accent to-ember-600" />
              <span className="text-sm font-semibold leading-snug text-navy-800">{p}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy-600">
          Em um mundo onde tudo muda o tempo todo, as empresas que planejam de forma isolada estão ficando para trás.
        </p>
      </section>

      <section className="bg-[#fdf7f2] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Como funciona na prática"
            title="Um sistema vivo de planejamento"
            lede="Em vez de fazer um orçamento estático em janeiro e esquecê-lo em março, o XP&A cria um ciclo permanente de planejamento, análise e ajuste — com inteligência e agilidade, conectando todas as áreas da empresa em torno de dados reais e decisões contínuas."
          />

          <ol className="mt-10 flex flex-col">
            {ETAPAS.map((e, i) => (
              <li key={e.label} className="flex gap-6 border-b border-[#efd9c6] py-8 last:border-b-0">
                <span className="w-10 shrink-0 pt-1 font-mono text-base font-semibold text-ember-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-bold tracking-wide text-ember-700 uppercase">{e.label}</span>
                  <h3 className="text-xl font-bold text-navy-900 sm:text-2xl">{e.title}</h3>
                  <p className="text-base leading-relaxed text-navy-600">{e.body}</p>
                  {e.items && (
                    <ul className="mt-1 flex flex-col gap-1.5">
                      {e.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed text-navy-600">
                          <span className="text-ember-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-1 text-sm font-semibold text-navy-800">{e.footer}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-box bg-navy-900 p-10 text-white sm:p-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-mist">
            XP&A é o elo entre estratégia e resultado
          </p>
          <p className="mt-5 max-w-3xl font-display text-2xl font-light leading-snug sm:text-3xl">
            Mais do que uma ferramenta, o XP&A é{" "}
            <strong className="font-extrabold">um novo jeito de pensar o negócio.</strong>
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-mist-light">
            Ele traz o que todo empresário busca: clareza, previsibilidade e velocidade para agir. E quando bem
            implantado pela Controladoria, o XP&A se torna o ponto de convergência entre estratégia, operação e
            resultado — o fruto é um só modelo de decisão.
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-mist-light">
            Em um mercado em constante transformação, as empresas que integram suas áreas e transformam dados em
            ação terão vantagem competitiva. Na Canaã, acreditamos que planejar e acompanhar é liderar e criar o
            futuro.
          </p>
        </div>
      </section>
    </>
  );
}
