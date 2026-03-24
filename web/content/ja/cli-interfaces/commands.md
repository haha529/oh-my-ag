---
title: CLIコマンド
description: oh-my-agent CLIで使えるすべてのコマンド — 使用例付き。
---

# CLIコマンド

グローバルインストール（`bun install --global oh-my-agent`）後、`oma` または `oh-my-ag` で使用できます。

## セットアップとメンテナンス

```bash
oma                    # 対話型インストーラー — プリセット選択、スキルインストール
oma doctor             # ヘルスチェック：CLI、MCP設定、スキルの状態
oma update             # レジストリからスキルを最新バージョンに更新
oma cleanup            # 孤立したプロセスと一時ファイルを削除
```

## 監視

```bash
oma dashboard          # ターミナルダッシュボード — エージェントのライブステータス
oma dashboard:web      # Webダッシュボード http://localhost:9847
oma stats              # 生産性メトリクスを表示
oma retro [days]       # トレンド付きエンジニアリング振り返り
```

## エージェント管理

```bash
# 単一エージェントを起動
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# エージェントステータスを確認
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# 複数エージェントを並列実行
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## メモリと検証

```bash
# Serenaメモリスキーマを初期化
oma memory:init

# エージェント出力の品質を検証
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## 連携とユーティリティ

```bash
oma auth:status        # CLI認証ステータスを確認
oma usage:anti         # Antigravity IDEの使用量クォータを表示
oma bridge [url]       # MCP stdioをStreamable HTTPにブリッジ
oma visualize          # プロジェクト依存関係グラフを生成
oma describe [cmd]     # CLIコマンドのJSONイントロスペクション
oma star               # GitHubでoh-my-agentにスターを付ける
```

## ヘルプ

```bash
oma help               # すべてのコマンドを表示
oma version            # バージョン番号を表示
oma <command> --help   # 特定コマンドのヘルプ
```
