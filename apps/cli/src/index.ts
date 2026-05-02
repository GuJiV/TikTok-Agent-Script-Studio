#!/usr/bin/env node
import "dotenv/config";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  MockModelClient,
  campaignToMarkdown,
  createModelFromEnv,
  generateCampaign,
  shotsToCsv,
  slugify
} from "@tas/core";

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(name);
  if (idx >= 0) return process.argv[idx + 1];
  const inline = process.argv.find(a => a.startsWith(`${name}=`));
  return inline?.split("=").slice(1).join("=");
}

function hasFlag(name: string) {
  return process.argv.includes(name);
}

async function loadBrief(file: string) {
  return JSON.parse(await readFile(file, "utf-8"));
}

async function writeCampaign(brief: any, outDir: string, mock: boolean) {
  const model = mock ? new MockModelClient() : (createModelFromEnv() ?? new MockModelClient());
  const campaign = await generateCampaign(brief, model);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "campaign.json"), JSON.stringify(campaign, null, 2), "utf-8");
  await writeFile(path.join(outDir, "campaign.md"), campaignToMarkdown(campaign), "utf-8");
  await writeFile(path.join(outDir, "shotlist.csv"), shotsToCsv(campaign.shots), "utf-8");
  console.log(`Generated campaign: ${outDir}`);
  console.log(`Overall score: ${campaign.score.overall}/10`);
}

async function main() {
  const briefFile = getArg("--brief");
  const briefDir = getArg("--brief-dir");
  const out = getArg("--out") || "runs/latest";
  const mock = hasFlag("--mock");

  if (!briefFile && !briefDir) {
    console.log(`Usage:\n  tas --brief examples/briefs/skincare-cn.json --out runs/skincare --mock\n  tas --brief-dir examples/briefs --out runs/benchmark --mock`);
    process.exit(1);
  }

  if (briefFile) {
    const brief = await loadBrief(briefFile);
    await writeCampaign(brief, out, mock);
    return;
  }

  if (briefDir) {
    const files = (await readdir(briefDir)).filter(f => f.endsWith(".json"));
    for (const file of files) {
      const brief = await loadBrief(path.join(briefDir, file));
      const campaignOut = path.join(out, slugify(file.replace(/\.json$/, "")));
      await writeCampaign(brief, campaignOut, mock);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
