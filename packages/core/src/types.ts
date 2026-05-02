export type Platform = "tiktok" | "reels" | "shorts";

export interface CreativeBrief {
  brandName: string;
  productOrTopic: string;
  niche: string;
  targetAudience: string;
  language: string;
  region: string;
  objective: string;
  durationSec: number;
  tone: string;
  keySellingPoints: string[];
  cta: string;
  platform?: Platform;
  constraints?: string[];
  trendInputs?: string[];
}

export interface TrendInsight {
  angle: string;
  audienceTension: string;
  contentPattern: string;
  evidenceNote: string;
}

export interface HookOption {
  id: string;
  hookLine: string;
  onScreenText: string;
  visualAction: string;
  reason: string;
}

export interface ScriptSegment {
  startSec: number;
  endSec: number;
  voiceover: string;
  onScreenText: string;
  emotion: string;
}

export interface ShotDesign {
  shotNo: number;
  startSec: number;
  endSec: number;
  framing: string;
  cameraMovement: string;
  visual: string;
  broll: string;
  caption: string;
  soundCue: string;
  productionNote: string;
}

export interface CaptionPack {
  title: string;
  caption: string;
  hashtags: string[];
  pinnedComment: string;
}

export interface ComplianceIssue {
  severity: "low" | "medium" | "high";
  area: string;
  issue: string;
  saferRewrite: string;
}

export interface QualityScore {
  hookStrength: number;
  clarity: number;
  platformFit: number;
  productionFeasibility: number;
  ctaStrength: number;
  overall: number;
  notes: string[];
}

export interface CampaignPackage {
  id: string;
  createdAt: string;
  brief: CreativeBrief;
  trendInsights: TrendInsight[];
  hooks: HookOption[];
  selectedHook: HookOption;
  script: ScriptSegment[];
  shots: ShotDesign[];
  captions: CaptionPack;
  compliance: ComplianceIssue[];
  score: QualityScore;
  editorNotes: string[];
}

export interface ModelMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ModelClient {
  completeJson<T>(messages: ModelMessage[], fallback: T): Promise<T>;
}
