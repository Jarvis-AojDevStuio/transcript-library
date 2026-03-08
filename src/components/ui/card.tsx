import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-[var(--shadow-card)]",
          className,
        )}
        {...props}
      />
    );
  },
);

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-3 p-6", className)} {...props} />;
  },
);

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function CardTitle({ className, ...props }, ref) {
    return <p ref={ref} className={cn("font-display text-2xl leading-none tracking-[-0.03em]", className)} {...props} />;
  },
);

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm leading-6 text-[var(--muted)]", className)} {...props} />;
});

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("px-6 pb-6", className)} {...props} />;
  },
);

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
