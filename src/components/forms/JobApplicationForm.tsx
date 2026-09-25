"use client";

import { useState } from "react";

const areas = [
  "Controladoria",
  "FP&A / Planejamento Financeiro",
  "Business Intelligence",
  "Programa de Trainee",
  "Outra",
];

export function JobApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/jobs", { method: "POST", body: form });
      if (!res.ok) throw new Error();
      setStatus("done");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Não foi possível enviar sua candidatura agora. Tente novamente em instantes.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-box border border-success/30 bg-success/10 p-6 text-center">
        <p className="font-display text-lg text-navy-800">Candidatura enviada!</p>
        <p className="mt-1 text-sm text-navy-600">Obrigado pelo interesse — nossa equipe vai analisar seu perfil.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="job-name">Nome</label>
          <input id="job-name" name="name" required className="input input-bordered w-full" placeholder="Seu nome completo" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="job-email">E-mail</label>
          <input id="job-email" name="email" type="email" required className="input input-bordered w-full" placeholder="voce@email.com" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="job-phone">WhatsApp</label>
          <input id="job-phone" name="phone" required className="input input-bordered w-full" placeholder="(16) 90000-0000" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="job-area">Área de interesse</label>
          <select id="job-area" name="area" className="select select-bordered w-full" defaultValue={areas[0]}>
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="job-message">Mensagem</label>
        <textarea id="job-message" name="message" rows={4} className="textarea textarea-bordered w-full" placeholder="Conte um pouco sobre você" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500" htmlFor="job-resume">Currículo (PDF)</label>
        <input id="job-resume" name="resume" type="file" accept="application/pdf" required className="file-input file-input-bordered w-full" />
      </div>

      {status === "error" && <p className="text-sm text-error">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn w-full border-none bg-accent text-accent-content hover:bg-accent-700 disabled:opacity-60">
        {status === "loading" ? "Enviando…" : "Enviar candidatura"}
      </button>
    </form>
  );
}
