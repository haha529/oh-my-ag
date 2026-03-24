---
title: 설치
description: oh-my-agent를 프로젝트에 설치하는 세 가지 방법 — 모두 빠릅니다.
---

# 설치

## 필요한 것

- **AI IDE** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI 또는 유사한 도구
- **bun**과 **uv** — 없으면 자동 설치됩니다

## 방법 1: 원라이너 (추천)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

누락된 의존성(bun, uv)을 감지하고 설치한 뒤 인터랙티브 설정을 시작합니다. 약 1분이면 끝납니다.

## 방법 2: 수동 설치

```bash
bunx oh-my-agent
```

프리셋을 선택하는 메뉴가 나타납니다:

| 프리셋 | 포함 내용 |
|--------|-------------|
| ✨ All | 모든 에이전트와 스킬 |
| 🌐 Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| 🎨 Frontend | frontend + pm + qa + debug + brainstorm + commit |
| ⚙️ Backend | backend + db + pm + qa + debug + brainstorm + commit |
| 📱 Mobile | mobile + pm + qa + debug + brainstorm + commit |
| 🚀 DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

스킬은 `.agents/skills/`에 설치되고 IDE용 심링크가 생성됩니다.

## 방법 3: 글로벌 설치

CLI를 자주 사용한다면(대시보드, 에이전트 스폰, 진단 등):

```bash
# Homebrew
brew install oh-my-agent

# 또는 npm/bun
bun install --global oh-my-agent
```

이제 어디서든 `oma`를 쓸 수 있습니다:

```bash
oma doctor          # 상태 점검
oma dashboard       # 실시간 모니터링
oma agent:spawn     # 터미널에서 에이전트 스폰
```

## AI CLI 선택

최소 하나는 필요합니다:

| CLI | 설치 | 인증 방법 |
|-----|---------|-------------|
| Gemini | `bun install --global @google/gemini-cli` | 첫 실행 시 자동 |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | 첫 실행 시 자동 |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | CLI 내에서 `/auth` |

## 초기 설정

설치 후 AI IDE에서 `/setup`을 실행하면 다음을 구성할 수 있습니다:

- 응답 언어
- 기본 CLI 벤더
- 에이전트별 CLI 매핑 (에이전트마다 다른 AI 도구 사용 가능)

이 설정은 `.agents/config/user-preferences.yaml`에 저장됩니다 — 모든 환경설정을 관리하는 파일입니다.

## 설치 확인

```bash
oma doctor
```

CLI 설치 상태, MCP 설정, 스킬 상태를 검사합니다. 문제가 있으면 정확히 뭘 고쳐야 하는지 알려줍니다.

## 다음 단계

AI IDE에서 프로젝트를 열고 대화를 시작하세요. 스킬은 자동으로 감지됩니다. 이런 걸 시도해 보세요:

```
"Tailwind CSS를 사용해서 이메일 검증이 있는 로그인 폼 만들어줘"
```

더 많은 예시는 [사용 가이드](/guide/usage)를 참고하세요.
