import type { CampaignPackage, ShotDesign } from "./types.js";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "campaign";
}

function escapeCsv(value: unknown) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function shotsToCsv(shots: ShotDesign[]) {
  const headers = [
    "shotNo",
    "startSec",
    "endSec",
    "framing",
    "cameraMovement",
    "visual",
    "broll",
    "caption",
    "soundCue",
    "productionNote"
  ];
  const rows = shots.map(shot => headers.map(h => escapeCsv((shot as any)[h])).join(","));
  return [headers.join(","), ...rows].join("\n");
}

export function campaignToMarkdown(campaign: CampaignPackage) {
  const brief = campaign.brief;
  const trendBlock = campaign.trendInsights.map((i, idx) => `### ${idx + 1}. ${i.angle}\n\n- Audience tension: ${i.audienceTension}\n- Content pattern: ${i.contentPattern}\n- Evidence note: ${i.evidenceNote}`).join("\n\n");
  const hookBlock = campaign.hooks.map(h => `- **${h.id}**: ${h.hookLine}\n  - On-screen: ${h.onScreenText}\n  - Visual: ${h.visualAction}\n  - Why: ${h.reason}`).join("\n");
  const scriptBlock = campaign.script.map(s => `| ${s.startSec}-${s.endSec}s | ${s.voiceover} | ${s.onScreenText} | ${s.emotion} |`).join("\n");
  const shotBlock = campaign.shots.map(s => `| ${s.shotNo} | ${s.startSec}-${s.endSec}s | ${s.framing} | ${s.cameraMovement} | ${s.visual} | ${s.caption} |`).join("\n");
  const complianceBlock = campaign.compliance.map(i => `- **${i.severity.toUpperCase()} / ${i.area}**: ${i.issue}\n  - Safer rewrite: ${i.saferRewrite}`).join("\n");

  return `# ${brief.brandName} TikTok Creative Package\n\nGenerated at: ${campaign.createdAt}\n\n## Brief\n\n- Product / Topic: ${brief.productOrTopic}\n- Niche: ${brief.niche}\n- Audience: ${brief.targetAudience}\n- Region: ${brief.region}\n- Language: ${brief.language}\n- Objective: ${brief.objective}\n- Duration: ${brief.durationSec}s\n- Tone: ${brief.tone}\n- CTA: ${brief.cta}\n\n## Trend Angles\n\n${trendBlock}\n\n## Hook Options\n\n${hookBlock}\n\n## Selected Hook\n\n**${campaign.selectedHook.hookLine}**\n\n## Voiceover Script\n\n| Time | Voiceover | On-screen Text | Emotion |\n|---|---|---|---|\n${scriptBlock}\n\n## Shot List\n\n| Shot | Time | Framing | Camera Movement | Visual | Caption |\n|---:|---|---|---|---|---|\n${shotBlock}\n\n## Caption Pack\n\n- Title: ${campaign.captions.title}\n- Caption: ${campaign.captions.caption}\n- Hashtags: ${campaign.captions.hashtags.join(" ")}\n- Pinned comment: ${campaign.captions.pinnedComment}\n\n## Compliance Review\n\n${complianceBlock}\n\n## Quality Score\n\n- Hook strength: ${campaign.score.hookStrength}/10\n- Clarity: ${campaign.score.clarity}/10\n- Platform fit: ${campaign.score.platformFit}/10\n- Production feasibility: ${campaign.score.productionFeasibility}/10\n- CTA strength: ${campaign.score.ctaStrength}/10\n- Overall: ${campaign.score.overall}/10\n\n### Notes\n\n${campaign.score.notes.map(n => `- ${n}`).join("\n")}\n\n## Editor Notes\n\n${campaign.editorNotes.map(n => `- ${n}`).join("\n")}\n`;
}
