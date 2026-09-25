import Link from "next/link";
import { listAllPostsAdmin } from "@/lib/admin-blog";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function AdminPostsPage() {
  const posts = listAllPostsAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy-800">Posts do blog</h1>
          <p className="text-sm text-navy-500">{posts.length} posts no total</p>
        </div>
        <Link href="/admin/posts/new" className="btn border-none bg-accent text-accent-content hover:bg-accent-700">
          + Novo post
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-box border border-base-300 bg-base-100">
        <table className="table">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-navy-500">
              <th>Título</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Atualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="max-w-sm">
                  <Link href={`/admin/posts/${post.id}`} className="font-medium text-navy-800 hover:text-accent">
                    {post.title}
                  </Link>
                </td>
                <td>
                  <span
                    className={`badge ${post.status === "published" ? "badge-success" : "badge-ghost"} badge-sm`}
                  >
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="font-mono text-xs text-navy-500">{post.primary_category_slug}</td>
                <td className="font-mono text-xs text-navy-500 tabular-nums">{formatDate(post.updated_at)}</td>
                <td className="text-right">
                  <DeletePostButton id={post.id} title={post.title} />
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-navy-500">
                  Nenhum post ainda. Crie o primeiro!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
