import Link from "next/link";
import { Badge } from "@/components/Badge";
import {
  curatedKnowledgeCategories,
  knowledgeExists,
  listKnowledgeCategories,
} from "@/lib/knowledge";

function enc(s: string) {
  return encodeURIComponent(s);
}

export default function KnowledgeHomePage() {
  if (!knowledgeExists()) {
    return (
      <div className="rounded-3xl border border-black/10 bg-[color:var(--card)] p-6">
        <h1 className="font-display text-2xl tracking-tight">Knowledge</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          No <code className="rounded bg-black/5 px-1">knowledge/</code> folder found in this app.
        </p>
      </div>
    );
  }

  const all = listKnowledgeCategories();
  const curated = curatedKnowledgeCategories(all);
  const extras = all.filter((c) => !curated.includes(c));

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-black/10 bg-[color:var(--card)] p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="font-display text-2xl tracking-tight">Knowledge</h1>
          <div className="text-xs text-[var(--muted)]">Local notes • curated</div>
        </div>
        <p className="mt-3 max-w-[70ch] text-sm leading-6 text-[var(--muted)]">
          This is your hand-written library. Categories are intentionally curated—fast to browse,
          easy to keep tidy.
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        {curated.map((c, i) => (
          <Link
            key={c}
            href={`/knowledge/${enc(c)}`}
            className="stagger-in group rounded-2xl border border-black/10 bg-white/50 p-5 shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:bg-white"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium capitalize tracking-tight">{c.replace(/-/g, " ")}</div>
              <Badge tone="neutral">Open</Badge>
            </div>
            <div className="mt-2 text-sm text-[var(--muted)]">
              Browse notes and summaries.
            </div>
          </Link>
        ))}
      </section>

      {extras.length ? (
        <section className="rounded-3xl border border-black/10 bg-[color:var(--card)] p-6">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            Other folders
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {extras.map((c) => (
              <Link key={c} href={`/knowledge/${enc(c)}`}>
                <Badge tone="neutral">{c}</Badge>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
