import { testimonials } from "@/lib/testimonials";

export function TestimonialsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <figure
          key={i}
          className="flex flex-col gap-6 rounded-box border border-base-300 bg-base-100 p-8"
        >
          {t.badge && (
            <span className="self-start rounded-full bg-base-200 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
              {t.badge}
            </span>
          )}
          <blockquote className="text-[17px] leading-relaxed text-navy-800">“{t.quote}”</blockquote>
          <figcaption className="mt-auto flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-extrabold text-white">
              {t.initials}
            </span>
            <span className="flex flex-col">
              <strong className="text-sm text-navy-800">{t.author}</strong>
              <span className="text-sm text-navy-500">
                {t.role ? `${t.role} · ` : ""}
                {t.company}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
