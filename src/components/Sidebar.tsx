import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { listChannels, groupVideos } from "@/modules/catalog";
import { curatedKnowledgeCategories, listKnowledgeCategories } from "@/modules/knowledge";
import { listRecentInsights } from "@/modules/recent";
import { formatCount } from "@/lib/utils";

function enc(value: string) {
  return encodeURIComponent(value);
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M8 6.5v11l9-5.5-9-5.5Z" />
    </svg>
  );
}

export default async function Sidebar() {
  const channels = listChannels();
  const featuredChannels = channels.slice(0, 8);
  const knowledge = curatedKnowledgeCategories(listKnowledgeCategories()).slice(0, 7);
  const videoMap = groupVideos();
  const recentInsights = listRecentInsights(6).map((item) => {
    const video = videoMap.get(item.videoId);
    return {
      ...item,
      title: video?.title ?? item.videoId,
      channel: video?.channel ?? "Unknown",
    };
  });

  const totalVideos = channels.reduce((sum, channel) => sum + channel.videoCount, 0);
  const topicCount = channels.reduce((sum, channel) => sum + channel.topics.length, 0);

  return (
    <aside className="hidden xl:block">
      <Card className="sticky top-6 overflow-hidden border-white/10 [background:var(--sidebar-bg)] text-[var(--sidebar-fg)] shadow-[var(--shadow-sidebar)]">
        <CardHeader className="gap-5 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between gap-3">
            <Badge tone="quiet" className="border-white/10 bg-white/10 text-white/70">
              Signal Desk
            </Badge>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white/80">
              <SparkIcon />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">Workspace</div>
            <CardTitle className="mt-3 text-[2rem] text-white">Watch. Read. Synthesize.</CardTitle>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Desktop-first research cockpit for reviewing YouTube transcripts alongside generated analysis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Catalog</div>
              <div className="mt-2 text-2xl font-semibold text-white">{totalVideos}</div>
              <div className="text-xs text-white/50">indexed videos</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Topics</div>
              <div className="mt-2 text-2xl font-semibold text-white">{topicCount}</div>
              <div className="text-xs text-white/50">channel tags</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <nav className="space-y-2">
            <Link
              href="/"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white transition hover:bg-white/12"
            >
              <span>Overview</span>
              <span className="text-white/45">01</span>
            </Link>
            <Link
              href="/knowledge"
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-white/72 transition hover:bg-white/8 hover:text-white"
            >
              <span>Knowledge base</span>
              <span className="text-white/35">02</span>
            </Link>
          </nav>

          <Separator className="bg-white/10" />

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">Featured channels</div>
              <Badge tone="quiet" className="border-white/10 bg-white/8 text-white/65">
                {formatCount(channels.length, "channel")}
              </Badge>
            </div>
            <div className="space-y-2">
              {featuredChannels.map((channel) => (
                <Link
                  key={channel.channel}
                  href={`/channel/${enc(channel.channel)}`}
                  className="block rounded-2xl border border-transparent px-4 py-3 transition hover:border-white/10 hover:bg-white/8"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-white">{channel.channel}</div>
                      <div className="mt-1 text-xs text-white/45">
                        {formatCount(channel.videoCount, "video")}
                      </div>
                    </div>
                    <span className="text-xs text-white/35">{channel.lastPublishedDate || "-"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">Knowledge stacks</div>
            <div className="flex flex-wrap gap-2">
              {knowledge.map((category) => (
                <Link key={category} href={`/knowledge/${enc(category)}`}>
                  <Badge tone="quiet" className="border-white/10 bg-white/8 text-white/70">
                    {category.replace(/-/g, " ")}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">Recent analysis</div>
              <div className="text-xs text-white/35">Live library</div>
            </div>
            <div className="space-y-2">
              {recentInsights.length ? (
                recentInsights.map((item) => (
                  <Link
                    key={item.videoId}
                    href={`/video/${enc(item.videoId)}`}
                    className="flex items-start gap-3 rounded-2xl border border-transparent px-4 py-3 transition hover:border-white/10 hover:bg-white/8"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/75">
                      <PlayIcon />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-white">{item.title}</div>
                      <div className="mt-1 truncate text-xs text-white/45">{item.channel}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4 text-sm leading-6 text-white/55">
                  Run analysis on any video to populate this queue.
                </div>
              )}
            </div>
          </section>
        </CardContent>
      </Card>
    </aside>
  );
}
