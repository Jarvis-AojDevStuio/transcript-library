import { describe, expect, it } from "vitest";
import { parseStructuredAnalysis } from "@/lib/analysis-contract";

const validPayload = {
  schemaVersion: 1,
  videoId: "abc123xyz89",
  title: "Structured Analysis",
  summary: "Short summary.",
  takeaways: ["One", "Two"],
  actionItems: ["Act"],
  notablePoints: ["Note"],
  reportMarkdown: "# Report",
};

describe("parseStructuredAnalysis", () => {
  it("accepts valid structured analysis JSON", () => {
    const result = parseStructuredAnalysis(JSON.stringify(validPayload));

    expect(result).toEqual(validPayload);
  });

  it("accepts fenced JSON payloads", () => {
    const result = parseStructuredAnalysis(
      ["```json", JSON.stringify(validPayload, null, 2), "```"].join("\n"),
    );

    expect(result.summary).toBe("Short summary.");
  });

  it("rejects invalid JSON", () => {
    expect(() => parseStructuredAnalysis("{nope")).toThrow(/valid json/i);
  });

  it("rejects payloads missing required fields", () => {
    expect(() =>
      parseStructuredAnalysis(
        JSON.stringify({
          ...validPayload,
          reportMarkdown: "",
        }),
      ),
    ).toThrow(/reportMarkdown/i);
  });

  it("rejects non-array section fields", () => {
    expect(() =>
      parseStructuredAnalysis(
        JSON.stringify({
          ...validPayload,
          takeaways: "not-an-array",
        }),
      ),
    ).toThrow(/takeaways/i);
  });

  it("rejects arrays containing blank values", () => {
    expect(() =>
      parseStructuredAnalysis(
        JSON.stringify({
          ...validPayload,
          actionItems: ["ok", "   "],
        }),
      ),
    ).toThrow(/actionItems/i);
  });
});
