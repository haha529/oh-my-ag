---
title: 自動更新
description: 新バージョンがリリースされるとPRを自動作成するGitHub Actionで、oh-my-agentのスキルを最新に保つ。
---

# GitHub Actionによる自動更新

一度設定すれば、あとはお任せ。GitHub Actionがoh-my-agentの新バージョンをチェックし、更新がある場合はPRを作成します。

## クイックセットアップ

リポジトリに以下を追加してください：

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # 毎週月曜 09:00 UTC
  workflow_dispatch:        # または手動実行

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

これだけです。スキルが更新されるたびにPRが届きます。

## Actionの入力パラメータ

| 入力 | 機能 | デフォルト |
|-------|-------------|---------|
| `mode` | `pr` でPR作成、`commit` で直接プッシュ | `pr` |
| `base-branch` | ターゲットブランチ | `main` |
| `force` | カスタム設定ファイルを上書き | `false` |
| `pr-title` | カスタムPRタイトル | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | カンマ区切りのPRラベル | `dependencies,automated` |
| `commit-message` | カスタムコミットメッセージ | `chore(deps): update oh-my-agent skills` |
| `token` | GitHubトークン | `${{ github.token }}` |

## Actionの出力

| 出力 | 内容 |
|--------|-----------------|
| `updated` | 変更が検出された場合 `true` |
| `version` | 更新後のoh-my-agentバージョン |
| `pr-number` | PR番号（prモードのみ） |
| `pr-url` | PR URL（prモードのみ） |

## 使用例

### PRをスキップして直接コミット

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### パーソナルアクセストークンを使う

フォークリポジトリで `GITHUB_TOKEN` に書き込み権限がない場合：

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### 更新時に通知

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

## 内部の仕組み

1. Bunで `oh-my-agent` CLIをインストール
2. `oma update --ci`（非対話モード）を実行
3. `.agents/` と `.claude/` の変更を検出
4. `mode` に基づいてPR作成またはコミット
