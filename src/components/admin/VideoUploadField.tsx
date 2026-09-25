"use client";

import { useRef, useState } from "react";

export function VideoUploadField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload-video", { method: "POST", body: form });
    setUploading(false);
    const data = await res.json();
    if (data.url) onChange(data.url);
    else setError(data.error || "Erro ao enviar vídeo");
  }

  return (
    <div>
      {value ? (
        <div className="relative mb-3 aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-box border border-base-300 bg-navy-900">
          <video src={value} controls className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 rounded-full bg-navy-900/80 px-2 py-1 text-xs text-white"
          >
            Remover
          </button>
        </div>
      ) : (
        <div className="mb-3 flex aspect-[9/16] w-full max-w-[220px] items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200 text-center text-sm text-navy-500">
          Sem vídeo
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={onFileSelected}
        className="file-input file-input-bordered file-input-sm w-full max-w-[220px]"
      />
      {uploading && <p className="mt-1 text-xs text-navy-500">Enviando vídeo…</p>}
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
