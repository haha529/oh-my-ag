---
title: 並列実行
description: 複数のエージェントを同時に実行する — 1つずつ終わるのを待つのは遅すぎるから。
---

# 並列実行

oh-my-agentの真の力は、複数のエージェントを同時に実行できることです。バックエンドエージェントがAPIを構築している間に、フロントエンドエージェントはすでにUIを作り始めています。

## 基本パターン

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

`&` で各エージェントをバックグラウンドで実行します。`wait` は両方が完了するまでブロックします。

## ワークスペース対応パターン

マージコンフリクトを避けるため、各エージェントに専用のディレクトリを与えます：

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## `agent:parallel` を使う

よりシンプルな構文で：

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

`--no-wait` を付けて起動だけして先に進むこともできます：

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## 作業中の監視

別のターミナルを開きます：

```bash
# ターミナルダッシュボード
oma dashboard

# またはWebダッシュボード
oma dashboard:web
# → http://localhost:9847
```

ダッシュボードには各エージェントのライブステータスが表示されます — ターン数、現在のタスク、完了状態。

## マルチCLI設定

すべてのAIツールが同じ能力を持つわけではありません。各ドメインに最適なCLIにエージェントをルーティングしましょう：

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # 複雑なUI推論
  backend: gemini       # 高速なAPI生成
  mobile: gemini
  qa: claude            # 徹底的なセキュリティレビュー
  debug: claude         # 深い根本原因分析
  pm: gemini            # 素早いタスク分解
```

## CLIベンダーの解決順序

エージェント起動時、CLIは以下の優先順位で選択されます：

1. `--vendor` フラグ（最高優先）
2. そのエージェント固有の `agent_cli_mapping`
3. `default_cli` 設定
4. `cli-config.yaml` の `active_vendor`
5. `gemini`（フォールバック）

## 並列実行のコツ

- **機能ごとに1つのセッションID** — エージェントの出力をグループ化
- **APIコントラクトを先にロック** — 実装エージェントを起動する前に `/plan` を実行
- **ワークスペースを分離** — エージェント同士がファイルを上書きし合うのを防ぐ
- **積極的に監視** — マージ時に問題を発見するのではなく、ダッシュボードで早期に検出
