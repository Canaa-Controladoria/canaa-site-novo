"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteShortButton({ id, title }: { id: number; title: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!confirm(`Excluir o short "${title}"? Essa ação não pode ser desfeita.`)) return;
    setBusy(true);
    await fetch(`/api/admin/shorts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={onDelete} disabled={busy} className="text-xs font-semibold text-error hover:underline disabled:opacity-50">
      Excluir
    </button>
  );
}
