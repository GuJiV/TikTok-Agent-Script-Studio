# Architecture

TikTok Agent Script Studio 使用一个多 Agent 管线，把简单 brief 变成完整短视频制作方案。

## Pipeline

```txt
Creative Brief
  ↓
Trend Agent
  ↓
Hook Agent
  ↓
Copywriter Agent
  ↓
Storyboard Director Agent
  ↓
Caption Agent
  ↓
Compliance Reviewer Agent
  ↓
Evaluator Agent
  ↓
JSON / Markdown / CSV Exports
```

## Agent Responsibilities

### Trend Agent

负责根据品类、地区、目标受众和目标动作推导内容角度。后续可接入 TikTok Creative Center 手动导出的趋势关键词、热门标签、热门声音和 Top Ads 案例。

### Hook Agent

生成多个前 3 秒 Hook。每个 Hook 包含口播、屏幕文字、视觉动作和选择理由。

### Copywriter Agent

负责把 Hook 扩展成 30–60 秒口播脚本，并把脚本切成有时间戳的短段落。

### Storyboard Director Agent

把文案变成可拍摄的分镜表，包括景别、镜头运动、画面内容、B-roll、字幕和声音提示。

### Compliance Reviewer Agent

检查夸大承诺、平台敏感表述、医疗/金融风险、误导性广告等问题，并给出更安全的改写。

### Evaluator Agent

从 Hook 强度、清晰度、平台适配度、可拍摄性和 CTA 强度进行评分。

## Why this is token intensive

单个任务通常需要处理较长输入，包括品牌资料、产品卖点、受众、地区、趋势关键词、竞品洞察和平台规则。输出又需要生成多个变体和结构化字段。因此它天然适合测试大模型在以下方面的表现：

- 长上下文理解；
- 结构化 JSON 输出稳定性；
- 多 Agent 任务拆解；
- 创意质量和可执行性；
- 合规审查；
- 多语言内容生成；
- 批量 A/B 版本生成。
