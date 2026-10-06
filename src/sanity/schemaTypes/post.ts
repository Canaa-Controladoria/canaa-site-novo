import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCategory",
      title: "Categoria principal (dona da URL)",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Outras categorias",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      group: "content",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Publicado em",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featuredImage",
      title: "Imagem destacada",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta descrição",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "focusKeyword",
      title: "Palavra-chave foco",
      type: "string",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "primaryCategory.name", media: "featuredImage" },
  },
});
