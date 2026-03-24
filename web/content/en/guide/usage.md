---
title: Usage Guide
description: Real-world examples showing how to use oh-my-agent — from simple tasks to full multi-agent orchestration.
---

# How to Use oh-my-agent

> Not sure where to start? Type `/coordinate` followed by what you want to build.

## Quick Start

1. Open your project in an AI IDE (Claude Code, Gemini, Cursor, etc.)
2. Skills are auto-detected from `.agents/skills/`
3. Start chatting — describe what you want

That's it. oh-my-agent handles the rest.

---

## Example 1: Simple Single Task

**You type:**
```
"Create a login form component with email and password fields using Tailwind CSS"
```

**What happens:**
- The `oma-frontend` skill activates
- Loads its execution protocol and tech-stack resources on-demand
- You get a React component with TypeScript, Tailwind, form validation, and tests

No slash commands needed. Just describe what you want.

## Example 2: Multi-Domain Project

**You type:**
```
"Build a TODO app with user authentication"
```

**What happens:**

1. Keyword detection sees this is multi-domain → suggests `/coordinate`
2. **PM Agent** plans the work: auth API, database schema, frontend UI, QA scope
3. **You spawn agents:**
   ```bash
   oma agent:spawn backend "JWT authentication API" session-01 -w ./apps/api &
   oma agent:spawn frontend "Login and TODO UI" session-01 -w ./apps/web &
   wait
   ```
4. **Agents work in parallel** — each in their own workspace
5. **QA Agent reviews** — security audit, integration check
6. **You iterate** — re-spawn agents with refinements if needed

## Example 3: Bug Fixing

**You type:**
```
"There's a bug — clicking login shows 'Cannot read property map of undefined'"
```

**What happens:**

1. `oma-debug` activates automatically (keyword: "bug")
2. Root cause identified — component maps over `todos` before data loads
3. Fix applied — loading states and null checks
4. Regression test written
5. Similar patterns found and proactively fixed in 3 other components

## Example 4: Design System

**You type:**
```
"Design a dark premium landing page for my SaaS product"
```

**What happens:**

1. `oma-design` activates (keyword: "design", "landing page")
2. Gathers context — audience, brand, aesthetic direction
3. Proposes 2-3 design directions with color, typography, and layout options
4. Generates `DESIGN.md` with tokens, component patterns, and accessibility rules
5. Runs audit — responsive, WCAG, Nielsen heuristics
6. Ready for `oma-frontend` to implement

## Example 5: CLI Parallel Execution

```bash
# Single agent
oma agent:spawn backend "Implement JWT auth API" session-01

# Multiple agents in parallel
oma agent:spawn backend "Auth API + DB migration" session-01 -w ./apps/api &
oma agent:spawn frontend "Login form + error states" session-01 -w ./apps/web &
oma agent:spawn mobile "Auth screens + biometrics" session-01 -w ./apps/mobile &
wait

# Monitor in real-time
oma dashboard        # terminal UI
oma dashboard:web    # web UI at http://localhost:9847
```

---

## Workflow Commands

Type these in your AI IDE to trigger structured processes:

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/brainstorm` | Free-form ideation and exploration | Before committing to an approach |
| `/plan` | PM task breakdown → `.agents/plan.json` | Before starting any complex feature |
| `/exec-plan` | Execute an existing plan step by step | After `/plan` |
| `/coordinate` | Step-by-step multi-domain coordination | Features spanning multiple agents |
| `/orchestrate` | Automated parallel agent execution | Large projects, maximum parallelism |
| `/ultrawork` | 5-phase quality workflow (11 review gates) | Maximum quality delivery |
| `/review` | Security + performance + accessibility audit | Before merging |
| `/debug` | Structured root-cause debugging | Investigating bugs |
| `/design` | 7-phase design workflow → `DESIGN.md` | Building design systems |
| `/commit` | Conventional commit with type/scope analysis | Committing changes |
| `/setup` | Project configuration | First-time setup |
| `/tools` | MCP server management | Adding external tools |
| `/stack-set` | Tech stack configuration | Setting language/framework preferences |
| `/deepinit` | Full project initialization | Setting up in an existing codebase |

---

## Auto-Detection (No Slash Commands Needed)

oh-my-agent detects keywords in 11 languages and activates workflows automatically:

| You Say | Workflow That Activates |
|---------|------------------------|
| "plan the auth feature" | `/plan` |
| "버그 수정해줘" | `/debug` |
| "do everything in parallel" | `/orchestrate` |
| "レビューして" | `/review` |
| "diseña la página" | `/design` |
| "brainstorm some ideas" | `/brainstorm` |

Questions like "what is orchestrate?" are filtered out — they won't accidentally trigger workflows.

---

## Available Skills

| Skill | Best For | Output |
|-------|---------|--------|
| oma-pm | "plan this", "break down" | `.agents/plan.json` |
| oma-frontend | UI, components, styling | React components, tests |
| oma-backend | APIs, databases, auth | Endpoints, models, tests |
| oma-db | Schema, ERD, migrations | Schema design, query tuning |
| oma-mobile | Mobile apps | Flutter screens, state management |
| oma-design | UI/UX, design systems | `DESIGN.md` with tokens |
| oma-brainstorm | Ideation, exploration | Design document |
| oma-qa | Security, performance, a11y | QA report with prioritized fixes |
| oma-debug | Bugs, errors, crashes | Fixed code + regression tests |
| oma-tf-infra | Cloud infrastructure | Terraform modules |
| oma-dev-workflow | CI/CD, automation | Pipeline configs |
| oma-translator | Translation | Natural multilingual content |
| oma-orchestrator | Parallel execution | Agent results |
| oma-commit | Git commits | Conventional commits |

---

## Dashboards

### Terminal Dashboard

```bash
oma dashboard
```

Live table showing session status, agent states, turns, and latest activity. Watches `.serena/memories/` for real-time updates.

### Web Dashboard

```bash
oma dashboard:web
# → http://localhost:9847
```

Features:
- Real-time updates via WebSocket
- Auto-reconnect on connection drops
- Session status with colored agent indicators
- Activity log from progress and result files

### Recommended Layout

Use 3 terminals:
1. Dashboard (`oma dashboard`)
2. Agent spawn commands
3. Test/build logs

---

## Tips

1. **Be specific** — "Build a TODO app with JWT auth, React frontend, Express backend" beats "make an app"
2. **Use workspaces** — `-w ./apps/api` keeps agents from stepping on each other
3. **Lock contracts first** — run `/plan` before spawning parallel agents
4. **Monitor actively** — dashboards catch issues before merge time
5. **Iterate with re-spawns** — refine agent prompts instead of starting over
6. **Start with `/coordinate`** — when you're not sure which workflow to use

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Skills not detected in IDE | Verify `.agents/skills/` exists with `SKILL.md` files, restart IDE |
| CLI not found | `which gemini` / `which claude` — install missing ones |
| Agents producing conflicting code | Use separate workspaces (`-w`), review outputs, re-spawn with corrections |
| Dashboard shows "No agents detected" | Agents haven't written to `.serena/memories/` yet — wait or check session ID |
| Web dashboard won't start | Run `bun install` first |
| QA report has 50+ issues | Focus on CRITICAL/HIGH first, document the rest for later |

---

For integration into existing projects, see [Integration Guide](./integration).
