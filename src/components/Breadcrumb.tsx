import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 font-sans text-sm text-[var(--muted)]">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {index > 0 && (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[var(--line-strong)]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" />
            </svg>
          )}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-[var(--ink)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--ink)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
