export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export function formatCount(value: number, noun: string) {
  return `${value} ${noun}${value === 1 ? "" : "s"}`;
}
