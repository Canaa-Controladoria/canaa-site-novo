import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { sendMail, escapeHtml } from "@/lib/mailer";

const leadSchema = z.object({
  source: z.string().min(1).max(80),
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional().default(""),
  whatsapp: z.string().min(8).max(30),
  email: z.string().email().optional().or(z.literal("")).default(""),
  revenueRange: z.string().max(80).optional().default(""),
  lgpdConsent: z.literal(true),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 400 });
  }
  const { source, name, company, whatsapp, email, revenueRange } = parsed.data;

  const db = getDb();
  db.prepare(
    `INSERT INTO leads (source, name, company, whatsapp, email, revenue_range, lgpd_consent) VALUES (?, ?, ?, ?, ?, ?, 1)`
  ).run(source, name, company, whatsapp, email, revenueRange || null);

  await sendMail({
    subject: `Nova solicitação de proposta — ${source}`,
    replyTo: email || undefined,
    html: `
      <h2>Nova solicitação de proposta</h2>
      <p><strong>Origem:</strong> ${escapeHtml(source)}</p>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(company || "—")}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email || "—")}</p>
      ${revenueRange ? `<p><strong>Faturamento anual:</strong> ${escapeHtml(revenueRange)}</p>` : ""}
    `,
  });

  return NextResponse.json({ ok: true });
}
