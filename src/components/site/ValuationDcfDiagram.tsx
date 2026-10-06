"use client";

import { useEffect, useRef } from "react";

const NAVY = "#0a3f68";
const BLUE = "#3d84c6";
const DEEP = "#134a72";
const ORANGE = "#cb5f08";
const RED = "#c33628";
const MUTED = "#8a95a3";
const GRID = "#e1e6ef";

const ANOS = ["2026", "2027", "2028", "2029", "2030"];
const FCL = [6.2, 7.1, 8.0, 8.8, 9.5];
const WACC = 0.13;
const G = 0.04;
const DIVIDA = 12.4;
const FAIXA = "R$ 68–81 mi";

interface Step {
  t: number;
  n: string;
  h: string;
  p: string;
}

const STEPS: Step[] = [
  { t: 0, n: "Projeção", h: "Projetamos o caixa dos próximos 5 anos", p: "Partimos do plano da empresa para estimar o fluxo de caixa livre ano a ano." },
  { t: 3.4, n: "Desconto", h: "Trazemos cada ano a valor presente", p: "O dinheiro do futuro vale menos hoje: cada fluxo é descontado pelo custo de capital (WACC)." },
  { t: 6.2, n: "Valor da empresa", h: "Somamos fluxos e perpetuidade", p: "Fluxos descontados + valor terminal formam o valor total da operação." },
  { t: 11.0, n: "Valor do acionista", h: "Chegamos ao valor justo do negócio", p: "Descontada a dívida líquida, encontramos quanto a empresa vale para o acionista." },
];

const PV = FCL.map((v, i) => v / Math.pow(1 + WACC, i + 1));
const TV = (FCL[FCL.length - 1] * (1 + G)) / (WACC - G);
const PVTV = TV / Math.pow(1 + WACC, FCL.length);
const SUMPV = PV.reduce((a, b) => a + b, 0);
const EV = SUMPV + PVTV;
const EQ = EV - DIVIDA;

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const seg = (t: number, a: number, d: number) => clamp((t - a) / d);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const br = (v: number, d = 1) => v.toFixed(d).replace(".", ",");
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16));
const mix = (a: string, b: string, k: number) => {
  const x = hex(a);
  const y = hex(b);
  return "#" + x.map((v, i) => ("0" + Math.round(lerp(v, y[i], k)).toString(16)).slice(-2)).join("");
};

interface Layout {
  W: number;
  H: number;
  base: number;
  c0: number;
  c1: number;
  bw: number;
  tx: number;
  tw: number;
  tb: number;
  maxBar: number;
  towerH: number;
  lift: number;
  fs: number;
  fv: number;
  fm: number;
  fb: number;
  perp: string;
}

function layout(n: boolean): Layout {
  return n
    ? { W: 600, H: 920, base: 330, c0: 16, c1: 584, bw: 52, tx: 318, tw: 112, tb: 870, maxBar: 220, towerH: 400, lift: 40, fs: 22, fv: 22, fm: 24, fb: 58, perp: "Perpet." }
    : { W: 1100, H: 560, base: 470, c0: 20, c1: 700, bw: 66, tx: 820, tw: 120, tb: 470, maxBar: 270, towerH: 390, lift: 70, fs: 16, fv: 17, fm: 17, fb: 44, perp: "Perpetuidade" };
}

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number>,
  parent: SVGElement,
): SVGElementTagNameMap[K] {
  const e = document.createElementNS(SVG_NS, tag) as SVGElementTagNameMap[K];
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  parent.appendChild(e);
  return e;
}

function setAttrs(e: SVGElement, attrs: Record<string, string | number>) {
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
}

interface ColEntry {
  ghost: SVGRectElement;
  bar: SVGRectElement;
  val: SVGTextElement;
  fac: SVGTextElement;
}

interface Scene {
  cols: ColEntry[];
  cx: (i: number) => number;
  wacc: SVGGElement;
  zoomTag: SVGTextElement;
  tv: SVGRectElement;
  tvVal: SVGTextElement;
  perp: SVGTextElement;
  g: SVGTextElement;
  glow: SVGRectElement;
  debt: SVGRectElement;
  debtLbl: SVGGElement;
  debtL1: SVGTextElement;
  debtL2: SVGTextElement;
  evG: SVGGElement;
  evTick: SVGLineElement;
  evTxt: SVGTextElement;
  eqG: SVGGElement;
  eqTick: SVGLineElement;
  eqL1: SVGTextElement;
  eqL2: SVGTextElement;
  eqL3: SVGTextElement;
}

