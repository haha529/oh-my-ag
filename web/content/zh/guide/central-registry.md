---
title: 中央注册表
description: 将 oh-my-agent 用作版本化注册表，让多个项目保持同步。
---

# 多仓库场景的中央注册表

有多个项目在使用 oh-my-agent？你可以把这个仓库当作**中央注册表** —— 对技能进行版本管理，所有消费方项目自动保持同步。

## 工作原理

```text
┌─────────────────────────────────────────────────────────┐
│  中央注册表（oh-my-agent 仓库）                           │
│  • release-please 自动版本管理                            │
│  • CHANGELOG.md 自动生成                                 │
│  • prompt-manifest.json（版本 + 校验和）                   │
│  • agent-skills.tar.gz 发布产物                           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  你的项目                                                │
│  • .agent-registry.yml 锁定版本                          │
│  • GitHub Action 检测新版本 → 创建 PR                     │
│  • 审查并合并即可更新                                      │
└─────────────────────────────────────────────────────────┘
```

## 对注册表维护者

发布通过 [release-please](https://github.com/googleapis/release-please) 自动化：

1. 使用 Conventional Commits（`feat:`、`fix:`、`chore:`）
2. 推送到 `main` → 自动创建/更新 Release PR
3. 合并 Release PR → 发布 GitHub Release，包含：
   - `CHANGELOG.md`
   - `prompt-manifest.json`（文件列表 + SHA256 校验和）
   - `agent-skills.tar.gz`（压缩的 `.agents/`）

## 对消费方项目

将模板复制到你的项目中：

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

锁定你的版本：

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

工作流：
- `check-registry-updates.yml` —— 检查新版本，创建 PR
- `sync-agent-registry.yml` —— 当你更新锁定版本时同步 `.agents/`

**自动合并被有意禁用。**所有更新都需要人工审查。

## 中央注册表 vs. GitHub Action

| | GitHub Action | 中央注册表 |
|:--|:--:|:--:|
| 设置成本 | 1 个工作流文件 | 3 个文件 |
| 更新方式 | `oma update` CLI | Tarball 下载 |
| 版本控制 | 始终最新 | 显式锁定 |
| 适用于 | 大多数项目 | 严格的版本控制 |

大多数团队应该使用 [GitHub Action](./automated-updates) 方式。如果你需要严格的版本锁定或无法使用第三方 Action，再考虑中央注册表。
