---
title: Workflows
description: Slash commands that orchestrate multi-step processes — planning, review, debugging, and more.
---

# Workflows

Workflows are the structured sequences that make oh-my-agent more than a collection of prompts. Type a slash command, and a multi-step process kicks off with defined phases, quality gates, and completion criteria.

## All Workflow Commands

### Big Orchestration Workflows

These are **persistent** — they keep running until all tasks are done, and can't be accidentally interrupted.

| Command | What It Does |
|---------|-------------|
| `/orchestrate` | Spawns agents in parallel via CLI, coordinates through memory, monitors progress, runs verification. The "do everything" mode. |
| `/coordinate` | Step-by-step multi-domain coordination. PM plans first, then agents execute with cross-review and QA loops. |
| `/ultrawork` | The quality-obsessed workflow. 5 phases, 11 review steps out of 17 total. Plan → Implement → Verify → Refine → Ship. |

### Planning & Exploration

| Command | What It Does |
|---------|-------------|
| `/plan` | PM-driven task breakdown. Outputs a structured plan to `.agents/plan.json`. |
| `/exec-plan` | Takes the plan from `/plan` and executes it step by step. |
| `/brainstorm` | Free-form ideation. Explore approaches before committing to implementation. |
| `/deepinit` | Full project initialization — analyzes codebase, sets up conventions, configures tools. |

### Quality & Review

| Command | What It Does |
|---------|-------------|
| `/review` | QA review: OWASP security, performance, accessibility. Delegates to the qa-reviewer agent. |
| `/debug` | Structured debugging: reproduce → diagnose → fix → regression test. |

### Design

| Command | What It Does |
|---------|-------------|
| `/design` | 7-phase design workflow. Creates DESIGN.md with tokens, component patterns, accessibility rules, and handoff specs. |

### Utilities

| Command | What It Does |
|---------|-------------|
| `/commit` | Analyzes your changes and creates a conventional commit with proper type/scope. |
| `/setup` | Interactive project configuration. |
| `/tools` | Manage MCP server connections. |
| `/stack-set` | Set your tech stack preferences. |

## You Don't Always Need Slash Commands

oh-my-agent detects keywords in your natural language and auto-activates workflows. Say "plan the authentication feature" and the plan workflow starts — no `/plan` needed.

This works in **11 languages** (English, Korean, Japanese, Chinese, Spanish, French, German, Portuguese, Russian, Dutch, Polish).

Questions like "what is orchestrate?" are recognized as informational and don't trigger anything.

## Skills vs. Workflows

Easy distinction:
- **Skills** = agent expertise (what an agent knows how to do)
- **Workflows** = orchestrated processes (how multiple agents work together)

A skill might be "build a React component." A workflow is "plan the feature → build the components → review the security → commit the code."

## Typical Sequences

### Quick Feature
```
/plan → review the output → /exec-plan
```

### Complex Multi-Domain Project
```
/coordinate → PM plans → agents spawn → QA reviews → fix issues → ship
```

### Maximum Quality Delivery
```
/ultrawork → 5-phase gate process with 11 review checkpoints
```

### Bug Fix
```
/debug → reproduce → root cause → fix → regression test
```
