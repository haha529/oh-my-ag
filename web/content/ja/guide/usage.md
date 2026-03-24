---
title: 使い方ガイド
description: 実践的な例で学ぶoh-my-agentの使い方 — シンプルなタスクからマルチエージェントオーケストレーションまで。
---

# oh-my-agentの使い方

> どこから始めればいいか迷ったら、`/coordinate` と作りたいものを入力してください。

## クイックスタート

1. AI IDE（Claude Code、Gemini、Cursorなど）でプロジェクトを開く
2. スキルは `.agents/skills/` から自動検出される
3. チャットを始める — 作りたいものを説明する

それだけです。あとはoh-my-agentが処理します。

---

## 例1: シンプルな単一タスク

**入力：**
```
"Tailwind CSSを使ってメールとパスワードのフィールドを持つログインフォームコンポーネントを作って"
```

**動作：**
- `oma-frontend` スキルがアクティベート
- 実行プロトコルとtech-stackリソースをオンデマンドでロード
- TypeScript、Tailwind、フォームバリデーション、テスト付きのReactコンポーネントが生成される

スラッシュコマンドは不要。作りたいものを説明するだけです。

## 例2: マルチドメインプロジェクト

**入力：**
```
"ユーザー認証付きのTODOアプリを作って"
```

**動作：**

1. キーワード検出がマルチドメインと判断 → `/coordinate` を提案
2. **PMエージェント**が作業を計画：認証API、データベーススキーマ、フロントエンドUI、QAスコープ
3. **エージェントを起動：**
   ```bash
   oma agent:spawn backend "JWT authentication API" session-01 -w ./apps/api &
   oma agent:spawn frontend "Login and TODO UI" session-01 -w ./apps/web &
   wait
   ```
4. **エージェントが並列実行** — それぞれ自分のワークスペースで
5. **QAエージェントがレビュー** — セキュリティ監査、インテグレーションチェック
6. **必要に応じてイテレーション** — 改善指示でエージェントを再起動

## 例3: バグ修正

**入力：**
```
"バグがある — ログインをクリックすると 'Cannot read property map of undefined' が表示される"
```

**動作：**

1. `oma-debug` が自動起動（キーワード：「バグ」）
2. 根本原因を特定 — データロード前に `todos` をmapしているコンポーネント
3. 修正を適用 — ローディング状態とnullチェック
4. リグレッションテストを作成
5. 他の3つのコンポーネントで同様のパターンを発見し、先回りして修正

## 例4: デザインシステム

**入力：**
```
"SaaS製品用のダークプレミアムなランディングページをデザインして"
```

**動作：**

1. `oma-design` がアクティベート（キーワード：「デザイン」「ランディングページ」）
2. コンテキストを収集 — ターゲットユーザー、ブランド、デザインの方向性
3. カラー、タイポグラフィ、レイアウトのオプション付きで2-3のデザイン方向を提案
4. トークン、コンポーネントパターン、アクセシビリティルールを含む `DESIGN.md` を生成
5. 監査を実行 — レスポンシブ、WCAG、ニールセンヒューリスティクス
6. `oma-frontend` による実装の準備完了

## 例5: CLI並列実行

```bash
# 単一エージェント
oma agent:spawn backend "Implement JWT auth API" session-01

# 複数エージェントを並列で
oma agent:spawn backend "Auth API + DB migration" session-01 -w ./apps/api &
oma agent:spawn frontend "Login form + error states" session-01 -w ./apps/web &
oma agent:spawn mobile "Auth screens + biometrics" session-01 -w ./apps/mobile &
wait

# リアルタイム監視
oma dashboard        # ターミナルUI
oma dashboard:web    # Web UIで http://localhost:9847
```

---

## ワークフローコマンド

AI IDEでこれらを入力すると、構造化されたプロセスが起動します：

| コマンド | 機能 | 使うタイミング |
|---------|-------------|-------------|
| `/brainstorm` | 自由なアイデア出しと探索 | アプローチを決める前 |
| `/plan` | PMタスク分解 → `.agents/plan.json` | 複雑な機能の着手前 |
| `/exec-plan` | 既存プランをステップバイステップで実行 | `/plan` の後 |
| `/coordinate` | ステップバイステップのマルチドメイン連携 | 複数エージェントにまたがる機能 |
| `/orchestrate` | 自動並列エージェント実行 | 大規模プロジェクト、最大並列性 |
| `/ultrawork` | 5フェーズ品質ワークフロー（11レビューゲート） | 最高品質デリバリー |
| `/review` | セキュリティ + パフォーマンス + アクセシビリティ監査 | マージ前 |
| `/debug` | 構造化された根本原因デバッグ | バグ調査時 |
| `/design` | 7フェーズデザインワークフロー → `DESIGN.md` | デザインシステム構築時 |
| `/commit` | type/scope分析付きConventional Commit | 変更のコミット時 |
| `/setup` | プロジェクト設定 | 初回セットアップ |
| `/tools` | MCPサーバー管理 | 外部ツール追加時 |
| `/stack-set` | 技術スタック設定 | 言語/フレームワーク設定時 |
| `/deepinit` | フルプロジェクト初期化 | 既存コードベースへのセットアップ |

