import Link from "next/link";
import { getAllCategoriesWithCounts } from "@/lib/blog";

export async function CategoryPills({ active, query }: { active?: string; query?: string }) {
  const categories = await getAllCategoriesWithCounts();
  const qs = (categorySlug?: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (categorySlug) params.set("categoria", categorySlug);
    const s = params.toString();
    return s ? `/blog?${s}` : "/blog";
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={qs()}
        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
          !active ? "border-accent bg-accent text-accent-content" : "border-base-300 text-navy-700 hover:border-accent"
        }`}
      >
        Todos
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={qs(c.slug)}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            active === c.slug
              ? "border-accent bg-accent text-accent-content"
              : "border-base-300 text-navy-700 hover:border-accent"
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
