"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Não foi possível entrar");
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-6">
      <div className="w-full max-w-sm rounded-box bg-base-100 p-8">
        <span className="font-display text-2xl text-navy-800">Canaã</span>
        <p className="mt-1 text-sm text-navy-500">Painel do blog</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">
              E-mail
            </label>
            <input id="email" name="email" type="email" required className="input input-bordered w-full" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-mono uppercase tracking-wide text-navy-500">
              Senha
            </label>
            <input id="password" name="password" type="password" required className="input input-bordered w-full" />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn w-full border-none bg-navy-800 text-white hover:bg-navy-700 disabled:opacity-60">
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
