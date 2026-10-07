"use client";

import { useEffect, useRef } from "react";

const NAVY = "#0a3f68";
const ORANGE = "#cb5f08";
const GRAY = "#9aa8b8";

const CENTER = ["xP&A", "Finanças"];
const WORDS = ["Previsão", "Planejamento", "Orçamento", "Análise", "Modelagem"];

const ICONS = {
  truck:
    "M2 6h11v10H2z M13 9h4.5L21 12.5V16h-8 M4.7 18.5a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0 -3.6 0 M15.2 18.5a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0 -3.6 0",
  people:
    "M5 8a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M14 9a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5 M14 14.3c.8-.2 1.6-.3 2.5-.3 2.8 0 5 1.8 5 5",
  mega: "M3 10v4h3l7 4V6L6 10H3z M6 14l1.5 5h2.5l-1.2-4 M16.5 9.5a3.5 3.5 0 0 1 0 5 M19 7a7 7 0 0 1 0 10",
  chart: "M4 20h17 M6 20v-5 M10 20v-8 M14 20v-6 M18 20v-10 M5 11l4.5-4 3.5 3 6-6 M15.5 4H19v3.5",
  server: "M4 3.5h16v5H4z M4 9.5h16v5H4z M4 15.5h16v5H4z M7 6h.01 M7 12h.01 M7 18h.01 M11 6h6 M11 12h6 M11 18h6",
} as const;

type IconKey = keyof typeof ICONS;

const AREAS: { label: string; icon: IconKey }[] = [
  { label: "S&OP", icon: "truck" },
  { label: "RH", icon: "people" },
  { label: "Marketing", icon: "mega" },
  { label: "Vendas", icon: "chart" },
  { label: "TI", icon: "server" },
];

const CX = 360;
const CY = 330;
const RO = 230;
const ANG = [-90, -18, 54, 126, 198];

