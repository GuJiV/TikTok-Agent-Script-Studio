import { z } from "zod";

export const CreativeBriefSchema = z.object({
  brandName: z.string().min(1),
  productOrTopic: z.string().min(1),
  niche: z.string().min(1),
  targetAudience: z.string().min(1),
  language: z.string().min(1),
  region: z.string().min(1),
  objective: z.string().min(1),
  durationSec: z.number().int().min(10).max(180),
  tone: z.string().min(1),
  keySellingPoints: z.array(z.string()).min(1),
  cta: z.string().min(1),
  platform: z.enum(["tiktok", "reels", "shorts"]).optional().default("tiktok"),
  constraints: z.array(z.string()).optional().default([]),
  trendInputs: z.array(z.string()).optional().default([])
});

export type CreativeBriefInput = z.infer<typeof CreativeBriefSchema>;
