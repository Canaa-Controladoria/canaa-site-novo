"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 3000,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveDuration = reduceMotion ? 0 : duration;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();

        function tick(now: number) {
          const progress = effectiveDuration === 0 ? 1 : Math.min((now - start) / effectiveDuration, 1);
          setValue(Math.round(progress * end));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={spanRef}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
