"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/Badge";

export type ChannelSummary = {
  channel: string;
  topics: string[];
  videoCount: number;
  lastPublishedDate?: string;
};

function norm(s: string): string {
  return s.trim().toLowerCase();
}

function enc(s: string) {
  return encodeURIComponent(s);
}

export default function ChannelGrid({
  channels,
}: {
  channels: ChannelSummary[];
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const nq = norm(q);
    if (!nq) return channels;

    return channels.filter((c) => {
      const hay = `${c.channel} ${c.topics.join(" ")}`.toLowerCase();
      return hay.includes(nq);
    });
  }, [channels, q]);

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <Badge tone="quiet">{filtered.length} shown</Badge>
          <Badge tone="quiet">{channels.length} total</Badge>
        </div>

        <div className="w-full sm:w-[340px]">
          <label className="sr-only" htmlFor="channel-search">
            Search channels
          </label>
          <input
            id="channel-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search channels or topics…"
            className="w-full rounded-2xl border border-black/10 bg-white/55 px-4 py-2.5 text-sm shadow-[0_1px_0_rgba(0,0,0,0.05)] outline-none placeholder:text-[color:var(--fg)/0.35] focus:border-black/15 focus:bg-white/70"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.map((c) => (
          <a
            key={c.channel}
            href={`/channel/${enc(c.channel)}`}
            className="group rounded-2xl border border-black/10 bg-[color:var(--card)] p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="truncate font-display text-base leading-tight tracking-tight">
                  {c.channel}
                </div>
                <div className="mt-1 text-xs text-[var(--muted)]">
                  {c.videoCount} videos
                  {c.topics.length ? ` • ${c.topics.length} topics` : ""}
                </div>
              </div>
              <Badge tone="neutral">{c.lastPublishedDate || "—"}</Badge>
            </div>

            {c.topics.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {c.topics.slice(0, 6).map((t) => (
                  <Badge key={t} tone="quiet">
                    {t}
                  </Badge>
                ))}
                {c.topics.length > 6 ? (
                  <Badge tone="quiet">+{c.topics.length - 6}</Badge>
                ) : null}
              </div>
            ) : null}
          </a>
        ))}
      </div>

      {!filtered.length ? (
        <div className="rounded-2xl border border-black/10 bg-white/45 p-6 text-sm text-[var(--muted)]">
          No channels match <span className="font-medium text-[color:var(--fg)/0.85]">“{q}”</span>.
        </div>
      ) : null}
    </section>
  );
}
