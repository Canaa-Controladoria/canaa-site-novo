import "server-only";
import { toHTML, type PortableTextHtmlComponents } from "@portabletext/to-html";
import type { PortableTextBlock } from "@portabletext/types";
import slugify from "slugify";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";

export type PostStatus = "draft" | "published";

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  path: string;
  primaryCategorySlug: string;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  focusKeyword: string | null;
  excerpt: string | null;
  contentHtml: string;
  featuredImage: string | null;
  readingTimeMinutes: number;
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  toc: { level: "h2" | "h3"; text: string; id: string }[];
}

interface CategoryRef {
  name: string;
  slug: string;
}

interface PostDoc {
  id: string;
  title: string;
  slug: string;
  primaryCategorySlug: string;
  publishedAt: string | null;
  updatedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  focusKeyword: string | null;
  excerpt: string | null;
  featuredImage: { asset?: { _ref: string } } | null;
  primaryCategory: CategoryRef | null;
  extraCategories: CategoryRef[] | null;
  tags: CategoryRef[] | null;
  body: PortableTextBlock[] | null;
}

const POST_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  "primaryCategorySlug": primaryCategory->slug.current,
  publishedAt,
  "updatedAt": _updatedAt,
  seoTitle, seoDescription, focusKeyword, excerpt,
  featuredImage,
  "primaryCategory": primaryCategory->{name, "slug": slug.current},
  "extraCategories": categories[]->{name, "slug": slug.current},
  "tags": tags[]->{name, "slug": slug.current},
  body
`;

function escapeAttr(value: string): string {
  return value.replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function blockText(block: PortableTextBlock): string {
  const children = (block.children ?? []) as { text?: string }[];
  return children.map((c) => c.text ?? "").join(" ");
}

function headingId(block: PortableTextBlock): string {
  return slugify(blockText(block), { lower: true, strict: true }) || "secao";
}

const htmlComponents: Partial<PortableTextHtmlComponents> = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value).width(1200).fit("max").auto("format").url();
      const alt = escapeAttr((value as { alt?: string }).alt ?? "");
      return `<figure><img src="${url}" alt="${alt}" loading="lazy" /></figure>`;
    },
  },
  block: {
    h2: ({ children, value }) => `<h2 id="${headingId(value)}">${children}</h2>`,
    h3: ({ children, value }) => `<h3 id="${headingId(value)}">${children}</h3>`,
  },
};

function renderBody(body: PortableTextBlock[] | null): string {
  if (!body || body.length === 0) return "";
  return toHTML(body, { components: htmlComponents });
}

function readingTime(body: PortableTextBlock[] | null): number {
  if (!body) return 1;
  const words = body
    .filter((b) => b._type === "block")
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function extractToc(html: string): PostRecord["toc"] {
  const toc: PostRecord["toc"] = [];
  const re = /<h([23])[^>]*\sid="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const level = match[1] === "2" ? "h2" : "h3";
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    if (text) toc.push({ level, id: match[2], text });
  }
  return toc;
}

function dedupeCategories(primary: CategoryRef | null, extra: CategoryRef[] | null): CategoryRef[] {
  const all = [primary, ...(extra ?? [])].filter((c): c is CategoryRef => Boolean(c));
  const seen = new Set<string>();
  return all.filter((c) => (seen.has(c.slug) ? false : seen.add(c.slug)));
}

function toRecord(doc: PostDoc): PostRecord {
  const contentHtml = renderBody(doc.body);
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    path: `/${doc.primaryCategorySlug}/${doc.slug}`,
    primaryCategorySlug: doc.primaryCategorySlug,
    status: "published",
    publishedAt: doc.publishedAt,
    updatedAt: doc.updatedAt,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    focusKeyword: doc.focusKeyword,
    excerpt: doc.excerpt,
    contentHtml,
    featuredImage: doc.featuredImage?.asset ? urlFor(doc.featuredImage).width(1600).url() : null,
    readingTimeMinutes: readingTime(doc.body),
    categories: dedupeCategories(doc.primaryCategory, doc.extraCategories),
    tags: (doc.tags ?? []).filter((t): t is CategoryRef => Boolean(t)),
    toc: extractToc(contentHtml),
  };
}

export async function listPublishedPosts(): Promise<PostRecord[]> {
  const docs = await client.fetch<PostDoc[]>(
    `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`,
  );
  return docs.map(toRecord);
}

export async function getPostByPath(categorySlug: string, slug: string): Promise<PostRecord | null> {
  const doc = await client.fetch<PostDoc | null>(
    `*[_type == "post" && primaryCategory->slug.current == $categorySlug && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { categorySlug, slug },
  );
  return doc ? toRecord(doc) : null;
}

export async function getAllCategoriesWithCounts() {
  return client.fetch<{ name: string; slug: string; count: number }[]>(
    `*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(name asc) {
      name, "slug": slug.current, "count": count(*[_type == "post" && references(^._id)])
    }`,
  );
}

export async function searchPosts(query: string, categorySlug?: string): Promise<PostRecord[]> {
  const docs = await client.fetch<PostDoc[]>(
    `*[_type == "post"
      && ($q == "" || title match $wild || excerpt match $wild)
      && ($cat == "" || primaryCategory->slug.current == $cat || $cat in categories[]->slug.current)
    ] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { q: query, wild: `*${query}*`, cat: categorySlug ?? "" },
  );
  return docs.map(toRecord);
}

export async function listPostsByCategory(categorySlug: string): Promise<PostRecord[]> {
  return searchPosts("", categorySlug);
}

export async function getRelatedPosts(post: PostRecord, limit = 3): Promise<PostRecord[]> {
  const catSlugs = post.categories.map((c) => c.slug);
  const tagSlugs = post.tags.map((t) => t.slug);
  if (catSlugs.length === 0 && tagSlugs.length === 0) return [];
  const docs = await client.fetch<PostDoc[]>(
    `*[_type == "post" && _id != $id]{
      ${POST_FIELDS},
      "score": count((categories[]->slug.current)[@ in $catSlugs]) * 2 + count((tags[]->slug.current)[@ in $tagSlugs])
    }[score > 0] | order(score desc, publishedAt desc)[0...$limit]`,
    { id: post.id, catSlugs, tagSlugs, limit },
  );
  return docs.map(toRecord);
}

export async function getRecentPosts(limit = 5): Promise<PostRecord[]> {
  const docs = await client.fetch<PostDoc[]>(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] { ${POST_FIELDS} }`,
    { limit },
  );
  return docs.map(toRecord);
}

// "Mais lidos" depende de analytics de visualização, que ainda não têm armazenamento
// persistente (ver Fase 5 / banco em produção no README). Até lá, cai para os mais recentes.
export async function getMostReadPosts(limit = 5): Promise<PostRecord[]> {
  return getRecentPosts(limit);
}
