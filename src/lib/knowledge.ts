/**
 * Knowledge-base file system helpers.
 *
 * Provides safe, cached access to the `knowledge/` directory tree, which holds
 * categorised markdown files for the app's shared knowledge base.
 *
 * @module knowledge
 */
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

const KNOWLEDGE_ROOT = path.join(process.cwd(), "knowledge");

/**
 * Returns true if `s` is a non-empty path segment that contains no traversal
 * characters (`..`, `/`, `\`).
 * @param {string} s - Segment to validate
 * @returns {boolean} True if the segment is safe to use in a file path
 * @internal
 */
function isSafeSegment(s: string) {
  return !!s && !s.includes("..") && !s.includes("/") && !s.includes("\\");
}

/**
 * Checks whether the `knowledge/` root directory exists and is a directory.
 * @returns {boolean} True if the knowledge root is accessible
 */
export function knowledgeExists(): boolean {
  try {
    return fs.existsSync(KNOWLEDGE_ROOT) && fs.statSync(KNOWLEDGE_ROOT).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Lists all top-level category directories inside `knowledge/`, sorted
 * alphabetically. Hidden directories (starting with `.`) are excluded.
 * Result is memoised by React's `cache` for the current request.
 * @returns {string[]} Category directory names
 */
export const listKnowledgeCategories = cache(function listKnowledgeCategories(): string[] {
  if (!knowledgeExists()) return [];

  const entries = fs.readdirSync(KNOWLEDGE_ROOT, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => !n.startsWith("."))
    .sort((a, b) => a.localeCompare(b));
});

/**
 * Returns the subset of category names from `all` that appear in the preferred
 * editorial ordering, preserving that order.
 * @param {string[]} all - Full list of available category names
 * @returns {string[]} Filtered and ordered category names
 */
export function curatedKnowledgeCategories(all: string[]): string[] {
  const preferredOrder = [
    "technology",
    "health",
    "business",
    "finance",
    "science",
    "education",
    "general",
    "checklists",
    "social-media",
    "politics",
    "entertainment",
    "articles",
  ];

  const set = new Set(all);
  return preferredOrder.filter((c) => set.has(c));
}

/**
 * Recursively walks `dirAbs` collecting relative paths of `.md` and
 * `.markdown` files. Hidden files and directories are skipped.
 * @param {string} dirAbs - Absolute directory path to walk
 * @param {string} [relBase=""] - Relative prefix accumulated during recursion
 * @param {string[]} [out=[]] - Accumulator for results
 * @returns {string[]} Relative paths of all markdown files found
 * @internal
 */
function walkMdFiles(dirAbs: string, relBase = "", out: string[] = []): string[] {
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const abs = path.join(dirAbs, entry.name);
    const rel = relBase ? path.join(relBase, entry.name) : entry.name;

    if (entry.isDirectory()) {
      walkMdFiles(abs, rel, out);
    } else if (entry.isFile()) {
      const lower = entry.name.toLowerCase();
      if (lower.endsWith(".md") || lower.endsWith(".markdown")) out.push(rel);
    }
  }
  return out;
}

/**
 * Lists all markdown files within a knowledge category, sorted alphabetically.
 * Returns an empty array for unknown or unsafe category names.
 * Result is memoised by React's `cache` for the current request.
 * @param {string} category - Category directory name
 * @returns {string[]} Relative paths of markdown files within the category
 */
export const listKnowledgeMarkdown = cache(function listKnowledgeMarkdown(
  category: string,
): string[] {
  if (!isSafeSegment(category)) return [];
  const catDir = path.join(KNOWLEDGE_ROOT, category);
  try {
    if (!fs.existsSync(catDir) || !fs.statSync(catDir).isDirectory()) return [];
    return walkMdFiles(catDir).sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
});

/**
 * Resolves a category-relative markdown path to an absolute file path,
 * validating that neither the category nor the relative path contains
 * traversal sequences. Returns null if either argument is unsafe.
 * @param {string} category - Knowledge category name
 * @param {string} relPath - Relative path within the category
 * @returns {string|null} Absolute resolved path, or null if unsafe
 * @internal
 */
function resolveKnowledgeMarkdownPath(category: string, relPath: string): string | null {
  if (!isSafeSegment(category)) return null;
  const cleaned = relPath.replace(/\\/g, "/");
  if (!cleaned || cleaned.includes("..")) return null;

  const abs = path.join(KNOWLEDGE_ROOT, category, cleaned);
  const catRoot = path.join(KNOWLEDGE_ROOT, category) + path.sep;
  const resolved = path.resolve(abs);
  if (!resolved.startsWith(path.resolve(catRoot))) return null;

  return resolved;
}

/**
 * Returns the mtime (in milliseconds) of a knowledge markdown file.
 * Returns null if the path is unsafe or the file does not exist.
 * Result is memoised by React's `cache` for the current request.
 * @param {string} category - Knowledge category name
 * @param {string} relPath - Relative path within the category
 * @returns {number|null} File mtime in milliseconds, or null if unavailable
 */
export const knowledgeMarkdownMtime = cache(function knowledgeMarkdownMtime(
  category: string,
  relPath: string,
): number | null {
  const resolved = resolveKnowledgeMarkdownPath(category, relPath);
  if (!resolved) return null;

  try {
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) return null;
    return fs.statSync(resolved).mtimeMs;
  } catch {
    return null;
  }
});

/**
 * Reads and returns the content of a knowledge markdown file as a UTF-8 string.
 * Returns null if the path is unsafe or the file does not exist.
 * Result is memoised by React's `cache` for the current request.
 * @param {string} category - Knowledge category name
 * @param {string} relPath - Relative path within the category
 * @returns {string|null} File contents, or null if unavailable
 */
export const readKnowledgeMarkdown = cache(function readKnowledgeMarkdown(
  category: string,
  relPath: string,
): string | null {
  const resolved = resolveKnowledgeMarkdownPath(category, relPath);
  if (!resolved) return null;

  try {
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) return null;
    return fs.readFileSync(resolved, "utf8");
  } catch {
    return null;
  }
});

/**
 * Derives a human-readable title from a relative markdown file path.
 * Strips the file extension and replaces hyphens and underscores with spaces.
 * @param {string} relPath - Relative path such as `"ai/intro-to-llms.md"`
 * @returns {string} Title string, e.g. `"intro to llms"`
 */
export function titleFromRelPath(relPath: string): string {
  const base = relPath.split(/[\\/]/).pop() ?? relPath;
  const noExt = base.replace(/\.(md|markdown)$/i, "");
  return noExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}
