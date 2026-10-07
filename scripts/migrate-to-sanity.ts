import fs from "fs";
import path from "path";
import { createClient, type SanityClient } from "@sanity/client";
import {
  htmlToBlocks,
  normalizeBlock,
  type DeserializerRule,
} from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";

interface RawPost {
  id: number;
  title: string;
  slug: string;
  categorySlug: string;
  date: string;
  status: string;
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  featuredImage: string | null;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string | null;
  excerpt: string;
  contentHtml: string;
}

interface Taxonomy {
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
}

const CONTENT_DIR = path.join(__dirname, "..", "content", "data");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")) as T;
}

function makeClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !dataset) {
    throw new Error(
      "Faltam NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET no .env.local",
    );
  }
  if (!token) {
    throw new Error(
      "Falta SANITY_API_WRITE_TOKEN no .env.local (token com role Editor em sanity.io/manage)",
    );
  }
  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-06",
    useCdn: false,
  });
}

// Compila um schema mínimo só para o conversor de HTML conhecer o tipo "block"
// (decorators, estilos e a anotação link vêm dos padrões do tipo block).
function blockContentType() {
  const schema = Schema.compile({
    name: "migration",
    types: [
      {
        name: "post",
        type: "document",
        fields: [
          {
            name: "body",
            type: "array",
            of: [{ type: "block" }, { type: "image" }],
          },
        ],
      },
    ],
  });
  return schema.get("post").fields.find((f: { name: string }) => f.name === "body")
    .type;
}

const assetCache = new Map<string, string | null>();

// Sanity deduplica assets por hash de conteúdo, então rodar de novo não duplica.
async function uploadImage(client: SanityClient, url: string): Promise<string | null> {
  if (assetCache.has(url)) return assetCache.get(url) ?? null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = url.split("/").pop()?.split("?")[0] || "image";
    const asset = await client.assets.upload("image", buffer, { filename });
    assetCache.set(url, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  ⚠ imagem falhou (${url}): ${(err as Error).message}`);
    assetCache.set(url, null);
    return null;
  }
}

function imageSrcsIn(html: string): string[] {
  const doc = new JSDOM(html).window.document;
  return [...doc.querySelectorAll("img")]
    .map((img) => img.getAttribute("src"))
    .filter((src): src is string => Boolean(src));
}

function htmlToPortableText(html: string, assetBySrc: Map<string, string>) {
  const imageRule: DeserializerRule = {
    deserialize(el, _next, block) {
      if (el.nodeName.toLowerCase() !== "img") return undefined;
      const src = (el as Element).getAttribute("src");
      const assetId = src ? assetBySrc.get(src) : undefined;
      if (!assetId) return undefined;
      return block({
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      });
    },
  };
  const blocks = htmlToBlocks(html, blockContentType(), {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: [imageRule],
  });
  return blocks.map((b) => normalizeBlock(b));
}

async function seedTaxonomy(client: SanityClient, tax: Taxonomy) {
  const tx = client.transaction();
  for (const c of tax.categories) {
    tx.createOrReplace({ _id: `category-${c.slug}`, _type: "category", name: c.name, slug: { _type: "slug", current: c.slug } });
  }
  for (const t of tax.tags) {
    tx.createOrReplace({ _id: `tag-${t.slug}`, _type: "tag", name: t.name, slug: { _type: "slug", current: t.slug } });
  }
  await tx.commit();
  console.log(`✓ ${tax.categories.length} categorias, ${tax.tags.length} tags`);
}

async function seedPost(client: SanityClient, post: RawPost) {
  const featuredId = post.featuredImage ? await uploadImage(client, post.featuredImage) : null;
  const assetBySrc = new Map<string, string>();
  for (const src of imageSrcsIn(post.contentHtml)) {
    const id = await uploadImage(client, src);
    if (id) assetBySrc.set(src, id);
  }
  const isDraft = post.status !== "publish";
  const doc: Record<string, unknown> = {
    _id: `${isDraft ? "drafts." : ""}post-${post.id}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    primaryCategory: { _type: "reference", _ref: `category-${post.categorySlug}` },
    categories: post.categories.map((c) => ({ _type: "reference", _ref: `category-${c.slug}`, _key: c.slug })),
    tags: post.tags.map((t) => ({ _type: "reference", _ref: `tag-${t.slug}`, _key: t.slug })),
    publishedAt: new Date(post.date).toISOString(),
    excerpt: post.excerpt || undefined,
    seoTitle: post.seoTitle || undefined,
    seoDescription: post.seoDescription || undefined,
    focusKeyword: post.focusKeyword || undefined,
    body: htmlToPortableText(post.contentHtml, assetBySrc),
  };
  if (featuredId) {
    doc.featuredImage = { _type: "image", asset: { _type: "reference", _ref: featuredId } };
  }
  await client.createOrReplace(doc as never);
  console.log(`  • ${post.title}`);
}

async function main() {
  const client = makeClient();
  const posts = readJson<RawPost[]>("posts.json");
  const taxonomy = readJson<Taxonomy>("taxonomy.json");

  await seedTaxonomy(client, taxonomy);
  console.log(`Migrando ${posts.length} posts…`);
  for (const post of posts) {
    await seedPost(client, post);
  }
  console.log(`✓ concluído: ${posts.length} posts no projeto ${client.config().projectId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
