---
title: 스킬
description: 2단계 스킬 아키텍처가 어떻게 토큰 낭비 없이 에이전트를 똑똑하게 만드는지 알아봅니다.
---

# 스킬

스킬은 각 에이전트를 전문가로 만들어주는 핵심입니다. 단순한 프롬프트가 아니라, 실행 프로토콜과 코드 템플릿, 에러 플레이북, 품질 체크리스트로 구성된 구조화된 지식입니다.

## 2단계 설계

여기서 핵심이 되는 부분입니다: 스킬은 모든 걸 한꺼번에 로딩하지 않습니다. 점진적 공개(Progressive Disclosure) 방식으로 토큰을 약 75% 절약합니다.

### Layer 1: SKILL.md (~800바이트)

항상 로딩됩니다. 포함 내용:
- 에이전트 정체성과 역할
- 활성화 조건 (라우팅 조건)
- 핵심 규칙과 제약 조건
- 하지 말아야 할 것

### Layer 2: resources/ (온디맨드 로딩)

에이전트가 실제로 작업할 때만 로딩됩니다. 깊이 있는 내용을 담고 있습니다:

| 리소스 | 역할 |
|----------|-------------|
| `execution-protocol.md` | 단계별 워크플로우: 분석 → 계획 → 구현 → 검증 |
| `tech-stack.md` | 상세 기술 스펙과 버전 |
| `error-playbook.md` | 문제 발생 시 대처법 ("3 strikes" 에스컬레이션 포함) |
| `checklist.md` | 도메인별 품질 검사 |
| `snippets.md` | 바로 쓸 수 있는 코드 패턴 |
| `examples/` | Few-shot 입출력 예시 |

### 실제 구조 예시

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← 항상 로딩 (~800바이트)
└── resources/
    ├── execution-protocol.md         ← 온디맨드
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## 공유 리소스

모든 에이전트는 `.agents/skills/_shared/`의 공통 기반을 공유합니다:

| 리소스 | 용도 |
|----------|---------|
| `skill-routing.md` | 태스크를 적합한 에이전트에 매핑 |
| `context-loading.md` | 태스크 유형별 로딩할 리소스 결정 |
| `prompt-structure.md` | Goal → Context → Constraints → Done When |
| `clarification-protocol.md` | 질문할지 가정할지 판단 기준 |
| `context-budget.md` | 모델 티어별 토큰 효율적 파일 읽기 |
| `difficulty-guide.md` | Simple / Medium / Complex 태스크 평가 |
| `reasoning-templates.md` | 구조화된 추론 빈칸 채우기 |
| `quality-principles.md` | 보편적 품질 기준 |
| `vendor-detection.md` | 실행 중인 IDE/CLI 감지 |

## 조건부 리소스

특정 조건에서만 로딩되는 리소스도 있습니다:

| 리소스 | 로딩 시점 |
|----------|--------------|
| `quality-score.md` | 품질 평가 요청 시 |
| `experiment-ledger.md` | 실험적 접근 시도 시 |
| `exploration-loop.md` | 반복 탐색 진행 중 |

## 벤더별 실행

지원되는 각 CLI에는 `.agents/skills/_shared/runtime/execution-protocols/`에 전용 실행 프로토콜이 있습니다:
- `claude.md` — Claude 전용 패턴
- `gemini.md` — Gemini 전용 패턴
- `codex.md` — Codex 전용 패턴
- `qwen.md` — Qwen 전용 패턴

## 왜 이게 중요한가

점진적 공개 없이 에이전트 5개를 로딩하면 작업 시작 전에 컨텍스트 윈도우를 다 써버립니다. 이 방식을 쓰면 초기 로딩은 가볍고, 실제 실행 시에만 깊이 있는 리소스를 불러옵니다.
