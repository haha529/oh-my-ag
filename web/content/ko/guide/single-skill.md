---
title: "활용 사례: 단일 스킬"
description: 집중된 작업에 에이전트 하나만 필요할 때 — 빠른 경로.
---

# 활용 사례: 단일 스킬

## 언제 사용하나요

작업 범위가 좁고 하나의 도메인이 담당할 수 있을 때 사용합니다:

- UI 컴포넌트 하나
- API 엔드포인트 하나
- 한 레이어의 버그 하나
- 한 모듈의 리팩토링

태스크가 크로스 도메인 조율(API + UI + QA)을 필요로 한다면 [멀티 에이전트 프로젝트](./multi-agent-project)로 전환하세요.

## 프롬프트 전 체크리스트

빠르게 확인하세요:

1. **산출물이 뭔가?** — 특정 파일 또는 동작
2. **스택은?** — 프레임워크, 언어, 버전
3. **"완료"란?** — 수락 기준
4. **테스트는?** — 커버해야 할 핵심 케이스

## 프롬프트 템플릿

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## 실제 예시

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## 진행 과정

1. 프롬프트 기반으로 적합한 스킬이 자동 활성화됩니다
2. 에이전트가 가정 사항을 선언합니다 (Charter Preflight)
3. 확인하거나 조정합니다
4. 에이전트가 코드와 테스트를 작성합니다
5. 로컬에서 검증합니다

## 머지 전 확인

다음을 체크하세요:
- 동작이 수락 기준과 일치하는지
- 테스트가 해피 패스와 주요 엣지 케이스를 커버하는지
- 관련 없는 파일 변경이 포함되지 않았는지
- 공유 모듈이 깨지지 않았는지

## 에스컬레이션 시점

다음 경우 멀티 에이전트 플로우로 전환하세요:
- UI 작업에 새로운 API 계약이 필요할 때
- 하나의 수정이 여러 레이어에 연쇄적으로 영향을 줄 때
- 첫 번째 반복 후 범위가 하나의 도메인을 넘어설 때
