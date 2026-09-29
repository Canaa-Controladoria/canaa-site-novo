import { GrowBars } from "./GrowBars";

const costBreakdown = [
  { label: "Operacional", value: 42, color: "var(--color-accent)" },
  { label: "Pessoal", value: 27, color: "var(--color-ember-600)" },
  { label: "Comercial", value: 19, color: "var(--color-blue-mist)" },
  { label: "Administrativo", value: 12, color: "var(--color-navy-600)" },
];

function buildConicGradient() {
  let acc = 0;
  const stops = costBreakdown.map(({ value, color }) => {
    const from = acc;
    acc += value;
    return `${color} ${from}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export function BIDashboardMockup() {
  return (
    <div className="mockup-browser border border-base-300 bg-base-300 shadow-xl">
      <div className="mockup-browser-toolbar">
        <div className="input border-base-300 bg-base-100 text-xs text-navy-500">app.canaacontroladoria.com.br/bi</div>
      </div>
      <div className="bg-navy-950 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-mist">Painel financeiro · BI Canaã</p>
            <p className="mt-1 text-lg font-bold text-white">Resultado consolidado</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-ember-600" />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.08] p-2.5 sm:p-3">
            <p className="text-sm font-extrabold text-white sm:text-lg">R$ 8,2M</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-blue-mist-light sm:text-[10px]">
              Faturamento
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.08] p-2.5 sm:p-3">
            <p className="text-sm font-extrabold text-white sm:text-lg">42,3%</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-blue-mist-light sm:text-[10px]">
              Margem
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.08] p-2.5 sm:p-3">
            <p className="text-sm font-extrabold text-white sm:text-lg">+19,2%</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-blue-mist-light sm:text-[10px]">
              vs. meta
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-blue-mist">Receita · mês</p>
            <GrowBars values={[38, 55, 46, 82, 64, 95]} />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] p-4">
            <div
              className="h-24 w-24 rounded-full"
              style={{ backgroundImage: buildConicGradient() }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-950 text-[10px] font-bold text-white">
                  Custos
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-blue-mist">Custos por área</p>
          </div>
        </div>
      </div>
    </div>
  );
}
