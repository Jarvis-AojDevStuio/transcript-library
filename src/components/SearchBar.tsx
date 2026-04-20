import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  variant?: "compact" | "hero";
  className?: string;
  autoFocus?: boolean;
  defaultQuery?: string;
  query?: string;
  onQueryChange?: (value: string) => void;
  pending?: boolean;
};

const copyByVariant = {
  compact: {
    placeholder: "Search videos, transcripts, insights, and knowledge",
    buttonLabel: "Search",
    pendingLabel: "Searching",
  },
  hero: {
    placeholder: "Search transcript text, insight summaries, action items, and knowledge docs",
    buttonLabel: "Search library",
    pendingLabel: "Searching",
  },
} as const;

export function SearchBar({
  variant = "compact",
  className,
  autoFocus = false,
  defaultQuery = "",
  query,
  onQueryChange,
  pending = false,
}: SearchBarProps) {
  const copy = copyByVariant[variant];
  const isControlled = typeof query === "string";

  return (
    <form
      suppressHydrationWarning
      action="/search"
      className={cn(
        "flex items-center gap-2",
        variant === "hero"
          ? "w-full rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-2 shadow-[var(--shadow-card)]"
          : "w-full rounded-2xl",
        className,
      )}
    >
      <label htmlFor={"search-" + variant} className="sr-only">
        Search transcript library
      </label>
      <Input
        id={"search-" + variant}
        type="search"
        name="q"
        value={isControlled ? query : undefined}
        defaultValue={isControlled ? undefined : defaultQuery}
        onChange={onQueryChange ? (event) => onQueryChange(event.target.value) : undefined}
        placeholder={copy.placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        className={cn(
          variant === "hero"
            ? "h-12 border-transparent bg-transparent text-base shadow-none focus:border-[var(--accent)]/35 focus:bg-[var(--surface-elevated)]"
            : "h-10 min-w-0 border-[var(--line)] bg-[var(--surface-elevated)] shadow-none",
        )}
      />
      <button
        type="submit"
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition",
          variant === "hero"
            ? "h-12 bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-strong)]"
            : "h-10 bg-[var(--ink)] text-[var(--surface-elevated)] hover:opacity-90",
        )}
      >
        {pending ? copy.pendingLabel : copy.buttonLabel}
      </button>
    </form>
  );
}
