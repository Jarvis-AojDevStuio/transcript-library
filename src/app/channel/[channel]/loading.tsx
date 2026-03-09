/**
 * Channel page loading skeleton — renders animated placeholders for the channel
 * header and a list of video row cards.
 */
export default function Loading() {
  return (
    <div className="space-y-8 pb-12">
      <div className="mb-8 pt-2">
        <div className="h-4 w-32 animate-pulse rounded bg-black/5" />
        <div className="mt-2 h-12 w-64 animate-pulse rounded bg-black/5" />
        <div className="mt-3 flex gap-4">
          <div className="h-4 w-20 animate-pulse rounded bg-black/5" />
          <div className="h-4 w-32 animate-pulse rounded bg-black/5" />
          <div className="h-4 w-40 animate-pulse rounded bg-black/5" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="h-7 w-20 animate-pulse rounded bg-black/5" />
          <div className="h-4 w-24 animate-pulse rounded bg-black/5" />
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-5"
              style={{ gridTemplateColumns: "1fr auto auto" }}
            >
              <div>
                <div className="h-5 w-3/4 animate-pulse rounded bg-black/5" />
                <div className="mt-1 h-4 w-24 animate-pulse rounded bg-black/5" />
              </div>
              <div className="h-7 w-28 animate-pulse rounded-full bg-black/5" />
              <div className="h-4 w-20 animate-pulse rounded bg-black/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
