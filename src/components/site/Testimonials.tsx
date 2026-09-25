"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const itemWidth = container.querySelector("div")?.clientWidth ?? 0;
      const gap = 24; // matches gap-6
      const step = itemWidth + gap;
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

      container.scrollTo({
        left: atEnd ? 0 : container.scrollLeft + step,
        behavior: "smooth",
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      ref={containerRef}
      className="carousel w-full gap-6 pb-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {testimonials.map((t, i) => (
        <div key={i} id={`depoimento-${i}`} className="carousel-item w-full sm:w-[520px]">
          <figure className="flex h-full w-full flex-col justify-between rounded-box border border-base-300 bg-base-100 p-8">
            <blockquote className="font-display text-lg italic leading-relaxed text-navy-800">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 font-mono text-xs uppercase tracking-wide text-navy-500">
              {t.author} · {t.role ? `${t.role} · ` : ""}
              {t.company}
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
