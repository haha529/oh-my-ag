---
title: 技能
description: 两层技能架构如何让智能体既聪明又不浪费 token。
---

# 技能

技能是让每个智能体成为专家的关键。它们是结构化的知识 —— 不只是提示词，还包括执行协议、代码模板、错误处理手册和质量检查清单。

## 两层设计

巧妙之处在于：技能不会一次性加载所有内容。它们使用渐进式披露，节省约 75% 的 token。

### 第一层：SKILL.md（约 800 字节）

始终加载。包含：
- 智能体身份和角色
- 激活条件（路由规则）
- 核心规则和约束
- 不应该做什么

### 第二层：resources/（按需加载）

只有当智能体实际工作时才加载。包含深层内容：

| 资源 | 作用 |
|------|------|
| `execution-protocol.md` | 分步工作流：分析 → 规划 → 实现 → 验证 |
| `tech-stack.md` | 详细的技术规格和版本信息 |
| `error-playbook.md` | 出错时怎么办（含"三振出局"升级机制） |
| `checklist.md` | 领域专属的质量检查项 |
| `snippets.md` | 即用型代码模式 |
| `examples/` | 少样本输入/输出示例 |

### 目录结构

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← 始终加载（约 800 字节）
└── resources/
    ├── execution-protocol.md         ← 按需加载
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## 共享资源

所有智能体共用 `.agents/skills/_shared/` 中的基础资源：

| 资源 | 用途 |
|------|------|
| `skill-routing.md` | 将任务映射到合适的智能体 |
| `context-loading.md` | 根据任务类型决定加载哪些资源 |
| `prompt-structure.md` | 目标 → 上下文 → 约束 → 完成条件 |
| `clarification-protocol.md` | 何时该问、何时该直接假设 |
| `context-budget.md` | 按模型层级高效读取文件 |
| `difficulty-guide.md` | 简单 / 中等 / 复杂任务评估 |
| `reasoning-templates.md` | 结构化推理的填空模板 |
| `quality-principles.md` | 通用质量标准 |
| `vendor-detection.md` | 检测正在运行的 IDE/CLI |

## 条件资源

某些资源仅在特定条件触发时加载：

| 资源 | 加载时机 |
|------|---------|
| `quality-score.md` | 请求质量评估时 |
| `experiment-ledger.md` | 尝试实验性方案时 |
| `exploration-loop.md` | 迭代探索进行中 |

## 供应商专属执行

每个支持的 CLI 在 `.agents/skills/_shared/runtime/execution-protocols/` 下有自己的执行协议：
- `claude.md` —— Claude 专属模式
- `gemini.md` —— Gemini 专属模式
- `codex.md` —— Codex 专属模式
- `qwen.md` —— Qwen 专属模式

## 为什么这很重要

如果没有渐进式披露，加载 5 个智能体就会在开始工作前耗尽你的上下文窗口。有了它，初始加载轻量高效，真正执行时才加载深层内容。
