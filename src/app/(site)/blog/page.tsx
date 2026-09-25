import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryPills } from "@/components/blog/CategoryPills";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { listPublishedPosts, searchPosts } from "@/lib/blog";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Insights",
  description: "Visite os Insights da Canaã Controladoria! Mergulhe na teoria e prática com nossos conteúdos especializados para sua empresa.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const { q, categoria } = await searchParams;
  const posts = q || categoria ? searchPosts(q ?? "", categoria) : listPublishedPosts();

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-mist mb-3">Insights</p>
          <h1 className="font-display text-4xl leading-tight">Controladoria e Inteligência Financeira</h1>
          <p className="mt-4 text-lg text-blue-mist-light">
            Mergulhe na teoria e prática com nossos conteúdos especializados.
          </p>

          <form action="/blog" method="get" className="mx-auto mt-8 flex max-w-md gap-2">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Buscar por palavra-chave…"
              className="input input-bordered w-full border-white/20 bg-white/10 text-white placeholder:text-blue-mist focus:border-white/40"
            />
            <button type="submit" className="btn border-none bg-accent text-accent-content hover:bg-accent-700">
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <CategoryPills active={categoria} query={q} />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            {posts.length === 0 ? (
              <p className="text-navy-600">Nenhum artigo encontrado para essa busca.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
          <BlogSidebar activeCategory={categoria} />
        </div>
      </section>
    </>
  );
}
