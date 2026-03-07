import React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "quiet" | "amber";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  title?: string;
};

const tones: Record<Tone, string> = {
  neutral: "border-[var(--line)] bg-white/75 text-[var(--muted-strong)]",
  quiet: "border-transparent bg-[var(--panel)] text-[var(--muted)]",
  amber: "border-[var(--accent)]/15 bg-[var(--accent)]/10 text-[var(--accent-strong)]",
};

export function Badge({ children, tone = "neutral", className, title }: Props) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
