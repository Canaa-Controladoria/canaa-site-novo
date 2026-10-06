import { CuboResultadoDiagram } from "@/components/site/CuboResultadoDiagram";

export function CuboResultadoSection() {
  return (
    <section className="pt-2 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 rounded-box border border-base-300 bg-base-200 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ember-600">O Cubo de Resultado</span>
            <h2 className="font-display text-2xl text-navy-800 sm:text-3xl">
              Seis ângulos do mesmo resultado, em um só lugar
            </h2>
            <p className="text-base leading-relaxed text-navy-600">
              Arraste para girar ou use as abas abaixo do cubo: faturamento, margem de contribuição, margem líquida,
              MC por produto, resultado líquido e MC por ramo — tudo com os números atualizados em tempo real.
            </p>
          </div>
          <CuboResultadoDiagram />
        </div>
      </div>
    </section>
  );
}
