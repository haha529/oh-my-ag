---
title: 并行执行
description: 同时运行多个智能体 —— 因为等一个做完再开始下一个实在太慢了。
---

# 并行执行

oh-my-agent 真正的威力在于同时运行多个智能体。当 backend 智能体在构建 API 时，frontend 智能体已经在创建 UI 了。

## 基本模式

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

`&` 让每个智能体在后台运行。`wait` 会阻塞直到两个都完成。

## 工作区感知模式

给每个智能体分配独立目录以避免合并冲突：

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## 使用 `agent:parallel`

更简洁的语法：

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

加上 `--no-wait` 可以启动后不等待：

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## 运行时监控

打开另一个终端：

```bash
# 终端仪表盘
oma dashboard

# 或 Web 仪表盘
oma dashboard:web
# → http://localhost:9847
```

仪表盘实时显示每个智能体的状态 —— 执行轮次、当前任务、完成状态。

## 多 CLI 配置

不同的 AI 工具各有所长。把智能体路由到最适合其领域的 CLI：

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # 复杂 UI 推理
  backend: gemini       # 快速 API 生成
  mobile: gemini
  qa: claude            # 细致的安全审查
  debug: claude         # 深度根因分析
  pm: gemini            # 快速任务分解
```

## CLI 供应商解析顺序

启动智能体时，CLI 的选择按以下优先级：

1. `--vendor` 标志（最高优先级）
2. 该智能体的 `agent_cli_mapping`
3. `default_cli` 设置
4. `cli-config.yaml` 中的 `active_vendor`
5. `gemini`（兜底默认）

## 并行运行技巧

- **每个功能用一个 session ID** —— 让智能体输出归类在一起
- **先锁定 API 契约** —— 在启动实现智能体前先运行 `/plan`
- **独立工作区** —— 避免智能体互相踩到对方的文件
- **主动监控** —— 通过仪表盘及早发现问题，而不是合并时才发现
