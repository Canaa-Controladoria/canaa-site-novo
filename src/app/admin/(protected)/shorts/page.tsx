import Link from "next/link";
import Image from "next/image";
import { listAllShortsAdmin } from "@/lib/admin-shorts";
import { DeleteShortButton } from "@/components/admin/DeleteShortButton";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function AdminShortsPage() {
  const shorts = listAllShortsAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy-800">Shorts</h1>
          <p className="text-sm text-navy-500">{shorts.length} shorts no total</p>
        </div>
        <Link href="/admin/shorts/new" className="btn border-none bg-accent text-accent-content hover:bg-accent-700">
          + Novo short
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-box border border-base-300 bg-base-100">
        <table className="table">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-navy-500">
              <th></th>
              <th>Título</th>
              <th>Status</th>
              <th>Ordem</th>
              <th>Atualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shorts.map((short) => (
              <tr key={short.id}>
                <td>
                  {short.thumbnail_path ? (
                    <div className="relative h-14 w-9 overflow-hidden rounded border border-base-300 bg-navy-900">
                      <Image src={short.thumbnail_path} alt="" fill className="object-cover" sizes="36px" />
                    </div>
                  ) : (
                    <div className="h-14 w-9 rounded border border-dashed border-base-300 bg-base-200" />
                  )}
                </td>
                <td className="max-w-sm">
                  <Link href={`/admin/shorts/${short.id}`} className="font-medium text-navy-800 hover:text-accent">
                    {short.title}
                  </Link>
                </td>
                <td>
                  <span
                    className={`badge ${short.status === "published" ? "badge-success" : "badge-ghost"} badge-sm`}
                  >
                    {short.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="font-mono text-xs text-navy-500 tabular-nums">{short.position}</td>
                <td className="font-mono text-xs text-navy-500 tabular-nums">{formatDate(short.updated_at)}</td>
                <td className="text-right">
                  <DeleteShortButton id={short.id} title={short.title} />
                </td>
              </tr>
            ))}
            {shorts.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-navy-500">
                  Nenhum short ainda. Crie o primeiro!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
