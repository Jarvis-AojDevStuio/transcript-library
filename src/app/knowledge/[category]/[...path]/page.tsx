import { Markdown } from "@/components/Markdown";
import { Breadcrumb } from "@/components/Breadcrumb";
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
      <div className="mb-8 pt-2">
        <Breadcrumb items={[
          { label: "Knowledge", href: "/knowledge" },
          { label: category.replace(/-/g, " "), href: `/knowledge/${encodeURIComponent(category)}` },
          { label: titleFromRelPath(relPath) },
        ]} />
        <h1 className="font-display text-3xl tracking-[-0.04em] text-[var(--ink)]">
          {titleFromRelPath(relPath)}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">{relPath}</p>
      </div>

      <div>
        {markdown ? <Markdown>{markdown}</Markdown> : <div className="text-sm text-[var(--muted)]">Document not found.</div>}
      </div>
    </div>
  );
}
