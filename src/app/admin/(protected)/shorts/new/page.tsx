import { ShortEditorForm } from "@/components/admin/ShortEditorForm";

export default function NewShortPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-navy-800 mb-8">Novo short</h1>
      <ShortEditorForm
        initial={{
          title: "",
          videoPath: null,
          thumbnailPath: null,
          status: "draft",
          position: 0,
          publishedAt: null,
        }}
      />
    </div>
  );
}
