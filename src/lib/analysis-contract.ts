/**
 * Strict runtime contract for structured analysis payloads returned by providers.
 *
 * @module analysis-contract
 */

export type StructuredAnalysis = {
  schemaVersion: 1;
  videoId: string;
  title: string;
  summary: string;
  takeaways: string[];
  actionItems: string[];
  notablePoints: string[];
  reportMarkdown: string;
};

function unwrapJsonFence(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced?.[1]?.trim() ?? trimmed;
}

function readRequiredString(
  payload: Record<string, unknown>,
  key: keyof StructuredAnalysis,
): string {
  const value = payload[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Structured analysis is missing required ${key}.`);
  }
  return value.trim();
}

function readStringArray(
  payload: Record<string, unknown>,
  key: "takeaways" | "actionItems" | "notablePoints",
): string[] {
  const value = payload[key];
  if (!Array.isArray(value)) {
    throw new Error(`Structured analysis field ${key} must be an array of strings.`);
  }

  const normalized = value.map((entry) => {
    if (typeof entry !== "string" || !entry.trim()) {
      throw new Error(`Structured analysis field ${key} must contain only non-empty strings.`);
    }
    return entry.trim();
  });

  return normalized;
}

export function parseStructuredAnalysis(raw: string): StructuredAnalysis {
  const normalized = unwrapJsonFence(raw);

  let parsed: unknown;
  try {
    parsed = JSON.parse(normalized);
  } catch (error) {
    throw new Error(`Structured analysis is not valid JSON: ${(error as Error).message}`);
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Structured analysis payload must be a JSON object.");
  }

  const payload = parsed as Record<string, unknown>;
  if (payload.schemaVersion !== 1) {
    throw new Error("Structured analysis schemaVersion must be 1.");
  }

  return {
    schemaVersion: 1,
    videoId: readRequiredString(payload, "videoId"),
    title: readRequiredString(payload, "title"),
    summary: readRequiredString(payload, "summary"),
    takeaways: readStringArray(payload, "takeaways"),
    actionItems: readStringArray(payload, "actionItems"),
    notablePoints: readStringArray(payload, "notablePoints"),
    reportMarkdown: readRequiredString(payload, "reportMarkdown"),
  };
}
