/**
 * Curates raw YouTubeAnalyzer markdown into structured, UI-friendly pieces.
 *
 * Parses known section headings (Summary, Key Takeaways, Notable Points, Action
 * Items) from analysis markdown and returns typed excerpts for rendering.
 *
 * @module curation
 */

/**
 * Structured excerpt of a YouTube analysis report.
 * @typedef {Object} CuratedInsight
 * @property {string} [summary] - First paragraph of the Summary section
 * @property {string[]} [takeaways] - Up to 8 key takeaway bullets
 * @property {string[]} [notablePoints] - Up to 10 notable-points bullets
 * @property {string[]} [actionItems] - Up to 10 action-item bullets
 */
export type CuratedInsight = {
  summary?: string;
  takeaways?: string[];
  notablePoints?: string[];
  actionItems?: string[];
};

/**
 * Normalises markdown by stripping carriage returns and trimming whitespace.
 * @param {string} md - Raw markdown string
 * @returns {string} Normalised markdown
 * @internal
 */
function normalize(md: string) {
  return md.replace(/\r/g, "").trim();
}

/**
 * Extracts the body of the first heading matching `heading` from `md`.
 * Returns the lines between that heading and the next heading at any level,
 * or null if the heading is not found or the section is empty.
 * @param {string} md - Markdown to search
 * @param {RegExp} heading - Pattern to match the target heading line
 * @returns {string|null} Section body text, or null if absent/empty
 * @internal
 */
function pickSection(md: string, heading: RegExp) {
  const src = normalize(md);
  const lines = src.split("\n");

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (heading.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return null;

  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (/^#{1,6}\s+/.test(lines[i].trim())) {
      end = i;
      break;
    }
  }

  return lines.slice(start, end).join("\n").trim() || null;
}

/**
 * Strips inline markdown formatting (code spans, bold, underscores,
 * links, and blockquote markers) from a string.
 * @param {string} s - String with markdown formatting
 * @returns {string} Plain-text string
 * @internal
 */
function stripMd(s: string) {
  return s
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .trim();
}

/**
 * Parses a markdown section into an array of plain-text bullet strings.
 * Handles standard list markers (`-`, `*`, `1.`) as well as plain paragraph
 * lines. Deduplicates results.
 * @param {string|null} section - Section body from `pickSection`
 * @returns {string[]} Deduplicated plain-text bullet strings
 * @internal
 */
function bulletsFrom(section: string | null): string[] {
  if (!section) return [];

  const out: string[] = [];
  for (const raw of section.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    const m = line.match(/^(-|\*|\d+\.)\s+(.*)$/);
    if (m) {
      out.push(stripMd(m[2]));
      continue;
    }

    // If the section is written as paragraphs, treat each non-empty line as a point.
    // (We'll de-dupe later.)
    if (!/^```/.test(line)) {
      out.push(stripMd(line));
    }
  }

  return Array.from(new Set(out)).filter(Boolean);
}

/**
 * Extracts the first non-empty paragraph from a markdown section as plain text.
 * Strips code fences, collapses whitespace, and removes inline markdown.
 * @param {string|null} section - Section body from `pickSection`
 * @returns {string|null} First paragraph text, or null if the section is empty
 * @internal
 */
function paragraphFrom(section: string | null): string | null {
  if (!section) return null;
  const cleaned = stripMd(section)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paras = cleaned
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return paras[0] || null;
}

/**
 * Curate the raw YouTubeAnalyzer markdown into UI-friendly pieces.
 * This is intentionally heuristic: the report structure is *mostly* stable,
 * but we favor "useful now" over perfect parsing.
 * @param {string} md - Raw analysis markdown
 * @returns {CuratedInsight} Structured insight excerpt
 */
export function curateYouTubeAnalyzer(md: string): CuratedInsight {
  const summarySec =
    pickSection(md, /^#{1,6}\s+summary\b/i) ?? pickSection(md, /^#{1,6}\s+executive summary\b/i);

  const takeawaysSec =
    pickSection(md, /^#{1,6}\s+key takeaways\b/i) ?? pickSection(md, /^#{1,6}\s+takeaways\b/i);

  const notableSec =
    pickSection(md, /^#{1,6}\s+notable points\b/i) ?? pickSection(md, /^#{1,6}\s+notable\b/i);

  const actionSec =
    pickSection(md, /^#{1,6}\s+action items\b/i) ??
    pickSection(md, /^#{1,6}\s+actions\b/i) ??
    pickSection(md, /^#{1,6}\s+next steps\b/i);

  const summary = paragraphFrom(summarySec) ?? paragraphFrom(md);

  const takeaways = bulletsFrom(takeawaysSec).slice(0, 8);
  const notablePoints = bulletsFrom(notableSec).slice(0, 10);
  const actionItems = bulletsFrom(actionSec).slice(0, 10);

  return {
    summary: summary || undefined,
    takeaways: takeaways.length ? takeaways : undefined,
    notablePoints: notablePoints.length ? notablePoints : undefined,
    actionItems: actionItems.length ? actionItems : undefined,
  };
}
