"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const ENTRADAS = [420, 380, 450, 470, 430, 500, 520, 480, 510, 540, 560, 590];
const SAIDAS = [300, 295, 510, 330, 335, 610, 340, 420, 550, 390, 470, 660];

const COLOR_INCREASE = "#3b74a8";
const COLOR_INCREASE_LABEL = "#2f5f8c";
const COLOR_DECREASE = "#cb5f08";
const COLOR_DECREASE_LABEL = "#a94e06";
const COLOR_TOTAL = "#0a3f68";
const COLOR_ENTRADAS = "#3b74a8";
const COLOR_SAIDAS = "#c33628";
const COLOR_GRID = "#e1e6ef";
const COLOR_GRID_ZERO = "#9aa8b8";
const COLOR_AXIS = "#8a95a3";
const COLOR_CONNECTOR = "#9aa8b8";

function clamp(x: number) {
  return Math.max(0, Math.min(1, x));
}
function ease(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function seg(t: number, a: number, d: number) {
  return clamp((t - a) / d);
}
function fmtSigned(v: number) {
  const r = Math.round(v);
  return (r > 0 ? "+" : r < 0 ? "−" : "") + Math.abs(r);
}

// ---- Cascata (waterfall) ----
const W_L = 50;
const W_R = 632;
const W_T = 14;
const W_B = 266;
const NET = ENTRADAS.map((e, i) => e - SAIDAS[i]);
const CUM = NET.reduce<number[]>((acc, n) => [...acc, acc[acc.length - 1] + n], [0]);
const TOTAL = CUM[CUM.length - 1];
const W_LO = Math.min(0, ...CUM);
const W_HI = Math.max(...CUM) * 1.12;
const waterfallY = (v: number) => W_B - ((v - W_LO) / (W_HI - W_LO)) * (W_B - W_T);
const W_N = NET.length + 1;
const W_SLOT = (W_R - W_L) / W_N;
const W_BW = W_SLOT * 0.58;
const W_STEP = W_HI > 600 ? 200 : 100;

const waterfallGrid: { value: number; y: number }[] = [];
for (let g = 0; g <= W_HI; g += W_STEP) waterfallGrid.push({ value: g, y: waterfallY(g) });

interface WaterfallBar {
  x: number;
  width: number;
  from: number;
  to: number;
  isTotal: boolean;
  color: string;
  labelColor: string;
  labelText: string;
  labelY: number;
  axisLabel: string;
  hasConn: boolean;
  connY: number;
  at: number;
}

const waterfallBars: WaterfallBar[] = Array.from({ length: W_N }, (_, i) => {
  const isTotal = i === W_N - 1;
  const x = W_L + i * W_SLOT + (W_SLOT - W_BW) / 2;
  const from = isTotal ? 0 : CUM[i];
  const to = isTotal ? TOTAL : CUM[i + 1];
  const d = to - from;
  return {
    x,
    width: W_BW,
    from,
    to,
    isTotal,
    color: isTotal ? COLOR_TOTAL : d >= 0 ? COLOR_INCREASE : COLOR_DECREASE,
    labelColor: isTotal ? COLOR_TOTAL : d >= 0 ? COLOR_INCREASE_LABEL : COLOR_DECREASE_LABEL,
    labelText: isTotal ? String(Math.round(TOTAL)) : fmtSigned(d),
    labelY: d >= 0 ? waterfallY(to) - 7 : waterfallY(to) + 16,
    axisLabel: isTotal ? "Saldo" : MESES[i],
    hasConn: i < W_N - 1,
    connY: waterfallY(to),
    at: 1.2 + i * 0.32,
  };
});

// ---- Divergente (entradas x saídas) ----
// Mesma viewBox/margens da cascata (640x310) para os dois gráficos saírem do mesmo tamanho quando empilhados.
const D_L = W_L;
const D_R = W_R;
const D_T = W_T;
const D_B = W_B;
const D_MX = Math.max(...ENTRADAS, ...SAIDAS) * 1.08;
const D_MID = (D_T + D_B) / 2;
const divergentY = (v: number) => D_MID - (v / D_MX) * (D_MID - D_T);
const divergentGrid = [-600, -300, 0, 300, 600].filter((v) => Math.abs(v) <= D_MX);
const D_SLOT = (D_R - D_L) / ENTRADAS.length;
const D_BW = D_SLOT * 0.62;

interface DivergentBar {
  x: number;
  entradas: number;
  saidas: number;
  dotY: number;
  axisLabel: string;
  at: number;
}

const divergentBars: DivergentBar[] = ENTRADAS.map((e, i) => {
  const s = SAIDAS[i];
  return {
    x: D_L + i * D_SLOT + (D_SLOT - D_BW) / 2,
    entradas: e,
    saidas: s,
    dotY: divergentY(e - s),
    axisLabel: MESES[i].charAt(0),
    at: 2.2 + i * 0.3,
  };
});

const SUM_ENTRADAS = ENTRADAS.reduce((a, b) => a + b, 0);

type WaterfallRefs = { rect: SVGRectElement | null; label: SVGTextElement | null; conn: SVGLineElement | null };
type DivergentRefs = { up: SVGRectElement | null; down: SVGRectElement | null; dot: SVGCircleElement | null };

export function GiroCharts() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null]);
  const wRefs = useRef<WaterfallRefs[]>([]);
  const dRefs = useRef<DivergentRefs[]>([]);
  const statSaldoRef = useRef<HTMLElement | null>(null);
  const statEntradasRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const SPEED = 0.6;
    const END = 9;
    let raf: number | null = null;
    let start: number | null = null;
    let visible = false;

    function frame(t: number) {
      if (headRef.current) {
        const a = ease(seg(t, 0, 0.8));
        headRef.current.style.opacity = String(a);
        headRef.current.style.transform = `translateY(${(1 - a) * 16}px)`;
      }
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = ease(seg(t, i === 0 ? 0.5 : 0.7, 0.8));
        el.style.opacity = String(a);
        el.style.transform = `translateY(${(1 - a) * 16}px)`;
      });

      waterfallBars.forEach((b, i) => {
        const r = wRefs.current[i];
        if (!r) return;
        const p = ease(seg(t, b.at, 0.55));
        const cur = b.from + (b.to - b.from) * p;
        const yCur = waterfallY(cur);
        const yFrom = waterfallY(b.from);
        const y1 = Math.min(yFrom, yCur);
        const h = Math.abs(yCur - yFrom);
        r.rect?.setAttribute("y", String(y1));
        r.rect?.setAttribute("height", String(Math.max(h, p > 0 ? 1 : 0)));
        r.label?.setAttribute("opacity", String(seg(t, b.at + 0.4, 0.3)));
        r.conn?.setAttribute("opacity", String(seg(t, b.at + 0.45, 0.25)));
      });

      divergentBars.forEach((b, i) => {
        const r = dRefs.current[i];
        if (!r) return;
        const p = ease(seg(t, b.at, 0.6));
        const q = ease(seg(t, b.at + 0.12, 0.6));
        const ye = divergentY(b.entradas * p);
        r.up?.setAttribute("y", String(ye));
        r.up?.setAttribute("height", String(D_MID - ye));
        r.down?.setAttribute("height", String(divergentY(-b.saidas * q) - D_MID));
        r.dot?.setAttribute("opacity", String(seg(t, b.at + 0.6, 0.3)));
      });

      if (statSaldoRef.current) {
        const c = ease(seg(t, 1.2, 4.2)) * TOTAL;
        statSaldoRef.current.textContent = `R$ ${Math.round(c)} mil`;
      }
      if (statEntradasRef.current) {
        const c = ease(seg(t, 2.2, 3.6)) * SUM_ENTRADAS;
        statEntradasRef.current.textContent = `R$ ${(c / 1000).toFixed(2).replace(".", ",")} mi`;
      }
    }

    function loop(now: number) {
      raf = null;
      if (!visible) return;
      const t = reduce ? END : ((now - (start ?? now)) / 1000) * SPEED;
      frame(t);
      if (t < END) raf = requestAnimationFrame(loop);
    }

    frame(-1);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible) {
            if (start === null) start = performance.now();
            if (!raf) raf = requestAnimationFrame(loop);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={rootRef} className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={headRef} style={{ opacity: 0 }}>
          <SectionHeading
            eyebrow="GESTÃO PARA GIRO"
            title="Seu caixa, mês a mês, sob controle"
            lede="Acompanhamos cada entrada e saída para antecipar desafios de liquidez e garantir fôlego para o crescimento sustentável."
          />
        </div>

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-2">
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            style={{ opacity: 0 }}
            className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-200 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-navy-800">Fluxo de caixa — movimentação mensal</h3>
                <div className="flex flex-wrap gap-3 text-[11px] text-navy-600">
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_INCREASE }} />
                    Aumento
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_DECREASE }} />
                    Diminuição
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_TOTAL }} />
                    Saldo
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[11px] text-navy-600">Saldo final projetado</span>
                <b ref={(el) => { statSaldoRef.current = el; }} className="font-display text-2xl text-navy-800">
                  R$ 0 mil
                </b>
              </div>
            </div>

            <div className="rounded-field border border-base-300 bg-base-100 p-3">
              <svg
                viewBox="0 0 640 310"
                role="img"
                aria-label="Gráfico de cascata do fluxo de caixa mensal"
                className="block h-auto w-full overflow-visible"
              >
                {waterfallGrid.map((g) => (
                  <g key={g.value}>
                    <line x1={W_L} x2={W_R} y1={g.y} y2={g.y} stroke={g.value === 0 ? COLOR_GRID_ZERO : COLOR_GRID} strokeWidth={1} />
                    <text x={W_L - 8} y={g.y + 4.5} fontSize={13} fill={COLOR_AXIS} textAnchor="end">
                      {g.value}
                    </text>
                  </g>
                ))}
                {waterfallBars.map((b, i) => (
                  <g key={i}>
                    <rect
                      ref={(el) => {
                        wRefs.current[i] = wRefs.current[i] ?? { rect: null, label: null, conn: null };
                        wRefs.current[i].rect = el;
                      }}
                      x={b.x}
                      width={b.width}
                      y={waterfallY(b.from)}
                      height={0}
                      rx={2}
                      fill={b.color}
                    >
                      <title>
                        {(b.isTotal ? "Saldo" : b.axisLabel) + ": " + (b.isTotal ? Math.round(TOTAL) : fmtSigned(b.to - b.from)) + " mil"}
                      </title>
                    </rect>
                    <text
                      ref={(el) => {
                        wRefs.current[i] = wRefs.current[i] ?? { rect: null, label: null, conn: null };
                        wRefs.current[i].label = el;
                      }}
                      x={b.x + b.width / 2}
                      y={b.labelY}
                      fontSize={13}
                      fill={b.labelColor}
                      textAnchor="middle"
                      fontWeight={500}
                      opacity={0}
                    >
                      {b.labelText}
                    </text>
                    {b.hasConn && (
                      <line
                        ref={(el) => {
                          wRefs.current[i] = wRefs.current[i] ?? { rect: null, label: null, conn: null };
                          wRefs.current[i].conn = el;
                        }}
                        x1={b.x + b.width}
                        x2={b.x + W_SLOT}
                        y1={b.connY}
                        y2={b.connY}
                        stroke={COLOR_CONNECTOR}
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        opacity={0}
                      />
                    )}
                    <text
                      x={b.x + b.width / 2}
                      y={W_B + 22}
                      fontSize={13}
                      fill={b.isTotal ? COLOR_TOTAL : COLOR_AXIS}
                      textAnchor="middle"
                      fontWeight={b.isTotal ? 500 : 400}
                    >
                      {b.axisLabel}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            style={{ opacity: 0 }}
            className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-200 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-navy-800">Entradas (+) e saídas (−)</h3>
                <div className="flex flex-wrap gap-3 text-[11px] text-navy-600">
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_ENTRADAS }} />
                    Entradas
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_SAIDAS }} />
                    Saídas
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[11px] text-navy-600">Entradas no período</span>
                <b ref={(el) => { statEntradasRef.current = el; }} className="font-display text-2xl text-navy-800">
                  R$ 0 mi
                </b>
              </div>
            </div>

            <div className="rounded-field border border-base-300 bg-base-100 p-3">
              <svg
                viewBox="0 0 640 310"
                role="img"
                aria-label="Gráfico de entradas e saídas mensais"
                className="block h-auto w-full overflow-visible"
              >
                {divergentGrid.map((v) => (
                  <g key={v}>
                    <line
                      x1={D_L}
                      x2={D_R}
                      y1={divergentY(v)}
                      y2={divergentY(v)}
                      stroke={v === 0 ? COLOR_GRID_ZERO : COLOR_GRID}
                      strokeWidth={1}
                    />
                    <text x={D_L - 8} y={divergentY(v) + 4.5} fontSize={13} fill={COLOR_AXIS} textAnchor="end">
                      {v > 0 ? `+${v}` : v < 0 ? `−${-v}` : 0}
                    </text>
                  </g>
                ))}
                {divergentBars.map((b, i) => (
                  <g key={i}>
                    <rect
                      ref={(el) => {
                        dRefs.current[i] = dRefs.current[i] ?? { up: null, down: null, dot: null };
                        dRefs.current[i].up = el;
                      }}
                      x={b.x}
                      width={D_BW}
                      y={D_MID}
                      height={0}
                      rx={1.5}
                      fill={COLOR_ENTRADAS}
                    >
                      <title>{`${MESES[i]} — entradas: ${b.entradas} mil`}</title>
                    </rect>
                    <rect
                      ref={(el) => {
                        dRefs.current[i] = dRefs.current[i] ?? { up: null, down: null, dot: null };
                        dRefs.current[i].down = el;
                      }}
                      x={b.x}
                      width={D_BW}
                      y={D_MID}
                      height={0}
                      rx={1.5}
                      fill={COLOR_SAIDAS}
                    >
                      <title>{`${MESES[i]} — saídas: ${b.saidas} mil`}</title>
                    </rect>
                    <circle
                      ref={(el) => {
                        dRefs.current[i] = dRefs.current[i] ?? { up: null, down: null, dot: null };
                        dRefs.current[i].dot = el;
                      }}
                      cx={b.x + D_BW / 2}
                      cy={b.dotY}
                      r={4}
                      fill="#fff"
                      stroke={COLOR_TOTAL}
                      strokeWidth={2}
                      opacity={0}
                    />
                    <text x={b.x + D_BW / 2} y={D_B + 22} fontSize={13} fill={COLOR_AXIS} textAnchor="middle">
                      {b.axisLabel}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
