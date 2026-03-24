---
title: CLI 选项
description: oh-my-agent CLI 命令的所有标志和选项。
---

# CLI 选项

## 全局选项

每个命令都可用：

| 选项 | 功能 |
|------|------|
| `-h, --help` | 显示帮助 |
| `-V, --version` | 显示版本号 |

## 输出选项

很多命令支持机器可读的输出：

| 选项 | 功能 |
|------|------|
| `--json` | 以 JSON 格式输出 |
| `--output <format>` | 输出格式：`text` 或 `json` |

也可以设置环境变量 `OH_MY_AG_OUTPUT_FORMAT=json`。

**支持的命令：** `doctor`、`stats`、`retro`、`cleanup`、`auth:status`、`usage:anti`、`memory:init`、`verify`、`visualize`

## 各命令选项

### `update`
| 选项 | 功能 |
|------|------|
| `-f, --force` | 覆盖用户自定义的配置文件 |
| `--ci` | 非交互模式（跳过所有提示） |

### `stats`
| 选项 | 功能 |
|------|------|
| `--reset` | 重置所有指标数据 |

### `retro`
| 选项 | 功能 |
|------|------|
| `--interactive` | 手动输入模式 |
| `--compare` | 将当前时间窗口与之前同等长度的窗口对比 |

### `cleanup`
| 选项 | 功能 |
|------|------|
| `--dry-run` | 显示将被清理的内容但不实际执行 |
| `-y, --yes` | 跳过确认提示 |

### `usage:anti`
| 选项 | 功能 |
|------|------|
| `--raw` | 输出原始 RPC 响应 |

### `agent:spawn`
| 选项 | 功能 |
|------|------|
| `-v, --vendor <vendor>` | 覆盖 CLI 供应商（`gemini`/`claude`/`codex`/`qwen`） |
| `-w, --workspace <path>` | 智能体的工作目录 |

### `agent:status`
| 选项 | 功能 |
|------|------|
| `-r, --root <path>` | 内存检查的根路径 |

### `agent:parallel`
| 选项 | 功能 |
|------|------|
| `-v, --vendor <vendor>` | 覆盖 CLI 供应商 |
| `-i, --inline` | 以 `agent:task` 参数形式指定任务 |
| `--no-wait` | 不等待完成（后台模式） |

### `memory:init`
| 选项 | 功能 |
|------|------|
| `--force` | 覆盖已有的 schema 文件 |

### `verify`
| 选项 | 功能 |
|------|------|
| `-w, --workspace <path>` | 要验证的工作区路径 |

## 实用示例

```bash
# CI 流水线中使用 JSON 输出
oma doctor --json

# 重置生产力指标
oma stats --reset

# 预览清理内容但不执行
oma cleanup --dry-run

# 指定 CLI 和工作区启动智能体
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# CI 中非交互式更新
oma update --ci --force

# 对比最近 7 天与之前 7 天
oma retro 7 --compare
```
