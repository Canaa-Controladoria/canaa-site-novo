import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyCredentials, createSession } from "@/lib/auth";
import { checkRateLimit, recordFailure, recordSuccess, getClientIp } from "@/lib/rate-limit";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

function blockedResponse(retryAfterSeconds: number) {
  const minutes = Math.ceil(retryAfterSeconds / 60);
  return NextResponse.json(
    { error: `Muitas tentativas. Tente novamente em ${minutes} min.` },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
  );
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });

  const ipKey = `ip:${getClientIp(req)}`;
  const emailKey = `email:${parsed.data.email.toLowerCase()}`;

  const ipStatus = checkRateLimit(ipKey);
  if (!ipStatus.allowed) return blockedResponse(ipStatus.retryAfterSeconds);
  const emailStatus = checkRateLimit(emailKey);
  if (!emailStatus.allowed) return blockedResponse(emailStatus.retryAfterSeconds);

  const user = await verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) {
    recordFailure(ipKey);
    recordFailure(emailKey);
    return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
  }

  recordSuccess(ipKey);
  recordSuccess(emailKey);
  await createSession({ sub: user.email, name: user.name });
  return NextResponse.json({ ok: true });
}
