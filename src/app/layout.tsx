import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import SidebarSkeleton from "@/components/SidebarSkeleton";
import { Badge } from "@/components/Badge";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Transcript Library",
  description: "Watch YouTube videos inside the app while reviewing analysis and transcripts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        <div className="min-h-dvh bg-[var(--app-bg)] text-[var(--ink)]">
          <div className="mx-auto flex min-h-dvh max-w-[1680px] gap-6 px-4 py-4 lg:px-6 xl:gap-8 xl:px-8 xl:py-6">
            <Suspense fallback={<SidebarSkeleton />}>
              <Sidebar />
            </Suspense>

            <div className="min-w-0 flex-1">
              <header className="sticky top-4 z-30 mb-6 rounded-[28px] border border-white/60 bg-[rgba(248,245,238,0.82)] px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <Link href="/" className="font-display text-3xl tracking-[-0.04em] text-[var(--ink)]">
                      Transcript Library
                    </Link>
                    <Badge tone="quiet" className="hidden md:inline-flex">
                      Desktop-first
                    </Badge>
                  </div>
                  <nav className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
                    <Link className="rounded-full px-3 py-2 transition hover:bg-black/5 hover:text-[var(--ink)]" href="/">
                      Library
                    </Link>
                    <Link className="rounded-full px-3 py-2 transition hover:bg-black/5 hover:text-[var(--ink)]" href="/knowledge">
                      Knowledge
                    </Link>
                  </nav>
                </div>
              </header>

              <main>{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
