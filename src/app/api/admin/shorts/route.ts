import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { listAllShortsAdmin, createShort } from "@/lib/admin-shorts";

const shortSchema = z.object({
  title: z.string().min(1),
  videoPath: z.string().min(1),
  thumbnailPath: z.string().optional().nullable(),
  status: z.enum(["draft", "published"]),
  position: z.number(),
  publishedAt: z.string().optional().nullable(),
});

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ shorts: listAllShortsAdmin() });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = shortSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 400 });
  }
  try {
    const id = createShort(parsed.data);
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro ao criar short" }, { status: 400 });
  }
}
