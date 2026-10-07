"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const GLB_URL = "/models/cubo-de-resultado-canaa.glb";
const SPEED = 1;
const HOLD = 4200;

const NAVY = "#0a3f68";
const ORANGE = "#cb5f08";
const RED = "#c33628";
const MUTED = "#8a95a3";

interface SplitData {
  fat: string;
  cv: string;
  mc: string;
  pct: number;
}
interface GaugeData {
  v: number;
  min: number;
  max: number;
  minL: string;
  maxL: string;
}

type ChartKind = "bars" | "split" | "gauge" | "hbars" | "line" | "donut";

interface FaceConfig {
  node: string;
  e: [number, number];
  n: string;
  tab: string;
  eyebrow: string;
  v: { pre?: string; num: number; dec: number; suf?: string };
  chip: string;
  chart: ChartKind;
  data: number[] | SplitData | GaugeData | [string, number][] | [string, number, string][];
}

const FACES: FaceConfig[] = [
  {
    node: "painel_faturamento",
    e: [0, 0],
    n: "01",
    tab: "Faturamento",
    eyebrow: "FATURAMENTO",
    v: { pre: "R$ ", num: 4.8, dec: 1, suf: " mi" },
    chip: "+12% vs. ano anterior",
    chart: "bars",
    data: [52, 58, 55, 63, 61, 68, 66, 72, 70, 78, 80, 88],
  },
  {
    node: "painel_margem",
    e: [0, -Math.PI / 2],
    n: "02",
    tab: "MC",
    eyebrow: "MARGEM DE CONTRIBUIÇÃO",
    v: { pre: "R$ ", num: 1.9, dec: 1, suf: " mi" },
    chip: "39% do faturamento",
    chart: "split",
    data: { fat: "R$ 4,8 mi", cv: "R$ 2,9 mi", mc: "R$ 1,9 mi", pct: 39 },
  },
  {
    node: "painel_custos",
    e: [0, Math.PI],
    n: "03",
    tab: "Margem",
    eyebrow: "MARGEM LÍQUIDA",
    v: { num: 14.2, dec: 1, suf: "%" },
    chip: "+2,1 p.p. vs. ano anterior",
    chart: "gauge",
    data: { v: 14.2, min: 0, max: 20, minL: "0%", maxL: "20%" },
  },
  {
    node: "painel_regioes",
    e: [0, Math.PI / 2],
    n: "04",
    tab: "MC por produto",
    eyebrow: "MC POR PRODUTO",
    v: { num: 38, dec: 0, suf: "%" },
    chip: "Produto A lidera a MC",
    chart: "hbars",
    data: [
      ["Produto A", 38],
      ["Produto B", 27],
      ["Produto C", 19],
      ["Produto D", 11],
    ],
  },
  {
    node: "painel_resultado",
    e: [Math.PI / 2, 0],
    n: "05",
    tab: "Resultado",
    eyebrow: "RESULTADO LÍQUIDO",
    v: { pre: "R$ ", num: 680, dec: 0, suf: " mil" },
    chip: "+18% vs. ano anterior",
    chart: "line",
    data: [40, 46, 43, 52, 50, 58, 55, 63, 61, 70, 74, 82],
  },
  {
    node: "painel_indicadores",
    e: [-Math.PI / 2, 0],
    n: "06",
    tab: "MC por ramo",
    eyebrow: "MC POR RAMO",
    v: { num: 40, dec: 0, suf: "%" },
    chip: "Varejo lidera a MC",
    chart: "donut",
    data: [
      ["Varejo", 40, NAVY],
      ["Indústria", 28, ORANGE],
      ["Serviços", 20, "#3d84c6"],
      ["Agro", 12, "#a9c7e4"],
    ],
  },
];

interface RuntimeFace extends FaceConfig {
  ctx: CanvasRenderingContext2D;
  tex: THREE.CanvasTexture;
  q: THREE.Quaternion;
  p: number;
  pStart: number;
}

const S = 1536;
const P = 112;
const MONTHS = "JFMAMJJASOND";

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const fmt = (v: FaceConfig["v"], p: number) => (v.pre || "") + (v.num * p).toFixed(v.dec).replace(".", ",") + (v.suf || "");

