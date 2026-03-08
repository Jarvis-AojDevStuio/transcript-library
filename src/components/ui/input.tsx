import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-2xl border border-[var(--line)] bg-white/80 px-4 py-2 text-sm text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]/35 focus:bg-white focus:ring-4 focus:ring-[var(--accent)]/10",
          className,
        )}
        {...props}
      />
    );
  },
);

export { Input };
