import fs from "node:fs";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TranscriptViewer } from "@/components/TranscriptViewer";
import { VideoAnalysisWorkspace } from "@/components/VideoAnalysisWorkspace";
import { VideoPlayerEmbed } from "@/components/VideoPlayerEmbed";
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
        <Link href="/" className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition hover:bg-[var(--accent-strong)]">
          Return to library
        </Link>
      </div>
    );
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.videoId)}`;

  /* Read transcript file contents server-side */
  const transcriptParts = video.parts.map((part) => {
    let content = "";
    try {
      content = fs.readFileSync(absTranscriptPath(part.filePath), "utf8");
    } catch {
      content = "[Transcript file not available]";
    }
    return {
      chunk: part.chunk,
      totalChunks: video.totalChunks,
      wordCount: part.wordCount,
      content,
    };
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb */}
      <div className="pt-2">
        <Breadcrumb items={[
          { label: "Library", href: "/" },
          { label: video.channel, href: `/channel/${encodeURIComponent(video.channel)}` },
          { label: video.title },
        ]} />
      </div>

      {/* Player */}
      <div className="overflow-hidden rounded-[24px] bg-[#0d0d0d] shadow-[0_20px_60px_rgba(26,24,20,0.14)]">
        <VideoPlayerEmbed videoId={video.videoId} title={video.title} />
      </div>

      {/* Metadata bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">{video.topic}</Badge>
          <Badge tone="quiet">{video.publishedDate || "Undated"}</Badge>
          <Badge tone="quiet">{formatCount(video.totalChunks, "part")}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--panel)]"
          >
            YouTube <ExternalIcon />
          </a>
        </div>
      </div>

      {/* Analysis workspace */}
      <VideoAnalysisWorkspace videoId={video.videoId} />

      {/* Transcript */}
      <TranscriptViewer parts={transcriptParts} />
    </div>
  );
}
