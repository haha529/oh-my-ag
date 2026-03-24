---
title: "ユースケース: 単一スキル"
description: 1つのエージェントで集中的なタスクをこなすだけの場面 — 最短経路。
---

# ユースケース: 単一スキル

## いつ使うか

タスクのスコープが狭く、1つのドメインで完結する場合に使います：

- 1つのUIコンポーネント
- 1つのAPIエンドポイント
- 1つのレイヤーの1つのバグ
- 1つのモジュールの1つのリファクタリング

クロスドメインの連携が必要な場合（API + UI + QA）は、[マルチエージェントプロジェクト](./multi-agent-project)に切り替えてください。

## プロンプトの前に

簡単なチェックリスト：

1. **出力は何？** — 具体的なファイルまたは動作
2. **スタックは？** — フレームワーク、言語、バージョン
3. **「完了」とは？** — 受け入れ基準
4. **テストは？** — カバーすべき重要なケース

## プロンプトテンプレート

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## 実際の例

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## 何が起きるか

1. プロンプトに基づいて適切なスキルが自動起動
2. エージェントが前提条件を宣言（チャータープリフライト）
3. 確認または調整する
4. エージェントがコードとテストを書く
5. ローカルで検証を実行

## マージ前に

以下を確認してください：
- 動作が受け入れ基準を満たしている
- テストがハッピーパスと主要なエッジケースをカバーしている
- 無関係なファイル変更が紛れ込んでいない
- 共有モジュールが壊れていない

## エスカレーションのタイミング

以下の場合はマルチエージェントフローに切り替えましょう：
- UI作業に新しいAPIコントラクトが必要
- 1つの修正が複数レイヤーに波及する
- 最初のイテレーション後にスコープが1つのドメインを超えて拡大
