---
title: Parallel Execution
description: Run multiple agents at the same time — because waiting for one to finish before starting the next is slow.
---

# Parallel Execution

The real power of oh-my-agent is running multiple agents simultaneously. While the backend agent builds your API, the frontend agent is already creating the UI.

## Basic Pattern

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

The `&` runs each agent in the background. `wait` blocks until both finish.

## Workspace-Aware Pattern

Give each agent its own directory to avoid merge conflicts:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## Using `agent:parallel`

For a cleaner syntax:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Add `--no-wait` to fire and forget:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Monitor While They Work

Open a separate terminal:

```bash
# Terminal dashboard
oma dashboard

# Or web dashboard
oma dashboard:web
# → http://localhost:9847
```

The dashboard shows live status for each agent — turns taken, current task, completion state.

## Multi-CLI Configuration

Not all AI tools are equal. Route agents to the CLI that handles their domain best:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Complex UI reasoning
  backend: gemini       # Fast API generation
  mobile: gemini
  qa: claude            # Thorough security review
  debug: claude         # Deep root-cause analysis
  pm: gemini            # Quick decomposition
```

## CLI Vendor Resolution

When spawning an agent, the CLI is chosen in this order:

1. `--vendor` flag (highest priority)
2. `agent_cli_mapping` for that specific agent
3. `default_cli` setting
4. `cli-config.yaml`'s `active_vendor`
5. `gemini` (fallback)

## Tips for Parallel Runs

- **Use one session ID per feature** — keeps agent outputs grouped
- **Lock API contracts first** — run `/plan` before spawning implementation agents
- **Separate workspaces** — avoid agents stepping on each other's files
- **Monitor actively** — catch issues early via dashboard instead of finding them at merge time
