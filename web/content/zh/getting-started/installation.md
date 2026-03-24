---
title: 安装
description: 在你的项目中启用 oh-my-agent —— 三种安装方式，都很快。
---

# 安装

## 环境要求

- **一款 AI IDE** —— Antigravity、Claude Code、Cursor、Gemini CLI、Codex CLI 或类似工具
- **bun** 和 **uv** —— 缺少时会自动安装

## 方式一：一行命令（推荐）

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

自动检测缺失的依赖（bun、uv），安装它们，然后启动交互式设置。大约一分钟搞定。

## 方式二：手动安装

```bash
bunx oh-my-agent
```

你会看到一个菜单，选择预设方案：

| 预设 | 包含内容 |
|------|---------|
| ✨ All | 所有智能体和技能 |
| 🌐 Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| 🎨 Frontend | frontend + pm + qa + debug + brainstorm + commit |
| ⚙️ Backend | backend + db + pm + qa + debug + brainstorm + commit |
| 📱 Mobile | mobile + pm + qa + debug + brainstorm + commit |
| 🚀 DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

技能安装到 `.agents/skills/`，并为你的 IDE 创建符号链接。

## 方式三：全局安装

适合经常使用 CLI 功能（仪表盘、智能体启动、诊断）的场景：

```bash
# Homebrew
brew install oh-my-agent

# 或 npm/bun
bun install --global oh-my-agent
```

现在你可以在任何地方使用 `oma`：

```bash
oma doctor          # 检查一切是否正常
oma dashboard       # 实时监控
oma agent:spawn     # 从终端启动智能体
```

## 选择一个 AI CLI

你至少需要一个：

| CLI | 安装方式 | 认证方法 |
|-----|---------|---------|
| Gemini | `bun install --global @google/gemini-cli` | 首次运行时自动认证 |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | 首次运行时自动认证 |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | 在 CLI 内执行 `/auth` |

## 首次设置

安装完成后，在 AI IDE 中运行 `/setup` 来配置：

- 响应语言
- 默认 CLI 供应商
- 每个智能体的 CLI 映射（不同智能体可以使用不同的 AI 工具）

这会创建 `.agents/config/user-preferences.yaml` —— 控制所有偏好设置的文件。

## 验证安装

```bash
oma doctor
```

该命令会检查 CLI 安装情况、MCP 配置和技能状态。如果有问题，它会告诉你具体怎么修。

## 下一步

在 AI IDE 中打开你的项目，开始对话。技能会自动检测。试试这样说：

```
"用 Tailwind CSS 构建一个带邮箱验证的登录表单"
```

或者前往[使用指南](/guide/usage)查看更多示例。
