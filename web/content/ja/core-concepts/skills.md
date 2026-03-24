---
title: スキル
description: 二層スキルアーキテクチャがトークンを無駄にせずエージェントを賢く保つ仕組み。
---

# スキル

スキルは各エージェントをエキスパートにするものです。単なるプロンプトではなく、実行プロトコル、コードテンプレート、エラープレイブック、品質チェックリストを含む構造化された知識です。

## 二層設計

ここが巧妙なポイントです。スキルはすべてを一度にロードしません。プログレッシブ・ディスクロージャー（段階的開示）を使って、約75%のトークンを節約します。

### レイヤー1: SKILL.md（約800バイト）

常にロードされます。含まれるもの：
- エージェントのアイデンティティと役割
- いつアクティベートするか（ルーティング条件）
- コアルールと制約
- やってはいけないこと

### レイヤー2: resources/（オンデマンドロード）

エージェントが実際に作業する時だけロードされます。深い内容が含まれます：

| リソース | 役割 |
|----------|-------------|
| `execution-protocol.md` | ステップバイステップのワークフロー：分析 → 計画 → 実装 → 検証 |
| `tech-stack.md` | 詳細な技術仕様とバージョン |
| `error-playbook.md` | エラー発生時の対処法（「3ストライク」エスカレーション付き） |
| `checklist.md` | ドメイン固有の品質チェック |
| `snippets.md` | すぐに使えるコードパターン |
| `examples/` | Few-shotの入出力例 |

### 実際の構造

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← 常にロード（約800バイト）
└── resources/
    ├── execution-protocol.md         ← オンデマンド
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## 共有リソース

すべてのエージェントが `.agents/skills/_shared/` の共通基盤を共有します：

| リソース | 目的 |
|----------|---------|
| `skill-routing.md` | タスクを適切なエージェントにマッピング |
| `context-loading.md` | タスクタイプごとにロードするリソースを決定 |
| `prompt-structure.md` | Goal → Context → Constraints → Done When |
| `clarification-protocol.md` | 質問するべきか、推測で進めるべきかの判断 |
| `context-budget.md` | モデルティアごとのトークン効率的なファイル読み込み |
| `difficulty-guide.md` | Simple / Medium / Complexのタスク評価 |
| `reasoning-templates.md` | 構造化された推論の穴埋めテンプレート |
| `quality-principles.md` | 普遍的な品質基準 |
| `vendor-detection.md` | 実行中のIDE/CLIを検出 |

## 条件付きリソース

特定の条件でトリガーされた時だけロードされるリソースもあります：

| リソース | ロードタイミング |
|----------|--------------|
| `quality-score.md` | 品質評価がリクエストされた時 |
| `experiment-ledger.md` | 実験的アプローチを試す時 |
| `exploration-loop.md` | 反復的な探索が進行中の時 |

## ベンダー固有の実行

サポートされている各CLIには、`.agents/skills/_shared/runtime/execution-protocols/` に独自の実行プロトコルがあります：
- `claude.md` — Claude固有のパターン
- `gemini.md` — Gemini固有のパターン
- `codex.md` — Codex固有のパターン
- `qwen.md` — Qwen固有のパターン

## なぜこれが重要なのか

プログレッシブ・ディスクロージャーがなければ、5つのエージェントをロードするだけでコンテキストウィンドウを使い果たし、実際の作業が始まる前に終わってしまいます。この仕組みがあれば、初期ロードは軽量で、必要な時に深い実行が可能です。
