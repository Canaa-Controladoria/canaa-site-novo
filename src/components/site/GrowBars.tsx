"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "bars" | "line";

export function GrowBars({
  values,
  highlightThreshold = 80,
}: {
  values: number[];
  highlightThreshold?: number;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [linePoints, setLinePoints] = useState<{ x: number; y: number }[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPhase("bars");
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "bars") return;

    const barsDuration = 1000 + (values.length - 1) * 90 + 250;
    const timer = setTimeout(() => {
      const points = barRefs.current
        .filter((bar): bar is HTMLDivElement => bar !== null)
        .map((bar) => ({ x: bar.offsetLeft + bar.offsetWidth / 2, y: bar.offsetTop }));
      setLinePoints(points);
      setPhase("line");
    }, barsDuration);

    return () => clearTimeout(timer);
  }, [phase, values.length]);

  const grown = phase === "bars" || phase === "line";
  const isLine = phase === "line";
  const pathLength = 900;

  return (
    <div ref={containerRef} className="relative flex h-32 items-end gap-2.5">
      {values.map((h, i) => (
        <div
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className={`flex-1 rounded-t transition-[height,opacity] duration-1000 ease-out motion-reduce:duration-0 ${
            h >= highlightThreshold
              ? "bg-gradient-to-t from-amber-400/30 to-amber-400"
              : "bg-gradient-to-t from-blue-mist/20 to-blue-mist"
          }`}
          style={{
            height: grown ? `${h}%` : "4%",
            opacity: isLine ? 0.2 : 1,
            transitionDelay: isLine ? "0ms" : `${i * 90}ms`,
          }}
        />
      ))}

      {isLine && linePoints && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <polyline
            points={linePoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#fcbc45"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ledger-chart-line"
            style={{ "--line-length": pathLength } as React.CSSProperties}
          />
          {linePoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === linePoints.length - 1 ? 4 : 2.5}
              fill="#fcbc45"
              className="fade-rise"
              style={{
                animationDelay: `${0.3 + (i / Math.max(linePoints.length - 1, 1)) * 2.6}s`,
                opacity: 0,
                animationFillMode: "forwards",
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
