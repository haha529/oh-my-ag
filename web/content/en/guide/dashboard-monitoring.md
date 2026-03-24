---
title: Dashboard Monitoring
description: Watch your agents work in real-time with terminal and web dashboards.
---

# Dashboard Monitoring

When you've got multiple agents running in parallel, you want eyes on what's happening. That's what dashboards are for.

## Start a Dashboard

```bash
# Terminal UI
oma dashboard

# Web UI
oma dashboard:web
# → http://localhost:9847
```

## Recommended Setup

Use 3 terminals side by side:

| Terminal | Purpose |
|----------|---------|
| 1 | `oma dashboard` — live agent status |
| 2 | Agent spawn commands |
| 3 | Test and build logs |

Keep the web dashboard open in a browser for shared visibility during team sessions.

## What You See

Dashboards watch `.serena/memories/` and show:

- **Session status** — running, completed, or failed
- **Task board** — which agent has which task
- **Agent progress** — turn count, current activity
- **Results** — final outputs as they arrive

Updates are event-driven (file change detection) — no polling loops eating your CPU.

## Troubleshooting Signals

| You See | What to Do |
|---------|-----------|
| "No agents detected" | Check agents were spawned with the same `session-id`. Verify `.serena/memories/` is being written. |
| Session stuck in "running" | Check `progress-*` file timestamps. Restart blocked agents with clearer prompts. |
| Frequent reconnects (web) | Check firewall/proxy. Restart `dashboard:web` and refresh the page. |
| Missing activity | Verify the orchestrator is writing to the correct workspace directory. |

## Before You Merge

Quick checklist from the dashboard:

- All agents reached "completed" status
- No unresolved high-severity QA findings
- Result files present for each agent
- Integration tests run after final outputs

## When You're Done

The monitoring phase is complete when:
- Session shows terminal state (completed or stopped)
- Activity history explains what happened
- You've made your merge/release decision with full visibility
