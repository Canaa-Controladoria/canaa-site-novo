import { defineField, defineType } from "sanity";

export const short = defineType({
  name: "short",
  title: "Short (vídeo)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Vídeo",
      type: "file",
      options: { accept: "video/*" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "position",
      title: "Ordem",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "publishedAt",
      title: "Publicado em",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "positionAsc",
      by: [{ field: "position", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", media: "thumbnail" } },
});
