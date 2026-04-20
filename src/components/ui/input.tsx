import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = "text", ...props }, ref) {
    return (
      <input
        suppressHydrationWarning
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-elevated)] px-4 py-2 text-sm text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]/35 focus:bg-[var(--surface-elevated)] focus:ring-4 focus:ring-[var(--accent)]/10",
          className,
        )}
        {...props}
      />
    );
  },
);

export { Input };
