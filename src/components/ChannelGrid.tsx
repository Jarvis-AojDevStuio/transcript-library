"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCount } from "@/lib/utils";

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

export default function ChannelGrid({ channels }: { channels: ChannelSummary[] }) {
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
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Channel directory</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="quiet">{formatCount(filtered.length, "result")}</Badge>
            <Badge tone="quiet">{formatCount(channels.length, "channel")}</Badge>
          </div>
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="channel-search" className="sr-only">
            Search channels
          </label>
          <Input
            id="channel-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search channels, topics, or creators"
          />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {filtered.map((channel) => (
          <Link key={channel.channel} href={`/channel/${enc(channel.channel)}`}>
            <Card className="group h-full overflow-hidden border-[var(--line)] bg-[var(--surface)] transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Channel</div>
                    <h3 className="mt-3 truncate font-display text-[1.85rem] leading-none tracking-[-0.04em] text-[var(--ink)]">
                      {channel.channel}
                    </h3>
                  </div>
                  <Badge tone="amber">{channel.lastPublishedDate || "Archive"}</Badge>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[var(--panel)] p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Videos</div>
                    <div className="mt-2 text-2xl font-semibold text-[var(--ink)]">{channel.videoCount}</div>
                  </div>
                  <div className="rounded-2xl bg-[var(--panel)] p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Topics</div>
                    <div className="mt-2 text-2xl font-semibold text-[var(--ink)]">{channel.topics.length}</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {channel.topics.slice(0, 5).map((topic) => (
                    <Badge key={topic} tone="quiet">
                      {topic}
                    </Badge>
                  ))}
                  {channel.topics.length > 5 ? (
                    <Badge tone="quiet">+{channel.topics.length - 5}</Badge>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {!filtered.length ? (
        <Card className="border-dashed bg-white/55">
          <CardContent className="p-8 text-sm text-[var(--muted)]">
            No channels match <span className="font-medium text-[var(--ink)]">{query}</span>.
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}
