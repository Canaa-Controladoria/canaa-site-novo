"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProposalForm({
  source,
  redirectTo = "/obrigado",
  dark = false,
  compact = false,
}: {
  source: string;
  redirectTo?: string;
  dark?: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      source,
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      email: String(form.get("email") || ""),
      lgpdConsent: form.get("lgpd") === "on",
    };

    if (!payload.lgpdConsent) {
      setStatus("error");
      setError("É necessário concordar com o uso dos dados para enviar o formulário.");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      router.push(redirectTo);
    } catch {
      setStatus("error");
      setError("Não foi possível enviar agora. Tente novamente em instantes.");
    }
  }

  const fieldClass = `input input-bordered w-full ${
    dark ? "bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-accent" : ""
  }`;
  const labelClass = `text-xs font-mono uppercase tracking-wide mb-1 block ${dark ? "text-blue-mist-light" : "text-navy-500"}`;

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div>
        <label className={labelClass} htmlFor={`${source}-name`}>Nome</label>
        <input id={`${source}-name`} name="name" required className={fieldClass} placeholder="Seu nome completo" />
      </div>
      <div>
        <label className={labelClass} htmlFor={`${source}-company`}>Empresa</label>
        <input id={`${source}-company`} name="company" required className={fieldClass} placeholder="Nome da empresa" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${source}-whatsapp`}>WhatsApp (com DDD)</label>
          <input
            id={`${source}-whatsapp`}
            name="whatsapp"
            required
            inputMode="tel"
            className={fieldClass}
            placeholder="(16) 90000-0000"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`${source}-email`}>E-mail</label>
          <input id={`${source}-email`} name="email" type="email" className={fieldClass} placeholder="voce@empresa.com" />
        </div>
      </div>

      <label className={`flex items-start gap-2 text-xs ${dark ? "text-white/70" : "text-navy-600"}`}>
        <input type="checkbox" name="lgpd" className="checkbox checkbox-sm mt-0.5" />
        <span>
          Autorizo o uso dos meus dados para contato comercial da Canaã Controladoria, em conformidade com a LGPD.
        </span>
      </label>

      {status === "error" && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn w-full border-none bg-accent text-accent-content hover:bg-accent-700 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Solicitar proposta"}
      </button>
    </form>
  );
}
