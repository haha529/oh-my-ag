---
title: 사용 가이드
description: 실제 사용 예시로 알아보는 oh-my-agent — 간단한 작업부터 멀티 에이전트 오케스트레이션까지.
---

# oh-my-agent 사용법

> 어디서 시작할지 모르겠다면 `/coordinate`를 입력하고 만들고 싶은 것을 설명하세요.

## 빠른 시작

1. AI IDE에서 프로젝트를 엽니다 (Claude Code, Gemini, Cursor 등)
2. `.agents/skills/`에서 스킬이 자동 감지됩니다
3. 대화를 시작합니다 — 원하는 것을 설명하세요

끝입니다. 나머지는 oh-my-agent가 처리합니다.

---

## 예시 1: 단순한 단일 작업

**입력:**
```
"Tailwind CSS로 이메일과 비밀번호 필드가 있는 로그인 폼 컴포넌트 만들어줘"
```

**결과:**
- `oma-frontend` 스킬이 활성화됩니다
- 실행 프로토콜과 기술 스택 리소스를 온디맨드로 로딩합니다
- TypeScript, Tailwind, 폼 검증, 테스트가 포함된 React 컴포넌트를 받습니다

슬래시 커맨드가 필요 없습니다. 원하는 것만 설명하면 됩니다.

## 예시 2: 멀티 도메인 프로젝트

**입력:**
```
"사용자 인증이 있는 TODO 앱 만들어줘"
```

**결과:**

1. 키워드 감지가 멀티 도메인임을 파악 → `/coordinate` 제안
2. **PM 에이전트**가 작업 계획: auth API, 데이터베이스 스키마, 프론트엔드 UI, QA 범위
3. **에이전트 스폰:**
   ```bash
   oma agent:spawn backend "JWT authentication API" session-01 -w ./apps/api &
   oma agent:spawn frontend "Login and TODO UI" session-01 -w ./apps/web &
   wait
   ```
4. **에이전트가 병렬로 작업** — 각자 자신의 워크스페이스에서
5. **QA 에이전트가 리뷰** — 보안 감사, 통합 점검
6. **필요하면 반복** — 수정 사항을 반영해 에이전트 재스폰

## 예시 3: 버그 수정

**입력:**
```
"버그가 있어 — 로그인 클릭하면 'Cannot read property map of undefined'가 나와"
```

**결과:**

1. `oma-debug`가 자동 활성화 (키워드: "버그")
2. 근본 원인 파악 — 데이터 로딩 전 `todos`에 대해 map 호출
3. 수정 적용 — 로딩 상태와 null 체크
4. 회귀 테스트 작성
5. 유사한 패턴을 찾아 다른 3개 컴포넌트도 선제적으로 수정

## 예시 4: 디자인 시스템

**입력:**
```
"SaaS 제품용 다크 프리미엄 랜딩 페이지 디자인해줘"
```

**결과:**

1. `oma-design`이 활성화 (키워드: "디자인", "랜딩 페이지")
2. 컨텍스트 수집 — 타겟 고객, 브랜드, 미적 방향
3. 색상, 타이포그래피, 레이아웃 옵션이 포함된 2-3개 디자인 방향 제안
4. 토큰, 컴포넌트 패턴, 접근성 규칙이 담긴 `DESIGN.md` 생성
5. 감사 실행 — 반응형, WCAG, Nielsen 휴리스틱
6. `oma-frontend`가 구현할 준비 완료

## 예시 5: CLI 병렬 실행

```bash
# 단일 에이전트
oma agent:spawn backend "Implement JWT auth API" session-01

# 여러 에이전트 병렬 실행
oma agent:spawn backend "Auth API + DB migration" session-01 -w ./apps/api &
oma agent:spawn frontend "Login form + error states" session-01 -w ./apps/web &
oma agent:spawn mobile "Auth screens + biometrics" session-01 -w ./apps/mobile &
wait

# 실시간 모니터링
oma dashboard        # 터미널 UI
oma dashboard:web    # 웹 UI (http://localhost:9847)
```

---

## 워크플로우 커맨드

AI IDE에서 입력하면 구조화된 프로세스가 시작됩니다:

| 커맨드 | 하는 일 | 사용 시점 |
|---------|-------------|-------------|
| `/brainstorm` | 자유로운 아이디어 탐색 | 접근 방식을 정하기 전 |
| `/plan` | PM 태스크 분해 → `.agents/plan.json` | 복잡한 기능 시작 전 |
| `/exec-plan` | 기존 계획을 단계별로 실행 | `/plan` 이후 |
| `/coordinate` | 단계별 멀티 도메인 조율 | 여러 에이전트에 걸친 기능 |
| `/orchestrate` | 자동화된 병렬 에이전트 실행 | 대규모 프로젝트, 최대 병렬성 |
| `/ultrawork` | 5단계 품질 워크플로우 (11개 리뷰 게이트) | 최고 품질 딜리버리 |
| `/review` | 보안 + 성능 + 접근성 감사 | 머지 전 |
| `/debug` | 구조화된 근본 원인 디버깅 | 버그 조사 |
| `/design` | 7단계 디자인 워크플로우 → `DESIGN.md` | 디자인 시스템 구축 |
| `/commit` | type/scope 분석이 포함된 Conventional Commit | 변경 사항 커밋 |
| `/setup` | 프로젝트 구성 | 초기 설정 |
| `/tools` | MCP 서버 관리 | 외부 도구 추가 |
| `/stack-set` | 기술 스택 구성 | 언어/프레임워크 설정 |
| `/deepinit` | 전체 프로젝트 초기화 | 기존 코드베이스에 설정 |

