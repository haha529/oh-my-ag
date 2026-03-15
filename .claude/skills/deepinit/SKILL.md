---
name: deepinit
description: Project harness initialization — Generate AGENTS.md, ARCHITECTURE.md, docs/ structure
disable-model-invocation: true
---

# /deepinit

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/deepinit.md` (Official workflow — Follow all steps)
2. `.agents/skills/_shared/context-loading.md` (Selective resource loading)

## Claude Code Adaptation

- Execute inline
- Analyze codebase using Read, Glob, Grep, Bash tools instead of MCP tools
- Create files: Use Write tool

## Key Steps Summary

1. **Check Existing Harness**: If AGENTS.md exists, use update mode
2. **Analyze Codebase**: Understand structure, symbols, patterns (Glob, Grep, Read)
3. **Generate ARCHITECTURE.md**: Topology, domain map (<200 lines)
4. **Generate docs/ Knowledge Base**: Create only relevant files
5. **Generate Root AGENTS.md**: Table of contents role (~100 lines)
6. **Generate Boundary AGENTS.md**: Package/app boundaries (<50 lines)
7. **Verify**: No dead links, comply with line limits

## Target Structure

```
AGENTS.md              (Table of contents, ~100 lines)
ARCHITECTURE.md        (Domain map, <200 lines)
docs/
├── design-docs/
├── exec-plans/
├── generated/
├── product-specs/
├── references/
├── DESIGN.md, FRONTEND.md, PLANS.md
├── QUALITY-SCORE.md, RELIABILITY.md, SECURITY.md
└── CODE-REVIEW.md
```

## Important

- AGENTS.md serves as table of contents — not an encyclopedia
- Follow `.gitignore`, skip cross-platform build directories
- Preserve `<!-- MANUAL: -->` blocks

$ARGUMENTS
