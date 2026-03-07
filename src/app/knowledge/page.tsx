import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  curatedKnowledgeCategories,
  knowledgeExists,
  listKnowledgeCategories,
} from "@/modules/knowledge";

function enc(value: string) {
  return encodeURIComponent(value);
}

export default function KnowledgeHomePage() {
  if (!knowledgeExists()) {
    return (
      <Card className="max-w-3xl">
        <CardContent className="p-8">
          <h1 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">Knowledge</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            No <code className="rounded-xl bg-[var(--panel)] px-2 py-1 text-[var(--accent-strong)]">knowledge/</code> directory was found for this app.
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
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--line)] [background:var(--surface-hero)] px-8 py-10 shadow-[var(--shadow-card)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(28,80,168,0.16),_transparent_32%),radial-gradient(circle_at_78%_20%,_rgba(211,120,70,0.15),_transparent_24%)]" />
        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Knowledge base</div>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-[-0.05em] text-[var(--ink)]">Your long-form reference library.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted-strong)]">
              Store essays, documentation, and research notes in a visual system that matches the rest of the workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="amber">{curated.length} curated categories</Badge>
            <Badge tone="quiet">{allCategories.length} total folders</Badge>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {curated.map((category) => (
          <Link key={category} href={`/knowledge/${enc(category)}`}>
            <Card className="h-full transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <CardContent className="p-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Category</div>
                <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] capitalize text-[var(--ink)]">
                  {category.replace(/-/g, " ")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Open the folder and read the documents in the same editorial workspace used for videos.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {extras.length ? (
        <Card>
          <CardContent className="p-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Additional folders</div>
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
