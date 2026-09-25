import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-3 ${dark ? "text-blue-mist" : "text-accent"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl leading-tight ${dark ? "text-white" : "text-navy-800"}`}>
        {title}
      </h2>
      {lede && <p className={`mt-4 text-base leading-relaxed ${dark ? "text-blue-mist-light" : "text-navy-600"}`}>{lede}</p>}
    </div>
  );
}
