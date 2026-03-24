---
title: CLI Commands
description: Every command available in the oh-my-agent CLI — with examples.
---

# CLI Commands

After installing globally (`bun install --global oh-my-agent`), use `oma` or `oh-my-ag`.

## Setup & Maintenance

```bash
oma                    # Interactive installer — choose preset, install skills
oma doctor             # Health check: CLIs, MCP configs, skills status
oma update             # Update skills to latest version from registry
oma cleanup            # Remove orphaned processes and temp files
```

## Monitoring

```bash
oma dashboard          # Terminal dashboard — live agent status
oma dashboard:web      # Web dashboard at http://localhost:9847
oma stats              # View productivity metrics
oma retro [days]       # Engineering retrospective with trends
```

## Agent Management

```bash
# Spawn a single agent
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Check agent status
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Run multiple agents in parallel
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Memory & Verification

```bash
# Initialize Serena memory schema
oma memory:init

# Verify agent output quality
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Integration & Utilities

```bash
oma auth:status        # Check CLI authentication status
oma usage:anti         # Show Antigravity IDE usage quotas
oma bridge [url]       # Bridge MCP stdio to Streamable HTTP
oma visualize          # Generate project dependency graph
oma describe [cmd]     # JSON introspection of any CLI command
oma star               # Star oh-my-agent on GitHub
```

## Getting Help

```bash
oma help               # Show all commands
oma version            # Show version number
oma <command> --help   # Help for specific command
```
