---
title: 자동 업데이트
description: 새 버전이 나오면 PR을 자동으로 여는 GitHub Action으로 oh-my-agent 스킬을 최신 상태로 유지합니다.
---

# GitHub Action으로 자동 업데이트

한 번 설정하면 잊어도 됩니다. GitHub Action이 새 oh-my-agent 버전을 확인하고 업데이트가 있으면 PR을 엽니다.

## 빠른 설정

레포에 다음을 추가하세요:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # 매주 월요일 09:00 UTC
  workflow_dispatch:        # 또는 수동 실행

permissions:
  contents: write
  pull-requests: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
```

이게 전부입니다. 스킬이 업데이트될 때마다 PR을 받게 됩니다.

## Action 입력값

| 입력값 | 하는 일 | 기본값 |
|-------|-------------|---------|
| `mode` | `pr`은 PR을 열고, `commit`은 직접 푸시 | `pr` |
| `base-branch` | 대상 브랜치 | `main` |
| `force` | 커스텀 설정 파일 덮어쓰기 | `false` |
| `pr-title` | 커스텀 PR 제목 | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | 쉼표로 구분된 PR 라벨 | `dependencies,automated` |
| `commit-message` | 커스텀 커밋 메시지 | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub 토큰 | `${{ github.token }}` |

## Action 출력값

| 출력값 | 내용 |
|--------|-----------------|
| `updated` | 변경이 감지되면 `true` |
| `version` | 업데이트 후 oh-my-agent 버전 |
| `pr-number` | PR 번호 (pr 모드에서만) |
| `pr-url` | PR URL (pr 모드에서만) |

## 예시

### PR 없이 직접 커밋

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### Personal Access Token 사용

포크 레포에서 `GITHUB_TOKEN`에 쓰기 권한이 없을 때:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### 업데이트 시 알림

```yaml
jobs:
  update:
    runs-on: ubuntu-latest
    outputs:
      updated: ${{ steps.oma.outputs.updated }}
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
        id: oma

  notify:
    needs: update
    if: needs.update.outputs.updated == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Updated to ${{ needs.update.outputs.version }}"
```

## 내부 동작 원리

1. Bun을 통해 `oh-my-agent` CLI 설치
2. `oma update --ci` 실행 (비대화형)
3. `.agents/`와 `.claude/`의 변경 감지
4. `mode`에 따라 PR 생성 또는 커밋
