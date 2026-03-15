---
name: orchestrate
description: Automatic parallel multi-agent orchestration (includes Review Loop)
disable-model-invocation: true
---

# /orchestrate

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/orchestrate.md` (Official workflow)
2. `.agents/skills/orchestrator/SKILL.md` (Orchestrator setup)
3. `.agents/skills/orchestrator/resources/subagent-prompt-template.md` (Prompt template)
4. `.agents/skills/_shared/skill-routing.md` (Agent routing)
5. `.agents/skills/_shared/context-loading.md` (Resource loading)

## Claude Code Native Adaptation

Spawn `.claude/agents/` subagents via Task tool instead of CLI (`oh-my-ag agent:spawn`).
Task tool returns synchronously, so no polling needed.

### Step 1: Load Plan

- Check if `.agents/plan.json` exists
- If not: Guide user to run `/plan` first

### Step 2: Initialize Session

1. Load `.agents/config/user-preferences.yaml`
2. Generate session ID (format: `session-YYYYMMDD-HHMMSS`)
3. Show agent routing (based on skill-routing.md)

### Step 3: Spawn Agents (Parallel Task tool calls)

Spawn agents by priority tier:

- **Multiple Task tool calls in same message** = true parallel execution
- Each agent: Use `.claude/agents/{agent}.md` definition
- Include in prompt: Task description, API contract, context

Agent mapping:
| Domain | Subagent File |
|:------|:---------------|
| backend | `.claude/agents/backend-impl.md` |
| frontend | `.claude/agents/frontend-impl.md` |
| mobile | `.claude/agents/mobile-impl.md` |
| db | `.claude/agents/db-impl.md` |
| qa | `.claude/agents/qa-reviewer.md` |
| debug | `.claude/agents/debug-investigator.md` |
| pm | `.claude/agents/pm-planner.md` |

### Step 4: Monitoring

Task tool returns results directly → No polling needed.
Check status, files changed, issues in each agent result.

### Step 5: Agent-to-Agent Review Loop (Native Loop)

Main agent directly controls this loop. Maintain iteration counter.

```
iteration = 0
MAX_SELF = 3, MAX_CROSS = 2, MAX_TOTAL = 5

LOOP:
  iteration += 1
  if iteration > MAX_TOTAL → FORCE_COMPLETE (include quality warning)

  [1] Self-Review:
      Check self-review section in implementation agent results
      Check lint/type-check/test results (Bash tool)
      PASS → Proceed to [3]
      FAIL (self_count < MAX_SELF) → Re-spawn Task tool (with feedback) → LOOP
      FAIL (self_count >= MAX_SELF) → Force proceed to [3]

  [3] Cross-Review:
      Spawn `qa-reviewer` subagent via Task tool
      Parse QA results: PASS / FAIL
      PASS → ACCEPT
      FAIL (cross_count < MAX_CROSS) → Feedback format:
        ## Review Feedback (iteration {n}/{MAX_TOTAL})
        **Reviewer**: qa-reviewer
        **Verdict**: FAIL
        **Issues**: [Specific file:line references]
        **Fix instruction**: [How to fix]
      → Re-spawn implementation agent Task tool (include feedback) → LOOP
      FAIL (cross_count >= MAX_CROSS) → Report to user with review history
```

### Step 6: Collect Results

After all agents complete:
- Collect `.agents/results/result-{agent}.md`
- Organize completed/failed tasks, changed files, remaining issues

### Step 7: Final Report

Session summary:
- Completed tasks
- Failed tasks (if failed after retries, include error details)
- Next step suggestions: Manual fix, re-run specific agent, `/review` QA

$ARGUMENTS
