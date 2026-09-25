import { notFound } from "next/navigation";
import { getShortByIdAdmin } from "@/lib/admin-shorts";
import { ShortEditorForm } from "@/components/admin/ShortEditorForm";

export const dynamic = "force-dynamic";

export default async function EditShortPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const short = getShortByIdAdmin(Number(id));
  if (!short) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-800 mb-8">Editar short</h1>
      <ShortEditorForm
        initial={{
          id: short.id,
          title: short.title,
          videoPath: short.video_path,
          thumbnailPath: short.thumbnail_path,
          status: short.status,
          position: short.position,
          publishedAt: short.published_at,
        }}
      />
    </div>
  );
}
