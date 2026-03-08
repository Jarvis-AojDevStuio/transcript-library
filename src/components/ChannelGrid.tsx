"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/ui/input";

export type ChannelSummary = {
  channel: string;
  topics: string[];
  videoCount: number;
  lastPublishedDate?: string;
};

function norm(value: string): string {
  return value.trim().toLowerCase();
}

function enc(value: string) {
  return encodeURIComponent(value);
}

export default function ChannelGrid({
  channels,
  analyzedByChannel = {},
}: {
  channels: ChannelSummary[];
  analyzedByChannel?: Record<string, number>;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = norm(query);
    if (!normalized) return channels;

    return channels.filter((channel) => {
      const haystack = `${channel.channel} ${channel.topics.join(" ")}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [channels, query]);

  return (
    <div className="space-y-5">
      <div className="w-full max-w-md">
        <label htmlFor="channel-search" className="sr-only">
          Search channels
        </label>
        <Input
          id="channel-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search channels or topics..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((channel) => {
          const analyzed = analyzedByChannel[channel.channel] || 0;
          return (
            <Link
              key={channel.channel}
              href={`/channel/${enc(channel.channel)}`}
              className="group cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-white/80 hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="font-display text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-[var(--ink)]">
                {channel.channel}
              </h3>

              <div className="mt-2 flex gap-3 text-[13px] text-[var(--muted)]">
                <span>
                  <strong className="font-semibold text-[var(--ink)]">{channel.videoCount}</strong>{" "}
                  {channel.videoCount === 1 ? "video" : "videos"}
                </span>
                <span>
                  <strong className="font-semibold text-[var(--ink)]">{analyzed}</strong>{" "}
                  analyzed
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {channel.topics.slice(0, 4).map((topic, i) => (
                  <Badge
                    key={topic}
                    tone={i === 0 ? "amber" : "quiet"}
                    className="text-[10px] px-2 py-0.5"
                  >
                    {topic}
                  </Badge>
                ))}
                {channel.topics.length > 4 && (
                  <Badge tone="quiet" className="text-[10px] px-2 py-0.5">
                    +{channel.topics.length - 4}
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {!filtered.length && (
        <div className="rounded-lg border border-dashed border-[var(--line)] bg-white/55 p-8 text-sm text-[var(--muted)]">
          No channels match <span className="font-medium text-[var(--ink)]">{query}</span>.
        </div>
      )}
    </div>
  );
}
