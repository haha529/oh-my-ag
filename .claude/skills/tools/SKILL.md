---
name: tools
description: Check and manage MCP tool status — Enable/disable tool groups
disable-model-invocation: true
---

# /tools

## Required Reading Before Execution

Read and follow this file:

1. `.agents/workflows/tools.md` (Official workflow — Follow all steps)

## Claude Code Adaptation

- Execute inline
- Read/modify `.agents/mcp.json` directly (Read, Edit tools)

## Usage

- `/tools` — Show current tool status
- `/tools memory only` — Enable only memory tools
- `/tools all` — Enable all tools (reset)
- `/tools memory only --temp` — Temporary session-only override

## Tool Groups

| Group | Tools |
|:------|:------|
| memory | read_memory, write_memory, edit_memory, list_memories |
| code-analysis | get_symbols_overview, find_symbol, find_referencing_symbols, search_for_pattern |
| code-edit | apply_diff, create_file |
| file-ops | list_dir, read_file |
| all | All of the above |

## Key Steps Summary

1. **Show Status**: Read `.agents/mcp.json`, show active tools/groups
2. **Parse Command**: "enable only {group}", "disable {tool}", "enable all"
3. **Change Config**: Permanent (modify mcp.json) or temporary (--temp)
4. **Handle Edge Cases**: Unknown tools, server conflicts, empty tool lists

$ARGUMENTS