---

## 自動検出（スラッシュコマンド不要）

oh-my-agentは11言語のキーワードを検出し、ワークフローを自動起動します：

| 発言 | 起動するワークフロー |
|---------|------------------------|
| "plan the auth feature" | `/plan` |
| "버그 수정해줘" | `/debug` |
| "do everything in parallel" | `/orchestrate` |
| "レビューして" | `/review` |
| "diseña la página" | `/design` |
| "brainstorm some ideas" | `/brainstorm` |

「orchestrateとは何？」のような質問はフィルタリングされ、ワークフローを誤って起動しません。

---

## 利用可能なスキル

| スキル | 得意な作業 | 出力 |
|-------|---------|--------|
| oma-pm | "計画して"、"分解して" | `.agents/plan.json` |
| oma-frontend | UI、コンポーネント、スタイリング | Reactコンポーネント、テスト |
| oma-backend | API、データベース、認証 | エンドポイント、モデル、テスト |
| oma-db | スキーマ、ERD、マイグレーション | スキーマ設計、クエリチューニング |
| oma-mobile | モバイルアプリ | Flutter画面、状態管理 |
| oma-design | UI/UX、デザインシステム | トークン付き `DESIGN.md` |
| oma-brainstorm | アイデア出し、探索 | デザインドキュメント |
| oma-qa | セキュリティ、パフォーマンス、a11y | 優先順位付きQAレポート |
| oma-debug | バグ、エラー、クラッシュ | 修正コード + リグレッションテスト |
| oma-tf-infra | クラウドインフラ | Terraformモジュール |
| oma-dev-workflow | CI/CD、自動化 | パイプライン設定 |
| oma-translator | 翻訳 | 自然な多言語コンテンツ |
| oma-orchestrator | 並列実行 | エージェント結果 |
| oma-commit | Gitコミット | Conventional Commits |

---

## ダッシュボード

### ターミナルダッシュボード

```bash
oma dashboard
```

セッションステータス、エージェント状態、ターン数、最新のアクティビティをライブテーブルで表示。`.serena/memories/` を監視してリアルタイム更新します。

### Webダッシュボード

```bash
oma dashboard:web
# → http://localhost:9847
```

機能：
- WebSocketによるリアルタイム更新
- 接続切断時の自動再接続
- カラーインジケーター付きセッションステータス
- 進捗・結果ファイルからのアクティビティログ

### おすすめのレイアウト

3つのターミナルを並べて使いましょう：
1. ダッシュボード（`oma dashboard`）
2. エージェント起動コマンド
3. テスト/ビルドログ

---

## ヒント

1. **具体的に** — 「TODOアプリを作って、JWT認証、Reactフロントエンド、Expressバックエンドで」は「アプリ作って」より良い
2. **ワークスペースを使う** — `-w ./apps/api` でエージェント同士の干渉を防ぐ
3. **コントラクトを先にロック** — 並列エージェントを起動する前に `/plan` を実行
4. **積極的に監視** — ダッシュボードでマージ前に問題を検出
5. **再起動でイテレーション** — 最初からやり直すのではなく、エージェントのプロンプトを改善
6. **迷ったら `/coordinate`** — どのワークフローを使うか分からない時

---

## トラブルシューティング

| 問題 | 対処法 |
|---------|-----|
| IDEでスキルが検出されない | `.agents/skills/` に `SKILL.md` ファイルがあるか確認し、IDEを再起動 |
| CLIが見つからない | `which gemini` / `which claude` — 不足しているものをインストール |
| エージェントが矛盾するコードを生成 | ワークスペースを分離（`-w`）、出力を確認、修正指示で再起動 |
| ダッシュボードに"No agents detected" | エージェントがまだ `.serena/memories/` に書き込んでいない — 待つかセッションIDを確認 |
| Webダッシュボードが起動しない | まず `bun install` を実行 |
| QAレポートに50+の問題 | CRITICAL/HIGHを優先し、残りは後で対応としてドキュメント化 |

---

既存プロジェクトへの統合については、[統合ガイド](./integration)をご覧ください。
