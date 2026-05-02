import type { CampaignPackage, QualityScore } from "./types.js";

function clampScore(value: number) {
  return Math.max(1, Math.min(10, Math.round(value)));
}

export function evaluateCampaign(campaign: Omit<CampaignPackage, "score">): QualityScore {
  const hookStrength = clampScore(campaign.selectedHook.hookLine.length > 20 ? 8 : 6);
  const clarity = clampScore(campaign.script.length >= 4 ? 8 : 6);
  const platformFit = clampScore(campaign.shots.length >= 8 ? 9 : 7);
  const productionFeasibility = clampScore(campaign.shots.every(s => s.productionNote) ? 8 : 6);
  const ctaStrength = clampScore(campaign.brief.cta.length > 8 ? 8 : 6);
  const overall = clampScore((hookStrength + clarity + platformFit + productionFeasibility + ctaStrength) / 5);

  const notes = [
    "Strongest when the first shot visually demonstrates the promise, not just says it.",
    "Keep captions short and readable; use punch-ins to emphasize generated outputs.",
    "Create at least 3 hook variants before deciding which version to film."
  ];

  return { hookStrength, clarity, platformFit, productionFeasibility, ctaStrength, overall, notes };
}
