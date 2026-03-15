---
name: brainstorm
description: Design-first idea exploration — Understanding user intent and design workflow before implementation
disable-model-invocation: true
---

# /brainstorm

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/brainstorm.md` (Official workflow — Follow all steps)
2. `.agents/skills/_shared/prompt-structure.md` (4-element framework)
3. `.agents/skills/_shared/context-loading.md` (Selective resource loading)

## Claude Code Adaptation

- Execute inline (no need to spawn subagents)
- Explore project using Grep, Glob, Read tools instead of MCP code analysis tools
- Save design docs: `docs/plans/<feature-name>-design.md`

## Key Steps Summary

1. **Explore Project Context**: Analyze existing codebase (Grep, Glob, Read)
2. **Clarification Questions**: Intent, scope, constraints, success criteria (one at a time)
3. **Propose Approaches**: 2-3 alternatives + pros/cons + effort estimate → User selects
4. **Detail Design**: Present by sections, approve each section
5. **Save Design**: `docs/plans/<feature-name>-design.md`
6. **Guide Next Steps**: Suggest running `/plan`

## Important

- NO code writing in this workflow
- Focus only on design and exploration

$ARGUMENTS
