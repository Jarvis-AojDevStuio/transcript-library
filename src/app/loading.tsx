/**
 * Root-level loading skeleton — mirrors the layout of the home page with animated
 * placeholders for the hero stat row and the channel card grid.
 */
export default function Loading() {
  return (
    <div className="space-y-10 pb-16">
      {/* Hero skeleton */}
      <div className="pt-4">
        <div className="h-12 w-96 animate-pulse rounded bg-black/5" />
        <div className="mt-2 h-12 w-80 animate-pulse rounded bg-black/5" />
        <div className="mt-4 h-5 w-[560px] max-w-full animate-pulse rounded bg-black/5" />
        <div className="mt-8 flex gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="h-8 w-12 animate-pulse rounded bg-black/5" />
              <div className="mt-1 h-3 w-16 animate-pulse rounded bg-black/5" />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-[var(--line)]" />

      {/* Channels skeleton */}
      <div className="space-y-5">
        <div className="flex items-baseline justify-between">
          <div className="h-7 w-32 animate-pulse rounded bg-black/5" />
          <div className="h-4 w-8 animate-pulse rounded bg-black/5" />
        </div>
        <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-black/5" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6">
              <div className="h-6 w-3/4 animate-pulse rounded bg-black/5" />
              <div className="mt-3 flex gap-3">
                <div className="h-4 w-16 animate-pulse rounded bg-black/5" />
                <div className="h-4 w-20 animate-pulse rounded bg-black/5" />
              </div>
              <div className="mt-3 flex gap-1.5">
                <div className="h-5 w-16 animate-pulse rounded-full bg-black/5" />
                <div className="h-5 w-20 animate-pulse rounded-full bg-black/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
