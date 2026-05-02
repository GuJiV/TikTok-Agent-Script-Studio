import "dotenv/config";
import express from "express";
import cors from "cors";
import { MockModelClient, createModelFromEnv, generateCampaign } from "@tas/core";

const app = express();
const port = Number(process.env.PORT || 8787);

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "tiktok-agent-script-studio-api" });
});

app.post("/api/generate", async (req, res) => {
  try {
    const useMock = req.query.mock === "1" || req.body?.mock === true;
    const model = useMock ? new MockModelClient() : (createModelFromEnv() ?? new MockModelClient());
    const campaign = await generateCampaign(req.body.brief ?? req.body, model);
    res.json({ campaign });
  } catch (error: any) {
    res.status(400).json({ error: error?.message ?? "Unknown error" });
  }
});

app.listen(port, () => {
  console.log(`TikTok Agent Script Studio API listening on http://localhost:${port}`);
});
