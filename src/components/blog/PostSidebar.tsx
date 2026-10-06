import Link from "next/link";
import { getAllCategoriesWithCounts, getRecentPosts } from "@/lib/blog";

export async function PostSidebar() {
  const categories = await getAllCategoriesWithCounts();
  const recent = await getRecentPosts(5);

  return (
    <aside className="space-y-10">
      <form action="/blog" method="get">
        <input
          type="search"
          name="q"
          placeholder="Buscar no blog…"
          className="input input-bordered w-full"
        />
      </form>

      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-navy-500 mb-4">Artigos recentes</h2>
        <ul className="space-y-3">
          {recent.map((post) => (
            <li key={post.id}>
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
              <Link href={`/blog?categoria=${c.slug}`} className="flex items-center justify-between text-sm text-navy-700 hover:text-accent">
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
