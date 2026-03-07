import Link from "next/link";
import { Badge } from "@/components/Badge";
import ChannelGrid from "@/components/ChannelGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listChannels } from "@/modules/catalog";
import { listRecentKnowledge } from "@/modules/recent";

function enc(value: string) {
  return encodeURIComponent(value);
}

export default async function Page() {
  const channels = listChannels();
  const recentKnowledge = listRecentKnowledge(4);
  const totalVideos = channels.reduce((sum, channel) => sum + channel.videoCount, 0);

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--line)] [background:var(--surface-hero)] px-8 py-10 shadow-[var(--shadow-card)] lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(31,78,162,0.18),_transparent_33%),radial-gradient(circle_at_80%_20%,_rgba(212,118,64,0.18),_transparent_28%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_360px] xl:items-end">
          <div>
            <Badge tone="amber">Desktop research mode</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.05em] text-[var(--ink)] xl:text-7xl">
              Watch the source while the analysis stays in view.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-strong)]">
              The library is now structured as a viewing desk instead of a document archive. Open any video,
              keep the player embedded inside the app, and read the generated synthesis without leaving the page.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#channels">
                <Button size="lg">Open channels</Button>
              </Link>
              <Link href="/knowledge">
                <Button variant="outline" size="lg">
                  Browse knowledge
                </Button>
              </Link>
            </div>
          </div>

          <Card className="border-white/60 bg-white/78 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Current footprint</div>
                  <div className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--ink)]">{totalVideos}</div>
                  <p className="mt-1 text-sm text-[var(--muted)]">videos already indexed across the transcript repo</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[var(--panel)] p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Channels</div>
                    <div className="mt-2 text-2xl font-semibold text-[var(--ink)]">{channels.length}</div>
                  </div>
                  <div className="rounded-2xl bg-[var(--panel)] p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Knowledge</div>
                    <div className="mt-2 text-2xl font-semibold text-[var(--ink)]">{recentKnowledge.length}</div>
                  </div>
                </div>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  The new video workspace keeps playback, analysis, transcript parts, and channel context visible at the same time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <Card className="overflow-hidden bg-[var(--surface)]">
          <CardContent className="p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Workflow</div>
                <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">Purpose-built for simultaneous watching and reading.</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["01", "Embedded player", "Watch YouTube in-app without splitting attention across browser tabs."],
                ["02", "Curated analysis", "Generated summaries and action items stay beside the source material."],
                ["03", "Transcript access", "Open raw transcript chunks instantly when you need exact language."],
              ].map(([index, title, body]) => (
                <div key={index} className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5">
                  <div className="text-sm font-semibold text-[var(--accent-strong)]">{index}</div>
                  <div className="mt-4 text-lg font-medium text-[var(--ink)]">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--surface)]">
          <CardContent className="p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Fresh knowledge</div>
                <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-[var(--ink)]">Recent notes</h2>
              </div>
              <Link href="/knowledge">
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </Link>
            </div>
            <div className="mt-6 space-y-3">
              {recentKnowledge.map((item) => (
                <Link
                  key={`${item.category}/${item.relPath}`}
                  href={`/knowledge/${enc(item.category)}/${enc(item.relPath)}`}
                  className="block rounded-[24px] border border-[var(--line)] bg-white/82 p-5 transition hover:border-[var(--accent)]/25 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-lg font-medium text-[var(--ink)]">{item.title}</div>
                      <div className="mt-2 text-sm text-[var(--muted)]">{item.category}</div>
                    </div>
                    <Badge tone="quiet">Note</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="channels" className="space-y-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Explore</div>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">Channel workspace directory</h2>
        </div>
        <ChannelGrid channels={channels} />
      </section>
    </div>
  );
}
