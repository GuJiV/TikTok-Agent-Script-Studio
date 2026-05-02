# Max Token Plan Application Draft

下面这段可以复制到 MiMo Token Plan 申请表中，并根据你的实际 GitHub 链接和截图修改。

## 项目名称

TikTok Agent Script Studio：基于多 Agent 的短视频文案、脚本与分镜生成工作台

## 项目简介

我正在开发一个面向 TikTok / Reels / Shorts 短视频创作者和小型内容团队的 AI Agent 创意生产工具。项目目标是把一个简单的产品或选题 brief，自动扩展为趋势角度、爆款 Hook、口播文案、分镜脚本、镜头设计、字幕节奏、B-roll 建议、CTA、合规检查和可拍摄清单。

这个项目不是普通聊天应用，而是一个多阶段、多角色、高 Token 消耗的 Agent 工作流。单次生成需要多个 Agent 依次完成趋势分析、Hook 生成、文案创作、分镜设计、字幕和镜头规划、合规审查、质量评分和多格式导出。真实使用中还会继续生成 10–20 个 A/B 测试版本，因此非常适合测试 MiMo-V2.5-Pro 在长上下文、多轮推理、结构化输出和创意任务中的表现。

## 技术栈

- TypeScript / Node.js
- React + Vite Web Demo
- Express API Server
- OpenAI-compatible Chat Completions API
- 多 Agent Pipeline
- Markdown / JSON / CSV 导出

## 计划测试 MiMo 的能力

1. 长上下文创意 brief 理解；
2. 多 Agent 协作任务分解；
3. 稳定 JSON 结构化输出；
4. 中文、英文、多语言短视频文案生成；
5. 口播脚本到分镜镜头设计的转化能力；
6. 平台原生感、CTA 和字幕节奏的创意判断；
7. 合规审查与风险表达改写；
8. 批量 A/B 版本生成时的成本和速度表现。

## 为什么需要 Max 档额度

短视频脚本和分镜生成不是单轮问答。一个完整 brief 通常需要生成多个趋势方向、5–10 个 Hook、1–3 个完整脚本、8–15 个镜头、字幕、B-roll、CTA、合规审查和评分。如果进行真实 A/B 测试，一个主题会消耗大量上下文和输出 token。

我希望使用 Max 档 Token Plan 进行连续测试，包括多语言生成、批量变体生成、长上下文品牌资料输入、创意质量评估和 GitHub 报告沉淀。较低额度难以支撑完整项目级验证。

## 可提交的证明材料

- GitHub 仓库链接：`https://github.com/your-name/tiktok-agent-script-studio`
- 本地运行截图：CLI 生成 campaign.md / shotlist.csv
- Web Demo 截图：输入 brief 并展示生成结果
- 代码截图：多 Agent pipeline、modelClient、exporter
- 测试计划：docs/TEST_PLAN.md
- 输出样例：examples/outputs/sample-campaign.md

## 后续反馈计划

如果获得 Token Plan，我会持续记录 MiMo 在该项目中的表现，包括生成质量、结构化输出稳定性、推理能力、成本、速度和失败案例，并整理为 GitHub report 或公开教程，帮助更多开发者了解 MiMo API 在创意 Agent 和短视频生产场景中的实际价值。