---

## 자동 감지 (슬래시 커맨드 불필요)

oh-my-agent는 11개 언어의 키워드를 감지하고 워크플로우를 자동 활성화합니다:

| 입력 | 활성화되는 워크플로우 |
|---------|------------------------|
| "plan the auth feature" | `/plan` |
| "버그 수정해줘" | `/debug` |
| "do everything in parallel" | `/orchestrate` |
| "レビューして" | `/review` |
| "diseña la página" | `/design` |
| "brainstorm some ideas" | `/brainstorm` |

"orchestrate가 뭐야?" 같은 질문은 필터링됩니다 — 워크플로우가 실수로 실행되지 않습니다.

---

## 사용 가능한 스킬

| 스킬 | 적합한 작업 | 산출물 |
|-------|---------|--------|
| oma-pm | "기획해줘", "분해해줘" | `.agents/plan.json` |
| oma-frontend | UI, 컴포넌트, 스타일링 | React 컴포넌트, 테스트 |
| oma-backend | API, 데이터베이스, 인증 | 엔드포인트, 모델, 테스트 |
| oma-db | 스키마, ERD, 마이그레이션 | 스키마 설계, 쿼리 튜닝 |
| oma-mobile | 모바일 앱 | Flutter 화면, 상태 관리 |
| oma-design | UI/UX, 디자인 시스템 | 토큰이 포함된 `DESIGN.md` |
| oma-brainstorm | 아이디어, 탐색 | 설계 문서 |
| oma-qa | 보안, 성능, 접근성 | 우선순위별 수정사항이 담긴 QA 리포트 |
| oma-debug | 버그, 에러, 크래시 | 수정된 코드 + 회귀 테스트 |
| oma-tf-infra | 클라우드 인프라 | Terraform 모듈 |
| oma-dev-workflow | CI/CD, 자동화 | 파이프라인 설정 |
| oma-translator | 번역 | 자연스러운 다국어 콘텐츠 |
| oma-orchestrator | 병렬 실행 | 에이전트 결과 |
| oma-commit | Git 커밋 | Conventional Commit |

---

## 대시보드

### 터미널 대시보드

```bash
oma dashboard
```

세션 상태, 에이전트 상태, 턴 수, 최근 활동을 보여주는 실시간 테이블입니다. `.serena/memories/`를 감시해서 실시간으로 업데이트합니다.

### 웹 대시보드

```bash
oma dashboard:web
# → http://localhost:9847
```

기능:
- WebSocket을 통한 실시간 업데이트
- 연결 끊김 시 자동 재연결
- 색상 에이전트 인디케이터가 있는 세션 상태
- progress와 result 파일에서 가져온 활동 로그

### 추천 레이아웃

터미널 3개를 나란히 사용하세요:
1. 대시보드 (`oma dashboard`)
2. 에이전트 스폰 명령
3. 테스트/빌드 로그

---

## 팁

1. **구체적으로** — "JWT auth, React 프론트엔드, Express 백엔드로 TODO 앱 만들어줘"가 "앱 만들어줘"보다 낫습니다
2. **워크스페이스 사용** — `-w ./apps/api`로 에이전트끼리 충돌 방지
3. **계약 먼저 확정** — 병렬 에이전트 스폰 전에 `/plan` 실행
4. **능동적 모니터링** — 대시보드로 머지 전에 이슈 조기 발견
5. **재스폰으로 반복** — 처음부터 다시 하지 말고 에이전트 프롬프트를 다듬어서 재실행
6. **`/coordinate`로 시작** — 어떤 워크플로우를 써야 할지 모를 때

---

## 문제 해결

| 문제 | 해결 방법 |
|---------|-----|
| IDE에서 스킬이 감지 안 됨 | `.agents/skills/`에 `SKILL.md` 파일이 있는지 확인, IDE 재시작 |
| CLI를 찾을 수 없음 | `which gemini` / `which claude` — 없는 것 설치 |
| 에이전트가 충돌하는 코드 생성 | 별도 워크스페이스(`-w`) 사용, 결과 확인, 수정 후 재스폰 |
| 대시보드에 "No agents detected" 표시 | 에이전트가 아직 `.serena/memories/`에 기록하지 않음 — 대기하거나 세션 ID 확인 |
| 웹 대시보드가 시작 안 됨 | 먼저 `bun install` 실행 |
| QA 리포트에 50개 이상의 이슈 | CRITICAL/HIGH부터 집중, 나머지는 문서화 후 나중에 처리 |

---

기존 프로젝트에 통합하려면 [통합 가이드](./integration)를 참고하세요.
