import type {
  CaptionPack,
  ComplianceIssue,
  CreativeBrief,
  HookOption,
  ModelClient,
  ScriptSegment,
  ShotDesign,
  TrendInsight
} from "./types.js";
import {
  SYSTEM_CREATIVE_DIRECTOR,
  hookPrompt,
  scriptPrompt,
  storyboardPrompt,
  trendPrompt,
  compliancePrompt
} from "./prompts.js";
import { seedTrendInsights } from "./trendSeed.js";

export async function runTrendAgent(brief: CreativeBrief, model: ModelClient): Promise<TrendInsight[]> {
  const fallback = seedTrendInsights(brief);
  const result = await model.completeJson<{ insights: TrendInsight[] }>([
    { role: "system", content: SYSTEM_CREATIVE_DIRECTOR },
    { role: "user", content: trendPrompt(brief) }
  ], { insights: fallback });
  return result.insights?.length ? result.insights : fallback;
}

export async function runHookAgent(brief: CreativeBrief, model: ModelClient): Promise<HookOption[]> {
  const fallback: HookOption[] = [
    {
      id: "hook-1",
      hookLine: brief.language.toLowerCase().includes("chinese") || brief.language.includes("中文")
        ? `如果你做 ${brief.niche} 还在从零想文案，这条视频可能能省你一整天。`
        : `If you still start every ${brief.niche} video from scratch, this can save you a full day.`,
      onScreenText: "Stop starting from zero",
      visualAction: "Creator stares at an empty notes app, then taps once to reveal a finished script board.",
      reason: "Turns a familiar pain point into a quick transformation."
    },
    {
      id: "hook-2",
      hookLine: brief.language.toLowerCase().includes("chinese") || brief.language.includes("中文")
        ? `我把一个普通选题拆成了 10 条 TikTok 视频，这是完整流程。`
        : `I turned one basic idea into 10 TikTok-ready videos. Here is the workflow.`,
      onScreenText: "1 idea → 10 videos",
      visualAction: "Screen recording of one idea expanding into multiple hooks and shot cards.",
      reason: "Shows clear value and outcome immediately."
    },
    {
      id: "hook-3",
      hookLine: brief.language.toLowerCase().includes("chinese") || brief.language.includes("中文")
        ? `别再只让 AI 写文案了，让它直接给你拍摄分镜。`
        : `Do not just ask AI for copy. Ask it for the shot list too.`,
      onScreenText: "AI copy is not enough",
      visualAction: "Split screen: messy copy on left, structured storyboard on right.",
      reason: "Reframes the product from text generator to production system."
    },
    {
      id: "hook-4",
      hookLine: brief.language.toLowerCase().includes("chinese") || brief.language.includes("中文")
        ? `这不是爆款模板，是一个可以反复测试的短视频生产系统。`
        : `This is not a viral template. It is a repeatable video production system.`,
      onScreenText: "Repeatable > random",
      visualAction: "Show a grid of scripts, hooks, shots and CTA variants.",
      reason: "Appeals to serious creators and teams that value process."
    },
    {
      id: "hook-5",
      hookLine: brief.language.toLowerCase().includes("chinese") || brief.language.includes("中文")
        ? `30 秒看完：一个 TikTok 创意从想法到分镜怎么生成。`
        : `Watch a TikTok idea become a script and storyboard in 30 seconds.`,
      onScreenText: "Idea → Script → Shots",
      visualAction: "Fast montage from brief form to final shot list export.",
      reason: "Simple promise, easy to understand, visually demonstrable."
    }
  ];

  const result = await model.completeJson<{ hooks: HookOption[] }>([
    { role: "system", content: SYSTEM_CREATIVE_DIRECTOR },
    { role: "user", content: hookPrompt(brief) }
  ], { hooks: fallback });
  return result.hooks?.length ? result.hooks : fallback;
}

