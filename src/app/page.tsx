import Link from "next/link";
import ChannelGrid from "@/components/ChannelGrid";
import { listChannels, groupVideos } from "@/modules/catalog";
import { listRecentKnowledge } from "@/modules/recent";
import { hasInsight } from "@/modules/insights";

function enc(value: string) {
  return encodeURIComponent(value);
}

export default async function Page() {
  const channels = listChannels();
  const recentKnowledge = listRecentKnowledge(8);
  const videos = groupVideos();
  const totalVideos = channels.reduce((sum, ch) => sum + ch.videoCount, 0);

  // Count analyzed videos (those with insights)
  let analyzedCount = 0;
  const analyzedByChannel: Record<string, number> = {};
  for (const v of videos.values()) {
    const has = hasInsight(v.videoId);
    if (has) {
      analyzedCount++;
      analyzedByChannel[v.channel] = (analyzedByChannel[v.channel] || 0) + 1;
    }
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Hero */}
      <div className="pt-4">
        <h1 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">
          Watch the source.
          <br />
          Read the synthesis.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--muted)]">
          A desktop research desk for reviewing YouTube transcripts alongside
          AI-generated analysis. No tabs, no context switching &mdash; everything
          on one page.
        </p>

        {/* Stats row */}
        <div className="mt-8 flex gap-10">
          {[
            { value: totalVideos, label: "Videos" },
            { value: channels.length, label: "Channels" },
            { value: analyzedCount, label: "Analyses" },
            { value: recentKnowledge.length, label: "Knowledge" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl tracking-[-0.03em] text-[var(--ink)]">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--line)]" />

      {/* Channels */}
      <section id="channels" className="space-y-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
            Channels
          </h2>
          <span className="text-sm text-[var(--muted)]">
            {channels.length}
          </span>
        </div>
        <ChannelGrid channels={channels} analyzedByChannel={analyzedByChannel} />
      </section>

      {/* Recent Knowledge */}
      {recentKnowledge.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
              Recent Knowledge
            </h2>
            <Link
              href="/knowledge"
              className="text-sm text-[var(--muted)] transition hover:text-[var(--ink)]"
            >
              {recentKnowledge.length}
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentKnowledge.map((item) => (
              <Link
                key={`${item.category}/${item.relPath}`}
                href={`/knowledge/${enc(item.category)}/${enc(item.relPath)}`}
                className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-card)]"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {item.category}
                </div>
                <div className="mt-2 text-sm font-medium leading-snug text-[var(--ink)]">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
