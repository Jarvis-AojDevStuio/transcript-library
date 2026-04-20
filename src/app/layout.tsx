import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import Link from "next/link";
import { NavHeader } from "@/components/NavHeader";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
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

const themeInitScript = `
(() => {
  try {
    const key = "transcript-library-theme";
    const stored = window.localStorage.getItem(key);
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "dark" || stored === "light" ? stored : systemDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`;

export const metadata: Metadata = {
  title: "Transcript Library",
  description: "Watch YouTube videos inside the app while reviewing analysis and transcripts.",
  other: {
    "theme-color": "#f0ede6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="min-h-dvh bg-[var(--app-bg)] text-[var(--ink)]">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--accent-foreground)]"
          >
            Skip to main content
          </a>

          <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--app-bg)]/95 saturate-[1.4] backdrop-blur-[20px]">
            <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-4 px-8 py-3">
              <Link href="/" className="font-display text-xl tracking-[-0.03em] text-[var(--ink)]">
                Transcript Library
              </Link>
              <div className="ml-auto flex min-w-0 flex-1 flex-wrap items-center justify-end gap-3">
                <NavHeader />
                <ThemeToggle />
                <SearchBar variant="compact" className="w-full min-[1100px]:max-w-[320px]" />
              </div>
            </div>
          </header>

          <main id="main" className="mx-auto max-w-[1320px] px-8 py-6">
            {children}
          </main>

          <footer className="border-t border-[var(--line)] py-8 text-center text-xs text-[var(--muted)]">
            Transcript Library &mdash; Desktop-first research tool for friends
          </footer>
        </div>
      </body>
    </html>
  );
}
