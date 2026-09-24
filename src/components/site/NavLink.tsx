"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export function NavLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (pathname === href) {
          window.scrollTo(0, 0);
        }
      }}
      {...props}
    />
  );
}
