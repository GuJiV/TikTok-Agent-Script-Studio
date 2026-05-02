# 7-Day Test Plan

这个计划可以作为申请高额度 Token Plan 的补充材料，证明项目有明确测试路径和持续消耗场景。

## Day 1: API 接入与基线测试

- 接入 OpenAI-compatible API。
- 使用 3 个内置 brief 跑通完整 Agent 管线。
- 记录每次生成的耗时、输出长度、JSON 稳定性和人工评分。

## Day 2: Hook A/B 测试

- 每个 brief 生成 10 个 Hook。
- 比较 Hook 的清晰度、视觉动作、评论引导能力。
- 选出 3 个最适合拍摄的版本。

## Day 3: 分镜质量测试

- 重点测试 Storyboard Director Agent。
- 检查每个镜头是否包含景别、运动、画面、字幕、B-roll 和 production note。

## Day 4: 多语言测试

- 对同一个 brief 生成中文、英文、日文版本。
- 检查语气是否自然，字幕长度是否适合短视频。

## Day 5: 合规与品牌安全测试

- 输入护肤、教育、效率工具、健身等不同品类。
- 检查模型是否能避免夸大承诺和敏感表述。

## Day 6: 批量变体生成

- 为同一个产品生成 20 条视频方向。
- 输出每条的 Hook、脚本和镜头清单。

## Day 7: 报告整理

- 汇总 token 消耗、任务完成率、人工评分和失败案例。
- 形成公开 GitHub issue / markdown report，作为模型反馈材料。
