import { groupVideos } from "@/lib/catalog";

const FALLBACK_SUGGESTIONS = [
  "cloudflare tunnel",
  "retry queue",
  "vector database",
  "agent workflows",
  "automation",
  "openai",
] as const;

export function getSuggestedSearchTopics(limit = 8): string[] {
  const counts = new Map<string, number>();

  for (const video of groupVideos().values()) {
    const topic = video.topic.trim();
    if (!topic) continue;
    counts.set(topic, (counts.get(topic) ?? 0) + 1);
  }

  const rankedTopics = Array.from(counts.entries())
    .sort((left, right) => {
      if (left[1] !== right[1]) return right[1] - left[1];
      return left[0].localeCompare(right[0]);
    })
    .map(([topic]) => topic);

  const combined = [...rankedTopics, ...FALLBACK_SUGGESTIONS];
  return Array.from(new Set(combined)).slice(0, limit);
}
