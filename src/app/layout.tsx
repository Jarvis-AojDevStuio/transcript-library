import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

function SidebarSkeleton() {
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

export const metadata: Metadata = {
  title: "Transcript Library",
  description: "Browse-first library for playlist transcripts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
          <header className="sticky top-0 z-40 border-b border-black/10 bg-[color:var(--bg)/0.75] backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
              <div className="flex items-baseline gap-3">
                <Link href="/" className="font-display text-lg tracking-tight">
                  Transcript Library
                </Link>
                <span className="text-xs text-[var(--muted)]">browse-first</span>
              </div>
              <nav className="flex items-center gap-3 text-sm">
                <Link className="text-[var(--muted)] hover:text-[var(--fg)]" href="/">
                  Channels
                </Link>
                <Link className="text-[var(--muted)] hover:text-[var(--fg)]" href="/knowledge">
                  Knowledge
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-5 py-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
              <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar />
              </Suspense>
              <div className="min-w-0">{children}</div>
            </div>
          </main>
          <footer className="mx-auto max-w-6xl px-5 pt-12 pb-10 text-xs text-[var(--muted)]">
            Local-only • newest-first • built for &quot;watch mode&quot;
          </footer>
        </div>
      </body>
    </html>
  );
}
