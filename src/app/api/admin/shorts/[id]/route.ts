import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { getShortByIdAdmin, updateShort, deleteShort } from "@/lib/admin-shorts";

const shortSchema = z.object({
  title: z.string().min(1),
  videoPath: z.string().min(1),
  thumbnailPath: z.string().optional().nullable(),
  status: z.enum(["draft", "published"]),
  position: z.number(),
  publishedAt: z.string().optional().nullable(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const short = getShortByIdAdmin(Number(id));
  if (!short) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ short });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const json = await req.json().catch(() => null);
  const parsed = shortSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 400 });
  }
  try {
    updateShort(Number(id), parsed.data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro ao salvar" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  deleteShort(Number(id));
  return NextResponse.json({ ok: true });
}
