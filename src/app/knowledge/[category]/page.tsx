import Link from "next/link";
import { Badge } from "@/components/Badge";
import { listKnowledgeMarkdown, titleFromRelPath } from "@/lib/knowledge";

function enc(s: string) {
  return encodeURIComponent(s);
}

export default async function KnowledgeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const files = listKnowledgeMarkdown(category);

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-black/10 bg-[color:var(--card)] p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
              Knowledge
            </div>
            <h1 className="font-display mt-1 text-2xl tracking-tight capitalize">
              {category.replace(/-/g, " ")}
            </h1>
          </div>
          <Link
            href="/knowledge"
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
          >
            All categories
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="neutral">
            {files.length} note{files.length === 1 ? "" : "s"}
          </Badge>
        </div>
      </div>

      <div className="rounded-3xl border border-black/10 bg-white/50 p-2">
        <div className="divide-y divide-black/5">
          {files.map((rel) => (
            <Link
              key={rel}
              href={`/knowledge/${enc(category)}/${enc(rel)}`}
              className="block rounded-2xl px-4 py-3 hover:bg-black/5"
            >
              <div className="font-medium tracking-tight">{titleFromRelPath(rel)}</div>
              <div className="mt-1">
                <Badge tone="quiet">{rel}</Badge>
              </div>
            </Link>
          ))}
          {!files.length ? (
            <div className="px-4 py-6 text-sm text-[var(--muted)]">
              No markdown notes found in this category.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
