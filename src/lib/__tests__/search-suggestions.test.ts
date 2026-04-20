import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.unmock("@/lib/catalog");
});

describe("getSuggestedSearchTopics", () => {
  it("ranks catalog topics ahead of fallback suggestions and removes duplicates", async () => {
    vi.doMock("@/lib/catalog", () => ({
      groupVideos: () =>
        new Map([
          ["one", { topic: "DevOps" }],
          ["two", { topic: "AI" }],
          ["three", { topic: "DevOps" }],
          ["four", { topic: "" }],
          ["five", { topic: "openai" }],
        ]),
    }));

    const { getSuggestedSearchTopics } = await import("@/lib/search-suggestions");
    expect(getSuggestedSearchTopics(6)).toEqual([
      "DevOps",
      "AI",
      "openai",
      "cloudflare tunnel",
      "retry queue",
      "vector database",
    ]);
  });
});
