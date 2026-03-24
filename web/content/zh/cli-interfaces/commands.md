---
title: CLI 命令
description: oh-my-agent CLI 中所有可用的命令及示例。
---

# CLI 命令

全局安装（`bun install --global oh-my-agent`）后，使用 `oma` 或 `oh-my-ag`。

## 设置与维护

```bash
oma                    # 交互式安装器 —— 选择预设，安装技能
oma doctor             # 健康检查：CLI、MCP 配置、技能状态
oma update             # 从注册表更新技能到最新版本
oma cleanup            # 清理残留进程和临时文件
```

## 监控

```bash
oma dashboard          # 终端仪表盘 —— 实时智能体状态
oma dashboard:web      # Web 仪表盘 http://localhost:9847
oma stats              # 查看生产力指标
oma retro [days]       # 带趋势分析的工程回顾
```

## 智能体管理

```bash
# 启动单个智能体
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# 检查智能体状态
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# 并行运行多个智能体
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## 内存与验证

```bash
# 初始化 Serena 内存 schema
oma memory:init

# 验证智能体输出质量
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## 集成与实用工具

```bash
oma auth:status        # 检查 CLI 认证状态
oma usage:anti         # 查看 Antigravity IDE 使用配额
oma bridge [url]       # 将 MCP stdio 桥接到 Streamable HTTP
oma visualize          # 生成项目依赖关系图
oma describe [cmd]     # 对任何 CLI 命令进行 JSON 内省
oma star               # 在 GitHub 上给 oh-my-agent 加星
```

## 获取帮助

```bash
oma help               # 显示所有命令
oma version            # 显示版本号
oma <command> --help   # 特定命令的帮助
```
