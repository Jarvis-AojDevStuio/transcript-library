import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listChannels, listVideosByChannel } from "@/modules/catalog";
import { hasInsight } from "@/modules/insights";
import { formatCount } from "@/lib/utils";

function dec(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function enc(value: string) {
  return encodeURIComponent(value);
}

export function generateStaticParams() {
  return listChannels().map((channel) => ({ channel: channel.channel }));
}

export default async function ChannelPage({ params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;
  const channelName = dec(channel);
  const videos = listVideosByChannel(channelName);
  const analyzedCount = videos.filter((video) => hasInsight(video.videoId)).length;

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--line)] [background:var(--surface-hero)] px-8 py-9 shadow-[var(--shadow-card)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(28,80,168,0.16),_transparent_30%),radial-gradient(circle_at_75%_20%,_rgba(210,120,72,0.15),_transparent_24%)]" />
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Channel overview</div>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-[-0.05em] text-[var(--ink)]">{channelName}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted-strong)]">
              Open a video from this channel to enter the embedded viewing workspace and keep analysis visible while you watch.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge tone="amber">{formatCount(videos.length, "video")}</Badge>
            <Badge tone="quiet">{formatCount(analyzedCount, "analysis")}</Badge>
            <Link href="/">
              <Button variant="outline">Back to library</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Coverage</div>
            <div className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{videos.length}</div>
            <p className="mt-1 text-sm text-[var(--muted)]">videos available for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Analyses</div>
            <div className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{analyzedCount}</div>
            <p className="mt-1 text-sm text-[var(--muted)]">already synthesized</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Mode</div>
            <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">Split view</div>
            <p className="mt-1 text-sm text-[var(--muted)]">watch and read without leaving the app</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Video lineup</div>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">Choose a session</h2>
        </div>
        <div className="space-y-4">
          {videos.map((video) => {
            const insightExists = hasInsight(video.videoId);

            return (
              <Link key={video.videoId} href={`/video/${enc(video.videoId)}`}>
                <Card className="group overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Video</div>
                        <h3 className="mt-3 font-display text-[2rem] leading-none tracking-[-0.04em] text-[var(--ink)]">
                          {video.title}
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Badge tone="quiet">{video.topic}</Badge>
                          <Badge tone="quiet">{formatCount(video.totalChunks, "transcript part")}</Badge>
                          <Badge tone={insightExists ? "amber" : "neutral"}>
                            {insightExists ? "Analysis ready" : "Needs analysis"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-start gap-3 xl:items-end">
                        <Badge tone="amber">{video.publishedDate || "Undated"}</Badge>
                        <span className="text-sm text-[var(--muted)]">Open workspace</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
