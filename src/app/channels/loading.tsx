/**
 * Channels page loading skeleton — renders animated placeholder rows matching
 * the all-channels table structure.
 */
export default function Loading() {
  return (
    <div className="space-y-6 pb-12">
      <div className="pt-2">
        <div className="h-4 w-32 animate-pulse rounded bg-[var(--panel)]" />
        <div className="mt-4 h-12 w-48 animate-pulse rounded bg-[var(--panel)]" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-[var(--panel)]" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-6 border-b border-[var(--line)] px-6 py-4 last:border-b-0"
          >
            <div className="h-4 w-36 animate-pulse rounded bg-[var(--panel)]" />
            <div className="h-4 w-12 animate-pulse rounded bg-[var(--panel)]" />
            <div className="h-4 w-12 animate-pulse rounded bg-[var(--panel)]" />
            <div className="h-4 w-48 animate-pulse rounded bg-[var(--panel)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
