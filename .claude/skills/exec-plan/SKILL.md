---
name: exec-plan
description: Execution plan generation and management — Plan lifecycle as repository artifact
disable-model-invocation: true
---

# /exec-plan

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/exec-plan.md` (Official workflow — Follow all steps)
2. `.agents/skills/_shared/prompt-structure.md` (4-element framework)
3. `.agents/skills/_shared/context-loading.md` (Resource loading)

## Claude Code Adaptation

- Execute inline (no need to spawn subagents)
- Use Read, Write, Grep, Glob tools instead of MCP tools
- Plan lifecycle: `docs/exec-plans/active/` → `docs/exec-plans/completed/`

## Key Steps Summary

1. **Check Directory**: Verify `docs/exec-plans/` exists
2. **Scope Analysis**: 4 elements — Goal, Context, Constraints, Done When
3. **Generate Plan**: Create `docs/exec-plans/active/{plan-name}.md` with task table, decision log, progress notes
4. **Define API Contracts**: For cross-boundary work
5. **User Review**: Always get confirmation before proceeding
6. **Execution Handoff**: Pass to `/orchestrate` or `/coordinate`
7. **Completion Handling**: Move to `completed/`, update `tech-debt-tracker.md`

$ARGUMENTS
