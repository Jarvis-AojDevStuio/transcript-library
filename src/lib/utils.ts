/**
 * Shared UI and formatting utilities.
 *
 * @module utils
 */

/**
 * Joins a list of class name values, filtering out falsy entries.
 * @param {...(string|false|null|undefined)} inputs - Class name tokens
 * @returns {string} Space-separated class string
 */
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Formats a numeric count with a correctly pluralised noun.
 * @param {number} value - The count
 * @param {string} noun - Singular noun to pluralise
 * @returns {string} e.g. "1 video" or "3 videos"
 */
export function formatCount(value: number, noun: string) {
  return `${value} ${noun}${value === 1 ? "" : "s"}`;
}
