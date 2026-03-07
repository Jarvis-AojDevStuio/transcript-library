import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--line)] [background:var(--surface-hero)] px-8 py-9 shadow-[var(--shadow-card)]">
        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Knowledge category</div>
            <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] capitalize text-[var(--ink)]">
              {category.replace(/-/g, " ")}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted-strong)]">
              {formatCount(files.length, "document")} available in this category.
            </p>
          </div>
          <Link href="/knowledge">
            <Button variant="outline">All categories</Button>
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        {files.map((relPath) => (
          <Link key={relPath} href={`/knowledge/${enc(category)}/${enc(relPath)}`}>
            <Card className="transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <CardContent className="flex flex-col gap-4 p-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Document</div>
                  <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[var(--ink)]">
                    {titleFromRelPath(relPath)}
                  </h2>
                </div>
                <Badge tone="quiet">{relPath}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}

        {!files.length ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-sm leading-7 text-[var(--muted)]">
              No notes yet. Add markdown files to this category folder to surface them here.
            </CardContent>
          </Card>
        ) : null}
      </section>
    </div>
  );
}
