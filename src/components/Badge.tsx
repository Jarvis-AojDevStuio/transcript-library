import React from "react";

type Tone = "neutral" | "ink" | "quiet";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  title?: string;
};

const tones: Record<Tone, string> = {
  // museum label energy: hairline border, near-white fill, crisp type
  neutral:
    "border-black/10 bg-white/55 text-[color:var(--fg)/0.78]",
  // a deliberate “ink stamp” for status
  ink:
    "border-[var(--ink)]/20 bg-[var(--ink)] text-[var(--accent)]",
  // very quiet, almost placeholder
  quiet:
    "border-black/10 bg-black/5 text-[var(--muted)]",
};

export function Badge({ children, tone = "neutral", className = "", title }: Props) {
  return (
    <span
      title={title}
      className={
        "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[11px] " +
        "font-medium uppercase tracking-[0.18em] tabular-nums " +
        tones[tone] +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </span>
  );
}
