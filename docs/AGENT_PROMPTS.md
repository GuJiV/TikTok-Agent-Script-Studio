# Agent Prompt Design

这个项目的 prompt 设计目标是让模型输出“可直接拍摄和剪辑”的内容，而不是泛泛而谈的营销建议。

## Prompt Output Requirements

所有核心 Agent 都应尽量输出 JSON，方便后续导出、评分和人工编辑。

## Trend Agent

输入：brief、地区、受众、品类、趋势关键词。  
输出：3 个趋势角度，每个包含 audience tension、content pattern、evidence note。

## Hook Agent

输入：brief 和趋势角度。  
输出：5 个 Hook，每个包含：

- hookLine
- onScreenText
- visualAction
- reason

## Copywriter Agent

输入：brief、selectedHook。  
输出：分段脚本，每段包含：

- startSec
- endSec
- voiceover
- onScreenText
- emotion

## Storyboard Director Agent

输入：脚本和 brief。  
输出：逐镜头表，每个镜头包含：

- framing
- cameraMovement
- visual
- broll
- caption
- soundCue
- productionNote

## Compliance Reviewer Agent

输入：brief 和生成内容。  
输出：风险项和 safer rewrite。
