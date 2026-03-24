---
title: 병렬 실행
description: 여러 에이전트를 동시에 실행합니다 — 하나가 끝날 때까지 기다리는 건 느리니까요.
---

# 병렬 실행

oh-my-agent의 진짜 파워는 여러 에이전트를 동시에 실행하는 데 있습니다. 백엔드 에이전트가 API를 만드는 동안, 프론트엔드 에이전트는 이미 UI를 구현하고 있죠.

## 기본 패턴

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

`&`는 각 에이전트를 백그라운드에서 실행합니다. `wait`는 둘 다 끝날 때까지 대기합니다.

## 워크스페이스 분리 패턴

에이전트별로 디렉토리를 나눠서 머지 충돌을 방지합니다:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## `agent:parallel` 사용

더 간결한 문법을 원한다면:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

`--no-wait`를 추가하면 실행만 하고 기다리지 않습니다:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## 작업 중 모니터링

별도 터미널을 열어서:

```bash
# 터미널 대시보드
oma dashboard

# 또는 웹 대시보드
oma dashboard:web
# → http://localhost:9847
```

대시보드에서 각 에이전트의 실시간 상태를 확인할 수 있습니다 — 턴 수, 현재 태스크, 완료 상태 등.

## 멀티 CLI 구성

모든 AI 도구가 동일한 건 아닙니다. 에이전트를 해당 도메인에 가장 적합한 CLI로 라우팅하세요:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # 복잡한 UI 추론
  backend: gemini       # 빠른 API 생성
  mobile: gemini
  qa: claude            # 꼼꼼한 보안 리뷰
  debug: claude         # 깊이 있는 근본 원인 분석
  pm: gemini            # 빠른 태스크 분해
```

## CLI 벤더 결정 순서

에이전트 스폰 시 CLI는 다음 순서로 선택됩니다:

1. `--vendor` 플래그 (최우선)
2. 해당 에이전트의 `agent_cli_mapping`
3. `default_cli` 설정
4. `cli-config.yaml`의 `active_vendor`
5. `gemini` (기본값)

## 병렬 실행 팁

- **기능당 하나의 세션 ID 사용** — 에이전트 출력을 그룹화합니다
- **API 계약을 먼저 확정** — 구현 에이전트를 스폰하기 전에 `/plan`을 실행하세요
- **워크스페이스 분리** — 에이전트끼리 파일을 덮어쓰는 일을 방지합니다
- **능동적 모니터링** — 머지 시점에 문제를 발견하는 대신 대시보드로 조기에 감지하세요
