import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SidebarSkeleton() {
  return (
    <aside className="hidden xl:block">
      <Card className="sticky top-6 overflow-hidden [background:var(--sidebar-bg)] text-[var(--sidebar-fg)] shadow-[var(--shadow-sidebar)]">
        <CardHeader className="gap-4 border-b border-white/10 pb-5">
          <div className="skeleton-shimmer h-4 w-28 rounded-full bg-white/10" />
          <div className="skeleton-shimmer h-20 rounded-[24px] bg-white/10" />
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {Array.from({ length: 3 }).map((_, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              <div className="skeleton-shimmer h-3 w-20 rounded-full bg-white/10" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="skeleton-shimmer h-12 rounded-2xl bg-white/8" />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
