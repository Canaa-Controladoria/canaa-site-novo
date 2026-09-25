import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-base-300 bg-navy-900 p-6 text-white sm:flex">
          <span className="font-display text-xl">
            Canaã <span className="text-sm text-blue-mist-light">admin</span>
          </span>
          <nav className="mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-widest text-blue-mist">Insights</p>
              <Link href="/admin/posts" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10">
                Posts
              </Link>
              <Link href="/admin/posts/new" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10">
                Novo post
              </Link>
              <Link href="/blog" target="_blank" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10">
                Ver público ↗
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <p className="px-3 text-xs font-semibold uppercase tracking-widest text-blue-mist">Shorts</p>
              <Link href="/admin/shorts" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10">
                Todos os shorts
              </Link>
              <Link href="/admin/shorts/new" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10">
                Novo short
              </Link>
              <Link href="/#shorts" target="_blank" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10">
                Ver público ↗
              </Link>
            </div>
          </nav>
          <div className="mt-auto pt-10">
            <p className="text-xs text-blue-mist-light">{session.sub}</p>
            <LogoutButton />
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
