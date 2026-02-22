export default function Loading() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white/40 p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="h-8 w-24 animate-pulse rounded bg-black/5" />
        <div className="mt-2 h-4 w-80 animate-pulse rounded bg-black/5" />
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-32 animate-pulse rounded-full bg-black/5" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-black/5" />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="h-6 w-3/4 animate-pulse rounded bg-black/5" />
                <div className="mt-1 h-3 w-1/3 animate-pulse rounded bg-black/5" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded-full bg-black/5" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded-full bg-black/5" />
              <div className="h-5 w-20 animate-pulse rounded-full bg-black/5" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
