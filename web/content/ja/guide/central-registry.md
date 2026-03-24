---
title: セントラルレジストリ
description: oh-my-agentをバージョン管理されたレジストリとして使い、複数プロジェクトを同期する。
---

# マルチリポ構成のセントラルレジストリ

oh-my-agentを使っているプロジェクトが複数ありますか？ このリポジトリを**セントラルレジストリ**として扱えます。スキルをバージョン管理し、すべてのコンシューマープロジェクトを同期させましょう。

## 仕組み

```text
┌─────────────────────────────────────────────────────────┐
│  セントラルレジストリ（oh-my-agentリポジトリ）              │
│  • release-pleaseによる自動バージョニング                   │
│  • CHANGELOG.md自動生成                                    │
│  • prompt-manifest.json（バージョン + チェックサム）         │
│  • agent-skills.tar.gz リリースアーティファクト              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  あなたのプロジェクト                                      │
│  • .agent-registry.ymlでバージョンをピン留め                │
│  • GitHub Actionが新バージョンを検出 → PRを作成             │
│  • レビューしてマージすれば更新完了                          │
└─────────────────────────────────────────────────────────┘
```

## レジストリ管理者向け

リリースは[release-please](https://github.com/googleapis/release-please)で自動化されています：

1. Conventional Commitsを使う（`feat:`、`fix:`、`chore:`）
2. `main` にプッシュ → リリースPRが作成/更新される
3. リリースPRをマージ → GitHub Releaseが以下と共に公開：
   - `CHANGELOG.md`
   - `prompt-manifest.json`（ファイルリスト + SHA256チェックサム）
   - `agent-skills.tar.gz`（圧縮された `.agents/`）

## コンシューマープロジェクト向け

テンプレートをプロジェクトにコピーします：

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

バージョンをピン留めします：

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

ワークフロー：
- `check-registry-updates.yml` — 新バージョンをチェックしてPRを作成
- `sync-agent-registry.yml` — ピン留めバージョンの更新時に `.agents/` を同期

**自動マージは意図的に無効**にしています。すべての更新は人間がレビューします。

## セントラルレジストリ vs. GitHub Action

| | GitHub Action | セントラルレジストリ |
|:--|:--:|:--:|
| セットアップ工数 | ワークフロー1ファイル | 3ファイル |
| 更新方法 | `oma update` CLI | tarballダウンロード |
| バージョン管理 | 常に最新 | 明示的ピン留め |
| 適している用途 | ほとんどのプロジェクト | 厳格なバージョン管理 |

ほとんどのチームは[GitHub Action](./automated-updates)アプローチを使うべきです。厳格なバージョンピン留めが必要な場合や、サードパーティActionが使えない場合にセントラルレジストリを使ってください。
