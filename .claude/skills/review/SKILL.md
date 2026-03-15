---
name: review
description: OWASP security, performance, accessibility, code quality review (includes Fix-Verify Loop)
disable-model-invocation: true
---

# /review

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/review.md` (7-step QA pipeline)
2. `.agents/skills/qa-agent/SKILL.md` (QA Agent expertise)

## Claude Code Adaptation

### Default Mode (Review Only)

Delegate QA review to `qa-reviewer` subagent:

1. Spawn `.claude/agents/qa-reviewer.md` agent via Task tool
2. Include target files/scope in prompt
3. Report review results to user (CRITICAL → HIGH → MEDIUM → LOW order)

Task tool spawn prompt example:
```
Review the following files for security, performance, accessibility, and code quality issues:
[file list]
Follow .agents/skills/qa-agent/SKILL.md for review standards.
Report findings as: CRITICAL / HIGH / MEDIUM / LOW with file:line, description, and remediation code.
```

### Fix-Verify Loop (with --fix option)

When user wants fixes too, execute review → fix → re-review loop:

```
[1] Spawn qa-reviewer Task tool → Receive issue list
[2] CRITICAL/HIGH issues exist?
    NO → Report and complete
    YES →
      [3] Spawn domain agent Task tool (issues + fix instructions)
          - Backend issues → backend-impl agent
          - Frontend issues → frontend-impl agent
          - Mobile issues → mobile-impl agent
      [4] Receive fix results
      [5] Re-spawn qa-reviewer (re-review fixed code)
      [6] → Back to [2] (repeat up to 3 times)
```

## Determine Review Scope

- If files/directory specified in `$ARGUMENTS` → Only that scope
- If not specified → `git diff --name-only` or recent changed files

$ARGUMENTS
