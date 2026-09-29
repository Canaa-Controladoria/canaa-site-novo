import type { MetadataRoute } from "next";
import { site, solutions } from "@/lib/site";
import { listPublishedPosts } from "@/lib/blog";

const staticPaths = [
  "",
  "quem-somos",
  "solucoes",
  "solucoes/controller-terceirizado",
  "metodo",
  "blog",
  "trabalhe-conosco",
  "contato",
  "lp-controller-cfo",
  "diagnostico-financeiro-canaa-controladoria",
  "politica-de-privacidade-2",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = listPublishedPosts();

  return [
    ...staticPaths.map((p) => ({ url: `${site.url}/${p}`, lastModified: new Date() })),
    ...solutions.map((s) => ({ url: `${site.url}/solucoes/${s.slug}`, lastModified: new Date() })),
    ...posts.map((post) => ({
      url: `${site.url}${post.path}`,
      lastModified: new Date(post.updatedAt),
    })),
  ];
}
