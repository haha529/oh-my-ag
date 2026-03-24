---
title: 简介
description: oh-my-agent 是什么，为什么你需要一支 AI 智能体团队协同工作。
---

# 简介

有没有想过给你的 AI 助手配几个同事？oh-my-agent 就是干这个的。

与其让一个 AI 包揽一切（然后做到一半就犯迷糊），oh-my-agent 会把工作分配给**专业智能体** —— 前端专家、后端专家、QA 审查员、PM 规划师，等等。每个智能体都深谙自己的领域，拥有专属的工具、检查清单和错误处理手册。

## 你能得到什么

- **14 个专业智能体** —— 每个都对应真实工程团队中的一个角色
- **斜杠命令**，如 `/plan`、`/coordinate`、`/review`，用于触发结构化工作流
- **自动检测** —— 用自然语言描述你的需求，系统会自动激活合适的工作流（支持 11 种语言！）
- **并行执行** —— 同时启动多个智能体处理不同部分
- **实时仪表盘** —— 终端和 Web 界面，随时监控智能体的工作状态
- **随处可用** —— 支持 Antigravity、Claude Code、Cursor、Gemini CLI、Codex CLI、OpenCode 等

## 认识你的团队

| 智能体 | 职责 |
|-------|------|
| **oma-brainstorm** | 在动手开发前先探索想法 |
| **oma-pm** | 拆解需求、规划任务、定义 API 契约 |
| **oma-frontend** | 使用 TypeScript 和 Tailwind CSS 构建 React/Next.js 界面 |
| **oma-backend** | 用 Python、Node.js 或 Rust 创建 API |
| **oma-db** | 设计数据库 schema、处理迁移、优化查询 |
| **oma-mobile** | 用 Flutter 构建跨平台应用 |
| **oma-design** | 创建包含设计令牌、无障碍和响应式规则的设计系统 |
| **oma-qa** | 审查安全性（OWASP）、性能和无障碍 |
| **oma-debug** | 定位根因、编写修复方案和回归测试 |
| **oma-tf-infra** | 使用 Terraform 配置云基础设施 |
| **oma-dev-workflow** | 自动化 CI/CD、发布和 monorepo 任务 |
| **oma-translator** | 自然地翻译多语言内容 |
| **oma-orchestrator** | 通过 CLI 并行运行多个智能体 |
| **oma-commit** | 创建规范的 conventional commits |

## 工作原理（30 秒版）

1. 你描述想要构建的东西
2. oh-my-agent 判断需要哪些智能体
3. 智能体凭借各自的专业知识执行任务
4. 质量关卡在完成前检查工作成果
5. 你得到的是可投产的代码，而不只是建议

## 核心理念

一切都在 `.agents/` 目录中 —— 项目里一个可移植的目录。技能、工作流、配置，全在里面。随时切换 IDE，你的智能体配置随代码一起走。

## 下一步

- **[安装](./installation)** —— 60 秒快速上手
- **[使用指南](/guide/usage)** —— 查看智能体实战示例
- **[工作流](/core-concepts/workflows)** —— 了解斜杠命令
