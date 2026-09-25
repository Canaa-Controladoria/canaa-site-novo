"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="text-sm text-blue-mist-light">Inscrição confirmada. Obrigado!</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn border-none bg-accent text-accent-content hover:bg-accent-700 disabled:opacity-60"
      >
        {state === "loading" ? "Enviando…" : "Inscrever"}
      </button>
      {state === "error" && <p className="text-xs text-error sm:hidden">Não foi possível inscrever. Tente de novo.</p>}
    </form>
  );
}
