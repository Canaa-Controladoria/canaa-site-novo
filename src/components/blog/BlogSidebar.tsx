import Link from "next/link";
import { getAllCategoriesWithCounts, getMostReadPosts } from "@/lib/blog";

export async function BlogSidebar({ activeCategory }: { activeCategory?: string }) {
  const categories = await getAllCategoriesWithCounts();
  const mostRead = await getMostReadPosts(5);

  return (
    <aside className="space-y-10">
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-navy-500 mb-4">Mais lidos do mês</h2>
        <ul className="space-y-4">
          {mostRead.map((post, i) => (
            <li key={post.id} className="flex gap-3">
              <span className="font-display text-2xl text-base-300">{String(i + 1).padStart(2, "0")}</span>
              <Link href={post.path} className="text-sm font-medium leading-snug text-navy-800 hover:text-accent">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-navy-500 mb-4">Categorias</h2>
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/blog?categoria=${c.slug}`}
                className={`flex items-center justify-between text-sm ${
                  activeCategory === c.slug ? "font-semibold text-accent" : "text-navy-700 hover:text-accent"
                }`}
              >
                <span>{c.name}</span>
                <span className="font-mono tabular-nums text-navy-400">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
