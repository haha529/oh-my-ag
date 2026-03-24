---
title: 중앙 레지스트리
description: oh-my-agent를 버전 관리되는 레지스트리로 사용해 여러 프로젝트를 동기화합니다.
---

# 멀티 레포 설정을 위한 중앙 레지스트리

oh-my-agent를 사용하는 프로젝트가 여러 개인가요? 이 레포를 **중앙 레지스트리**로 활용할 수 있습니다 — 스킬 버전을 관리하면 모든 소비자 프로젝트가 동기화됩니다.

## 동작 방식

```text
┌─────────────────────────────────────────────────────────┐
│  Central Registry (oh-my-agent repo)                    │
│  • release-please로 자동 버전 관리                        │
│  • CHANGELOG.md 자동 생성                                │
│  • prompt-manifest.json (버전 + 체크섬)                   │
│  • agent-skills.tar.gz 릴리스 아티팩트                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Your Project                                           │
│  • .agent-registry.yml로 버전 고정                       │
│  • GitHub Action이 새 버전 감지 → PR 생성                │
│  • 리뷰 후 머지하여 업데이트                               │
└─────────────────────────────────────────────────────────┘
```

## 레지스트리 관리자용

릴리스는 [release-please](https://github.com/googleapis/release-please)를 통해 자동화됩니다:

1. Conventional Commits 사용 (`feat:`, `fix:`, `chore:`)
2. `main`에 푸시 → Release PR이 생성/업데이트
3. Release PR 머지 → 다음이 포함된 GitHub Release 발행:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (파일 목록 + SHA256 체크섬)
   - `agent-skills.tar.gz` (압축된 `.agents/`)

## 소비자 프로젝트용

템플릿을 프로젝트에 복사하세요:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

버전을 고정합니다:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

워크플로우:
- `check-registry-updates.yml` — 새 버전 확인, PR 생성
- `sync-agent-registry.yml` — 고정 버전 업데이트 시 `.agents/` 동기화

**자동 머지는 의도적으로 비활성화되어 있습니다.** 모든 업데이트는 사람이 리뷰합니다.

## 중앙 레지스트리 vs GitHub Action

| | GitHub Action | 중앙 레지스트리 |
|:--|:--:|:--:|
| 설정 난이도 | 워크플로우 파일 1개 | 파일 3개 |
| 업데이트 방식 | `oma update` CLI | Tarball 다운로드 |
| 버전 관리 | 항상 최신 | 명시적 고정 |
| 적합한 경우 | 대부분의 프로젝트 | 엄격한 버전 관리 |

대부분의 팀은 [GitHub Action](./automated-updates) 방식을 사용하는 것이 좋습니다. 엄격한 버전 고정이 필요하거나 서드파티 액션을 사용할 수 없는 경우 중앙 레지스트리를 사용하세요.
