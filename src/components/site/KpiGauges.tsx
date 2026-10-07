"use client";

import { useEffect, useMemo, useRef } from "react";
import type { KpiGaugeItem } from "@/types/kpi-gauge";

const DEFAULT_ITEMS: KpiGaugeItem[] = [
  { label: "Eficiência operacional", sub: "Produtividade da operação", value: 92, min: 0, max: 100, minLabel: "0%", maxLabel: "100%" },
  { label: "Metas atingidas", sub: "Objetivos do ciclo", value: 87, min: 50, max: 100, minLabel: "50%", maxLabel: "100%" },
  { label: "Performance", sub: "Desempenho geral vs. ano anterior", value: 24, min: 0, max: 40, prefix: "+", minLabel: "0", maxLabel: "+40%" },
  { label: "Redução de custos", sub: "Otimização de despesas", value: 18, min: 0, max: 40, minLabel: "0%", maxLabel: "40%" },
  { label: "Crescimento", sub: "Expansão anual da receita", value: 32, min: 0, max: 40, prefix: "+", minLabel: "0", maxLabel: "+40%" },
];

const CX = 100;
const CY = 100;
const R = 76;

function clamp(x: number) {
  return Math.max(0, Math.min(1, x));
}

function ease(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function seg(t: number, a: number, d: number) {
  return clamp((t - a) / d);
}

function pointAt(fraction: number, radius: number) {
  const angle = Math.PI * (1 - fraction);
  return [CX + radius * Math.cos(angle), CY - radius * Math.sin(angle)] as const;
}

function arcPath(f1: number, f2: number) {
  const [ax, ay] = pointAt(f1, R);
  const [bx, by] = pointAt(f2, R);
  return `M ${ax.toFixed(2)} ${ay.toFixed(2)} A ${R} ${R} 0 0 1 ${bx.toFixed(2)} ${by.toFixed(2)}`;
}

const ZONES: Array<[number, number, string]> = [
  [0, 0.395, "#c33628"],
  [0.405, 0.695, "#fcbc45"],
  [0.705, 1, "#1f8a5b"],
];

type Status = "below" | "evolving" | "above";

function statusFor(fraction: number): Status {
  if (fraction >= 0.7) return "above";
  if (fraction >= 0.4) return "evolving";
  return "below";
}

const STATUS_LABEL: Record<Status, string> = {
  above: "Acima da meta",
  evolving: "Em evolução",
  below: "Abaixo da meta",
};

const STATUS_COLOR: Record<Status, { bg: string; ink: string; dot: string }> = {
  above: { bg: "#eaf4ed", ink: "#1f6b44", dot: "#1f8a5b" },
  evolving: { bg: "#fdf3dc", ink: "#8a6414", dot: "#fcbc45" },
  below: { bg: "#f8e4e1", ink: "#8a2a20", dot: "#c33628" },
};

type CardRefs = {
  needle: SVGGElement | null;
  zones: (SVGPathElement | null)[];
  ticks: SVGGElement | null;
  num: HTMLDivElement | null;
  pill: HTMLDivElement | null;
  card: HTMLDivElement | null;
};

export function KpiGauges({
  eyebrow = "KPI'S",
  title = "Resultados que podem ser medidos",
  lede = "Transformamos dados em indicadores claros para acompanhar a performance, identificar oportunidades e tomar decisões mais assertivas.",
  items = DEFAULT_ITEMS,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  items?: KpiGaugeItem[];
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<CardRefs[]>([]);

  const computed = useMemo(
    () =>
      items.map((item) => {
        const target = clamp((item.value - item.min) / (item.max - item.min));
        return { ...item, target, status: statusFor(target) };
      }),
    [items],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let raf: number | null = null;
    let start: number | null = null;
    let visible = false;

    const headStart = 0;
    const cardAt = (i: number) => 0.9 + i * 0.6;

    function frame(t: number) {
      if (headRef.current) {
        const a = ease(seg(t, headStart, 0.8));
        headRef.current.style.opacity = String(a);
        headRef.current.style.transform = `translateY(${(1 - a) * 14}px)`;
      }

      computed.forEach((item, i) => {
        const r = refs.current[i];
        if (!r) return;
        const at = cardAt(i);
        const a = ease(seg(t, at, 0.6));
        if (r.card) {
          r.card.style.opacity = String(a);
          r.card.style.transform = `translateY(${(1 - a) * 18}px) scale(${0.97 + 0.03 * a})`;
        }
        r.zones.forEach((zone, j) => {
          zone?.setAttribute("opacity", String(ease(seg(t, at + 0.1 + j * 0.12, 0.4))));
        });
        r.ticks?.setAttribute("opacity", String(a * 0.8));

        const s = Math.max(0, t - (at + 0.3));
        const spring = t < at + 0.3 ? 0 : 1 - Math.exp(-3.6 * s) * Math.cos(6.5 * s);
        const idle = ease(seg(t, at + 2.4, 1.5));
        const v = clamp(
          item.target * spring + Math.sin(t * 1.9 + i * 1.7) * 0.006 * idle + Math.sin(t * 5.3 + i) * 0.002 * idle,
        );
        if (r.needle) {
          r.needle.setAttribute("transform", `translate(100 100) rotate(${(-90 + 180 * v).toFixed(2)})`);
        }
        if (r.num) {
          const shown = Math.round(item.value * ease(seg(t, at + 0.3, 1.4)));
          r.num.textContent = `${item.prefix ?? ""}${shown}%`;
        }
        if (r.pill) {
          r.pill.style.opacity = String(ease(seg(t, at + 1.2, 0.5)));
        }
      });
    }

    function loop(now: number) {
      raf = null;
      if (!visible) return;
      const t = reduce ? 60 : (((now - (start ?? now)) / 1000) * 0.6);
      frame(t);
      if (!reduce) raf = requestAnimationFrame(loop);
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
  }, [computed]);

  return (
    <section ref={rootRef} className="pt-2 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {computed.map((item, i) => {
            const statusColors = STATUS_COLOR[item.status];
            return (
              <div
                key={item.label}
                ref={(el) => {
                  refs.current[i] = refs.current[i] ?? { needle: null, zones: [], ticks: null, num: null, pill: null, card: null };
                  refs.current[i].card = el;
                }}
                style={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 rounded-box border border-base-300 bg-base-200 p-5"
              >
                <div className="flex w-full items-baseline justify-between text-sm font-medium text-navy-800">
                  <span>{item.label}</span>
                  <em className="font-mono text-[11px] font-normal tracking-[0.12em] text-accent not-italic">
                    {String(i + 1).padStart(2, "0")}
                  </em>
                </div>

                <div className="w-full max-w-[220px] rounded-field border border-base-300 bg-base-100 px-2.5 pt-3 pb-1.5">
                  <svg viewBox="0 0 200 116" aria-hidden="true" className="block w-full overflow-visible">
                    <path d={arcPath(0, 1)} fill="none" stroke="#e1e6ef" strokeWidth={16} />
                    {ZONES.map((z, j) => (
                      <path
                        key={j}
                        ref={(el) => {
                          refs.current[i] = refs.current[i] ?? { needle: null, zones: [], ticks: null, num: null, pill: null, card: null };
                          refs.current[i].zones[j] = el;
                        }}
                        d={arcPath(z[0], z[1])}
                        fill="none"
                        stroke={z[2]}
                        strokeWidth={14}
                        opacity={0}
                      />
                    ))}
                    <g
                      ref={(el) => {
                        refs.current[i] = refs.current[i] ?? { needle: null, zones: [], ticks: null, num: null, pill: null, card: null };
                        refs.current[i].ticks = el;
                      }}
                      opacity={0}
                    >
                      {Array.from({ length: 21 }, (_, k) => {
                        const major = k % 5 === 0;
                        const [ax, ay] = pointAt(k / 20, major ? 56 : 59);
                        const [bx, by] = pointAt(k / 20, 64);
                        return (
                          <line
                            key={k}
                            x1={ax.toFixed(2)}
                            y1={ay.toFixed(2)}
                            x2={bx.toFixed(2)}
                            y2={by.toFixed(2)}
                            stroke="#8a95a3"
                            strokeWidth={major ? 1.6 : 0.9}
                            strokeLinecap="round"
                          />
                        );
                      })}
                    </g>
                    <g
                      ref={(el) => {
                        refs.current[i] = refs.current[i] ?? { needle: null, zones: [], ticks: null, num: null, pill: null, card: null };
                        refs.current[i].needle = el;
                      }}
                      transform="translate(100 100) rotate(-90)"
                    >
                      <path d="M-4.5 6 L-1.4 -66 Q0 -70 1.4 -66 L4.5 6 Z" fill="#0a3f68" />
                    </g>
                    <circle cx={100} cy={100} r={9} fill="#0a3f68" />
                    <circle cx={100} cy={100} r={3.2} fill="#fff" />
                  </svg>
                  <div className="flex justify-between px-1.5 pt-0.5 text-[10px] text-navy-600">
                    <span>{item.minLabel}</span>
                    <span>{item.maxLabel}</span>
                  </div>
                </div>

                <div
                  ref={(el) => {
                    refs.current[i] = refs.current[i] ?? { needle: null, zones: [], ticks: null, num: null, pill: null, card: null };
                    refs.current[i].num = el;
                  }}
                  className="font-display text-[34px] leading-none tracking-tight text-navy-800"
                >
                  {item.prefix ?? ""}0%
                </div>

                <div
                  ref={(el) => {
                    refs.current[i] = refs.current[i] ?? { needle: null, zones: [], ticks: null, num: null, pill: null, card: null };
                    refs.current[i].pill = el;
                  }}
                  style={{ opacity: 0, background: statusColors.bg, color: statusColors.ink }}
                  className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                >
                  <i className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: statusColors.dot }} />
                  <span>{STATUS_LABEL[item.status]}</span>
                </div>

                <span className="text-center text-xs text-navy-600">{item.sub}</span>
              </div>
            );
          })}
        </div>

        <div ref={headRef} style={{ opacity: 0 }} className="mt-8 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">{eyebrow}</p>
          <h2 className="font-display text-xl text-navy-800">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-600">{lede}</p>
        </div>
      </div>
    </section>
  );
}
