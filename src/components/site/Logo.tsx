import { NavLink } from "./NavLink";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <NavLink
      href="/"
      className="group inline-flex items-center"
      aria-label="Canaã Controladoria — início"
    >
      <span
        className={`font-display text-[1.7rem] leading-none tracking-tight ${dark ? "text-white" : "text-navy-700"}`}
      >
        Canaã
      </span>
    </NavLink>
  );
}
