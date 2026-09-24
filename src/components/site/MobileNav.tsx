"use client";

import { useState } from "react";
import Link from "next/link";
import { NavLink } from "./NavLink";
import { mainNav, solutions, site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-navy-800 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`block h-0.5 w-6 bg-navy-800 transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`block h-0.5 w-6 bg-navy-800 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-base-100 pt-24 px-6 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-base-300 py-3 font-display text-xl text-navy-800"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-widest text-navy-500 mb-2">Soluções</p>
            <div className="flex flex-col gap-1">
              {solutions.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solucoes/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-navy-700"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/lp-controller-cfo"
            onClick={() => setOpen(false)}
            className="mt-8 mb-10 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-accent-content"
          >
            Solicitar proposta
          </Link>
          <p className="text-xs text-navy-500 mb-10">{site.phoneDisplay}</p>
        </div>
      )}
    </div>
  );
}
