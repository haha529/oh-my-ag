---
title: "ユースケース: マルチエージェントプロジェクト"
description: フロントエンド、バックエンド、データベース、QAにまたがる機能で、複数エージェントを連携させる方法。
---

# ユースケース: マルチエージェントプロジェクト

## いつ使うか

機能が複数ドメインにまたがる場合です。バックエンドAPI + フロントエンドUI + データベーススキーマ + QAレビュー。1つのエージェントでは対応しきれず、並列で作業させたい時に使います。

## コーディネーションシーケンス

```text
/plan → /coordinate → agent:spawn (parallel) → /review → merge
```

1. **`/plan`** — PMエージェントが機能をドメインタスクに分解
2. **`/coordinate`** — 実行順序と担当を設定
3. **`agent:spawn`** — エージェントが並列実行
4. **`/review`** — QAがクロスドメインの整合性をレビュー

## セッション戦略

機能ごとに1つのセッションIDを使います：

```text
session-auth-v2
```

ドメインごとにワークスペースを割り当てます：

| エージェント | ワークスペース |
|-------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## 起動例

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## コントラクトファーストルール

エージェントが並列でコーディングを始める前に、**APIコントラクトをロック**してください：

- リクエスト/レスポンススキーマ
- エラーコードとメッセージ
- 認証/セッションのライフサイクルに関する前提

実行中にコントラクトが変わった場合は、下流のエージェントを一時停止し、更新されたコントラクトでプロンプトを再発行します。

## マージゲート

以下が満たされるまでマージしないでください：

1. ドメインレベルのテストがパス
2. インテグレーションポイントが合意されたコントラクトと一致
3. QAのhigh/criticalな問題が解決済み（または明示的に免除）
4. 外部から見える動作が変わった場合はChangelogを更新

## やってはいけないこと

- すべてのエージェントで1つのワークスペースを共有する（マージコンフリクト地獄）
- 他のエージェントに伝えずにコントラクトを変更する
- 互換性チェック前にバックエンドとフロントエンドを別々にマージする

## 完了条件

- すべてのドメインで計画されたタスクが完了
- クロスドメインのインテグレーションが検証済み
- QAの承認が記録済み
