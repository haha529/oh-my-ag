---
title: 使用 GitHub Action 自动更新
description: 使用官方 GitHub Action 自动保持 oh-my-agent skills 为最新版本。
---

# 使用 GitHub Action 自动更新

**oh-my-agent update action** 按计划运行 `oma update`，并在有新版本 skill 时创建 PR（或直接提交）。

## 快速开始

将以下工作流添加到任何使用 oh-my-agent 的仓库：

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1" # Every Monday at 09:00 UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
```

该工作流每周检查一次更新，发现变更时自动创建 PR。

## Action 参考

Action 可通过以下方式引用：

- **Monorepo 路径**：`first-fluke/oh-my-agent/action@v1`
- **Marketplace**：[`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### 输入参数

| 参数 | 说明 | 默认值 |
|:------|:-----------|:--------|
| `mode` | `pr` 创建 pull request，`commit` 直接推送 | `pr` |
| `base-branch` | PR 的目标分支或直接提交的目标分支 | `main` |
| `force` | 覆盖用户配置文件（`--force`） | `false` |
| `pr-title` | 自定义 PR 标题 | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | PR 的标签，多个用逗号分隔 | `dependencies,automated` |
| `commit-message` | 自定义提交信息 | `chore(deps): update oh-my-agent skills` |
| `token` | 用于创建 PR 的 GitHub token | `${{ github.token }}` |

### 输出参数

| 参数 | 说明 |
|:-------|:-----------|
| `updated` | 检测到变更时为 `true` |
| `version` | 更新后的 oh-my-agent 版本号 |
| `pr-number` | PR 编号（仅 `pr` 模式） |
| `pr-url` | PR 链接（仅 `pr` 模式） |

## 示例

### 直接提交模式

跳过 PR，将变更直接推送到目标分支：

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### 使用 Personal Access Token

在 `GITHUB_TOKEN` 缺少写权限的 fork 仓库中需要此配置：

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### 条件通知

仅在更新成功时执行后续步骤：

```yaml
jobs:
  update:
    runs-on: ubuntu-latest
    outputs:
      updated: ${{ steps.oma.outputs.updated }}
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
        id: oma

  notify:
    needs: update
    if: needs.update.outputs.updated == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "oh-my-agent was updated to ${{ needs.update.outputs.version }}"
```

## 工作原理

1. 通过 Bun 安装 `oh-my-agent` CLI
2. 运行 `oma update --ci`（非交互模式，无需手动确认）
3. 检测 `.agents/` 和 `.claude/` 目录中的变更
4. 根据 `mode` 参数决定创建 PR 还是直接提交

## 与中央注册中心的对比

| | GitHub Action | Central Registry |
|:--|:--:|:--:|
| 配置 | 1 个工作流文件 | 3 个文件（配置 + 2 个工作流） |
| 更新方式 | `oma update` CLI | Tarball 下载 + 手动同步 |
| 自定义方式 | Action 输入参数 | `.agent-registry.yml` |
| 版本锁定 | 始终为最新版 | 显式指定版本 |

大多数项目推荐使用 **GitHub Action**。若需要严格锁定版本或无法使用第三方 Action，请使用 **Central Registry** 方案。
