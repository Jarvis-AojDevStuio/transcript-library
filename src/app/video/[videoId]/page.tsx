import Link from "next/link";
import { Badge } from "@/components/Badge";
import { VideoAnalysisWorkspace } from "@/components/VideoAnalysisWorkspace";
import { VideoPlayerEmbed } from "@/components/VideoPlayerEmbed";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { absTranscriptPath, groupVideos, getVideo } from "@/modules/catalog";
import { formatCount } from "@/lib/utils";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 13v5a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function generateStaticParams() {
  return Array.from(groupVideos().values()).map((video) => ({
    videoId: video.videoId,
  }));
}

export default async function VideoPage({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;
  const id = decodeURIComponent(videoId);
  const video = getVideo(id);

  if (!video) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">Video not found</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
          The requested video does not exist in the local transcript index.
        </p>
        <Link href="/" className="mt-6">
          <Button>Return to library</Button>
        </Link>
      </div>
    );
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`;

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--line)] [background:var(--surface-hero)] px-8 py-9 shadow-[var(--shadow-card)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,87,178,0.18),_transparent_32%),radial-gradient(circle_at_70%_18%,_rgba(214,117,63,0.16),_transparent_25%)]" />
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Viewing workspace</div>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-[var(--ink)]">
              {video.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/channel/${encodeURIComponent(video.channel)}`}>
                <Badge tone="amber">{video.channel}</Badge>
              </Link>
              <Badge tone="quiet">{video.topic}</Badge>
              <Badge tone="quiet">{video.publishedDate || "Undated"}</Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                Open on YouTube
                <ExternalIcon />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_420px]">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b border-[var(--line)] px-6 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Live player</div>
                    <div className="mt-2 text-xl font-medium text-[var(--ink)]">Embedded YouTube session</div>
                  </div>
                  <Badge tone="amber">In app</Badge>
                </div>
              </div>
              <VideoPlayerEmbed videoId={video.videoId} title={video.title} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <VideoAnalysisWorkspace videoId={video.videoId} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Session metadata</div>
              <div className="mt-5 grid gap-3">
                {[
                  ["Channel", video.channel],
                  ["Topic", video.topic],
                  ["Published", video.publishedDate || "Unknown"],
                  ["Transcript", formatCount(video.totalChunks, "part")],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[var(--panel)] p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
                    <div className="mt-2 text-sm font-medium text-[var(--ink)]">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Transcript parts</div>
                  <div className="mt-2 text-xl font-medium text-[var(--ink)]">Raw chunk access</div>
                </div>
                <Badge tone="quiet">{formatCount(video.parts.length, "file")}</Badge>
              </div>
              <div className="mt-5 space-y-3">
                {video.parts.map((part) => {
                  const absPath = absTranscriptPath(part.filePath);
                  return (
                    <div key={part.chunk} className="rounded-[24px] border border-[var(--line)] bg-white/82 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-[var(--ink)]">Part {part.chunk}</div>
                          <div className="mt-1 text-sm text-[var(--muted)]">{formatCount(part.wordCount, "word")}</div>
                        </div>
                        <a href={`/api/raw?path=${encodeURIComponent(absPath)}`} target="_blank" rel="noreferrer">
                          <Button variant="ghost" size="sm">
                            Open
                          </Button>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
