---
title: 기존 프로젝트에 통합
description: 이미 진행 중인 프로젝트에 oh-my-agent를 안전하게 추가하는 방법.
---

# 기존 프로젝트에 통합하기

이미 프로젝트가 있나요? 아무것도 깨뜨리지 않고 oh-my-agent를 추가하는 방법입니다.

## 간편한 방법 (CLI)

프로젝트 루트에서 실행하세요:

```bash
bunx oh-my-agent
```

하는 일:
- `.agents/skills/`에 스킬 설치
- `.agents/skills/_shared/`에 공유 리소스 복사
- IDE용 심링크 생성 (`.claude/skills/` 등)
- `.agents/workflows/`에 워크플로우 설치
- `.agents/config/user-preferences.yaml`에 기본 설정 생성

## 수동 방법

무엇을 복사할지 완전히 제어하고 싶을 때:

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# 원하는 스킬 복사
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# 공유 리소스 복사
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# 워크플로우 복사
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# 기본 설정 (없는 경우에만)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## 설치 확인

```bash
oma doctor
```

또는 수동으로 확인:
```bash
ls .agents/skills/          # 스킬 디렉토리가 보여야 합니다
ls .agents/workflows/       # 워크플로우 .md 파일이 보여야 합니다
cat .agents/config/user-preferences.yaml  # 설정이 보여야 합니다
```

## 멀티 IDE 심링크

`bunx oh-my-agent` 실행 중 다음과 같은 질문이 나옵니다:

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

하나의 원천(`.agents/skills/`)에서 여러 IDE가 읽습니다:

```text
.agents/skills/oma-frontend/     ← 소스 (SSOT)
.claude/skills/oma-frontend/     → 심링크
.cursor/skills/oma-frontend/     → 심링크
.github/skills/oma-frontend/     → 심링크
```

## 안전 팁

**통합 전** 체크포인트를 만드세요:

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- CLI는 기존 스킬 폴더를 절대 덮어쓰지 않습니다
- 프로젝트별 설정은 여전히 여러분이 관리합니다
- `oma doctor`가 문제를 감지해 알려줍니다

## 선택사항: 대시보드

```bash
oma dashboard        # 터미널 모니터링
oma dashboard:web    # 웹 UI (http://localhost:9847)
```

## 다음 단계

AI IDE에서 대화를 시작하거나, [사용 가이드](./usage)에서 워크플로우 예시를 확인하세요.