function makeCH(font: (w: number, s: number) => string) {
  const CH: Record<ChartKind, (c: CanvasRenderingContext2D, f: RuntimeFace, p: number, x0: number, y0: number, x1: number, y1: number) => void> = {
    bars(c, f, p, x0, y0, x1, y1) {
      const d = f.data as number[];
      const n = d.length;
      const gap = 22;
      const w = (x1 - x0 - gap * (n - 1)) / n;
      const base = y1 - 60;
      const H = base - y0;
      const mx = Math.max(...d);
      c.fillStyle = "#e6ebf1";
      c.fillRect(x0, base, x1 - x0, 3);
      d.forEach((v, k) => {
        const h = (v / mx) * H * ease(clamp(p * 1.5 - k * 0.04));
        const x = x0 + k * (w + gap);
        c.fillStyle = k === n - 1 ? ORANGE : NAVY;
        if (h > 1) {
          c.beginPath();
          c.roundRect(x, base - h, w, h, [12, 12, 0, 0]);
          c.fill();
        }
        c.fillStyle = MUTED;
        c.font = font(500, 36);
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.fillText(MONTHS[k], x + w / 2, y1);
        c.textAlign = "left";
      });
    },
    split(c, f, p, x0, y0, x1, y1) {
      const d = f.data as SplitData;
      const W = x1 - x0;
      const by = y0 + 90;
      const bh = 140;
      const mcW = ((W * d.pct) / 100) * ease(clamp(p * 1.3));
      c.font = font(500, 44);
      c.fillStyle = MUTED;
      c.textBaseline = "alphabetic";
      c.fillText("Custos variáveis " + (100 - d.pct) + "%", x0, by - 30);
      c.textAlign = "right";
      c.fillStyle = ORANGE;
      c.font = font(700, 44);
      c.fillText("MC " + d.pct + "%", x1, by - 30);
      c.textAlign = "left";
      c.fillStyle = "#d5dfe9";
      c.beginPath();
      c.roundRect(x0, by, W, bh, 28);
      c.fill();
      if (mcW > 2) {
        c.fillStyle = NAVY;
        c.beginPath();
        c.roundRect(x1 - mcW, by, mcW, bh, 28);
        c.fill();
      }
      const cols: [string, string, string][] = [
        ["Faturamento", d.fat, NAVY],
        ["Custos variáveis", d.cv, MUTED],
        ["MC", d.mc, ORANGE],
      ];
      const cw = W / 3;
      const sy = by + bh + 120;
      c.globalAlpha = clamp((p - 0.4) / 0.4);
      cols.forEach((col, i) => {
        const x = x0 + i * cw;
        if (i) {
          c.fillStyle = "#e1e7ee";
          c.fillRect(x - 24, sy - 50, 3, 180);
        }
        c.font = font(500, 40);
        c.fillStyle = MUTED;
        c.fillText(col[0], x, sy);
        c.font = font(700, 72);
        c.fillStyle = col[2];
        c.fillText(col[1], x, sy + 100);
      });
      c.globalAlpha = 1;
    },
    gauge(c, f, p, x0, y0, x1, y1) {
      const d = f.data as GaugeData;
      const cx = (x0 + x1) / 2;
      const cy = y1 - 70;
      const R = Math.min((x1 - x0) / 2 - 60, y1 - y0 - 130, 440);
      const lw = 76;
      c.lineWidth = lw + 14;
      c.strokeStyle = "#e9edf2";
      c.beginPath();
      c.arc(cx, cy, R, Math.PI, 2 * Math.PI);
      c.stroke();
      ([
        [0, 0.395, "#cf4b3e"],
        [0.405, 0.695, "#e8b23f"],
        [0.705, 1, "#3f9a5e"],
      ] as const).forEach((z) => {
        c.lineWidth = lw;
        c.strokeStyle = z[2];
        c.beginPath();
        c.arc(cx, cy, R, Math.PI + Math.PI * z[0], Math.PI + Math.PI * z[1]);
        c.stroke();
      });
      c.strokeStyle = "#8a95a3";
      c.lineCap = "round";
      for (let k = 0; k <= 20; k++) {
        const a = Math.PI + (Math.PI * k) / 20;
        const maj = k % 5 === 0;
        const r1 = R - lw / 2 - (maj ? 46 : 32);
        const r2 = R - lw / 2 - 14;
        c.lineWidth = maj ? 6 : 3;
        c.beginPath();
        c.moveTo(cx + r1 * Math.cos(a), cy + r1 * Math.sin(a));
        c.lineTo(cx + r2 * Math.cos(a), cy + r2 * Math.sin(a));
        c.stroke();
      }
      c.lineCap = "butt";
      const t = clamp((d.v - d.min) / (d.max - d.min));
      const s = p <= 0 ? 0 : 1 - Math.exp(-5 * p * 1.6) * Math.cos(9 * p * 1.6);
      const a = Math.PI + Math.PI * clamp(t * s);
      const L = R - 70;
      c.save();
      c.translate(cx, cy);
      c.rotate(a);
      c.fillStyle = NAVY;
      c.beginPath();
      c.moveTo(-20, -16);
      c.lineTo(L, -5);
      c.quadraticCurveTo(L + 10, 0, L, 5);
      c.lineTo(-20, 16);
      c.closePath();
      c.fill();
      c.restore();
      c.fillStyle = NAVY;
      c.beginPath();
      c.arc(cx, cy, 38, 0, 7);
      c.fill();
      c.fillStyle = "#fff";
      c.beginPath();
      c.arc(cx, cy, 13, 0, 7);
      c.fill();
      c.font = font(500, 40);
      c.fillStyle = MUTED;
      c.textAlign = "center";
      c.textBaseline = "alphabetic";
      c.fillText(d.minL, cx - R, cy + 70);
      c.fillText(d.maxL, cx + R, cy + 70);
      c.textAlign = "left";
    },
    hbars(c, f, p, x0, y0, x1, y1) {
      const d = f.data as [string, number][];
      const rh = (y1 - y0) / d.length;
      const mx = Math.max(...d.map((r) => r[1]));
      d.forEach((r, i) => {
        const y = y0 + i * rh + 60;
        const k = ease(clamp(p * 1.4 - i * 0.1));
        c.font = font(600, 50);
        c.fillStyle = NAVY;
        c.textBaseline = "alphabetic";
        c.fillText(r[0], x0, y);
        c.textAlign = "right";
        c.font = font(700, 50);
        c.fillStyle = i === 0 ? ORANGE : NAVY;
        c.fillText(Math.round(r[1] * k) + "%", x1, y);
        c.textAlign = "left";
        c.fillStyle = "#e6ebf1";
        c.beginPath();
        c.roundRect(x0, y + 26, x1 - x0, 34, 17);
        c.fill();
        const w = ((x1 - x0) * r[1] * k) / mx;
        if (w > 2) {
          c.fillStyle = i === 0 ? ORANGE : NAVY;
          c.beginPath();
          c.roundRect(x0, y + 26, w, 34, 17);
          c.fill();
        }
      });
    },
    line(c, f, p, x0, y0, x1, y1) {
      const d = f.data as number[];
      const mx = Math.max(...d) * 1.1;
      const n = d.length;
      const base = y1 - 60;
      const pts = d.map((v, i): [number, number] => [x0 + (i * (x1 - x0)) / (n - 1), base - (v / mx) * (base - y0)]);
      c.fillStyle = "#e6ebf1";
      [0, 0.5].forEach((g) => c.fillRect(x0, y0 + g * (base - y0), x1 - x0, 2));
      c.fillRect(x0, base, x1 - x0, 3);
      c.save();
      c.beginPath();
      c.rect(x0 - 30, y0 - 40, (x1 - x0 + 60) * ease(clamp(p * 1.2)), base - y0 + 80);
      c.clip();
      c.beginPath();
      pts.forEach((q, i) => (i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
      c.lineTo(x1, base);
      c.lineTo(x0, base);
      c.closePath();
      c.fillStyle = "rgba(10,63,104,.08)";
      c.fill();
      c.beginPath();
      pts.forEach((q, i) => (i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
      c.strokeStyle = NAVY;
      c.lineWidth = 10;
      c.lineJoin = "round";
      c.lineCap = "round";
      c.stroke();
      c.restore();
      const last = pts[n - 1];
      const a = clamp((p - 0.75) / 0.2);
      c.globalAlpha = a;
      c.fillStyle = "rgba(203,95,8,.18)";
      c.beginPath();
      c.arc(last[0], last[1], 44, 0, 7);
      c.fill();
      c.fillStyle = "#fff";
      c.strokeStyle = ORANGE;
      c.lineWidth = 9;
      c.beginPath();
      c.arc(last[0], last[1], 20, 0, 7);
      c.fill();
      c.stroke();
      c.globalAlpha = 1;
      c.font = font(500, 36);
      c.fillStyle = MUTED;
      c.textAlign = "center";
      d.forEach((_, k) => c.fillText(MONTHS[k], pts[k][0], y1));
      c.textAlign = "left";
    },
    donut(c, f, p, x0, y0, x1, y1) {
      const d = f.data as [string, number, string][];
      const R = Math.min(230, (y1 - y0) / 2 - 20);
      const cx = x0 + R + 30;
      const cy = (y0 + y1) / 2;
      const tot = d.reduce((s, r) => s + r[1], 0);
      let a = -Math.PI / 2;
      const sweep = 2 * Math.PI * ease(clamp(p * 1.2));
      c.lineWidth = 96;
      c.strokeStyle = "#e6ebf1";
      c.beginPath();
      c.arc(cx, cy, R, 0, 7);
      c.stroke();
      d.forEach((r) => {
        const s = (2 * Math.PI * r[1]) / tot;
        const e = Math.min(a + s, -Math.PI / 2 + sweep);
        if (e > a + 0.03) {
          c.strokeStyle = r[2];
          c.beginPath();
          c.arc(cx, cy, R, a + 0.015, e - 0.015);
          c.stroke();
        }
        a += s;
      });
      const lx = cx + R + 140;
      const rh = Math.min(120, (y1 - y0) / d.length);
      d.forEach((r, i) => {
        const y = cy - ((d.length - 1) * rh) / 2 + i * rh;
        c.globalAlpha = clamp((p - 0.2 - i * 0.1) / 0.3);
        c.fillStyle = r[2];
        c.beginPath();
        c.roundRect(lx, y - 22, 44, 44, 10);
        c.fill();
        c.font = font(500, 50);
        c.fillStyle = NAVY;
        c.textBaseline = "middle";
        c.fillText(r[0], lx + 76, y);
        c.textAlign = "right";
        c.font = font(700, 50);
        c.fillText(r[1] + "%", x1, y);
        c.textAlign = "left";
      });
      c.globalAlpha = 1;
      c.textBaseline = "alphabetic";
    },
  };
  return CH;
}

export function CuboResultadoDiagram() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const hintDefaultRef = useRef<HTMLSpanElement | null>(null);
  const hintManualRef = useRef<HTMLDivElement | null>(null);
  const backButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const tabsEl = tabsRef.current;
    const hintDefault = hintDefaultRef.current;
    const hintManual = hintManualRef.current;
    const backButton = backButtonRef.current;
    if (!root || !stage || !tabsEl || !hintDefault || !hintManual || !backButton) return;

    let cancelled = false;
    let raf: number | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    const createdButtons: HTMLButtonElement[] = [];

    async function init() {
      const siteFont = getComputedStyle(document.documentElement).getPropertyValue("--font-open-sans").trim();
      const FONT = siteFont || "system-ui, sans-serif";
      const font = (w: number, s: number) => `${w} ${s}px ${FONT}`;
      const CH = makeCH(font);

      function draw(f: RuntimeFace, p: number) {
        const c = f.ctx;
        c.fillStyle = "#f7f9fc";
        c.fillRect(0, 0, S, S);
        c.strokeStyle = "#8dbbe8";
        c.lineWidth = 8;
        const b = 56;
        const L = 110;
        ([
          [b, b, 1, 1],
          [S - b, b, -1, 1],
          [b, S - b, 1, -1],
          [S - b, S - b, -1, -1],
        ] as const).forEach(([x, y, sx, sy]) => {
          c.beginPath();
          c.moveTo(x, y + L * sy);
          c.lineTo(x, y);
          c.lineTo(x + L * sx, y);
          c.stroke();
        });
        c.fillStyle = NAVY;
        c.beginPath();
        c.roundRect(P, P + 22, 150, 84, 42);
        c.fill();
        c.fillStyle = "#fff";
        c.font = font(700, 46);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(f.n, P + 75, P + 66);
        c.textAlign = "left";
        c.fillStyle = ORANGE;
        c.font = font(600, 48);
        c.letterSpacing = "6px";
        c.fillText(f.eyebrow, P + 190, P + 66);
        c.letterSpacing = "0px";
        let fs = 270;
        c.font = font(700, fs);
        while (c.measureText(fmt(f.v, 1)).width > S - 2 * P && fs > 120) {
          fs -= 10;
          c.font = font(700, fs);
        }
        const vy = P + 130 + fs * 0.78;
        c.fillStyle = NAVY;
        c.textBaseline = "alphabetic";
        c.letterSpacing = "-6px";
        c.fillText(fmt(f.v, ease(p)), P - 6, vy);
        c.letterSpacing = "0px";
        const cy = vy + 50;
        c.font = font(600, 50);
        const tw = c.measureText(f.chip).width;
        c.globalAlpha = clamp((p - 0.45) / 0.3);
        c.fillStyle = "#e8f3ec";
        c.beginPath();
        c.roundRect(P, cy, tw + 140, 96, 48);
        c.fill();
        c.fillStyle = "#3f9a5e";
        c.beginPath();
        c.moveTo(P + 44, cy + 64);
        c.lineTo(P + 66, cy + 30);
        c.lineTo(P + 88, cy + 64);
        c.closePath();
        c.fill();
        c.fillStyle = "#2c6e43";
        c.textBaseline = "middle";
        c.fillText(f.chip, P + 110, cy + 50);
        c.globalAlpha = 1;
        CH[f.chart](c, f, p, P, cy + 170, S - P, S - P - 80);
        c.font = font(600, 36);
        c.letterSpacing = "8px";
        c.textBaseline = "alphabetic";
        c.fillStyle = RED;
        c.fillText("CUBO DE RESULTADO", P, S - P + 14);
        c.textAlign = "right";
        c.fillStyle = MUTED;
        c.fillText(f.n + " / 0" + FACES.length, S - P, S - P + 14);
        c.textAlign = "left";
        c.letterSpacing = "0px";
        f.tex.needsUpdate = true;
      }

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      stage!.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block;cursor:grab";
      renderer.domElement.addEventListener("pointerdown", () => {
        lastTouch = performance.now();
        setManual(true);
        renderer!.domElement.style.cursor = "grabbing";
      });
      renderer.domElement.addEventListener("pointerup", () => {
        renderer!.domElement.style.cursor = "grab";
      });

      const scene = new THREE.Scene();
      scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
      const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      const HOME = new THREE.Vector3(0, 0.12, 3.9);
      cam.position.copy(HOME);
      const controls = new OrbitControls(cam, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.rotateSpeed = 0.6;
      renderer.domElement.style.touchAction = "pan-y";
      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(2, 3, 4);
      scene.add(key);
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));

      const sc = document.createElement("canvas");
      sc.width = sc.height = 256;
      const sx = sc.getContext("2d")!;
      const gr = sx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gr.addColorStop(0, "rgba(10,63,104,.32)");
      gr.addColorStop(1, "rgba(10,63,104,0)");
      sx.fillStyle = gr;
      sx.fillRect(0, 0, 256, 256);
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -0.98;
      scene.add(shadow);

      const pivot = new THREE.Group();
      pivot.quaternion.setFromEuler(new THREE.Euler(0.24, -0.42, 0));
      scene.add(pivot);
      const holder = new THREE.Group();
      pivot.add(holder);

      function resize() {
        const w = stage!.clientWidth || 400;
        renderer!.setSize(w, w, false);
        cam.aspect = 1;
        cam.updateProjectionMatrix();
      }
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(stage!);
      resize();

      await Promise.all([
        document.fonts.load(font(500, 40)),
        document.fonts.load(font(600, 40)),
        document.fonts.load(font(700, 40)),
      ]).catch(() => {});
      if (cancelled) return;

      const gltf = await new GLTFLoader().loadAsync(GLB_URL);
      if (cancelled) return;
      const cube = gltf.scene;
      cube.position.y = -0.5;
      holder.add(cube);

      const faces: RuntimeFace[] = FACES.map((f) => {
        const cv = document.createElement("canvas");
        cv.width = cv.height = S;
        const ctx = cv.getContext("2d")!;
        const tex = new THREE.CanvasTexture(cv);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer!.capabilities.getMaxAnisotropy();
        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(f.e[0], f.e[1], 0));
        const rf: RuntimeFace = { ...f, ctx, tex, q, p: 1, pStart: 0 };
        draw(rf, 1);
        const mesh = cube.getObjectByName(f.node + "_tela") as THREE.Mesh | undefined;
        if (mesh) mesh.material = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
        return rf;
      });

      const btns = faces.map((f, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = f.tab;
        b.style.cssText = `font:500 13px ${FONT};padding:10px 16px;border-radius:999px;border:1px solid #dde3ea;background:#fff;color:${NAVY};cursor:pointer;transition:background .25s,color .25s,border-color .25s`;
        b.addEventListener("mouseenter", () => {
          if (!b.classList.contains("is-on")) b.style.borderColor = NAVY;
        });
        b.addEventListener("mouseleave", () => {
          if (!b.classList.contains("is-on")) b.style.borderColor = "#dde3ea";
        });
        b.addEventListener("click", () => {
          lastTouch = performance.now();
          go(i, performance.now());
        });
        tabsEl!.appendChild(b);
        createdButtons.push(b);
        return b;
      });

      function setOn(i: number) {
        btns.forEach((b, k) => {
          const on = k === i;
          b.classList.toggle("is-on", on);
          b.style.background = on ? NAVY : "#fff";
          b.style.borderColor = on ? NAVY : "#dde3ea";
          b.style.color = on ? "#fff" : NAVY;
        });
      }

      const TRANS = 1600 / SPEED;
      const COUNT = 1700 / SPEED;
      const from = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -1.7, 0));
      let cur = 0;
      let tStart = 0;
      let lastTouch = -1e9;
      let started = false;
      let visible = false;
      let manual = false;
      holder.quaternion.copy(from);
      holder.scale.setScalar(0.85);

      function setManual(on: boolean) {
        if (on === manual) return;
        manual = on;
        hintDefault!.style.display = on ? "none" : "inline";
        hintManual!.style.display = on ? "flex" : "none";
      }

      backButton!.addEventListener("click", () => {
        lastTouch = -1e9;
        setManual(false);
      });

      function go(i: number, now: number) {
        from.copy(holder.quaternion);
        cur = i;
        tStart = now;
        const f = faces[i];
        f.p = 0;
        f.pStart = now + TRANS * 0.45;
        draw(f, 0);
        setOn(i);
      }

      function tick(now: number) {
        raf = null;
        if (!visible) return;
        const k = inOut(clamp((now - tStart) / TRANS));
        holder.quaternion.slerpQuaternions(from, faces[cur].q, k);
        holder.scale.setScalar(Math.min(1, holder.scale.x + (1 - holder.scale.x) * 0.06));
        const f = faces[cur];
        if (f.p < 1 && now >= f.pStart) {
          f.p = clamp((now - f.pStart) / COUNT);
          draw(f, f.p);
        }
        if (now - tStart > TRANS + HOLD / SPEED && now - lastTouch > 2500) go((cur + 1) % faces.length, now);
        pivot.position.y = Math.sin((now / 1000) * 0.8) * 0.025;
        if (now - lastTouch > 3000) {
          cam.position.lerp(HOME, 0.035);
          setManual(false);
        }
        controls.update();
        renderer!.render(scene, cam);
        raf = requestAnimationFrame(tick);
      }

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visible = entry.isIntersecting;
            if (visible) {
              if (!started) {
                started = true;
                stage!.style.opacity = "1";
                go(0, performance.now());
              }
              if (!raf) raf = requestAnimationFrame(tick);
            }
          });
        },
        { threshold: 0.2 },
      );
      intersectionObserver.observe(root!);
    }

    init();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      createdButtons.forEach((b) => b.remove());
      if (renderer) {
        stage.contains(renderer.domElement) && stage.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="flex w-full flex-col items-center gap-3">
      <div ref={stageRef} className="aspect-square w-full max-w-[420px]" style={{ opacity: 0, transition: "opacity .8s ease" }} />
      <div ref={tabsRef} className="flex max-w-[480px] flex-wrap justify-center gap-2" />
      <div className="flex min-h-[20px] items-center justify-center text-center">
        <span ref={hintDefaultRef} className="text-xs text-navy-400">
          Clique e arraste o cubo para girar e explorar à vontade
        </span>
        <div ref={hintManualRef} className="items-center gap-2 text-xs text-navy-500" style={{ display: "none" }}>
          <span>Modo manual ativado</span>
          <button
            ref={backButtonRef}
            type="button"
            className="font-semibold text-ember-600 underline-offset-2 hover:underline"
          >
            Voltar à rotação automática
          </button>
        </div>
      </div>
    </div>
  );
}
