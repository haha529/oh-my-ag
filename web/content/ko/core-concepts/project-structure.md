---
title: 프로젝트 구조
description: 모든 파일이 어디에 있고, 왜 이렇게 구성되어 있는지 알아봅니다.
---

# 프로젝트 구조

oh-my-agent는 몇 가지 핵심 디렉토리로 모든 것을 정리합니다. 설치 후 보게 될 구조입니다.

## 전체 구조

```text
your-project/
├── .agents/              ← Single Source of Truth
│   ├── config/           ← 사용자 환경설정
│   ├── skills/           ← 에이전트 역량
│   ├── workflows/        ← 슬래시 커맨드 정의
│   ├── agents/           ← 서브에이전트 정의
│   ├── plan.json         ← 생성된 계획 출력
│   ├── state/            ← 활성 워크플로우 상태
│   ├── results/          ← 에이전트 결과 파일
│   └── mcp.json          ← MCP 서버 설정
│
├── .claude/              ← IDE 통합 레이어
│   ├── settings.json     ← 훅과 권한
│   ├── hooks/            ← 키워드 감지, HUD
│   ├── skills/           ← .agents/skills/로의 심링크
│   └── agents/           ← IDE용 서브에이전트 정의
│
└── .serena/              ← 런타임 상태
    └── memories/         ← 오케스트레이션 메모리 파일
```

## `.agents/` — 진실의 원천

핵심 디렉토리입니다. 에이전트가 필요로 하는 모든 것이 여기 있습니다.

### `config/`
- **`user-preferences.yaml`** — 언어, 타임존, 기본 CLI, 에이전트별 CLI 매핑

### `skills/`
에이전트 전문성이 있는 곳입니다. 각 스킬은 `SKILL.md`와 `resources/` 디렉토리를 갖고 있습니다.

- **`_shared/`** — 모든 에이전트가 공유하는 공통 리소스 (라우팅, 템플릿, 체크리스트)
- **`oma-frontend/`**, **`oma-backend/`** 등 — 도메인별 스킬

### `workflows/`
슬래시 커맨드 동작을 정의하는 마크다운 파일입니다. `/plan`, `/coordinate`, `/review` 등을 입력할 때 에이전트가 따르는 스크립트입니다.

### `agents/`
서브에이전트 정의 — CLI나 Task 도구를 통해 에이전트를 스폰하기 위한 스펙입니다.

## `.claude/` — IDE 통합

oh-my-agent를 Claude Code(및 심링크를 통해 다른 IDE)에 연결합니다.

### `hooks/`
- **`triggers.json`** — 11개 언어의 키워드-워크플로우 매핑
- **`keyword-detector.ts`** — 입력에서 워크플로우를 자동 감지하는 로직
- **`persistent-mode.ts`** — 영속적 워크플로우가 완료될 때까지 유지
- **`hud.ts`** — `[OMA]` 상태바 인디케이터

### `skills/`와 `agents/`
`.agents/`를 가리키는 심링크입니다 — 하나의 원천을 유지하면서 IDE에서 스킬을 볼 수 있게 합니다.

## `.serena/memories/` — 런타임 상태

에이전트가 실행 중 진행 상황을 기록하는 곳입니다:

| 파일 | 내용 |
|------|-------------|
| `orchestrator-session.md` | 세션 ID, 상태, 시작 시간 |
| `task-board.md` | 어떤 에이전트가 어떤 태스크를 맡고 있는지 |
| `progress-{agent}.md` | 턴별 진행 업데이트 |
| `result-{agent}.md` | 각 에이전트의 최종 산출물 |

대시보드가 이 디렉토리를 감시해서 실시간 업데이트를 보여줍니다.

## oh-my-agent 소스 레포

oh-my-agent를 사용하는 게 아니라 oh-my-agent 자체를 개발하는 경우, 레포는 모노레포입니다:

```text
oh-my-agent/
├── cli/              ← CLI 도구 소스 (TypeScript)
├── web/              ← 문서 사이트 (Next.js)
├── action/           ← 자동 업데이트용 GitHub Action
├── docs/             ← 번역된 README + 스펙
└── .agents/          ← 편집 가능 (여기가 소스)
```
