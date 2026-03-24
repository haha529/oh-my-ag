---
title: CLI 옵션
description: oh-my-agent CLI 명령어의 모든 플래그와 옵션.
---

# CLI 옵션

## 전역 옵션

모든 명령어에서 사용 가능합니다:

| 옵션 | 하는 일 |
|--------|-------------|
| `-h, --help` | 도움말 표시 |
| `-V, --version` | 버전 번호 표시 |

## 출력 옵션

많은 명령어가 머신 리더블 출력을 지원합니다:

| 옵션 | 하는 일 |
|--------|-------------|
| `--json` | JSON으로 출력 |
| `--output <format>` | 출력 형식: `text` 또는 `json` |

환경 변수 `OH_MY_AG_OUTPUT_FORMAT=json`으로도 설정할 수 있습니다.

**지원 명령어:** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## 명령어별 옵션

### `update`
| 옵션 | 하는 일 |
|--------|-------------|
| `-f, --force` | 사용자 커스텀 설정 파일 덮어쓰기 |
| `--ci` | 비대화형 모드 (모든 프롬프트 건너뜀) |

### `stats`
| 옵션 | 하는 일 |
|--------|-------------|
| `--reset` | 모든 지표 데이터 초기화 |

### `retro`
| 옵션 | 하는 일 |
|--------|-------------|
| `--interactive` | 수동 입력 모드 |
| `--compare` | 현재 기간과 이전 동일 기간 비교 |

### `cleanup`
| 옵션 | 하는 일 |
|--------|-------------|
| `--dry-run` | 실행하지 않고 정리 대상만 표시 |
| `-y, --yes` | 확인 프롬프트 건너뛰기 |

### `usage:anti`
| 옵션 | 하는 일 |
|--------|-------------|
| `--raw` | 원시 RPC 응답 덤프 |

### `agent:spawn`
| 옵션 | 하는 일 |
|--------|-------------|
| `-v, --vendor <vendor>` | CLI 벤더 오버라이드 (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | 에이전트의 작업 디렉토리 |

### `agent:status`
| 옵션 | 하는 일 |
|--------|-------------|
| `-r, --root <path>` | 메모리 확인용 루트 경로 |

### `agent:parallel`
| 옵션 | 하는 일 |
|--------|-------------|
| `-v, --vendor <vendor>` | CLI 벤더 오버라이드 |
| `-i, --inline` | `agent:task` 인자로 태스크 지정 |
| `--no-wait` | 완료를 기다리지 않음 (백그라운드 모드) |

### `memory:init`
| 옵션 | 하는 일 |
|--------|-------------|
| `--force` | 기존 스키마 파일 덮어쓰기 |

### `verify`
| 옵션 | 하는 일 |
|--------|-------------|
| `-w, --workspace <path>` | 검증할 워크스페이스 경로 |

## 실전 예시

```bash
# CI 파이프라인용 JSON 출력
oma doctor --json

# 생산성 지표 초기화
oma stats --reset

# 실행하지 않고 정리 대상 미리보기
oma cleanup --dry-run

# 특정 CLI와 워크스페이스로 스폰
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# CI에서 비대화형 업데이트
oma update --ci --force

# 최근 7일과 이전 7일 비교
oma retro 7 --compare
```
