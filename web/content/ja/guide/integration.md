---
title: 既存プロジェクトへの統合
description: 既に進行中のプロジェクトにoh-my-agentを追加する — 安全で非破壊的に。
---

# 既存プロジェクトへの統合

既にプロジェクトがありますか？ 何も壊さずにoh-my-agentを追加する方法を説明します。

## 簡単な方法（CLI）

プロジェクトルートで実行してください：

```bash
bunx oh-my-agent
```

実行内容：
- `.agents/skills/` にスキルをインストール
- `.agents/skills/_shared/` に共有リソースをコピー
- IDE用のシンボリックリンクを作成（`.claude/skills/` など）
- `.agents/workflows/` にワークフローをインストール
- `.agents/config/user-preferences.yaml` にデフォルト設定を作成

## 手動で行う方法

何をコピーするか完全にコントロールしたい場合：

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# 必要なスキルをコピー
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# 共有リソースをコピー
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# ワークフローをコピー
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# デフォルト設定（未作成の場合のみ）
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## 動作確認

```bash
oma doctor
```

または手動で確認：
```bash
ls .agents/skills/          # スキルディレクトリが表示されるはず
ls .agents/workflows/       # ワークフローの.mdファイルが表示されるはず
cat .agents/config/user-preferences.yaml  # 設定が表示されるはず
```

## マルチIDEシンボリックリンク

`bunx oh-my-agent` の実行中に聞かれます：

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

情報源は1つ（`.agents/skills/`）で、複数のIDEがそこから読み取ります：

```text
.agents/skills/oma-frontend/     ← ソース（SSOT）
.claude/skills/oma-frontend/     → symlink
.cursor/skills/oma-frontend/     → symlink
.github/skills/oma-frontend/     → symlink
```

## 安全のためのヒント

**統合前に**チェックポイントを作成しましょう：

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- CLIは既存のスキルフォルダを上書きしません
- プロジェクト固有の設定はあなたの管理下です
- `oma doctor` が問題をフラグします

## オプション: ダッシュボード

```bash
oma dashboard        # ターミナル監視
oma dashboard:web    # Web UIで http://localhost:9847
```

## 次のステップ

AI IDEでチャットを始めるか、[使い方ガイド](./usage)でワークフローの例を確認してください。
