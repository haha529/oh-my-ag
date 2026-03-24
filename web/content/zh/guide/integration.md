---
title: 集成到现有项目
description: 将 oh-my-agent 添加到你正在开发的项目中 —— 安全且无破坏性。
---

# 集成到现有项目

已经有一个项目了？下面介绍如何在不破坏任何东西的情况下添加 oh-my-agent。

## 简单方式（CLI）

在项目根目录运行：

```bash
bunx oh-my-agent
```

它会做什么：
- 将技能安装到 `.agents/skills/`
- 将共享资源复制到 `.agents/skills/_shared/`
- 为你的 IDE 创建符号链接（`.claude/skills/` 等）
- 将工作流安装到 `.agents/workflows/`
- 在 `.agents/config/user-preferences.yaml` 创建默认配置

## 手动方式

当你想完全控制复制哪些内容时：

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# 复制你需要的技能
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# 复制共享资源
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# 复制工作流
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# 默认配置（仅在缺失时）
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## 验证安装

```bash
oma doctor
```

或手动检查：
```bash
ls .agents/skills/          # 应该能看到技能目录
ls .agents/workflows/       # 应该能看到工作流 .md 文件
cat .agents/config/user-preferences.yaml  # 应该能看到你的配置
```

## 多 IDE 符号链接

在运行 `bunx oh-my-agent` 时，你会被问到：

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

一个事实来源（`.agents/skills/`），多个 IDE 从中读取：

```text
.agents/skills/oma-frontend/     ← 源（SSOT）
.claude/skills/oma-frontend/     → 符号链接
.cursor/skills/oma-frontend/     → 符号链接
.github/skills/oma-frontend/     → 符号链接
```

## 安全提示

**集成之前**，创建一个检查点：

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- CLI 不会覆盖已有的技能文件夹
- 你的项目特定配置仍由你掌控
- `oma doctor` 会标出任何问题

## 可选：仪表盘

```bash
oma dashboard        # 终端监控
oma dashboard:web    # Web 界面 http://localhost:9847
```

## 下一步

在 AI IDE 中开始对话，或查看[使用指南](./usage)了解工作流示例。
