import type { CreativeBrief, TrendInsight } from "./types.js";

export function seedTrendInsights(brief: CreativeBrief): TrendInsight[] {
  const platform = brief.platform ?? "tiktok";
  return [
    {
      angle: `The "I wish I knew this before" angle for ${brief.niche}`,
      audienceTension: `The audience wants faster results but feels overwhelmed by too many choices around ${brief.productOrTopic}.`,
      contentPattern: `Start with a direct pain point, show a quick before/after workflow, then end with a simple ${brief.cta}.`,
      evidenceNote: `Designed for ${platform} native viewing: fast hook, clear text overlays, short proof points and practical CTA.`
    },
    {
      angle: `Behind-the-scenes workflow transformation`,
      audienceTension: `Creators want repeatable systems, not random inspiration that disappears after one post.`,
      contentPattern: `Use screen recording + face-to-camera commentary + quick B-roll cuts to make the workflow feel real.`,
      evidenceNote: `The format supports repeatable testing because each workflow step can become a variant.`
    },
    {
      angle: `Myth-busting / common mistake correction`,
      audienceTension: `The target audience may be doing the work manually and underestimating the value of a structured creative system.`,
      contentPattern: `Open with a mistake, demonstrate the fix, then show the result in one clear visual sequence.`,
      evidenceNote: `Good for high-retention short-form because it creates curiosity and resolves it quickly.`
    }
  ];
}
