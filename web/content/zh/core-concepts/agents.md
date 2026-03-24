---
title: 智能体
description: 智能体的工作方式 —— 角色、分类、章程预检和编排流程。
---

# 智能体

oh-my-agent 中的智能体不是通用聊天机器人。每个都对应工程团队中的一个特定角色，有明确的职责范围、工具和质量标准。

## 智能体分类

把它们想象成你的工程团队：

| 类别 | 智能体 | 负责内容 |
|------|--------|---------|
| **构思** | oma-brainstorm | 在写代码前探索创意 |
| **规划** | oma-pm | 需求分析、任务拆解、API 契约 |
| **实现** | oma-frontend、oma-backend、oma-mobile、oma-db | 实际编码 |
| **设计** | oma-design | 设计系统、令牌、UI/UX 模式 |
| **基础设施** | oma-tf-infra | 使用 Terraform 配置云资源 |
| **DevOps** | oma-dev-workflow | CI/CD、迁移、发布 |
| **质量** | oma-qa、oma-debug | 审查、安全审计、修复 Bug |
| **本地化** | oma-translator | 自然的多语言翻译 |
| **协调** | oma-orchestrator、oma-coordination | 运行和同步多个智能体 |
| **Git** | oma-commit | 规范的 conventional commits |

## 智能体的执行方式

每个智能体都遵循相同的纪律：

### 1. 章程预检

在写任何代码之前，智能体会输出一个 `CHARTER_CHECK`，声明：
- 工作所属的领域
- 适用的约束条件
- 做出的假设
- "完成"的定义

这能及早发现范围蔓延和理解偏差。

### 2. 两层加载

智能体在设计上是 token 高效的：
- **第一层**（`SKILL.md`，约 800 字节）：身份和路由规则 —— 始终加载
- **第二层**（`resources/`）：执行协议、错误处理手册、代码模板 —— 仅在需要时加载

相比一次性加载所有内容，这节省了约 75% 的 token。

### 3. 限定范围执行

前端智能体不会碰后端代码，DB 智能体不会修改 UI 组件。每个智能体各司其职。

### 4. 质量关卡

每个智能体都有领域专属的检查清单。只有清单通过，工作才算"完成"。

## 工作区策略

对于多智能体项目，独立的工作区能减少合并冲突：

```text
./apps/api      → backend 智能体工作区
./apps/web      → frontend 智能体工作区
./apps/mobile   → mobile 智能体工作区
```

## 编排流程

运行多智能体工作流时：

1. **PM 智能体**将任务分解为领域专属的子任务
2. **领域智能体**在各自的工作区中并行执行
3. **进度流**写入 Serena 内存（`.serena/memories/`）
4. **QA 智能体**验证跨领域一致性
5. **结果**被收集，准备合并

## 运行时状态（Serena Memory）

智能体通过共享内存文件进行协调：

| 文件 | 用途 |
|------|------|
| `orchestrator-session.md` | 当前会话状态 |
| `task-board.md` | 任务分配和状态 |
| `progress-{agent}.md` | 各智能体的进度更新 |
| `result-{agent}.md` | 智能体的最终输出 |

这些文件位于 `.serena/memories/`，也是仪表盘所监控的内容。
