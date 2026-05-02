import { describe, expect, it } from "vitest";
import { generateCampaign } from "./pipeline.js";
import { MockModelClient } from "./mockModel.js";

const brief = {
  brandName: "GlowByte",
  productOrTopic: "AI content planner",
  niche: "creator productivity",
  targetAudience: "solo TikTok creators",
  language: "English",
  region: "US",
  objective: "drive waitlist signups",
  durationSec: 35,
  tone: "native, practical",
  keySellingPoints: ["hooks", "scripts", "shot lists"],
  cta: "Join the waitlist"
};

describe("generateCampaign", () => {
  it("creates a complete campaign package", async () => {
    const result = await generateCampaign(brief, new MockModelClient());
    expect(result.hooks.length).toBeGreaterThan(0);
    expect(result.script.length).toBeGreaterThan(0);
    expect(result.shots.length).toBeGreaterThan(0);
    expect(result.score.overall).toBeGreaterThan(0);
  });
});
