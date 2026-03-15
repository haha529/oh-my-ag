---
name: debug
description: Structured bug diagnosis and fix — Root cause analysis, pattern scanning, regression tests
disable-model-invocation: true
---

# /debug

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/debug.md` (Official workflow — Follow all steps)
2. `.agents/skills/debug-agent/SKILL.md` (Debug Agent expertise)
3. `.agents/skills/_shared/context-loading.md` (Resource loading)

## Claude Code Adaptation

### Default Mode (Inline Diagnosis)

Main agent handles simple bugs directly:

1. **Collect Error**: Error message, reproduction steps, environment info
2. **Verify Reproduction**: Trace code with Grep, Read tools
3. **Diagnose Root Cause**: null access, race condition, type mismatch, etc.
4. **Propose Fix**: Minimal changes, apply after user confirmation
5. **Write Regression Test**: Test for the fix
6. **Scan Similar Patterns**: Check if same pattern exists elsewhere with Grep

### Complex Debug (Delegate to Subagent)

When similar pattern scanning needs to cover broad scope:

1. Spawn `debug-investigator` subagent via Task tool
2. Include diagnosis results so far + scan scope in prompt
3. Receive results and report to user

Task tool spawn criteria:
- Error spans multiple domains
- Similar pattern scan scope is 10+ files
- Deep dependency tracing needed for diagnosis

## Core Principles

- Fix root causes, not symptoms
- Minimal changes only — No refactoring during debug
- Regression tests required for all fixes

$ARGUMENTS
