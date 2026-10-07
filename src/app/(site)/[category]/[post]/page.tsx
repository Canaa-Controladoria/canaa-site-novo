import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { PostSidebar } from "@/components/blog/PostSidebar";
import { getPostByPath, getRelatedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; post: string }>;
}): Promise<Metadata> {
  const { category, post: postSlug } = await params;
  const post = await getPostByPath(decodeURIComponent(category), decodeURIComponent(postSlug));
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; post: string }>;
}) {
  const { category, post: postSlug } = await params;
  const post = await getPostByPath(decodeURIComponent(category), decodeURIComponent(postSlug));
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);

  return (
    <article className="mx-auto max-w-6xl px-6 py-14">
      <div className="mx-auto max-w-3xl text-center">
        {post.categories[0] && (
          <Link
            href={`/blog?categoria=${post.categories[0].slug}`}
            className="font-mono text-xs uppercase tracking-[0.2em] text-ember-600"
          >
            {post.categories[0].name}
          </Link>
        )}
        <h1 className="mt-4 font-display text-3xl sm:text-4xl leading-tight text-navy-800">{post.title}</h1>
        <div className="mt-4 flex items-center justify-center gap-3 font-mono text-xs text-navy-500 tabular-nums">
          <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
          <span>·</span>
          <span>{post.readingTimeMinutes} min de leitura</span>
        </div>
      </div>

      {post.featuredImage && (
        <div className="relative mx-auto mt-10 aspect-[16/8] w-full max-w-4xl overflow-hidden rounded-box border border-base-300">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 900px" priority />
        </div>
      )}

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
        <div>
          {post.toc.length > 1 && (
            <nav className="mb-10 rounded-box border border-base-300 bg-base-200 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-navy-500 mb-3">Neste artigo</p>
              <ul className="space-y-1.5">
                {post.toc.map((item) => (
                  <li key={item.id} className={item.level === "h3" ? "ml-4" : ""}>
                    <a href={`#${item.id}`} className="text-sm text-navy-700 hover:text-accent">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="article-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-base-300 pt-6">
              {post.tags.map((tag) => (
                <span key={tag.slug} className="rounded-full border border-base-300 px-3 py-1 text-xs text-navy-600">
                  #{tag.name.replace(/^#/, "")}
                </span>
              ))}
            </div>
          )}
        </div>

        <PostSidebar />
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-base-300 pt-14">
          <h2 className="font-display text-2xl text-navy-800 mb-8">Posts relacionados</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
