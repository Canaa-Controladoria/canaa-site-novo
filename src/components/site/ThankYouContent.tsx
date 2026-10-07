import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";
import { getRecentPosts } from "@/lib/blog";

export async function ThankYouContent({ message }: { message: string }) {
  const posts = await getRecentPosts(3);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-2xl text-success">
        ✓
      </span>
      <h1 className="mt-6 font-display text-4xl text-navy-800">Obrigado!</h1>
      <p className="mt-3 text-lg text-navy-600">{message}</p>

      {posts.length > 0 && (
        <div className="mt-16 text-left">
          <SectionHeading align="center" eyebrow="Enquanto isso" title="Conheça o blog da Canaã" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      <Link href="/" className="mt-12 inline-block text-sm font-semibold text-ember-600 hover:underline">
        ← Voltar para o início
      </Link>
    </section>
  );
}
