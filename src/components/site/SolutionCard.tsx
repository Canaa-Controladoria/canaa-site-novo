import Link from "next/link";
import { SolutionIcon } from "./SolutionIcon";

export function SolutionCard({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={`/solucoes/${slug}`}
      className="group flex flex-col rounded-box border border-base-300 bg-base-100 p-6 transition-colors hover:border-accent"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-blue-mist-light group-hover:bg-accent group-hover:text-accent-content transition-colors">
        <SolutionIcon slug={slug} />
      </span>
      <h3 className="mt-5 font-mono text-sm font-semibold uppercase tracking-wide text-navy-800">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-600">{description}</p>
      <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-navy-800 group-hover:underline">
        Saiba mais →
      </span>
    </Link>
  );
}
