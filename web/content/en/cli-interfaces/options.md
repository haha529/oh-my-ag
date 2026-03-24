---
title: CLI Options
description: All flags and options for oh-my-agent CLI commands.
---

# CLI Options

## Global Options

Available on every command:

| Option | What It Does |
|--------|-------------|
| `-h, --help` | Show help |
| `-V, --version` | Show version number |

## Output Options

Many commands support machine-readable output:

| Option | What It Does |
|--------|-------------|
| `--json` | Output as JSON |
| `--output <format>` | Output format: `text` or `json` |

You can also set `OH_MY_AG_OUTPUT_FORMAT=json` as an environment variable.

**Supported by:** `doctor`, `stats`, `retro`, `cleanup`, `auth:status`, `usage:anti`, `memory:init`, `verify`, `visualize`

## Per-Command Options

### `update`
| Option | What It Does |
|--------|-------------|
| `-f, --force` | Overwrite user-customized config files |
| `--ci` | Non-interactive mode (skip all prompts) |

### `stats`
| Option | What It Does |
|--------|-------------|
| `--reset` | Reset all metrics data |

### `retro`
| Option | What It Does |
|--------|-------------|
| `--interactive` | Manual entry mode |
| `--compare` | Compare current window vs. prior same-length window |

### `cleanup`
| Option | What It Does |
|--------|-------------|
| `--dry-run` | Show what would be cleaned without doing it |
| `-y, --yes` | Skip confirmation prompts |

### `usage:anti`
| Option | What It Does |
|--------|-------------|
| `--raw` | Dump raw RPC response |

### `agent:spawn`
| Option | What It Does |
|--------|-------------|
| `-v, --vendor <vendor>` | Override CLI vendor (`gemini`/`claude`/`codex`/`qwen`) |
| `-w, --workspace <path>` | Working directory for the agent |

### `agent:status`
| Option | What It Does |
|--------|-------------|
| `-r, --root <path>` | Root path for memory checks |

### `agent:parallel`
| Option | What It Does |
|--------|-------------|
| `-v, --vendor <vendor>` | Override CLI vendor |
| `-i, --inline` | Specify tasks as `agent:task` arguments |
| `--no-wait` | Don't wait for completion (background mode) |

### `memory:init`
| Option | What It Does |
|--------|-------------|
| `--force` | Overwrite existing schema files |

### `verify`
| Option | What It Does |
|--------|-------------|
| `-w, --workspace <path>` | Workspace path to verify |

## Practical Examples

```bash
# JSON output for CI pipeline
oma doctor --json

# Reset productivity metrics
oma stats --reset

# Preview cleanup without executing
oma cleanup --dry-run

# Spawn with specific CLI and workspace
oma agent:spawn backend "Auth API" session-01 -v codex -w ./apps/api

# Non-interactive update in CI
oma update --ci --force

# Compare last 7 days vs. prior 7 days
oma retro 7 --compare
```
