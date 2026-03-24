---
title: CLIオプション
description: oh-my-agent CLIコマンドのすべてのフラグとオプション。
---

# CLIオプション

## グローバルオプション

すべてのコマンドで使用できます：

| オプション | 機能 |
|--------|-------------|
| `-h, --help` | ヘルプを表示 |
| `-V, --version` | バージョン番号を表示 |

## 出力オプション

多くのコマンドが機械可読な出力をサポートしています：

| オプション | 機能 |
|--------|-------------|
| `--json` | JSON形式で出力 |
| `--output <format>` | 出力形式：`text` または `json` |

環境変数 `OH_MY_AG_OUTPUT_FORMAT=json` でも設定できます。

**対応コマンド：** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## コマンド別オプション

### `update`
| オプション | 機能 |
|--------|-------------|
| `-f, --force` | カスタマイズされた設定ファイルを上書き |
| `--ci` | 非対話モード（すべてのプロンプトをスキップ） |

### `stats`
| オプション | 機能 |
|--------|-------------|
| `--reset` | すべてのメトリクスデータをリセット |

### `retro`
| オプション | 機能 |
|--------|-------------|
| `--interactive` | 手動入力モード |
| `--compare` | 現在の期間と前の同期間を比較 |

### `cleanup`
| オプション | 機能 |
|--------|-------------|
| `--dry-run` | 実行せずにクリーンアップ対象を表示 |
| `-y, --yes` | 確認プロンプトをスキップ |

### `usage:anti`
| オプション | 機能 |
|--------|-------------|
| `--raw` | 生のRPCレスポンスをダンプ |

### `agent:spawn`
| オプション | 機能 |
|--------|-------------|
| `-v, --vendor <vendor>` | CLIベンダーを上書き（`gemini`/`claude`/`codex`/`qwen`） |
| `-w, --workspace <path>` | エージェントの作業ディレクトリ |

### `agent:status`
| オプション | 機能 |
|--------|-------------|
| `-r, --root <path>` | メモリチェックのルートパス |

### `agent:parallel`
| オプション | 機能 |
|--------|-------------|
| `-v, --vendor <vendor>` | CLIベンダーを上書き |
| `-i, --inline` | タスクを `agent:task` 引数として指定 |
| `--no-wait` | 完了を待たない（バックグラウンドモード） |

### `memory:init`
| オプション | 機能 |
|--------|-------------|
| `--force` | 既存のスキーマファイルを上書き |

### `verify`
| オプション | 機能 |
|--------|-------------|
| `-w, --workspace <path>` | 検証対象のワークスペースパス |

## 実践例

```bash
# CIパイプライン向けJSON出力
oma doctor --json

# 生産性メトリクスのリセット
oma stats --reset

# 実行せずにクリーンアップ対象をプレビュー
oma cleanup --dry-run

# 特定のCLIとワークスペースで起動
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# CIでの非対話的更新
oma update --ci --force

# 直近7日間と前の7日間を比較
oma retro 7 --compare
```
