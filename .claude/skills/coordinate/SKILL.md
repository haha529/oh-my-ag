---
name: coordinate
description: Task-based multi-agent coordination (includes Issue Remediation Loop)
disable-model-invocation: true
---

# /coordinate

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/coordinate.md` (Official workflow)
2. `.agents/skills/_shared/skill-routing.md` (Agent routing)
3. `.agents/skills/_shared/context-loading.md` (Resource loading)
4. `.agents/skills/_shared/prompt-structure.md` (4-element framework)

## Claude Code Native Adaptation

Use Task tool + TaskCreate for task tracking and agent spawning instead of CLI spawning.

### Step 1: Requirements Analysis

- Analyze user requirements
- Identify relevant domains (based on skill-routing.md)

### Step 2: PM Task Decomposition

- Complex requirements: Spawn `pm-planner` subagent via Task tool
- Simple requirements: Decompose tasks inline

### Step 3: User Confirmation

- Present plan to user
- **MUST get user confirmation before proceeding**

### Step 4: Create Tasks with TaskCreate + Spawn Agents

Create each agent task with TaskCreate for progress tracking:

```
1. Register each task with TaskCreate (subject, description)
2. Spawn agents by priority tier (parallel)
   - Same tier agents: Multiple Task tool calls in same message
3. Update status with TaskUpdate on completion
```

Agent mapping: Reference `.claude/agents/{agent}.md`

### Step 5: Monitoring

Task tool returns results directly → No polling needed.

### Step 6: QA Review

Spawn `qa-reviewer` subagent via Task tool (review results)

### Step 7: Issue Remediation Loop (Native Loop)

```
LOOP:
  [1] Spawn implementation agents via Task tool (parallel)
  [2] Receive results
  [3] Spawn QA agent via Task tool (review results)
  [4] Parse QA results:
      - 0 CRITICAL/HIGH issues → ACCEPT ✓
      - CRITICAL/HIGH issues exist:
        → Compose issues as feedback for that agent:
          ## Issue Remediation
          **Agent**: {agent-name}
          **Issues**:
          - [CRITICAL] file:line — description — fix instruction
          - [HIGH] file:line — description — fix instruction
        → Re-spawn only that agent via Task tool (include issues + fix instructions)
        → Back to [3] (re-review with QA)
```

This loop replaces CLI's "Step 7: Address Issues and Iterate"
with a synchronous Task tool-based loop.

### Final Report

- Completed task list
- Remaining issues (if any)
- Next step suggestions

$ARGUMENTS
