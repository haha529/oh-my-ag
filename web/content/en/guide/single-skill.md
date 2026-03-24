---
title: "Use Case: Single Skill"
description: When you just need one agent for a focused task — the fast path.
---

# Use Case: Single Skill

## When to Use This

Use this when your task is narrowly scoped and owned by one domain:

- One UI component
- One API endpoint
- One bug in one layer
- One refactor in one module

If the task needs cross-domain coordination (API + UI + QA), switch to [Multi-Agent Project](./multi-agent-project).

## Before You Prompt

Quick checklist:

1. **What's the output?** — specific file or behavior
2. **What stack?** — framework, language, versions
3. **What's "done"?** — acceptance criteria
4. **What tests?** — critical cases to cover

## Prompt Template

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## Real Example

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## What Happens

1. The right skill auto-activates based on your prompt
2. Agent declares its assumptions (charter preflight)
3. You confirm or adjust
4. Agent writes code and tests
5. You run local verification

## Before You Merge

Check that:
- Behavior matches your acceptance criteria
- Tests cover happy path and key edge cases
- No unrelated file changes snuck in
- Shared modules aren't broken

## When to Escalate

Switch to multi-agent flow when:
- UI work needs a new API contract
- One fix cascades across layers
- Scope grows beyond one domain after the first iteration
