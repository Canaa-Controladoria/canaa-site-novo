"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUploadField } from "./ImageUploadField";

export interface EditorCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PostEditorInitial {
  id?: number;
  title: string;
  slug: string;
  primaryCategorySlug: string;
  status: "draft" | "published";
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  excerpt: string;
  contentHtml: string;
  featuredImage: string | null;
  categoryIds: number[];
  tagNames: string[];
}

function toDateInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export function PostEditorForm({ categories, initial }: { categories: EditorCategory[]; initial: PostEditorInitial }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [primaryCategorySlug, setPrimaryCategorySlug] = useState(initial.primaryCategorySlug || categories[0]?.slug || "");
  const [categoryIds, setCategoryIds] = useState<number[]>(initial.categoryIds);
  const [tagsText, setTagsText] = useState(initial.tagNames.join(", "));
  const [featuredImage, setFeaturedImage] = useState<string | null>(initial.featuredImage);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [focusKeyword, setFocusKeyword] = useState(initial.focusKeyword);
  const [publishedAt, setPublishedAt] = useState(toDateInputValue(initial.publishedAt));
  const [contentHtml, setContentHtml] = useState(initial.contentHtml);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const [error, setError] = useState("");

  function toggleCategory(id: number) {
    setCategoryIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  async function save(status: "draft" | "published") {
    setSaving(status);
    setError("");

    const finalCategoryIds = categoryIds.includes(
      categories.find((c) => c.slug === primaryCategorySlug)?.id ?? -1
    )
      ? categoryIds
      : [...categoryIds, categories.find((c) => c.slug === primaryCategorySlug)?.id].filter(
          (v): v is number => typeof v === "number"
        );

    const payload = {
      title,
      slug: slug || undefined,
      primaryCategorySlug,
      status,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
      seoTitle,
      seoDescription,
      focusKeyword,
      excerpt,
      contentHtml,
      featuredImage,
      categoryIds: finalCategoryIds,
      tagNames: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = initial.id ? `/api/admin/posts/${initial.id}` : "/api/admin/posts";
    const method = initial.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Não foi possível salvar o post");
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full text-lg" placeholder="Título do artigo" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">
            URL (slug) — deixe em branco para gerar automaticamente
          </label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="input input-bordered w-full font-mono text-sm" placeholder="gerado-a-partir-do-titulo" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">Conteúdo</label>
          <RichTextEditor value={contentHtml} onChange={setContentHtml} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">Resumo (excerpt)</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="textarea textarea-bordered w-full" placeholder="Resumo curto exibido nos cards do blog" />
        </div>

        <div className="rounded-box border border-base-300 p-5">
          <h2 className="font-display text-lg text-navy-800 mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">Título para busca</label>
              <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">Meta descrição</label>
              <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} className="textarea textarea-bordered w-full" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">Frase-chave de foco</label>
              <input value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} className="input input-bordered w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <h2 className="font-display text-base text-navy-800 mb-4">Publicação</h2>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">Data</label>
              <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className="input input-bordered w-full" />
            </div>
            {error && <p className="text-sm text-error">{error}</p>}
            <button
              onClick={() => save("draft")}
              disabled={saving !== null}
              className="btn btn-outline w-full disabled:opacity-60"
            >
              {saving === "draft" ? "Salvando…" : "Salvar rascunho"}
            </button>
            <button
              onClick={() => save("published")}
              disabled={saving !== null}
              className="btn w-full border-none bg-accent text-accent-content hover:bg-accent-700 disabled:opacity-60"
            >
              {saving === "published" ? "Publicando…" : "Publicar"}
            </button>
          </div>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <h2 className="font-display text-base text-navy-800 mb-4">Imagem destacada</h2>
          <ImageUploadField value={featuredImage} onChange={setFeaturedImage} />
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <h2 className="font-display text-base text-navy-800 mb-1">Categoria principal</h2>
          <p className="mb-3 text-xs text-navy-500">Define a URL do post: /categoria/titulo-do-post</p>
          <select value={primaryCategorySlug} onChange={(e) => setPrimaryCategorySlug(e.target.value)} className="select select-bordered w-full">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>

          <h3 className="font-display text-base text-navy-800 mt-6 mb-2">Todas as categorias</h3>
          <div className="space-y-1.5">
            {categories.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm text-navy-700">
                <input type="checkbox" className="checkbox checkbox-sm" checked={categoryIds.includes(c.id)} onChange={() => toggleCategory(c.id)} />
                {c.name}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-5">
          <h2 className="font-display text-base text-navy-800 mb-2">Tags</h2>
          <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} className="input input-bordered w-full" placeholder="separadas, por, vírgula" />
        </div>
      </div>
    </div>
  );
}
