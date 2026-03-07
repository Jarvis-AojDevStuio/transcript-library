import Link from "next/link";
import { Badge } from "@/components/Badge";
import { listChannels } from "@/modules/catalog";
import { listRecentKnowledge } from "@/modules/recent";

function slug(s: string) {
  return encodeURIComponent(s);
}

export default async function Page() {
  const channels = listChannels();
  const recentKnowledge = listRecentKnowledge(6);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white/40 p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl tracking-tight">Library</h1>
          <p className="max-w-2xl text-sm text-[var(--muted)]">
            Browse channels and keep a video page open while you watch. Your knowledge notes live
            alongside the generated insights.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link href="/knowledge">
              <Badge tone="neutral">Browse knowledge</Badge>
            </Link>
            <Badge tone="quiet">Local-first</Badge>
          </div>
        </div>
      </section>

      {recentKnowledge.length ? (
        <section className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
              Recent knowledge
            </div>
            <Link href="/knowledge">
              <Badge tone="neutral">All</Badge>
            </Link>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {recentKnowledge.map((k) => (
              <Link
                key={`${k.category}/${k.relPath}`}
                href={`/knowledge/${encodeURIComponent(k.category)}/${encodeURIComponent(k.relPath)}`}
                className="rounded-xl border border-black/10 bg-white/45 px-4 py-3 hover:bg-white/70"
              >
                <div className="truncate text-sm font-medium">{k.title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone="neutral">{k.category}</Badge>
                  <Badge tone="quiet">Note</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section id="channels" className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.channel}
            href={`/channel/${slug(c.channel)}`}
            className="group rounded-2xl border border-black/10 bg-[color:var(--card)] p-5 shadow-[0_1px_0_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-display text-lg leading-tight tracking-tight">{c.channel}</div>
                <div className="mt-1 text-xs text-[var(--muted)]">
                  {c.videoCount} {c.videoCount === 1 ? "video" : "videos"} • {c.topics.length}{" "}
                  {c.topics.length === 1 ? "topic" : "topics"}
                </div>
              </div>
              <Badge tone="neutral">{c.lastPublishedDate || "—"}</Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.topics.slice(0, 5).map((t) => (
                <Badge key={t} tone="quiet">
                  {t}
                </Badge>
              ))}
              {c.topics.length > 5 ? <Badge tone="quiet">+{c.topics.length - 5}</Badge> : null}
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
