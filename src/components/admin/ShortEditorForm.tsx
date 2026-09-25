"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VideoUploadField } from "./VideoUploadField";
import { ImageUploadField } from "./ImageUploadField";

export interface ShortEditorInitial {
  id?: number;
  title: string;
  videoPath: string | null;
  thumbnailPath: string | null;
  status: "draft" | "published";
  position: number;
  publishedAt: string | null;
}

function toDateInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export function ShortEditorForm({ initial }: { initial: ShortEditorInitial }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [videoPath, setVideoPath] = useState<string | null>(initial.videoPath);
  const [thumbnailPath, setThumbnailPath] = useState<string | null>(initial.thumbnailPath);
  const [position, setPosition] = useState(initial.position);
  const [publishedAt, setPublishedAt] = useState(toDateInputValue(initial.publishedAt));
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const [error, setError] = useState("");

  async function save(status: "draft" | "published") {
    if (!videoPath) {
      setError("Envie o vídeo antes de salvar");
      return;
    }
    setSaving(status);
    setError("");

    const payload = {
      title,
      videoPath,
      thumbnailPath,
      status,
      position,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
    };

    const url = initial.id ? `/api/admin/shorts/${initial.id}` : "/api/admin/shorts";
    const method = initial.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Não foi possível salvar o short");
      return;
    }
    router.push("/admin/shorts");
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered mt-1 w-full"
            placeholder="Ex.: 3 sinais de que sua controladoria está falhando"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">Vídeo (MP4, WebM ou MOV)</label>
          <div className="mt-1">
            <VideoUploadField value={videoPath} onChange={setVideoPath} />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">
            Capa do vídeo (opcional — aparece antes de o vídeo tocar)
          </label>
          <div className="mt-1 max-w-[220px]">
            <ImageUploadField value={thumbnailPath} onChange={setThumbnailPath} folder="shorts" />
          </div>
        </div>

        {error && <p className="text-sm text-error">{error}</p>}
      </div>

      <div className="space-y-6">
        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">Ordem de exibição</label>
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="input input-bordered mt-1 w-full"
          />
          <p className="mt-1 text-xs text-navy-500">Menor número aparece primeiro na vitrine do site.</p>

          <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-navy-500">
            Data de publicação
          </label>
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="input input-bordered mt-1 w-full"
          />

          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              disabled={saving !== null}
              onClick={() => save("published")}
              className="btn w-full border-none bg-accent text-accent-content hover:bg-accent-700 disabled:opacity-60"
            >
              {saving === "published" ? "Publicando…" : "Publicar"}
            </button>
            <button
              type="button"
              disabled={saving !== null}
              onClick={() => save("draft")}
              className="btn w-full border border-base-300 bg-base-100 disabled:opacity-60"
            >
              {saving === "draft" ? "Salvando…" : "Salvar rascunho"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
