/**
 * Video page loading skeleton — renders animated placeholders for the breadcrumb,
 * video player aspect-ratio box, metadata bar, and analysis workspace area.
 */
export default function Loading() {
  return (
    <div className="space-y-8 pb-12">
      <div className="pt-2">
        <div className="h-4 w-48 animate-pulse rounded bg-black/5" />
      </div>
      <div className="aspect-video animate-pulse rounded-[24px] bg-[#0d111a]/20" />
      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-black/5" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-black/5" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-black/5" />
        </div>
        <div className="h-9 w-24 animate-pulse rounded-xl bg-black/5" />
      </div>
      <div className="space-y-10">
        <div>
          <div className="mb-5 flex items-baseline justify-between border-b border-[var(--line)] pb-3">
            <div className="h-6 w-24 animate-pulse rounded bg-black/5" />
            <div className="h-3 w-20 animate-pulse rounded bg-black/5" />
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-8 py-7">
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-black/5" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-black/5" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-black/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
