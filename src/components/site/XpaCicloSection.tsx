import { XpaCicloDiagram } from "@/components/site/XpaCicloDiagram";

export function XpaCicloSection() {
  return (
    <section className="pt-2 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 rounded-box border border-base-300 bg-base-200 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ember-600">O ciclo xP&A</span>
            <h2 className="font-display text-2xl text-navy-800 sm:text-3xl">
              As Finanças no centro, conectadas a toda a empresa
            </h2>
            <p className="text-base leading-relaxed text-navy-600">
              Vendas, RH, Marketing, S&amp;OP e TI alimentam o mesmo modelo com dados reais. Previsão, planejamento,
              orçamento, análise e modelagem deixam de ser etapas isoladas e passam a girar em torno de um único
              centro de decisão.
            </p>
          </div>
          <XpaCicloDiagram />
        </div>
      </div>
    </section>
  );
}
