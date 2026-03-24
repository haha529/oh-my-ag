---
title: "활용 사례: 버그 수정"
description: 구조화된 디버깅 — 이슈 재현부터 회귀 테스트 작성까지.
---

# 활용 사례: 버그 수정

## 좋은 리포트로 시작하세요

버그 리포트가 정확할수록 수정도 빨라집니다:

```text
Symptom: Login button throws TypeError
Environment: Chrome 130, macOS, production build
Steps to reproduce:
  1. Go to /login
  2. Enter valid credentials
  3. Click "Sign In"
Expected: Redirect to dashboard
Actual: White screen, console shows "Cannot read property 'map' of undefined"
Logs: [paste relevant logs]
```

## 먼저 분류하세요

| 심각도 | 의미 | 대응 |
|----------|--------------|----------|
| **P0** | 데이터 손실, 인증 우회, 프로덕션 장애 | 모든 작업 중단, QA/보안 참여 |
| **P1** | 주요 사용자 플로우 차단 | 현재 스프린트에서 수정 |
| **P2** | 저하되었지만 우회 가능 | 수정 예약 |
| **P3** | 사소함, 차단 없음 | 백로그 |

## 디버그 루프

1. **재현** — 최소 환경에서 정확하게
2. **격리** — 근본 원인 찾기 (증상이 아닌)
3. **수정** — 가장 작고 안전한 변경
4. **테스트** — 실패 경로에 대한 회귀 테스트
5. **스캔** — 인접 코드에서 같은 패턴 확인

## 프롬프트 템플릿

```text
Bug: Login throws "Cannot read property 'map' of undefined"
Repro: Click sign-in with valid credentials
Scope: src/components/auth/*, src/hooks/useAuth.ts
Expected: Redirect to dashboard
Need:
1) root cause analysis
2) minimal fix
3) regression tests
4) scan for similar patterns
```

## 에스컬레이션 시점

버그가 다음을 건드리면 QA나 보안을 참여시키세요:

- 인증 / 세션 / 토큰 갱신
- 권한 경계
- 결제 / 트랜잭션 일관성
- 부하 상황의 성능

## 수정 후

다음을 확인하세요:
- 원래 재현 시나리오가 더 이상 실패하지 않음
- 관련 플로우에 새로운 에러가 없음
- 수정 전에는 테스트가 실패하고, 수정 후에는 통과함
- 필요시 롤백 경로가 명확함
