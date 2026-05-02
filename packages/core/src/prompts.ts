import type { CreativeBrief } from "./types.js";

export const SYSTEM_CREATIVE_DIRECTOR = `You are a senior TikTok creative strategist, short-form video copywriter, and production director.
You must produce platform-native ideas, practical shot design, concise captions, and safe claims.
Return strict JSON only. No markdown.`;

export function briefToPrompt(brief: CreativeBrief) {
  return JSON.stringify(brief, null, 2);
}

export function trendPrompt(brief: CreativeBrief) {
  return `Analyze this short-form video brief and generate 3 trend-informed creative angles.
Focus on audience tension, content pattern, and production feasibility.
Brief:\n${briefToPrompt(brief)}`;
}

export function hookPrompt(brief: CreativeBrief) {
  return `Generate 5 strong TikTok hooks for the first 3 seconds.
Each hook needs: hookLine, onScreenText, visualAction, reason.
Make it native, specific, and not overhyped.
Brief:\n${briefToPrompt(brief)}`;
}

export function scriptPrompt(brief: CreativeBrief, hookLine: string) {
  return `Write a ${brief.durationSec}-second TikTok voiceover script in ${brief.language}.
Use this hook: ${hookLine}
Segment the script into 4-7 timed blocks.
Include on-screen text and emotion for each block.
Brief:\n${briefToPrompt(brief)}`;
}

export function storyboardPrompt(brief: CreativeBrief) {
  return `Create a practical 9:16 storyboard and shot list for the script.
Include framing, camera movement, visual, b-roll, caption, sound cue and production note.
Avoid expensive production unless the brief requires it.
Brief:\n${briefToPrompt(brief)}`;
}

export function compliancePrompt(brief: CreativeBrief) {
  return `Review this TikTok creative plan for unsafe or risky claims.
Flag exaggerated results, medical/financial promises, misleading scarcity, restricted content or platform-risky wording.
Return safer rewrites.
Brief:\n${briefToPrompt(brief)}`;
}
