---
title: GitHub Action による自動更新
description: 公式 GitHub Action を使用して、oh-my-agent のスキルを自動的に最新の状態に保つ方法。
---

# GitHub Action による自動更新

**oh-my-agent update action** はスケジュールに従って `oma update` を実行し、新しいスキルバージョンが利用可能になると PR を作成（または直接コミット）します。

## クイックスタート

oh-my-agent を使用するリポジトリにこのワークフローを追加します:

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

これにより毎週更新が確認され、変更が見つかった場合は PR が作成されます。

## Action リファレンス

Action は以下から利用できます:

- **モノレポパス**: `first-fluke/oh-my-agent/action@v1`
- **Marketplace**: [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Inputs

| Input | 説明 | デフォルト |
|:------|:-----------|:--------|
| `mode` | `pr` はプルリクエストを作成、`commit` は直接プッシュ | `pr` |
| `base-branch` | PR のベースブランチ、または直接コミット先のブランチ | `main` |
| `force` | ユーザー設定ファイルを上書き（`--force`） | `false` |
| `pr-title` | カスタム PR タイトル | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | PR に付与するカンマ区切りのラベル | `dependencies,automated` |
| `commit-message` | カスタムコミットメッセージ | `chore(deps): update oh-my-agent skills` |
| `token` | PR 作成に使用する GitHub トークン | `${{ github.token }}` |

### Outputs

| Output | 説明 |
|:-------|:-----------|
| `updated` | 変更が検出された場合は `true` |
| `version` | 更新後の oh-my-agent バージョン |
| `pr-number` | PR 番号（`pr` モード時のみ） |
| `pr-url` | PR の URL（`pr` モード時のみ） |

## 使用例

### ダイレクトコミットモード

PR をスキップして、ベースブランチに直接変更をプッシュします:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Personal Access Token の使用

`GITHUB_TOKEN` に書き込み権限がないフォークリポジトリで必要です:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### 条件付き通知

更新が適用された場合のみ後続ステップを実行します:

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

## 動作の仕組み

1. Bun を使用して `oh-my-agent` CLI をインストール
2. `oma update --ci`（非インタラクティブモード、プロンプトなし）を実行
3. `.agents/` および `.claude/` ディレクトリの変更を検出
4. `mode` の設定に基づいて PR を作成するか、直接コミット

## セントラルレジストリとの比較

| | GitHub Action | Central Registry |
|:--|:--:|:--:|
| セットアップ | ワークフローファイル 1 つ | 3 ファイル（設定 + ワークフロー 2 つ） |
| 更新方法 | `oma update` CLI | Tarball ダウンロード + 手動同期 |
| カスタマイズ | Action の inputs | `.agent-registry.yml` |
| バージョン固定 | 常に最新 | 明示的なバージョン固定 |

ほとんどのプロジェクトでは **GitHub Action** を使用してください。厳密なバージョン固定が必要な場合や、サードパーティの Action が使用できない場合は **Central Registry** アプローチを使用してください。
