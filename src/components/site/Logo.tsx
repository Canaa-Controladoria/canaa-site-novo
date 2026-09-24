import { NavLink } from "./NavLink";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <NavLink href="/" className="group inline-flex flex-col leading-none" aria-label="Canaã Controladoria — início">
      <span
        className={`font-display text-[1.7rem] tracking-tight ${dark ? "text-white" : "text-navy-700"}`}
      >
        Canaã
      </span>
      <span
        className={`font-mono text-[0.55rem] font-medium uppercase tracking-[0.28em] ${
          dark ? "text-blue-mist" : "text-navy-500"
        }`}
      >
        Controladoria para resultados
      </span>
    </NavLink>
  );
}
