"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Channels", href: "/channels" },
  { label: "Knowledge", href: "/knowledge" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function NavHeader() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 text-sm font-medium text-[var(--muted)]">
      {navItems.map(({ label, href }) => {
        const active = isActive(pathname, href);
        const className = [
          "rounded-xl px-4 py-2 transition",
          active
            ? "bg-[var(--accent-soft)] text-[var(--accent)]"
            : "hover:bg-[var(--panel)] hover:text-[var(--ink)]",
        ].join(" ");

        return (
          <Link key={href} href={href} className={className}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
