---
title: Central Registry
description: Use oh-my-agent as a versioned registry to keep multiple projects in sync.
---

# Central Registry for Multi-Repo Setup

Got multiple projects using oh-my-agent? You can treat this repo as a **central registry** — version your skills, and all consumer projects stay in sync.

## How It Works

```text
┌─────────────────────────────────────────────────────────┐
│  Central Registry (oh-my-agent repo)                    │
│  • release-please for automatic versioning              │
│  • CHANGELOG.md auto-generation                         │
│  • prompt-manifest.json (versions + checksums)          │
│  • agent-skills.tar.gz release artifact                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Your Project                                           │
│  • .agent-registry.yml pins version                     │
│  • GitHub Action detects new versions → opens PR        │
│  • Review and merge to update                           │
└─────────────────────────────────────────────────────────┘
```

## For Registry Maintainers

Releases are automated via [release-please](https://github.com/googleapis/release-please):

1. Use Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push to `main` → Release PR is created/updated
3. Merge the Release PR → GitHub Release published with:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (file list + SHA256 checksums)
   - `agent-skills.tar.gz` (compressed `.agents/`)

## For Consumer Projects

Copy the templates into your project:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Pin your version:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

The workflows:
- `check-registry-updates.yml` — Checks for new versions, opens a PR
- `sync-agent-registry.yml` — Syncs `.agents/` when you update the pinned version

**Auto-merge is disabled on purpose.** All updates get human review.

## Central Registry vs. GitHub Action

| | GitHub Action | Central Registry |
|:--|:--:|:--:|
| Setup effort | 1 workflow file | 3 files |
| Update method | `oma update` CLI | Tarball download |
| Version control | Always latest | Explicit pin |
| Best for | Most projects | Strict version control |

Most teams should use the [GitHub Action](./automated-updates) approach. Use Central Registry if you need strict version pinning or can't use third-party actions.
