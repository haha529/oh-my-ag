---
title: CLI 명령어
description: oh-my-agent CLI에서 사용 가능한 모든 명령어 — 예시 포함.
---

# CLI 명령어

글로벌 설치(`bun install --global oh-my-agent`) 후 `oma` 또는 `oh-my-ag`를 사용합니다.

## 설정 및 관리

```bash
oma                    # 인터랙티브 설치 — 프리셋 선택, 스킬 설치
oma doctor             # 상태 점검: CLI, MCP 설정, 스킬 상태
oma update             # 레지스트리에서 최신 버전으로 스킬 업데이트
oma cleanup            # 고아 프로세스 및 임시 파일 정리
```

## 모니터링

```bash
oma dashboard          # 터미널 대시보드 — 실시간 에이전트 상태
oma dashboard:web      # 웹 대시보드 (http://localhost:9847)
oma stats              # 생산성 지표 조회
oma retro [days]       # 트렌드가 포함된 엔지니어링 회고
```

## 에이전트 관리

```bash
# 단일 에이전트 스폰
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# 에이전트 상태 확인
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# 여러 에이전트 병렬 실행
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## 메모리 및 검증

```bash
# Serena 메모리 스키마 초기화
oma memory:init

# 에이전트 출력 품질 검증
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## 통합 및 유틸리티

```bash
oma auth:status        # CLI 인증 상태 확인
oma usage:anti         # Antigravity IDE 사용량 쿼터 조회
oma bridge [url]       # MCP stdio를 Streamable HTTP로 브릿지
oma visualize          # 프로젝트 의존성 그래프 생성
oma describe [cmd]     # 모든 CLI 명령의 JSON 인트로스펙션
oma star               # GitHub에서 oh-my-agent 스타
```

## 도움말

```bash
oma help               # 모든 명령어 보기
oma version            # 버전 번호 보기
oma <command> --help   # 특정 명령어의 도움말
```
