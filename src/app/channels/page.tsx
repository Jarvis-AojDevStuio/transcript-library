import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { listChannels, groupVideos } from "@/modules/catalog";
import { hasInsight } from "@/modules/insights";

function enc(value: string) {
  return encodeURIComponent(value);
}

export default async function ChannelsPage() {
  const channels = listChannels();
  const videos = groupVideos();

  const analyzedByChannel: Record<string, number> = {};
  for (const v of videos.values()) {
    if (hasInsight(v.videoId)) {
      analyzedByChannel[v.channel] = (analyzedByChannel[v.channel] || 0) + 1;
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="pt-2">
        <Breadcrumb items={[{ label: "Library", href: "/" }, { label: "All Channels" }]} />
        <h1 className="font-display text-[2.75rem] leading-tight tracking-[-0.035em] text-[var(--ink)]">
          Channels
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {channels.length} channels in the library
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[var(--line)] bg-[var(--panel)]">
              <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Channel
              </th>
              <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Videos
              </th>
              <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Analyzed
              </th>
              <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Topics
              </th>
            </tr>
          </thead>
          <tbody>
            {channels.map((channel) => {
              const analyzed = analyzedByChannel[channel.channel] || 0;
              return (
                <tr key={channel.channel} className="group border-b border-[var(--line)] transition hover:bg-[var(--warm-soft)] last:border-b-0">
                  <td className="px-6 py-4">
                    <Link
                      href={`/channel/${enc(channel.channel)}`}
                      className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--ink)] transition group-hover:text-[var(--accent)]"
                    >
                      {channel.channel}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--muted)]">
                    <strong className="font-semibold text-[var(--ink)]">{channel.videoCount}</strong>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {analyzed > 0 ? (
                      <span className="inline-flex items-center gap-1.5 text-[#1a7a1a]">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1a7a1a]" />
                        {analyzed}
                      </span>
                    ) : (
                      <span className="text-[var(--muted)]">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {channel.topics.slice(0, 3).map((topic, i) => (
                        <Badge
                          key={topic}
                          tone={i === 0 ? "amber" : "quiet"}
                          className="text-[10px] px-2 py-0.5"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {channel.topics.length > 3 && (
                        <Badge tone="quiet" className="text-[10px] px-2 py-0.5">
                          +{channel.topics.length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
