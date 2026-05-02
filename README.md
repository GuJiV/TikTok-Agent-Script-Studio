# TikTok Agent Script Studio

一个面向 TikTok / Reels / Shorts 的 **AI Agent 短视频创意生产工作台**。项目通过多 Agent 协作，把一个简单的产品或主题 brief 自动扩展为：趋势洞察、爆款 Hook、口播文案、分镜脚本、镜头设计、字幕节奏、B-roll 建议、CTA、风险检查和可交付拍摄清单。

> 这个仓库适合作为 MiMo / OpenAI-compatible API 的真实高 Token 应用案例：一次生成会经历趋势分析、文案创作、分镜规划、合规审查、质量评分和多格式导出，天然适合长上下文、多轮 Agent 和批量变体生成。

## Demo 输出

项目内置 mock 模型，不配置 API Key 也能跑通完整流程：

```bash
pnpm install
pnpm generate:demo
```

生成结果会出现在：

```txt
runs/demo-campaign/
├── campaign.json       # 结构化创意方案
├── campaign.md         # 可读版脚本 + 分镜
└── shotlist.csv        # 可交给剪辑/拍摄的镜头清单
```

## 功能特性

- **Trend Agent**：根据品类、地区、受众和创意目标生成趋势角度与内容假设。
- **Hook Agent**：生成 5 组前 3 秒 Hook，包括屏幕文字、口播句和视觉动作。
- **Copywriter Agent**：输出 TikTok 风格口播脚本，包含节奏、情绪和 CTA。
- **Storyboard Director Agent**：生成逐镜头设计，包括景别、镜头运动、字幕、B-roll、道具和音效。
- **Editor Agent**：给出剪辑节奏、转场、字幕密度和 9:16 画面建议。
- **Compliance Reviewer Agent**：检查夸大承诺、平台风险词、医疗/金融/敏感表述。
- **Evaluator Agent**：对 Hook 强度、清晰度、可拍摄性、CTA、平台原生感进行评分。
- **Exporter**：导出 Markdown、JSON 和 CSV Shot List。
- **Web Demo**：一个简单的 React 前端，用于演示 brief 输入和生成结果。
- **API Server**：Express 后端，提供 `/api/generate` 接口。

## 为什么适合申请高额度 Token Plan

这个项目不是普通聊天 Demo，而是一个高消耗、多阶段、多角色的 Agent 任务。真实运行时，每个 brief 都会产生：

1. 趋势分析与内容定位；
2. 多个 Hook 变体；
3. 30–60 秒口播脚本；
4. 8–15 个镜头的分镜设计；
5. 字幕、B-roll、音效、剪辑节奏规划；
6. 合规审查与质量评分；
7. 多轮修订和 A/B 版本生成。

这类任务非常适合测试模型的长上下文理解、结构化输出稳定性、创意质量、多 Agent 协作能力和高频 API 调用能力。

## 技术栈

- TypeScript
- Node.js 20+
- OpenAI-compatible Chat Completions API
- Express API Server
- React + Vite Web Demo
- pnpm workspace monorepo

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 使用 mock 模型生成 Demo

```bash
pnpm generate:demo
```

### 3. 使用真实模型

复制环境变量文件：

```bash
cp .env.example .env
```

填入你的模型服务：

```env
AI_BASE_URL=https://api.example.com/v1
AI_API_KEY=your_api_key_here
AI_MODEL=mimo-v2.5-pro
AI_PROVIDER=openai-compatible
```

运行：

```bash
pnpm --filter @tas/cli dev -- --brief examples/briefs/skincare-cn.json --out runs/skincare-cn
```

### 4. 启动 API 和 Web Demo

```bash
pnpm dev:api
pnpm dev:web
```

打开 Vite 输出的本地地址即可。

## 示例 Brief

```json
{
  "brandName": "GlowByte",
  "productOrTopic": "AI-powered content planner for solo creators",
  "niche": "creator productivity",
  "targetAudience": "TikTok creators who post 3-5 times per week",
  "language": "English",
  "region": "US",
  "objective": "drive waitlist signups",
  "durationSec": 35,
  "tone": "native, energetic, practical",
  "keySellingPoints": [
    "turns one idea into 10 video angles",
    "creates hooks, scripts and shot lists",
    "exports production-ready briefs"
  ],
  "cta": "Join the early access waitlist"
}
```

## 仓库结构

```txt
apps/
  api/                 Express API 服务
  cli/                 命令行工具
  web/                 React Web Demo
packages/
  core/                Agent 编排、模型客户端、导出器、评分器
examples/
  briefs/              示例输入
  outputs/             示例输出
docs/                  申请材料、架构说明、测试计划
.github/workflows/     CI
```

## 常用命令

```bash
pnpm generate:demo       # 使用 mock 模型生成完整样例
pnpm benchmark:demo      # 批量跑 examples/briefs
pnpm build               # 构建所有包
pnpm test                # 运行单元测试
pnpm dev:api             # 启动 API
pnpm dev:web             # 启动 Web Demo
```

## 适合扩展的方向

- 接入 TikTok Creative Center 手动导出的趋势关键词；
- 自动生成多语言版本；
- 为同一个 brief 生成 10–20 条 A/B 测试变体；
- 接入 CapCut / 剪映模板工作流；
- 生成 Midjourney / 即梦 / 可灵 / Runway 视频提示词；
- 记录每次生成的 token 成本、评分和用户选择结果。

## License

MIT
