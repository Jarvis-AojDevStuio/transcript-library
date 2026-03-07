import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_18px_40px_rgba(26,59,112,0.18)] hover:bg-[var(--accent-strong)]",
  secondary:
    "bg-[var(--panel)] text-[var(--ink)] hover:bg-[var(--panel-strong)]",
  ghost: "bg-transparent text-[var(--muted-strong)] hover:bg-black/5 hover:text-[var(--ink)]",
  outline:
    "border border-[var(--line)] bg-white/70 text-[var(--ink)] hover:border-[var(--accent)]/30 hover:bg-white",
  destructive: "bg-[#a63f3a] text-white hover:bg-[#8d3430]",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-8 rounded-xl px-3 text-xs uppercase tracking-[0.18em]",
  lg: "h-12 rounded-2xl px-6 text-sm uppercase tracking-[0.18em]",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", size = "default", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
});

export { Button };
