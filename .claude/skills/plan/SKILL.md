---
name: plan
description: PM-based requirements analysis, task decomposition, API contract definition
disable-model-invocation: true
---

# /plan

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/plan.md` (Official workflow — Follow all steps)
2. `.agents/skills/_shared/prompt-structure.md` (4-element framework: Goal, Context, Constraints, Done When)
3. `.agents/skills/_shared/context-loading.md` (Selective resource loading)

## Claude Code Adaptation

- Execute PM Agent logic inline (no need to spawn subagents)
- Analyze code using Read, Grep, Glob tools instead of MCP tools
- Save plans: `.agents/plan.json` (maintain compatibility)
- Optionally save to `docs/exec-plans/active/` as well

## Key Steps Summary

1. **Requirements Gathering**: User description, target users, features, constraints, deployment target
2. **Technical Feasibility Analysis**: Codebase analysis (using Glob, Grep, Read)
3. **API Contract Definition**: Save to `.agents/skills/_shared/api-contracts/`
4. **Task Decomposition**: agent, title, acceptance criteria, priority (P0-P3), dependencies
5. **User Review**: Always get user confirmation before saving
6. **Save Plan**: `.agents/plan.json` + memory

## Guidance After Output

When plan is complete, guide user on execution options:
- `/orchestrate` — Automatic parallel execution
- `/coordinate` — Task-based coordinated execution
- `/ultrawork` — 5-phase Phase Gate execution

$ARGUMENTS
