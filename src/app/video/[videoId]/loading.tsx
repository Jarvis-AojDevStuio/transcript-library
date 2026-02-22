export default function Loading() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-black/10 bg-white/40 p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="h-4 w-16 animate-pulse rounded bg-black/5" />
        <div className="mt-2 h-8 w-2/3 animate-pulse rounded bg-black/5" />
        <div className="mt-3 flex gap-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-black/5" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-black/5" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-black/5" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-5 lg:col-span-2">
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-black/5" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-black/5" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-black/5" />
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-black/5" />
            <div className="mt-3 space-y-2">
              <div className="h-8 w-full animate-pulse rounded bg-black/5" />
              <div className="h-8 w-full animate-pulse rounded bg-black/5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
