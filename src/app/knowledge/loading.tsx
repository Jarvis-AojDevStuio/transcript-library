/**
 * Knowledge index loading skeleton — renders animated placeholders for the page
 * heading and a grid of category cards.
 */
export default function Loading() {
  return (
    <div className="space-y-8 pb-12">
      <div className="pt-2">
        <div className="h-8 w-36 animate-pulse rounded bg-black/5" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-black/5" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7">
            <div className="h-8 w-1/2 animate-pulse rounded bg-black/5" />
            <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-black/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
