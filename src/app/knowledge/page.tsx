import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  curatedKnowledgeCategories,
  knowledgeExists,
  listKnowledgeCategories,
} from "@/modules/knowledge";

/**
 * URL-encodes a string for safe use in path segments.
 *
 * @param value - The raw string to encode.
 * @returns The percent-encoded string.
 */
function enc(value: string) {
  return encodeURIComponent(value);
}

/**
 * Knowledge index page — shows curated categories as large cards and remaining
 * categories as compact badges. Renders an empty state when no `knowledge/`
 * directory is present.
 */
export default function KnowledgeHomePage() {
  if (!knowledgeExists()) {
    return (
      <Card className="max-w-3xl">
        <CardContent className="p-8">
          <h1 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">Knowledge</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            No{" "}
            <code className="rounded-xl bg-[var(--panel)] px-2 py-1 text-[var(--accent-strong)]">
              knowledge/
            </code>{" "}
            directory was found for this app.
          </p>
        </CardContent>
      </Card>
    );
  }

  const allCategories = listKnowledgeCategories();
  const curated = curatedKnowledgeCategories(allCategories);
  const extras = allCategories.filter((category) => !curated.includes(category));

  return (
    <div className="space-y-8 pb-12">
      <div className="mb-8 pt-2">
        <h1 className="font-display text-3xl tracking-[-0.04em] text-[var(--ink)]">Knowledge</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {allCategories.length} categories, {curated.length} curated
        </p>
      </div>

      <section className="grid gap-5 xl:grid-cols-2">
        {curated.map((category) => (
          <Link key={category} href={`/knowledge/${enc(category)}`}>
            <Card className="h-full transition duration-200 hover:border-[var(--accent)]/35 hover:bg-[var(--warm-soft)] hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <CardContent className="p-7">
                <h2 className="font-display mt-4 text-4xl tracking-[-0.04em] text-[var(--ink)] capitalize">
                  {category.replace(/-/g, " ")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Open the folder and read the documents in the same editorial workspace used for
                  videos.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {extras.length ? (
        <Card>
          <CardContent className="p-7">
            <div className="text-[11px] tracking-[0.22em] text-[var(--muted)] uppercase">
              Additional folders
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {extras.map((category) => (
                <Link key={category} href={`/knowledge/${enc(category)}`}>
                  <Badge tone="quiet">{category}</Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
