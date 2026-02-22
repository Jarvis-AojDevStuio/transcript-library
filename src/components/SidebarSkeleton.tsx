export default function SidebarSkeleton() {
  return (
    <aside className="sticky top-[72px] hidden h-[calc(100dvh-72px)] w-full overflow-auto pr-2 lg:block">
      <div className="space-y-4">
        <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="mb-3 h-3 w-16 animate-pulse rounded bg-black/5" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-black/5" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 bg-[color:var(--card)] p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="mb-3 h-3 w-20 animate-pulse rounded bg-black/5" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-9 animate-pulse rounded-xl bg-black/5" />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
