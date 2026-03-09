import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { listChannels, listVideosByChannel } from "@/modules/catalog";
import { hasInsight } from "@/modules/insights";
import { formatCount } from "@/lib/utils";

/**
 * Safely decodes a percent-encoded URL segment, returning the original value if
 * decoding fails.
 *
 * @param value - The raw URL segment to decode.
 * @returns The decoded string, or the original `value` on malformed input.
 */
function dec(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

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
 * Generates static route params for every channel in the catalog so the
 * `/channel/[channel]` segment can be pre-rendered at build time.
 *
 * @returns An array of `{ channel }` param objects.
 */
export function generateStaticParams() {
  return listChannels().map((channel) => ({ channel: channel.channel }));
}

/**
 * Channel detail page — lists all videos for a channel with analysis status
 * indicators, topic summary, and publish dates.
 *
 * @param params - Resolved route params containing the percent-encoded channel name.
 */
export default async function ChannelPage({ params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;
  const channelName = dec(channel);
  const videos = listVideosByChannel(channelName);
  const analyzedCount = videos.filter((video) => hasInsight(video.videoId)).length;
  const uniqueTopics = [...new Set(videos.map((v) => v.topic).filter(Boolean))];

  return (
    <div className="space-y-8 pb-12">
      <div className="mb-8 pt-2">
        <Breadcrumb items={[{ label: "Library", href: "/" }, { label: channelName }]} />
        <h1 className="font-display text-[2.75rem] leading-tight tracking-[-0.035em] text-[var(--ink)]">
          {channelName}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
          <span>{formatCount(videos.length, "video")}</span>
          <span>
            {analyzedCount} {analyzedCount === 1 ? "analysis" : "analyses"} complete
          </span>
          {uniqueTopics.length > 0 && <span>Topics: {uniqueTopics.join(", ")}</span>}
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl tracking-[-0.03em] text-[var(--ink)]">Videos</h2>
          <span className="text-sm text-[var(--muted)]">
            {formatCount(videos.length, "session")}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {videos.map((video) => {
            const insightExists = hasInsight(video.videoId);
            return (
              <Link
                key={video.videoId}
                href={`/video/${enc(video.videoId)}`}
                className="grid items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-5 transition hover:border-[var(--ink-faint)] hover:bg-[var(--warm-soft)] hover:shadow-sm"
                style={{ gridTemplateColumns: "1fr auto auto" }}
              >
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold text-[var(--ink)]">
                    {video.title}
                  </div>
                  <div className="mt-0.5 truncate text-[0.8125rem] text-[var(--muted)]">
                    {video.topic}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {insightExists ? (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-medium text-[#1a7a1a]"
                      style={{ backgroundColor: "rgba(34,139,34,0.08)" }}
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1a7a1a]" />
                      Analysis ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--panel)] px-3 py-1 text-[0.8125rem] font-medium text-[var(--muted)]">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                      Needs analysis
                    </span>
                  )}
                </div>
                <span className="text-[0.8125rem] whitespace-nowrap text-[var(--ink-faint)]">
                  {video.publishedDate || "Undated"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
