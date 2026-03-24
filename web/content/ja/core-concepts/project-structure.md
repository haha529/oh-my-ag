---
title: プロジェクト構造
description: すべてのファイルの配置場所と、なぜこう整理されているのか。
---

# プロジェクト構造

oh-my-agentはすべてをいくつかの主要ディレクトリに整理しています。インストール後に見えるものを説明します。

## 全体像

```text
your-project/
├── .agents/              ← 唯一の信頼できる情報源（SSOT）
│   ├── config/           ← 設定
│   ├── skills/           ← エージェントの能力
│   ├── workflows/        ← スラッシュコマンドの定義
│   ├── agents/           ← サブエージェント定義
│   ├── plan.json         ← 生成されたプラン出力
│   ├── state/            ← アクティブなワークフロー状態
│   ├── results/          ← エージェントの結果ファイル
│   └── mcp.json          ← MCPサーバー設定
│
├── .claude/              ← IDE連携レイヤー
│   ├── settings.json     ← フックとパーミッション
│   ├── hooks/            ← キーワード検出、HUD
│   ├── skills/           ← .agents/skills/ へのシンボリックリンク
│   └── agents/           ← IDE用サブエージェント定義
│
└── .serena/              ← ランタイム状態
    └── memories/         ← オーケストレーションメモリファイル
```

## `.agents/` — 信頼できる情報源

ここがコアです。エージェントに必要なものはすべてここにあります。

### `config/`
- **`user-preferences.yaml`** — 言語、タイムゾーン、デフォルトCLI、エージェントごとのCLIマッピング

### `skills/`
エージェントの専門知識が格納される場所。各スキルには `SKILL.md` と `resources/` ディレクトリがあります。

- **`_shared/`** — すべてのエージェントが使用する共通リソース（ルーティング、テンプレート、チェックリスト）
- **`oma-frontend/`**、**`oma-backend/`** など — ドメイン固有のスキル

### `workflows/`
スラッシュコマンドの動作を定義するMarkdownファイル。`/plan`、`/coordinate`、`/review` などを入力した時にエージェントが従うスクリプトです。

### `agents/`
サブエージェント定義 — CLIやTaskツールでエージェントを起動するための仕様。

## `.claude/` — IDE連携

oh-my-agentをClaude Code（およびシンボリックリンクを通じて他のIDE）に接続します。

### `hooks/`
- **`triggers.json`** — 11言語でのキーワードからワークフローへのマッピング
- **`keyword-detector.ts`** — 入力からワークフローを自動検出するロジック
- **`persistent-mode.ts`** — 永続的ワークフローを完了まで実行し続ける
- **`hud.ts`** — `[OMA]` ステータスバーインジケーター

### `skills/` と `agents/`
`.agents/` を指すシンボリックリンク — 情報源は1つのまま、IDEからスキルを見えるようにします。

## `.serena/memories/` — ランタイム状態

実行中にエージェントが進捗を書き込む場所：

| ファイル | 内容 |
|------|-------------|
| `orchestrator-session.md` | セッションID、ステータス、開始時刻 |
| `task-board.md` | どのエージェントがどのタスクを担当しているか |
| `progress-{agent}.md` | ターンごとの進捗更新 |
| `result-{agent}.md` | 各エージェントの最終出力 |

ダッシュボードがこのディレクトリを監視してリアルタイム更新を表示します。

## oh-my-agentソースリポジトリの場合

oh-my-agentを使うだけでなく開発している場合、リポジトリはモノレポです：

```text
oh-my-agent/
├── cli/              ← CLIツールのソース（TypeScript）
├── web/              ← ドキュメントサイト（Next.js）
├── action/           ← 自動更新用GitHub Action
├── docs/             ← 翻訳済みREADME + 仕様
└── .agents/          ← 編集可能（ここがソース）
```
