---
title: "활용 사례: 멀티 에이전트 프로젝트"
description: 프론트엔드, 백엔드, 데이터베이스, QA에 걸친 기능을 여러 에이전트로 조율하는 방법.
---

# 활용 사례: 멀티 에이전트 프로젝트

## 언제 사용하나요

기능이 여러 도메인에 걸쳐 있을 때 — 백엔드 API + 프론트엔드 UI + 데이터베이스 스키마 + QA 리뷰. 하나의 에이전트로는 감당할 수 없고, 병렬로 작업하길 원할 때 사용합니다.

## 조율 시퀀스

```text
/plan → /coordinate → agent:spawn (parallel) → /review → merge
```

1. **`/plan`** — PM 에이전트가 기능을 도메인별 태스크로 분해
2. **`/coordinate`** — 실행 순서와 담당자 설정
3. **`agent:spawn`** — 에이전트가 병렬로 실행
4. **`/review`** — QA가 크로스 도메인 일관성 리뷰

## 세션 전략

기능당 하나의 세션 ID를 사용합니다:

```text
session-auth-v2
```

도메인별 워크스페이스를 지정합니다:

| 에이전트 | 워크스페이스 |
|-------|-----------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## 스폰 예시

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## 계약 우선 원칙

에이전트가 병렬로 코딩을 시작하기 전에 **API 계약을 확정**하세요:

- 요청/응답 스키마
- 에러 코드와 메시지
- 인증/세션 라이프사이클 가정

계약이 실행 중 변경되면 하위 에이전트를 일시 중지하고, 업데이트된 계약으로 프롬프트를 다시 전달하세요.

## 머지 게이트

다음 조건을 충족할 때까지 머지하지 마세요:

1. 도메인 수준 테스트 통과
2. 통합 지점이 합의된 계약과 일치
3. QA의 high/critical 이슈가 해결됨 (또는 명시적으로 면제)
4. 외부에 보이는 동작이 변경되었다면 변경 로그 업데이트

## 하지 말아야 할 것

- 모든 에이전트가 하나의 워크스페이스를 공유 (머지 충돌 지옥)
- 다른 에이전트에 알리지 않고 계약 변경
- 호환성 검사 전에 백엔드와 프론트엔드를 독립적으로 머지

## 완료 조건

- 모든 도메인에서 계획된 태스크 완료
- 크로스 도메인 통합 검증 완료
- QA 승인 기록 완료
