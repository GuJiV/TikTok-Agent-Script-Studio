import type { CampaignPackage, CreativeBrief, ModelClient } from "./types.js";
import { CreativeBriefSchema } from "./schemas.js";
import {
  runCaptionAgent,
  runComplianceAgent,
  runHookAgent,
  runScriptAgent,
  runStoryboardAgent,
  runTrendAgent
} from "./agents.js";
import { evaluateCampaign } from "./evaluator.js";
import { slugify } from "./exporters.js";

export async function generateCampaign(input: unknown, model: ModelClient): Promise<CampaignPackage> {
  const brief = CreativeBriefSchema.parse(input) as CreativeBrief;
  const trendInsights = await runTrendAgent(brief, model);
  const hooks = await runHookAgent(brief, model);
  const selectedHook = hooks[0];
  const script = await runScriptAgent(brief, selectedHook, model);
  const shots = await runStoryboardAgent(brief, script, model);
  const captions = await runCaptionAgent(brief, model);
  const compliance = await runComplianceAgent(brief, model);

  const base = {
    id: `${slugify(brief.brandName)}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    brief,
    trendInsights,
    hooks,
    selectedHook,
    script,
    shots,
    captions,
    compliance,
    editorNotes: [
      "Shoot vertical 9:16. Keep the first visual change within 1 second.",
      "Use captions as meaning, not decoration. Each caption should move the story forward.",
      "Record 2-3 alternate hooks before filming the full script."
    ]
  };

  const score = evaluateCampaign(base);
  return { ...base, score };
}
