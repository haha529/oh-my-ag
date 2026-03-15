---
name: ultrawork
description: 5-phase 17-step Phase Gate orchestration
disable-model-invocation: true
---

# /ultrawork

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/ultrawork.md` (Official workflow — 5 Phases, 17 Steps)
2. `.agents/skills/orchestrator/SKILL.md` (Orchestrator setup)
3. `.agents/skills/_shared/multi-review-protocol.md` (11 review steps)
4. `.agents/skills/_shared/skill-routing.md` (Agent routing)
5. `.agents/skills/_shared/context-loading.md` (Resource loading)

## Claude Code Native Adaptation

### Phase Gate Loop Pattern

Execute each phase sequentially, looping back to the phase when a Gate fails.
The main agent directly evaluates the Gate checklist to control the loop.

```
for each PHASE in [PLAN, IMPL, VERIFY, REFINE, SHIP]:
  GATE_LOOP:
    Execute Steps for that Phase
    Evaluate Gate checklist:
      All items PASS → Proceed to next Phase
      FAIL →
        PLAN_GATE failed: Regress to Step 1 (inline re-execution)
        IMPL_GATE failed: Re-spawn only failed agents via Task tool → GATE_LOOP
        VERIFY_GATE failed: Regress to Step 5, fix implementation, re-run VERIFY
        REFINE_GATE failed: Re-spawn debug-investigator → GATE_LOOP
        SHIP_GATE failed: Re-execute that Step → GATE_LOOP
```

---

### PLAN Phase (Steps 1-4): Execute inline

Main agent performs PM analysis directly:

1. **Step 1**: Requirements analysis, domain identification
2. **Step 2**: Completeness Review — Verify requirements completeness
3. **Step 3**: Meta Review — Review adequacy
4. **Step 4**: Over-Engineering Review — Eliminate unnecessary complexity

**PLAN_GATE**: Plan documentation, assumption list, alternative review, over-engineering review → User confirmation

---

### IMPL Phase (Step 5): Spawn implementation agents in parallel

Spawn implementation agents via Task tool:

- Multiple Task tool calls in same message (true parallel)
- Use `.claude/agents/{agent}.md` definitions
- Pass task + API contract to each agent

**IMPL_GATE**: Build success (Bash), tests pass (Bash), only planned files changed

---

### VERIFY Phase (Steps 6-8): Spawn qa-reviewer Task tool

1. **Step 6**: Alignment Review — Implementation == Requirements
2. **Step 7**: Security/Bug Review — OWASP Top 10
3. **Step 8**: Regression Review — Impact on existing features

Spawn `qa-reviewer` subagent via Task tool for 3 review steps.

Apply Review Loop:
```
Parse VERIFY results:
  PASS → Next Phase
  FAIL → Re-spawn implementation agent (with feedback) → Re-run VERIFY
```

**VERIFY_GATE**: Implementation==Requirements, 0 CRITICAL, 0 HIGH, no regressions

---

### REFINE Phase (Steps 9-13): Spawn debug-investigator Task tool

1. **Step 9**: Split large files/functions
2. **Step 10**: Capture integration opportunities
3. **Step 11**: Side effect analysis
4. **Step 12**: Consistency review
5. **Step 13**: Cleanup

Spawn `debug-investigator` subagent.

> Simple tasks under 50 lines: SKIP REFINE Phase

**REFINE_GATE**: No large files/functions, integration opportunities captured, side effects verified

---

### SHIP Phase (Steps 14-17): Final QA + Deployment checklist

1. **Step 14**: Quality Review — lint/type/coverage
2. **Step 15**: UX Flow verification
3. **Step 16**: Check Related Issues
4. **Step 17**: Deployment Readiness

Spawn `qa-reviewer` subagent (final review).

**SHIP_GATE**: Quality pass, UX verified, related issues resolved → Final user approval

$ARGUMENTS
