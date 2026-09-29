"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const revenueRanges = [
  "Até R$ 5 milhões",
  "R$ 5 a 20 milhões",
  "R$ 20 a 50 milhões",
  "R$ 50 a 100 milhões",
  "Acima de R$ 100 milhões",
];

export function ControllerLeadForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      source: "controller-terceirizado",
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      revenueRange: String(form.get("revenueRange") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
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
      router.push("/obrigado");
    } catch {
      setStatus("error");
      setError("Não foi possível enviar agora. Tente novamente em instantes.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-9">
      <strong className="text-xl text-navy-900">Agende um diagnóstico</strong>
      <span className="-mt-2 text-sm text-navy-600">Um especialista da Canaã retorna em até 1 dia útil.</span>

      <div>
        <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="controller-name">
          Nome
        </label>
        <input id="controller-name" name="name" required className="input input-bordered w-full" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="controller-company">
          Empresa
        </label>
        <input id="controller-company" name="company" required className="input input-bordered w-full" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="controller-revenue">
          Faturamento anual
        </label>
        <select id="controller-revenue" name="revenueRange" required defaultValue="" className="select select-bordered w-full">
          <option value="" disabled>
            Selecione uma faixa
          </option>
          {revenueRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="controller-whatsapp">
          WhatsApp
        </label>
        <input
          id="controller-whatsapp"
          name="whatsapp"
          required
          inputMode="tel"
          placeholder="(16) 90000-0000"
          className="input input-bordered w-full"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-navy-600">
        <input type="checkbox" name="lgpd" className="checkbox checkbox-sm mt-0.5" />
        <span>Autorizo o uso dos meus dados para contato comercial da Canaã Controladoria, em conformidade com a LGPD.</span>
      </label>

      {status === "error" && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn border-none bg-accent text-accent-content hover:bg-accent-700 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Quero meu diagnóstico"}
      </button>
    </form>
  );
}
