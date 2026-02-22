import Link from "next/link";
import { Badge } from "@/components/Badge";
import { absTranscriptPath, getVideo } from "@/lib/catalog";
import { Markdown } from "@/components/Markdown";
import { readInsightMarkdown } from "@/lib/insights";
import { curateYouTubeAnalyzer } from "@/lib/curation";
import { AnalysisPanel } from "@/components/AnalysisPanel";

function dec(s: string) {
  return decodeURIComponent(s);
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const id = dec(videoId);
  const video = getVideo(id);

  if (!video) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white/40 p-6">
        Not found.
      </div>
    );
  }

  const insight = readInsightMarkdown(video.videoId).markdown;
  const initialStatus = insight ? "complete" as const : "idle" as const;
  const curated = insight ? curateYouTubeAnalyzer(insight) : null;
  const youtubeUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white/40 p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="text-xs text-[var(--muted)]">Video</div>
              <h1 className="mt-1 font-display text-2xl tracking-tight">
                {video.title}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link href={`/channel/${encodeURIComponent(video.channel)}`}>
                  <Badge tone="neutral">{video.channel}</Badge>
                </Link>
                <Badge tone="neutral">{video.topic}</Badge>
                <Badge tone="neutral">{video.publishedDate}</Badge>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
              >
                Open YouTube
              </a>
              <AnalysisPanel
                videoId={video.videoId}
                initialStatus={initialStatus}
                initialInsight={insight}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    Curated insight
                  </div>
                  {curated ? (
                    <Badge tone="ink">Ready</Badge>
                  ) : (
                    <Badge tone="quiet">No insight</Badge>
                  )}
                </div>

                {curated ? (
                  <div className="space-y-5">
                    {curated.summary ? (
                      <div>
                        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                          Summary
                        </div>
                        <p className="text-[15px] leading-7 text-[color:var(--fg)/0.9]">
                          {curated.summary}
                        </p>
                      </div>
                    ) : null}

                    {curated.takeaways?.length ? (
                      <div>
                        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                          Key takeaways
                        </div>
                        <ul className="space-y-2 text-sm leading-6 text-[color:var(--fg)/0.86]">
                          {curated.takeaways.map((t) => (
                            <li key={t} className="flex gap-3">
                              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/60" />
                              <span className="min-w-0">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {curated.actionItems?.length ? (
                      <div>
                        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                          Action items
                        </div>
                        <ol className="space-y-2 text-sm leading-6 text-[color:var(--fg)/0.86]">
                          {curated.actionItems.map((t, idx) => (
                            <li key={t} className="flex gap-3">
                              <Badge tone="neutral" className="mt-[2px] shrink-0">
                                {idx + 1}
                              </Badge>
                              <span className="min-w-0">{t}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}

                    <details className="rounded-xl border border-black/10 bg-white/50 p-4">
                      <summary className="cursor-pointer select-none text-sm text-[var(--muted)] hover:text-[var(--fg)]">
                        View full report
                      </summary>
                      <div className="mt-3">
                        {/* markdown-rendered full report */}
                        <Markdown>{insight}</Markdown>
                      </div>
                    </details>
                  </div>
                ) : (
                  <div className="text-sm text-[var(--muted)]">
                    No analysis yet. Click &quot;Run analysis&quot; to generate insights.
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Transcript parts
                </div>
                <ol className="space-y-2 text-sm">
                  {video.parts.map((p) => {
                    const abs = absTranscriptPath(p.filePath);
                    return (
                      <li
                        key={p.chunk}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="truncate">Part {p.chunk}</div>
                          <div className="text-xs text-[var(--muted)]">
                            {p.wordCount} words
                          </div>
                        </div>
                        <a
                          className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
                          href={`/api/raw?path=${encodeURIComponent(abs)}`}
                          target="_blank"
                        >
                          Open
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
