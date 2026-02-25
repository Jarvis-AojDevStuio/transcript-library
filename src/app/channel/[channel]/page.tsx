import Link from "next/link";
import { Badge } from "@/components/Badge";
import { listVideosByChannel } from "@/lib/catalog";
import { hasInsight } from "@/lib/insights";

function dec(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function enc(s: string) {
  return encodeURIComponent(s);
}

export default async function ChannelPage({ params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;
  const channelName = dec(channel);
  const videos = listVideosByChannel(channelName);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white/40 p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs text-[var(--muted)]">Channel</div>
            <h1 className="font-display text-2xl tracking-tight">{channelName}</h1>
            <div className="mt-2 text-sm text-[var(--muted)]">
              {videos.length} videos • newest first
            </div>
          </div>
          <Link
            href="/"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--fg)]"
          >
            Back
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-[color:var(--card)] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        {videos.map((v, i) => {
          const insightExists = hasInsight(v.videoId);
          return (
            <a
              key={v.videoId}
              href={`/video/${enc(v.videoId)}`}
              className={`block px-5 py-3 transition hover:bg-black/[0.04] ${i > 0 ? "border-t border-black/8" : ""}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="min-w-0">
                  <div className="font-display truncate text-base tracking-tight">{v.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge tone="neutral">{v.topic}</Badge>
                    <Badge tone="neutral">{v.totalChunks} parts</Badge>
                    {insightExists ? (
                      <Badge tone="ink">Insight</Badge>
                    ) : (
                      <Badge tone="quiet">No insight</Badge>
                    )}
                  </div>
                </div>
                <div className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-[var(--muted)]">
                  {v.publishedDate || "—"}
                </div>
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
}
