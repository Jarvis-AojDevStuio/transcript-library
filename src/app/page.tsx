import Link from "next/link";
import { Badge } from "@/components/Badge";
import { SearchBar } from "@/components/SearchBar";
import { listChannels, groupVideos } from "@/modules/catalog";
import { listRecentKnowledge } from "@/modules/recent";
import { hasInsight } from "@/modules/insights";

export const dynamic = "force-dynamic";

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
 * Home page — displays a hero with library stats, a preview of up to 6 channels
 * (with per-channel analyzed counts), and the 4 most recently modified knowledge
 * documents.
 */
export default async function Page() {
  const channels = listChannels();
  const recentKnowledge = listRecentKnowledge(4);
  const videos = Array.from(groupVideos().values());
  const totalVideos = channels.reduce((sum, ch) => sum + ch.videoCount, 0);

  let analyzedCount = 0;
  const analyzedByChannel: Record<string, number> = {};
  for (const v of videos) {
    const has = hasInsight(v.videoId);
    if (has) {
      analyzedCount++;
      analyzedByChannel[v.channel] = (analyzedByChannel[v.channel] || 0) + 1;
    }
  }

  const displayChannels = channels.slice(0, 6);

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
          A desktop research desk for reviewing YouTube transcripts alongside AI-generated analysis.
          No tabs, no context switching &mdash; everything on one page.
        </p>

        <div className="mt-8 max-w-4xl space-y-3">
          <SearchBar variant="hero" />
          <p className="text-sm text-[var(--muted)]">
            Search exact language across transcript bodies, takeaways, action items, and notable
            points.
          </p>
        </div>

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
              <div className="mt-1 text-[11px] tracking-[0.2em] text-[var(--muted)] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--line)]" />

      {/* Channels — limited to 6 */}
      <section id="channels" className="space-y-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">Channels</h2>
          <Link
            href="/channels"
            className="text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
          >
            View all {channels.length} &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayChannels.map((channel) => {
            const analyzed = analyzedByChannel[channel.channel] || 0;
            return (
              <Link
                key={channel.channel}
                href={`/channel/${enc(channel.channel)}`}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-white/80 hover:shadow-[var(--shadow-card)]"
              >
                <h3 className="font-display text-[1.15rem] leading-tight font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  {channel.channel}
                </h3>
                <div className="mt-2 flex gap-3 text-[13px] text-[var(--muted)]">
                  <span>
                    <strong className="font-semibold text-[var(--ink)]">
                      {channel.videoCount}
                    </strong>{" "}
                    {channel.videoCount === 1 ? "video" : "videos"}
                  </span>
                  <span>
                    <strong className="font-semibold text-[var(--ink)]">{analyzed}</strong> analyzed
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {channel.topics.slice(0, 3).map((topic, i) => (
                    <Badge
                      key={topic}
                      tone={i === 0 ? "amber" : "quiet"}
                      className="px-2 py-0.5 text-[10px]"
                    >
                      {topic}
                    </Badge>
                  ))}
                  {channel.topics.length > 3 && (
                    <Badge tone="quiet" className="px-2 py-0.5 text-[10px]">
                      +{channel.topics.length - 3}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Knowledge — limited to 4 */}
      {recentKnowledge.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">
              Recent Knowledge
            </h2>
            <Link
              href="/knowledge"
              className="text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent-strong)]"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentKnowledge.map((item) => (
              <Link
                key={`${item.category}/${item.relPath}`}
                href={`/knowledge/${enc(item.category)}/${enc(item.relPath)}`}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-card)]"
              >
                <div className="text-[11px] tracking-[0.2em] text-[var(--muted)] uppercase">
                  {item.category}
                </div>
                <div className="mt-2 text-sm leading-snug font-medium text-[var(--ink)]">
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