function clamp(x: number) {
  return Math.max(0, Math.min(1, x));
}
function ease(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function seg(t: number, a: number, d: number) {
  return clamp((t - a) / d);
}
function spring(t: number, a: number) {
  const s = t - a;
  return s <= 0 ? 0 : 1 - Math.exp(-5.5 * s) * Math.cos(8 * s);
}
function rad(a: number) {
  return (a * Math.PI) / 180;
}
function pt(a: number, r: number): [number, number] {
  return [CX + r * Math.cos(rad(a)), CY + r * Math.sin(rad(a))];
}
function f(n: number) {
  return n.toFixed(2);
}
function arcD(a1: number, a2: number, r: number, ccw?: boolean) {
  const p = pt(a1, r);
  const q = pt(a2, r);
  return `M${f(p[0])} ${f(p[1])} A${r} ${r} 0 0 ${ccw ? 0 : 1} ${f(q[0])} ${f(q[1])}`;
}
function chevron(a: number, r: number, size: number) {
  const p = pt(a, r);
  const T = [-Math.sin(rad(a)), Math.cos(rad(a))];
  const N = [Math.cos(rad(a)), Math.sin(rad(a))];
  const b = [p[0] - T[0] * size, p[1] - T[1] * size];
  const w = size * 0.65;
  return `M${f(b[0] + N[0] * w)} ${f(b[1] + N[1] * w)} L${f(p[0])} ${f(p[1])} L${f(b[0] - N[0] * w)} ${f(b[1] - N[1] * w)}`;
}

const outerArcsStatic = ANG.map((a, i) => {
  const a2 = (i === ANG.length - 1 ? ANG[0] + 360 : ANG[i + 1]) - 17;
  return { d: arcD(a + 17, a2, RO), chevronD: chevron(a2, RO, 11) };
});

const nodePositions = ANG.map((a) => pt(a, RO));

const wordPaths = WORDS.map((_, i) => {
  const a = ANG[i];
  const bottom = Math.sin(rad(a)) > 0.3;
  const id = `xpaWord${i}`;
  const d = bottom ? arcD(a + 46, a - 46, 127, true) : arcD(a - 46, a + 46, 113);
  return { id, d };
});

const innerArcsStatic = ANG.map((a) => ({ d: arcD(a + 10, a + 62, 88), chevronD: chevron(a + 62, 88, 7) }));

let diskD = "";
for (let k = 0; k <= 240; k++) {
  const th = (k / 240) * 360;
  const r = 160 + 6 * Math.cos(rad(5 * (th + 90)));
  const q = pt(th, r);
  diskD += (k ? "L" : "M") + f(q[0]) + " " + f(q[1]);
}
diskD += "Z";

type ArcRefs = { path: SVGPathElement | null; chevron: SVGPathElement | null };
type NodeRefs = { group: SVGGElement | null; halo: SVGCircleElement | null };

const T_NODE = 3.0;
const STEP = 0.6;
const T_IDLE = T_NODE + STEP * (AREAS.length - 1) + 0.9;

export function XpaCicloDiagram() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const diskRef = useRef<SVGGElement | null>(null);
  const centerRef = useRef<SVGGElement | null>(null);
  const wordRefs = useRef<(SVGTextElement | null)[]>([]);
  const innerArcRefs = useRef<ArcRefs[]>([]);
  const outerArcRefs = useRef<ArcRefs[]>([]);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const nodeRefs = useRef<NodeRefs[]>([]);
  const innerGroupRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const SPEED = 0.7;
    let raf: number | null = null;
    let start: number | null = null;
    let visible = false;

    function frame(t: number) {
      const a = ease(seg(t, 0, 0.9));
      diskRef.current?.setAttribute("opacity", String(a));
      diskRef.current?.setAttribute(
        "transform",
        `rotate(${f(-25 * (1 - a))} ${CX} ${CY}) translate(${CX} ${CY}) scale(${f(0.86 + 0.14 * a)}) translate(${-CX} ${-CY})`,
      );
      centerRef.current?.setAttribute("transform", `translate(${CX} ${CY}) scale(${f(Math.max(0, spring(t, 0.5)))})`);

      wordRefs.current.forEach((w, i) => {
        w?.setAttribute("opacity", String(ease(seg(t, 1 + i * 0.22, 0.5))));
      });

      innerArcRefs.current.forEach((ia, i) => {
        ia.path?.setAttribute("stroke-dashoffset", String(1 - ease(seg(t, 2.1 + i * 0.08, 0.6))));
        ia.chevron?.setAttribute("opacity", String(0.85 * seg(t, 2.6 + i * 0.08, 0.15)));
      });

      const idle = Math.max(0, t - T_IDLE);
      innerGroupRef.current?.setAttribute("transform", `rotate(${f(idle * 6)} ${CX} ${CY})`);

      const da = -90 + idle * 30;
      const dp = pt(da, RO);
      const dOn = ease(seg(t, T_IDLE, 0.6));
      dotRef.current?.setAttribute("cx", f(dp[0]));
      dotRef.current?.setAttribute("cy", f(dp[1]));
      dotRef.current?.setAttribute("opacity", String(dOn));

      nodeRefs.current.forEach((n, i) => {
        const st = T_NODE + i * STEP;
        const s = Math.max(0, spring(t, st));
        const [nx, ny] = nodePositions[i];
        n.group?.setAttribute("transform", `translate(${f(nx)} ${f(ny)}) scale(${f(s)})`);
        const d = Math.abs((((da - ANG[i]) % 360) + 540) % 360 - 180);
        n.halo?.setAttribute("opacity", f(0.16 * Math.max(0, 1 - d / 16) * dOn));
        outerArcRefs.current[i]?.path?.setAttribute("stroke-dashoffset", String(1 - ease(seg(t, st + 0.25, 0.55))));
        outerArcRefs.current[i]?.chevron?.setAttribute("opacity", String(seg(t, st + 0.75, 0.15)));
      });
    }

    function loop(now: number) {
      raf = null;
      if (!visible) return;
      const t = reduce ? T_IDLE : ((now - (start ?? now)) / 1000) * SPEED;
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
      { threshold: 0.25 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-md">
      <svg
        viewBox="0 0 720 660"
        role="img"
        aria-label="Ciclo xP&A: Finanças integrado a S&OP, RH, Marketing, Vendas e TI"
        className="block w-full overflow-visible"
      >
        <defs>
          {wordPaths.map((w) => (
            <path key={w.id} id={w.id} d={w.d} />
          ))}
        </defs>

        {outerArcsStatic.map((arc, i) => (
          <g key={i}>
            <path
              ref={(el) => {
                outerArcRefs.current[i] = outerArcRefs.current[i] ?? { path: null, chevron: null };
                outerArcRefs.current[i].path = el;
              }}
              d={arc.d}
              fill="none"
              stroke={GRAY}
              strokeWidth={2.4}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
            <path
              ref={(el) => {
                outerArcRefs.current[i] = outerArcRefs.current[i] ?? { path: null, chevron: null };
                outerArcRefs.current[i].chevron = el;
              }}
              d={arc.chevronD}
              fill="none"
              stroke={GRAY}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0}
            />
          </g>
        ))}

        <circle ref={dotRef} r={6} fill={ORANGE} opacity={0} />

        {AREAS.map((area, i) => {
          const [nx, ny] = nodePositions[i];
          const a = ANG[i];
          const c = Math.cos(rad(a));
          const s = Math.sin(rad(a));
          const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
          return (
            <g
              key={area.label}
              ref={(el) => {
                nodeRefs.current[i] = nodeRefs.current[i] ?? { group: null, halo: null };
                nodeRefs.current[i].group = el;
              }}
              transform={`translate(${f(nx)} ${f(ny)}) scale(0)`}
            >
              <circle
                ref={(el) => {
                  nodeRefs.current[i] = nodeRefs.current[i] ?? { group: null, halo: null };
                  nodeRefs.current[i].halo = el;
                }}
                r={46}
                fill={ORANGE}
                opacity={0}
              />
              <circle r={36} fill="#fff" stroke={NAVY} strokeWidth={2} />
              <path
                d={ICONS[area.icon]}
                transform="translate(-16.8 -16.8) scale(1.4)"
                fill="none"
                stroke={NAVY}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x={f(c * 62)}
                y={f(s * 62)}
                fontSize={24}
                fontWeight={500}
                fill={NAVY}
                dominantBaseline="middle"
                textAnchor={anchor}
              >
                {area.label}
              </text>
            </g>
          );
        })}

        <g ref={diskRef} opacity={0}>
          <path d={diskD} fill={NAVY} />
          {WORDS.map((w, i) => (
            <text
              key={w}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              fontSize={20}
              fontWeight={600}
              fill="#fff"
              letterSpacing="0.04em"
              opacity={0}
            >
              <textPath href={`#${wordPaths[i].id}`} xlinkHref={`#${wordPaths[i].id}`} startOffset="50%" textAnchor="middle">
                {w}
              </textPath>
            </text>
          ))}
          <g ref={innerGroupRef}>
            {innerArcsStatic.map((arc, i) => (
              <g key={i}>
                <path
                  ref={(el) => {
                    innerArcRefs.current[i] = innerArcRefs.current[i] ?? { path: null, chevron: null };
                    innerArcRefs.current[i].path = el;
                  }}
                  d={arc.d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={0.85}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
                <path
                  ref={(el) => {
                    innerArcRefs.current[i] = innerArcRefs.current[i] ?? { path: null, chevron: null };
                    innerArcRefs.current[i].chevron = el;
                  }}
                  d={arc.chevronD}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0}
                />
              </g>
            ))}
          </g>
        </g>

        <g ref={centerRef} transform={`translate(${CX} ${CY}) scale(0)`}>
          <circle r={72} fill={ORANGE} />
          <circle r={64} fill="none" stroke="#fff" strokeWidth={1} opacity={0.3} />
          <text y={-4} fontSize={30} fontWeight={600} fill="#fff" textAnchor="middle">
            {CENTER[0]}
          </text>
          <text y={24} fontSize={19} fontWeight={500} fill="#fff" textAnchor="middle">
            {CENTER[1]}
          </text>
        </g>
      </svg>
    </div>
  );
}
