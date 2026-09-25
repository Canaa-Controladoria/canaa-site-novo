import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";

const ALLOWED = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const MAX_SIZE = 80 * 1024 * 1024; // 80MB

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Formato de vídeo inválido (use MP4, WebM ou MOV)" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Vídeo muito grande (máx. 80MB)" }, { status: 400 });
  }

  const ext = file.type.split("/")[1] === "quicktime" ? "mov" : file.type.split("/")[1];
  const filename = `${Date.now()}-${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "shorts");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/shorts/${filename}` });
}