export function ValuationDcfDiagram() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const capRef = useRef<HTMLParagraphElement | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const titleEl = titleRef.current;
    const capEl = capRef.current;
    const stepsEl = stepsRef.current;
    const stage = stageRef.current;
    if (!root || !titleEl || !capEl || !stepsEl || !stage) return;

    let raf: number | null = null;
    let start: number | null = null;
    let visible = false;
    let lastT = -1;
    let narrow: boolean | null = null;
    let svg: SVGSVGElement;
    let E: Scene;
    let Lc: Layout;
    let curStep = -1;
    const createdButtons: HTMLButtonElement[] = [];

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const SPEED = 0.6;
    const IDLE = true;
    const T_END = 14.5;

    function seek(t: number) {
      start = performance.now() - (t / SPEED) * 1000;
      if (reduce) {
        frame(t);
        return;
      }
      if (visible && !raf) raf = requestAnimationFrame(loop);
    }

    const btns = STEPS.map((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.style.cssText =
        "display:flex;align-items:center;gap:8px;font:500 13px/1 inherit;padding:8px 14px 8px 8px;border-radius:999px;border:1px solid #dde3ea;background:#fff;color:#4a5563;cursor:pointer;transition:background .3s,border-color .3s,color .3s";
      const badge = document.createElement("i");
      badge.style.cssText =
        "font-style:normal;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:11px;background:#eef1f5;color:" +
        NAVY +
        ";transition:background .3s,color .3s";
      badge.textContent = String(i + 1);
      b.appendChild(badge);
      b.appendChild(document.createTextNode(s.n));
      b.addEventListener("mouseenter", () => {
        if (!b.classList.contains("is-on")) b.style.borderColor = NAVY;
      });
      b.addEventListener("mouseleave", () => {
        if (!b.classList.contains("is-on")) b.style.borderColor = "#dde3ea";
      });
      b.addEventListener("click", () => seek(s.t + (i ? 0.01 : 0)));
      stepsEl.appendChild(b);
      createdButtons.push(b);
      return { btn: b, badge };
    });

    function setStep(i: number) {
      btns.forEach((b, k) => {
        const on = k === i;
        const done = k < i;
        b.btn.classList.toggle("is-on", on);
        b.btn.style.borderColor = on ? NAVY : "#dde3ea";
        b.btn.style.color = on ? NAVY : "#4a5563";
        b.btn.style.background = on ? "#f4f6f9" : "#fff";
        b.badge.style.background = on ? NAVY : done ? ORANGE : "#eef1f5";
        b.badge.style.color = on || done ? "#fff" : NAVY;
      });
    }

    function build() {
      const L = (Lc = layout(!!narrow));
      stage.innerHTML = "";
      svg = document.createElementNS(SVG_NS, "svg");
      setAttrs(svg, {
        viewBox: `0 0 ${L.W} ${L.H}`,
        role: "img",
        "aria-label": `Valuation por fluxo de caixa descontado: valor do acionista R$ ${br(EQ)} milhões`,
      });
      svg.style.cssText = "width:100%;height:auto;display:block;overflow:visible";
      stage.appendChild(svg);
      const step = (L.c1 - L.c0) / 6;
      const cx = (i: number) => L.c0 + step * (i + 0.5);

      svgEl("line", { x1: L.c0, y1: L.base, x2: L.c1, y2: L.base, stroke: GRID, "stroke-width": 2 }, svg);
      svgEl("line", { x1: L.tx - 30, y1: L.tb, x2: L.tx + L.tw + 30, y2: L.tb, stroke: GRID, "stroke-width": 2 }, svg);

      const wacc = svgEl("g", { opacity: 0 }, svg);
      svgEl("rect", { x: L.c0, y: narrow ? 14 : 18, width: narrow ? 250 : 200, height: narrow ? 46 : 38, rx: narrow ? 23 : 19, fill: "#fbefe6" }, wacc);
      svgEl("circle", { cx: L.c0 + (narrow ? 24 : 20), cy: narrow ? 37 : 37, r: narrow ? 6 : 5, fill: ORANGE }, wacc);
      const wt = svgEl("text", { x: L.c0 + (narrow ? 40 : 34), y: narrow ? 45 : 43, "font-size": L.fs, "font-weight": 600, fill: "#a14e1e" }, wacc);
      wt.textContent = `WACC ${br(WACC * 100, 0)}% a.a.`;
      const zoomTag = svgEl("text", { x: L.c1, y: narrow ? 45 : 43, "font-size": L.fs - 2, fill: MUTED, "text-anchor": "end", opacity: 0 }, svg);
      zoomTag.textContent = "escala ampliada";

      const cols: ColEntry[] = ANOS.map((a, i) => {
        const ghost = svgEl("rect", { x: cx(i) - L.bw / 2, width: L.bw, rx: 4, fill: "none", stroke: NAVY, "stroke-width": 1.5, "stroke-dasharray": "5 5", opacity: 0 }, svg);
        const bar = svgEl("rect", { rx: 4, fill: NAVY }, svg);
        const val = svgEl("text", { "font-size": L.fv, "font-weight": 600, "text-anchor": "middle", fill: NAVY, opacity: 0 }, svg);
        const yl = svgEl("text", { x: cx(i), y: L.base + (narrow ? 34 : 28), "font-size": L.fs, "text-anchor": "middle", fill: MUTED }, svg);
        yl.textContent = a;
        const fac = svgEl("text", { x: cx(i), y: L.base + (narrow ? 64 : 52), "font-size": L.fs - 2, "text-anchor": "middle", fill: ORANGE, opacity: 0 }, svg);
        fac.textContent = "÷ " + br(Math.pow(1 + WACC, i + 1), 2);
        return { ghost, bar, val, fac };
      });

      const tv = svgEl("rect", { rx: 4, fill: DEEP }, svg);
      const tvVal = svgEl("text", { "font-size": L.fv, "font-weight": 600, "text-anchor": "middle", fill: DEEP, opacity: 0 }, svg);
      const perp = svgEl("text", { x: cx(5), y: L.base + (narrow ? 34 : 28), "font-size": L.fs, "text-anchor": "middle", fill: MUTED, opacity: 0 }, svg);
      perp.textContent = L.perp;
      const g = svgEl("text", { x: cx(5), y: L.base + (narrow ? 64 : 52), "font-size": L.fs - 2, "text-anchor": "middle", fill: ORANGE, opacity: 0 }, svg);
      g.textContent = "g = " + br(G * 100, 0) + "%";

      const glow = svgEl("rect", { x: L.tx - 8, width: L.tw + 16, rx: 10, fill: ORANGE, opacity: 0 }, svg);
      const debt = svgEl("rect", { width: L.tw, rx: 4, fill: RED, opacity: 0 }, svg);
      const debtLbl = svgEl("g", { opacity: 0 }, svg);
      const debtL1 = svgEl("text", { "font-size": L.fs - 1, "text-anchor": "middle", fill: RED }, debtLbl);
      debtL1.textContent = "(–) Dívida líquida";
      const debtL2 = svgEl("text", { "font-size": L.fm, "font-weight": 600, "text-anchor": "middle", fill: RED }, debtLbl);
      debtL2.textContent = "R$ " + br(DIVIDA) + " mi";

      const evG = svgEl("g", { opacity: 0 }, svg);
      const evTick = svgEl("line", { x1: L.tx - 18, x2: L.tx - 4, stroke: NAVY, "stroke-width": 2 }, evG);
      const evTxt = svgEl("text", { x: L.tx - 26, "font-size": L.fs, "text-anchor": "end", fill: NAVY, "dominant-baseline": "middle" }, evG);

      const eqG = svgEl("g", { opacity: 0 }, svg);
      const eqTick = svgEl("line", { x1: L.tx - 18, x2: L.tx - 4, stroke: ORANGE, "stroke-width": 2.5 }, eqG);
      const eqL1 = svgEl("text", { x: L.tx - 26, "font-size": L.fs, "font-weight": 500, "text-anchor": "end", fill: ORANGE, "letter-spacing": "0.06em" }, eqG);
      eqL1.textContent = "VALOR DO ACIONISTA";
      const eqL2 = svgEl("text", { x: L.tx - 26, "font-size": L.fb, "font-weight": 600, "text-anchor": "end", fill: NAVY, "letter-spacing": "-0.02em" }, eqG);
      const eqL3 = svgEl("text", { x: L.tx - 26, "font-size": L.fs - 1, "text-anchor": "end", fill: MUTED }, eqG);
      eqL3.textContent = "Faixa de sensibilidade: " + FAIXA;

      E = { cols, cx, wacc, zoomTag, tv, tvVal, perp, g, glow, debt, debtLbl, debtL1, debtL2, evG, evTick, evTxt, eqG, eqTick, eqL1, eqL2, eqL3 };
    }

    function frame(t: number) {
      const L = Lc;
      const cx = E.cx;
      let st = 0;
      STEPS.forEach((s, i) => {
        if (t >= s.t) st = i;
      });
      if (st !== curStep) {
        curStep = st;
        titleEl!.textContent = STEPS[st].h;
        capEl!.textContent = STEPS[st].p;
        setStep(st);
      }

      const sZ = L.maxBar / Math.max(...FCL);
      const s1 = L.towerH / EV;
      const zk = inOut(seg(t, 6.2, 1.3));
      const s = lerp(sZ, s1, zk);
      const ek = ease(seg(t, 12.0, 0.9));
      setAttrs(E.wacc, { opacity: seg(t, 3.4, 0.5) });
      setAttrs(E.zoomTag, { opacity: 0.9 * seg(t, 0.3, 0.5) * (1 - seg(t, 6.2, 0.5)) });

      let below = 0;
      ANOS.forEach((_, i) => {
        const c = E.cols[i];
        const gk = ease(seg(t, 0.3 + i * 0.3, 0.8));
        const dk = ease(seg(t, 3.8 + i * 0.25, 0.9));
        const v = lerp(FCL[i], PV[i], dk);
        const h = v * gk * s;
        const fk = inOut(seg(t, 8.2 + i * 0.3, 0.9));
        const x = lerp(cx(i) - L.bw / 2, L.tx, fk);
        const w = lerp(L.bw, L.tw, fk);
        const yb = lerp(L.base, L.tb - below * s1, fk) - Math.sin(Math.PI * fk) * L.lift;
        setAttrs(c.bar, { x, y: yb - h, width: w, height: Math.max(0, h), fill: mix(mix(NAVY, BLUE, dk), ORANGE, ek), opacity: gk > 0 ? 1 : 0 });
        setAttrs(c.ghost, { y: L.base - FCL[i] * s, height: FCL[i] * s, opacity: 0.55 * seg(t, 3.8 + i * 0.25, 0.2) * (1 - seg(t, 6.2, 0.5)) });
        setAttrs(c.val, { x: x + w / 2, y: yb - h - 10, opacity: seg(t, 0.5 + i * 0.3, 0.4) * (1 - seg(t, 8.0, 0.3)), fill: dk > 0.5 ? BLUE : NAVY });
        c.val.textContent = br(v * gk);
        setAttrs(c.fac, { opacity: seg(t, 3.6 + i * 0.25, 0.4) * (1 - seg(t, 8.0, 0.4)) });
        below += PV[i];
      });

      const tk = ease(seg(t, 7.2, 0.9));
      const tf = inOut(seg(t, 9.8, 1.0));
      const th = PVTV * s1 * tk;
      const tx = lerp(cx(5) - L.bw / 2, L.tx, tf);
      const tw = lerp(L.bw, L.tw, tf);
      const tyb = lerp(L.base, L.tb - SUMPV * s1, tf) - Math.sin(Math.PI * tf) * L.lift;
      setAttrs(E.tv, { x: tx, y: tyb - th, width: tw, height: Math.max(0, th), fill: mix(DEEP, ORANGE, ek), opacity: tk > 0 ? 1 : 0 });
      setAttrs(E.tvVal, { x: tx + tw / 2, y: tyb - th - 10, opacity: seg(t, 7.4, 0.4) * (1 - seg(t, 9.6, 0.3)) });
      E.tvVal.textContent = br(PVTV * tk);
      setAttrs(E.perp, { opacity: seg(t, 6.6, 0.5) });
      setAttrs(E.g, { opacity: seg(t, 6.9, 0.5) * (1 - seg(t, 9.6, 0.4)) });

      const evTop = L.tb - EV * s1;
      const eqTop = L.tb - EQ * s1;
      const dh = DIVIDA * s1;
      const rk = ease(seg(t, 11.0, 0.6));
      const dfk = inOut(seg(t, 11.7, 1.1));
      setAttrs(E.debt, { x: L.tx + (L.tw + 24) * dfk, y: evTop + 10 * dfk, height: dh * rk, opacity: rk * (1 - 0.45 * dfk) });
      setAttrs(E.debtLbl, { opacity: seg(t, 12.2, 0.5) });
      const dcx = L.tx + L.tw + 24 + L.tw / 2;
      setAttrs(E.debtL1, { x: dcx, y: evTop - (narrow ? 40 : 34) });
      setAttrs(E.debtL2, { x: dcx, y: evTop - (narrow ? 12 : 10) });

      let evShown = 0;
      ANOS.forEach((_, i) => {
        evShown += PV[i] * inOut(seg(t, 8.2 + i * 0.3, 0.9));
      });
      evShown += PVTV * tf;
      setAttrs(E.evG, { opacity: seg(t, 10.8, 0.4) * (1 - 0.45 * ek) });
      const evY = L.tb - evShown * s1;
      setAttrs(E.evTick, { y1: evY, y2: evY });
      setAttrs(E.evTxt, { y: evY });
      E.evTxt.textContent = "Valor da empresa  R$ " + br(evShown) + " mi";

      setAttrs(E.eqG, { opacity: ek });
      setAttrs(E.eqTick, { y1: eqTop, y2: eqTop });
      const g0 = eqTop + (narrow ? 34 : 26);
      setAttrs(E.eqL1, { y: g0 });
      setAttrs(E.eqL2, { y: g0 + L.fb + (narrow ? 8 : 4) });
      setAttrs(E.eqL3, { y: g0 + L.fb + (narrow ? 46 : 32) });
      E.eqL2.textContent = "R$ " + br(EQ * ease(seg(t, 12.2, 1.6))) + " mi";

      const pulse = IDLE ? ((Math.sin(t * 2.2) + 1) / 2) * ease(seg(t, 14, 1)) : 0;
      setAttrs(E.glow, { y: eqTop - 8, height: EQ * s1 + 8, opacity: 0.06 + 0.1 * pulse * ek });
      E.glow.style.opacity = ek ? "" : "0";
    }

    function loop(now: number) {
      raf = null;
      if (!visible) return;
      const t = reduce ? T_END + 1 : ((now - (start ?? now)) / 1000) * SPEED;
      lastT = t;
      frame(t);
      if (!reduce && (IDLE || t < T_END)) raf = requestAnimationFrame(loop);
    }

    function check() {
      const n = stage!.clientWidth < 700 || root!.clientWidth < 760;
      if (n !== narrow) {
        narrow = n;
        curStep = -1;
        build();
        frame(lastT);
      }
    }

    const resizeObserver = new ResizeObserver(check);
    resizeObserver.observe(root);
    check();

    const intersectionObserver = new IntersectionObserver(
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
    intersectionObserver.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      createdButtons.forEach((b) => b.remove());
      stage.innerHTML = "";
    };
  }, []);

  return (
    <section ref={rootRef} className="pt-2 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-[1200px] rounded-box border border-base-300 bg-base-100 p-7 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex min-h-[7.4rem] max-w-[560px] flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-ember-600">
                VALUATION · FLUXO DE CAIXA DESCONTADO
              </span>
              <h3 ref={titleRef} className="font-display text-[22px] font-medium leading-tight text-navy-800 sm:text-[28px]" />
              <p ref={capRef} className="text-[15px] leading-relaxed text-navy-600" />
            </div>
            <div ref={stepsRef} className="flex flex-wrap gap-1.5" />
          </div>
          <div ref={stageRef} className="mt-2" />
        </div>
      </div>
    </section>
  );
}
