"use client";

import { useRef, useState } from "react";

export function ImageUploadField({
  value,
  onChange,
  folder = "posts",
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: "posts" | "shorts";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);
    const data = await res.json();
    if (data.url) onChange(data.url);
  }

  return (
    <div>
      {value ? (
        <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-box border border-base-300 bg-base-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Imagem destacada" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 rounded-full bg-navy-900/80 px-2 py-1 text-xs text-white"
          >
            Remover
          </button>
        </div>
      ) : (
        <div className="mb-3 flex aspect-[16/9] w-full items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200 text-sm text-navy-500">
          Sem imagem destacada
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={onFileSelected} className="file-input file-input-bordered file-input-sm w-full" />
      {uploading && <p className="mt-1 text-xs text-navy-500">Enviando…</p>}
    </div>
  );
}
