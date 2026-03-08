import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { listKnowledgeCategories, listKnowledgeMarkdown, titleFromRelPath } from "@/modules/knowledge";
import { formatCount } from "@/lib/utils";

function enc(value: string) {
  return encodeURIComponent(value);
}

export function generateStaticParams() {
  return listKnowledgeCategories().map((category) => ({ category }));
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
    <div className="space-y-8 pb-12">
      <div className="mb-8 pt-2">
        <Breadcrumb items={[
          { label: "Knowledge", href: "/knowledge" },
          { label: category.replace(/-/g, " ") },
        ]} />
        <h1 className="font-display text-3xl capitalize tracking-[-0.04em] text-[var(--ink)]">
          {category.replace(/-/g, " ")}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {formatCount(files.length, "document")}
        </p>
      </div>

      <section className="space-y-4">
        <div className="divide-y divide-[var(--line)]">
          {files.map((relPath) => (
            <Link
              key={relPath}
              href={`/knowledge/${enc(category)}/${enc(relPath)}`}
              className="flex items-center justify-between gap-4 py-3 transition hover:bg-[var(--warm-soft)]"
            >
              <span className="text-sm font-medium text-[var(--ink)]">{titleFromRelPath(relPath)}</span>
              <Badge tone="quiet">{relPath}</Badge>
            </Link>
          ))}
        </div>

        {!files.length ? (
          <div className="rounded-2xl border border-dashed border-[var(--line)] p-8 text-sm text-[var(--muted)]">
            No notes yet. Add markdown files to this category folder.
          </div>
        ) : null}
      </section>
    </div>
  );
}
