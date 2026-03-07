"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoPlayerEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
  const posterUrl = `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;

  if (active) {
    return (
      <div className="aspect-video bg-[#0d111a]">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-[#0d111a] text-left"
      aria-label={`Play ${title}`}
    >
      <Image
        src={posterUrl}
        alt={title}
        fill
        sizes="(max-width: 1280px) 100vw, 960px"
        className="object-cover opacity-88 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,16,30,0.72)] via-transparent to-[rgba(10,16,30,0.18)]" />
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/70">Instant preview</div>
          <div className="mt-2 max-w-xl text-xl font-medium text-white">Load player on demand</div>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
            <path d="M8 6.5v11l9-5.5-9-5.5Z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
