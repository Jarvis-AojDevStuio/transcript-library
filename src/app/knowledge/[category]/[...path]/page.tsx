import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  listKnowledgeCategories,
  listKnowledgeMarkdown,
  readKnowledgeMarkdown,
  titleFromRelPath,
} from "@/modules/knowledge";

function dec(value: string) {
  return decodeURIComponent(value);
}


export function generateStaticParams() {
  return listKnowledgeCategories().flatMap((category) =>
    listKnowledgeMarkdown(category).map((relPath) => ({
      category,
      path: relPath.split("/"),
    })),
  );
}

export default async function KnowledgeDocPage({
  params,
}: {
  params: Promise<{ category: string; path: string[] }>;
}) {
  const { category: rawCategory, path: rawPath } = await params;
  const category = dec(rawCategory);
  const relPath = rawPath.map(dec).join("/");
  const markdown = readKnowledgeMarkdown(category, relPath);

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--line)] [background:var(--surface-hero)] px-8 py-9 shadow-[var(--shadow-card)]">
        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Knowledge document</div>
            <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] text-[var(--ink)]">
              {titleFromRelPath(relPath)}
            </h1>
            <div className="mt-4 text-sm text-[var(--muted)]">{relPath}</div>
          </div>
          <Link href={`/knowledge/${encodeURIComponent(category)}`}>
            <Button variant="outline">Back to category</Button>
          </Link>
        </div>
      </section>

      <Card>
        <CardContent className="p-8 lg:p-10">
          {markdown ? <Markdown>{markdown}</Markdown> : <div className="text-sm text-[var(--muted)]">Document not found.</div>}
        </CardContent>
      </Card>
    </div>
  );
}
