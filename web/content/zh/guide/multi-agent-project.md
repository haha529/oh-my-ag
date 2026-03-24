---
title: "使用场景：多智能体项目"
description: 如何协调多个智能体来开发跨前端、后端、数据库和 QA 的功能。
---

# 使用场景：多智能体项目

## 何时使用

你的功能跨越多个领域 —— 后端 API + 前端 UI + 数据库 schema + QA 审查。一个智能体搞不定，你希望它们并行工作。

## 协调流程

```text
/plan → /coordinate → agent:spawn (parallel) → /review → merge
```

1. **`/plan`** —— PM 智能体将功能分解为领域任务
2. **`/coordinate`** —— 设定执行顺序和负责人
3. **`agent:spawn`** —— 智能体并行执行
4. **`/review`** —— QA 审查跨领域一致性

## 会话策略

每个功能使用一个 session ID：

```text
session-auth-v2
```

按领域分配工作区：

| 智能体 | 工作区 |
|--------|--------|
| backend | `./apps/api` |
| frontend | `./apps/web` |
| mobile | `./apps/mobile` |

## 启动示例

```bash
oma agent:spawn backend "Implement JWT auth API + refresh flow" session-auth-v2 -w ./apps/api &
oma agent:spawn frontend "Build login + refresh UX with error states" session-auth-v2 -w ./apps/web &
oma agent:spawn qa "Review auth risks, test matrix, and regression scope" session-auth-v2 &
wait
```

## 契约优先原则

在智能体并行编码之前，**先锁定 API 契约**：

- 请求/响应 schema
- 错误码和消息
- 认证/会话生命周期的假设

如果契约在运行中变更，暂停下游智能体，并用更新后的契约重新下发提示。

## 合并关卡

不满足以下条件不要合并：

1. 领域级别的测试通过
2. 集成点与约定的契约一致
3. QA 的高/严重级别问题已解决（或明确豁免）
4. 如果外部可见行为发生变化，更新了 Changelog

## 不要做这些事

- 所有智能体共用一个工作区（合并冲突噩梦）
- 更改契约却不通知其他智能体
- 在兼容性检查前分别合并后端和前端

## 完成标志

- 所有已规划的任务在各领域完成
- 跨领域集成已验证
- QA 签收已记录
