---
title: インストール
description: oh-my-agentをプロジェクトに導入する方法 — 3つの方法、どれもすぐ終わります。
---

# インストール

## 必要なもの

- **AI IDE** — Antigravity、Claude Code、Cursor、Gemini CLI、Codex CLIなど
- **bun** と **uv** — 未インストールの場合は自動インストールされます

## 方法1: ワンライナー（推奨）

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

不足している依存関係（bun、uv）を検出してインストールし、対話型セットアップを起動します。約1分で完了です。

## 方法2: 手動インストール

```bash
bunx oh-my-agent
```

プリセットを選択するメニューが表示されます：

| プリセット | 内容 |
|--------|-------------|
| ✨ All | すべてのエージェントとスキル |
| 🌐 Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| 🎨 Frontend | frontend + pm + qa + debug + brainstorm + commit |
| ⚙️ Backend | backend + db + pm + qa + debug + brainstorm + commit |
| 📱 Mobile | mobile + pm + qa + debug + brainstorm + commit |
| 🚀 DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

スキルは `.agents/skills/` に配置され、IDE用のシンボリックリンクが作成されます。

## 方法3: グローバルインストール

CLIを頻繁に使う場合（ダッシュボード、エージェント起動、診断）：

```bash
# Homebrew
brew install oh-my-agent

# または npm/bun
bun install --global oh-my-agent
```

これで `oma` がどこでも使えます：

```bash
oma doctor          # 正常性チェック
oma dashboard       # リアルタイム監視
oma agent:spawn     # ターミナルからエージェント起動
```

## AI CLIを選ぶ

少なくとも1つ必要です：

| CLI | インストール | 認証方法 |
|-----|---------|-------------|
| Gemini | `bun install --global @google/gemini-cli` | 初回実行時に自動 |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | 初回実行時に自動 |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | CLI内で `/auth` |

## 初回セットアップ

インストール後、AI IDEで `/setup` を実行して以下を設定します：

- 応答言語
- デフォルトCLIベンダー
- エージェントごとのCLIマッピング（異なるエージェントに異なるAIツールを使用）

これにより `.agents/config/user-preferences.yaml` が作成されます。すべての設定を管理するファイルです。

## 動作確認

```bash
oma doctor
```

CLIのインストール状況、MCP設定、スキルの状態をチェックします。問題があれば、修正方法を具体的に教えてくれます。

## 次のステップ

AI IDEでプロジェクトを開いてチャットを始めましょう。スキルは自動検出されます。例えばこんな感じで試してみてください：

```
"Tailwind CSSを使ってメールバリデーション付きのログインフォームを作って"
```

その他の例は[使い方ガイド](/guide/usage)をご覧ください。