export async function runScriptAgent(brief: CreativeBrief, selectedHook: HookOption, model: ModelClient): Promise<ScriptSegment[]> {
  const total = brief.durationSec;
  const fallback: ScriptSegment[] = [
    {
      startSec: 0,
      endSec: Math.min(3, total),
      voiceover: selectedHook.hookLine,
      onScreenText: selectedHook.onScreenText,
      emotion: "curious, direct"
    },
    {
      startSec: 3,
      endSec: Math.min(9, total),
      voiceover: `Most creators do not struggle because they have no ideas. They struggle because every idea still needs a hook, structure, shot list and CTA.`,
      onScreenText: "Ideas are not the bottleneck",
      emotion: "problem-aware"
    },
    {
      startSec: 9,
      endSec: Math.min(18, total),
      voiceover: `${brief.brandName} turns a single brief into multiple TikTok-ready creative routes: hooks, voiceover, scene design, captions and production notes.`,
      onScreenText: "Brief → hooks → script → shots",
      emotion: "solution-focused"
    },
    {
      startSec: 18,
      endSec: Math.min(28, total),
      voiceover: `You can compare versions, pick the strongest hook, and send the shot list directly to a creator, editor or your own filming setup.`,
      onScreenText: "Make it shootable",
      emotion: "practical"
    },
    {
      startSec: Math.min(28, total - 5),
      endSec: total,
      voiceover: `${brief.cta}. Start with one idea and leave with a complete video plan.`,
      onScreenText: brief.cta,
      emotion: "clear CTA"
    }
  ].filter(s => s.startSec < s.endSec);

  const result = await model.completeJson<{ script: ScriptSegment[] }>([
    { role: "system", content: SYSTEM_CREATIVE_DIRECTOR },
    { role: "user", content: scriptPrompt(brief, selectedHook.hookLine) }
  ], { script: fallback });
  return result.script?.length ? result.script : fallback;
}

export async function runStoryboardAgent(brief: CreativeBrief, script: ScriptSegment[], model: ModelClient): Promise<ShotDesign[]> {
  const fallback: ShotDesign[] = script.flatMap((segment, index) => {
    const mid = Math.floor((segment.startSec + segment.endSec) / 2);
    return [
      {
        shotNo: index * 2 + 1,
        startSec: segment.startSec,
        endSec: mid,
        framing: index === 0 ? "tight face-to-camera, vertical 9:16" : "medium shot with screen visible",
        cameraMovement: index === 0 ? "small push-in" : "static screen capture with quick zooms",
        visual: index === 0 ? "Creator opens with a direct look and a fast gesture toward the text overlay." : "Show the workflow UI, notes, or storyboard cards moving quickly.",
        broll: "Phone screen, creator desk, sticky notes, timeline, script cards.",
        caption: segment.onScreenText,
        soundCue: index === 0 ? "fast riser / tap sound" : "soft whoosh transition",
        productionNote: "Keep text within the safe center area and avoid covering UI buttons."
      },
      {
        shotNo: index * 2 + 2,
        startSec: mid,
        endSec: segment.endSec,
        framing: "over-the-shoulder or screen recording crop",
        cameraMovement: "jump cut with 1.2x punch-in",
        visual: "Highlight the exact output that matches the voiceover: hook list, script block, or shot card.",
        broll: "Cursor moving, generated cards, export button, filming checklist.",
        caption: segment.voiceover.length > 44 ? segment.voiceover.slice(0, 41) + "..." : segment.voiceover,
        soundCue: "keyboard tap / notification pop",
        productionNote: "Use bold captions, 5-10 words per on-screen beat, and cut every 1-3 seconds."
      }
    ];
  });

  const result = await model.completeJson<{ shots: ShotDesign[] }>([
    { role: "system", content: SYSTEM_CREATIVE_DIRECTOR },
    { role: "user", content: storyboardPrompt(brief) + `\nScript:\n${JSON.stringify(script, null, 2)}` }
  ], { shots: fallback });
  return result.shots?.length ? result.shots : fallback;
}

export async function runCaptionAgent(brief: CreativeBrief, _model: ModelClient): Promise<CaptionPack> {
  const hashtags = [
    "#TikTokMarketing",
    "#ContentCreation",
    "#AIAgents",
    "#VideoScript",
    `#${brief.niche.replace(/[^a-zA-Z0-9]/g, "") || "CreatorTools"}`
  ].slice(0, 5);
  return {
    title: `${brief.productOrTopic}: from idea to shootable TikTok plan`,
    caption: `One idea is enough when your workflow can turn it into hooks, scripts and shot lists. ${brief.cta}`,
    hashtags,
    pinnedComment: `Comment "brief" and I will share the exact structure used to generate this video plan.`
  };
}

export async function runComplianceAgent(brief: CreativeBrief, model: ModelClient): Promise<ComplianceIssue[]> {
  const fallback: ComplianceIssue[] = [
    {
      severity: "low",
      area: "claim strength",
      issue: "Avoid promising guaranteed viral growth or specific revenue outcomes.",
      saferRewrite: "Use 'designed to help creators test more structured ideas' instead of guaranteed performance claims."
    },
    {
      severity: "low",
      area: "platform wording",
      issue: "Do not imply official TikTok endorsement unless there is a real partnership.",
      saferRewrite: "Say 'for TikTok-style short-form videos' rather than 'official TikTok tool'."
    }
  ];
  const result = await model.completeJson<{ issues: ComplianceIssue[] }>([
    { role: "system", content: SYSTEM_CREATIVE_DIRECTOR },
    { role: "user", content: compliancePrompt(brief) }
  ], { issues: fallback });
  return result.issues ?? fallback;
}
