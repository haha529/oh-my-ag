---
name: setup
description: CLI installation, MCP connection, agent-CLI mapping initial setup
disable-model-invocation: true
---

# /setup

## Required Reading Before Execution

Read and follow these files in order:

1. `.agents/workflows/setup.md` (Official workflow — Follow all steps)
2. `.agents/config/user-preferences.yaml` (Check current settings)

## Claude Code Adaptation

- Execute inline
- Check CLI installation status: Use Bash tool for `which gemini`, `which claude`, `which codex`
- MCP settings: Read `.agents/mcp.json`

## Key Steps Summary

1. **Language Setting**: Check/create `.agents/config/user-preferences.yaml`
2. **CLI Installation Check**: Verify gemini, claude, codex installation status
3. **MCP Connection Check**: Check MCP settings for each CLI
4. **Agent-CLI Mapping**: Configure `agent_cli_mapping`
5. **Setup Complete Summary**: Report current status

$ARGUMENTS
