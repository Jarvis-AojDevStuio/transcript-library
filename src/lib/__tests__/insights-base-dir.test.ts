import { afterEach, describe, expect, it } from "vitest";
import { insightsBaseDir } from "@/lib/analysis";

const originalInsightsBaseDir = process.env.INSIGHTS_BASE_DIR;

afterEach(() => {
  if (originalInsightsBaseDir === undefined) {
    delete process.env.INSIGHTS_BASE_DIR;
    return;
  }

  process.env.INSIGHTS_BASE_DIR = originalInsightsBaseDir;
});

describe("insightsBaseDir", () => {
  it("falls back to the repo data directory when INSIGHTS_BASE_DIR is unset", () => {
    delete process.env.INSIGHTS_BASE_DIR;

    expect(insightsBaseDir()).toBe(`${process.cwd()}/data/insights`);
  });

  it("uses the configured insights base directory when it is set", () => {
    process.env.INSIGHTS_BASE_DIR = "/srv/transcript-library/insights";

    expect(insightsBaseDir()).toBe("/srv/transcript-library/insights");
  });

  it("ignores blank INSIGHTS_BASE_DIR values", () => {
    process.env.INSIGHTS_BASE_DIR = "   ";

    expect(insightsBaseDir()).toBe(`${process.cwd()}/data/insights`);
  });
});
