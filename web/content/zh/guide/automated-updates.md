---
title: 自动更新
description: 通过 GitHub Action 保持 oh-my-agent 技能始终最新，新版本发布时自动创建 PR。
---

# 使用 GitHub Action 自动更新

设置一次，高枕无忧。GitHub Action 会检查 oh-my-agent 的新版本，并在有更新时自动创建 PR。

## 快速设置

将以下内容添加到你的仓库：

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # 每周一 UTC 09:00
  workflow_dispatch:        # 或手动触发

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

就这样。每次技能更新时你会收到一个 PR。

## Action 输入参数

| 参数 | 功能 | 默认值 |
|------|------|--------|
| `mode` | `pr` 创建 PR，`commit` 直接推送 | `pr` |
| `base-branch` | 目标分支 | `main` |
| `force` | 覆盖自定义配置文件 | `false` |
| `pr-title` | 自定义 PR 标题 | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | 逗号分隔的 PR 标签 | `dependencies,automated` |
| `commit-message` | 自定义提交消息 | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub token | `${{ github.token }}` |

## Action 输出

| 输出 | 内容 |
|------|------|
| `updated` | 检测到变更时为 `true` |
| `version` | 更新后的 oh-my-agent 版本 |
| `pr-number` | PR 编号（仅 pr 模式） |
| `pr-url` | PR 链接（仅 pr 模式） |

## 示例

### 跳过 PR，直接提交

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### 使用个人访问令牌

对于 fork 仓库中 `GITHUB_TOKEN` 没有写权限的情况：

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### 更新时发送通知

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
      - run: echo "Updated to ${{ needs.update.outputs.version }}"
```

## 底层工作原理

1. 通过 Bun 安装 `oh-my-agent` CLI
2. 运行 `oma update --ci`（非交互模式）
3. 检测 `.agents/` 和 `.claude/` 中的变更
4. 根据 `mode` 创建 PR 或直接提交
