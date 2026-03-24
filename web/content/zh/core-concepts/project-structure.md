---
title: 项目结构
description: 所有文件的位置以及为什么这样组织。
---

# 项目结构

oh-my-agent 将所有内容组织在几个关键目录中。安装完成后你会看到这样的结构。

## 总览

```text
your-project/
├── .agents/              ← 唯一事实来源
│   ├── config/           ← 你的偏好设置
│   ├── skills/           ← 智能体能力
│   ├── workflows/        ← 斜杠命令定义
│   ├── agents/           ← 子智能体定义
│   ├── plan.json         ← 生成的计划输出
│   ├── state/            ← 活跃工作流状态
│   ├── results/          ← 智能体结果文件
│   └── mcp.json          ← MCP 服务器配置
│
├── .claude/              ← IDE 集成层
│   ├── settings.json     ← 钩子和权限
│   ├── hooks/            ← 关键词检测、HUD
│   ├── skills/           ← 指向 .agents/skills/ 的符号链接
│   └── agents/           ← IDE 用的子智能体定义
│
└── .serena/              ← 运行时状态
    └── memories/         ← 编排内存文件
```

## `.agents/` —— 事实来源

这是核心。智能体需要的一切都在这里。

### `config/`
- **`user-preferences.yaml`** —— 你的语言、时区、默认 CLI、每个智能体的 CLI 映射

### `skills/`
智能体专长所在。每个技能有一个 `SKILL.md` 和一个 `resources/` 目录。

- **`_shared/`** —— 所有智能体共用的公共资源（路由、模板、检查清单）
- **`oma-frontend/`**、**`oma-backend/`** 等 —— 领域专属技能

### `workflows/`
定义斜杠命令行为的 Markdown 文件。这些就是你输入 `/plan`、`/coordinate`、`/review` 等命令时智能体遵循的脚本。

### `agents/`
子智能体定义 —— 通过 CLI 或 Task 工具启动智能体的规格。

## `.claude/` —— IDE 集成

将 oh-my-agent 连接到 Claude Code（以及通过符号链接连接其他 IDE）。

### `hooks/`
- **`triggers.json`** —— 支持 11 种语言的关键词到工作流映射
- **`keyword-detector.ts`** —— 从你的输入自动检测工作流的逻辑
- **`persistent-mode.ts`** —— 让持久性工作流持续运行直到完成
- **`hud.ts`** —— `[OMA]` 状态栏指示器

### `skills/` 和 `agents/`
指向 `.agents/` 的符号链接 —— 保持唯一事实来源，同时让技能对 IDE 可见。

## `.serena/memories/` —— 运行时状态

智能体在执行过程中写入进度的地方：

| 文件 | 内容 |
|------|------|
| `orchestrator-session.md` | 会话 ID、状态、开始时间 |
| `task-board.md` | 哪个智能体负责哪个任务 |
| `progress-{agent}.md` | 逐轮进度更新 |
| `result-{agent}.md` | 每个智能体的最终输出 |

仪表盘监视此目录以获取实时更新。

## oh-my-agent 源码仓库

如果你在开发 oh-my-agent 本身（而不只是使用它），这个仓库是一个 monorepo：

```text
oh-my-agent/
├── cli/              ← CLI 工具源码（TypeScript）
├── web/              ← 文档站点（Next.js）
├── action/           ← 用于自动更新的 GitHub Action
├── docs/             ← 翻译的 README 和规格文档
└── .agents/          ← 可编辑（这就是源码）
```
