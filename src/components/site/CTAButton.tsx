import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "accent" | "outline" | "ghost-light";

const variants: Record<Variant, string> = {
  accent:
    "bg-accent text-accent-content shadow-md shadow-accent/25 hover:bg-accent-700 hover:shadow-lg hover:shadow-accent/30",
  outline: "border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white hover:shadow-md",
  "ghost-light": "border border-white/40 text-white hover:bg-white hover:text-navy-800 hover:shadow-md",
};

function renderContent(children: ReactNode) {
  if (typeof children === "string" && children.endsWith(" →")) {
    return (
      <>
        <span>{children.slice(0, -2)}</span>
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </>
    );
  }
  return children;
}

export function CTAButton({
  href,
  children,
  variant = "accent",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {renderContent(children)}
    </Link>
  );
}
