import Link from "next/link";
import { Badge } from "@/components/Badge";
import { listChannels, groupVideos } from "@/lib/catalog";
import { curatedKnowledgeCategories, listKnowledgeCategories } from "@/lib/knowledge";
import { listRecentInsights } from "@/lib/recent";

function enc(s: string) {
  return encodeURIComponent(s);
}

export default async function Sidebar() {
  const channels = listChannels();
  const top = channels.slice(0, 18);

  const allKnowledge = listKnowledgeCategories();
  const knowledge = curatedKnowledgeCategories(allKnowledge).slice(0, 8);

  const videoMap = groupVideos();
  const recentInsights = listRecentInsights(8).map((r) => {
    const v = videoMap.get(r.videoId);
    return {
      ...r,
      title: v?.title ?? r.videoId,
      channel: v?.channel,
    };
  });

  return (
    <aside className="sticky top-[72px] hidden h-[calc(100dvh-72px)] w-full overflow-auto pr-2 lg:block">
      <div className="space-y-4">
        <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
              Library
            </div>
            <Link
              href="/"
              className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
            >
              All channels
            </Link>
          </div>

          <div className="space-y-1">
            {top.map((c) => (
              <Link
                key={c.channel}
                href={`/channel/${enc(c.channel)}`}
                className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm hover:bg-black/8 transition-colors duration-150"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium text-[color:var(--fg)/0.92]">
                    {c.channel}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span>{c.videoCount} videos</span>
                    {c.lastPublishedDate ? <span>• {c.lastPublishedDate}</span> : null}
                  </div>
                </div>
                <div className="shrink-0 rounded-full bg-black/5 px-2 py-1 text-[11px] text-[var(--muted)] group-hover:text-[var(--fg)] group-hover:bg-black/10 transition-colors duration-100">
                  Open
                </div>
              </Link>
            ))}
          </div>

          {channels.length > top.length ? (
            <div className="mt-3 text-xs text-[var(--muted)]">
              Showing {top.length} of {channels.length}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
              Knowledge
            </div>
            <Link
              href="/knowledge"
              className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
            >
              Browse
            </Link>
          </div>

          {knowledge.length ? (
            <div className="space-y-1">
              {knowledge.map((c) => (
                <Link
                  key={c}
                  href={`/knowledge/${enc(c)}`}
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm hover:bg-black/8 transition-colors duration-150"
                >
                  <div className="min-w-0 truncate font-medium text-[color:var(--fg)/0.92] capitalize">
                    {c.replace(/-/g, " ")}
                  </div>
                  <Badge tone="neutral">Open</Badge>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-black/10 bg-white/50 p-3 text-sm">
              <div className="font-medium">Tip</div>
              <div className="mt-1 text-[13px] leading-6 text-[var(--muted)]">
                Drop markdown into <code className="rounded bg-black/5 px-1">knowledge/</code> and
                it’ll show up here.
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--muted)] uppercase">
              Recent insights
            </div>
          </div>

          {recentInsights.length ? (
            <div className="space-y-2">
              {recentInsights.map((r) => (
                <Link
                  key={r.videoId}
                  href={`/video/${enc(r.videoId)}`}
                  className="block rounded-xl px-3 py-2 hover:bg-black/5"
                >
                  <div className="truncate text-sm font-medium text-[color:var(--fg)/0.92]">
                    {r.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {r.channel ? <Badge tone="neutral">{r.channel}</Badge> : null}
                    <Badge tone="ink">Insight</Badge>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-black/10 bg-white/50 p-3 text-sm text-[var(--muted)]">
              Nothing analyzed yet.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
