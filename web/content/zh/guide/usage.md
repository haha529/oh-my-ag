---
title: 使用指南
description: 实战示例，展示如何使用 oh-my-agent —— 从简单任务到完整的多智能体编排。
---

# 如何使用 oh-my-agent

> 不确定从哪里开始？输入 `/coordinate` 加上你想构建的内容。

## 快速开始

1. 在 AI IDE（Claude Code、Gemini、Cursor 等）中打开你的项目
2. 技能会从 `.agents/skills/` 自动检测
3. 开始对话 —— 描述你想要什么

就这样。剩下的 oh-my-agent 会搞定。

---

## 示例 1：简单的单一任务

**你输入：**
```
"用 Tailwind CSS 创建一个带邮箱和密码字段的登录表单组件"
```

**发生了什么：**
- `oma-frontend` 技能激活
- 按需加载执行协议和技术栈资源
- 你得到一个包含 TypeScript、Tailwind、表单验证和测试的 React 组件

不需要斜杠命令，描述你的需求就行。

## 示例 2：多领域项目

**你输入：**
```
"构建一个带用户认证的 TODO 应用"
```

**发生了什么：**

1. 关键词检测发现这是多领域任务 → 建议使用 `/coordinate`
2. **PM 智能体**规划工作：认证 API、数据库 schema、前端 UI、QA 范围
3. **你启动智能体：**
   ```bash
   oma agent:spawn backend "JWT authentication API" session-01 -w ./apps/api &
   oma agent:spawn frontend "Login and TODO UI" session-01 -w ./apps/web &
   wait
   ```
4. **智能体并行工作** —— 各自在自己的工作区
5. **QA 智能体审查** —— 安全审计、集成检查
6. **你迭代** —— 根据需要用改进后的提示重新启动智能体

## 示例 3：Bug 修复

**你输入：**
```
"有个 bug —— 点击登录时显示 'Cannot read property map of undefined'"
```

**发生了什么：**

1. `oma-debug` 自动激活（关键词："bug"）
2. 定位根因 —— 组件在数据加载前就对 `todos` 执行 map
3. 应用修复 —— 加入加载状态和空值检查
4. 编写回归测试
5. 在其他 3 个组件中找到并主动修复了相同的模式

## 示例 4：设计系统

**你输入：**
```
"为我的 SaaS 产品设计一个暗色高端落地页"
```

**发生了什么：**

1. `oma-design` 激活（关键词："设计"、"落地页"）
2. 收集上下文 —— 目标受众、品牌、美学方向
3. 提出 2-3 个设计方向，包括颜色、字体和布局选项
4. 生成包含令牌、组件模式和无障碍规则的 `DESIGN.md`
5. 运行审计 —— 响应式、WCAG、尼尔森启发式评估
6. 准备好交给 `oma-frontend` 实现

## 示例 5：CLI 并行执行

```bash
# 单个智能体
oma agent:spawn backend "Implement JWT auth API" session-01

# 多个智能体并行
oma agent:spawn backend "Auth API + DB migration" session-01 -w ./apps/api &
oma agent:spawn frontend "Login form + error states" session-01 -w ./apps/web &
oma agent:spawn mobile "Auth screens + biometrics" session-01 -w ./apps/mobile &
wait

# 实时监控
oma dashboard        # 终端界面
oma dashboard:web    # Web 界面 http://localhost:9847
```

---

## 工作流命令

在 AI IDE 中输入这些命令来触发结构化流程：

| 命令 | 功能 | 使用时机 |
|------|------|---------|
| `/brainstorm` | 自由形式的构思和探索 | 在确定方案之前 |
| `/plan` | PM 任务分解 → `.agents/plan.json` | 开始任何复杂功能之前 |
| `/exec-plan` | 逐步执行已有计划 | `/plan` 之后 |
| `/coordinate` | 逐步的多领域协调 | 跨多个智能体的功能 |
| `/orchestrate` | 自动化的并行智能体执行 | 大型项目，最大并行度 |
| `/ultrawork` | 5 阶段质量工作流（11 个审查关卡） | 追求最高质量交付 |
| `/review` | 安全 + 性能 + 无障碍审计 | 合并之前 |
| `/debug` | 结构化的根因调试 | 排查 Bug |
| `/design` | 7 阶段设计工作流 → `DESIGN.md` | 构建设计系统 |
| `/commit` | 带 type/scope 分析的 conventional commit | 提交变更 |
| `/setup` | 项目配置 | 首次设置 |
| `/tools` | MCP 服务器管理 | 添加外部工具 |
| `/stack-set` | 技术栈配置 | 设置语言/框架偏好 |
| `/deepinit` | 完整项目初始化 | 在现有代码库中设置 |

---

## 自动检测（不需要斜杠命令）

oh-my-agent 检测 11 种语言的关键词，自动激活工作流：

| 你说的话 | 激活的工作流 |
|---------|------------|
| "plan the auth feature" | `/plan` |
| "버그 수정해줘" | `/debug` |
| "do everything in parallel" | `/orchestrate` |
| "レビューして" | `/review` |
| "diseña la página" | `/design` |
| "brainstorm some ideas" | `/brainstorm` |

像"什么是 orchestrate？"这样的提问会被过滤 —— 不会误触发工作流。

---

## 可用技能

| 技能 | 适用场景 | 输出 |
|------|---------|------|
| oma-pm | "规划这个"、"拆解一下" | `.agents/plan.json` |
| oma-frontend | UI、组件、样式 | React 组件、测试 |
| oma-backend | API、数据库、认证 | 接口、模型、测试 |
| oma-db | Schema、ERD、迁移 | Schema 设计、查询优化 |
| oma-mobile | 移动应用 | Flutter 页面、状态管理 |
| oma-design | UI/UX、设计系统 | 包含令牌的 `DESIGN.md` |
| oma-brainstorm | 构思、探索 | 设计文档 |
| oma-qa | 安全、性能、无障碍 | 带优先级修复建议的 QA 报告 |
| oma-debug | Bug、错误、崩溃 | 修复后的代码 + 回归测试 |
| oma-tf-infra | 云基础设施 | Terraform 模块 |
| oma-dev-workflow | CI/CD、自动化 | 流水线配置 |
| oma-translator | 翻译 | 自然的多语言内容 |
| oma-orchestrator | 并行执行 | 智能体结果 |
| oma-commit | Git 提交 | Conventional commits |

---

## 仪表盘

### 终端仪表盘

```bash
oma dashboard
```

实时表格，显示会话状态、智能体状态、轮次和最新活动。监视 `.serena/memories/` 获取实时更新。

### Web 仪表盘

```bash
oma dashboard:web
# → http://localhost:9847
```

特性：
- 通过 WebSocket 实时更新
- 连接断开时自动重连
- 带有颜色标识的智能体状态
- 来自进度和结果文件的活动日志

### 推荐布局

使用 3 个终端：
1. 仪表盘（`oma dashboard`）
2. 智能体启动命令
3. 测试/构建日志

---

## 小贴士

1. **要具体** —— "用 JWT 认证、React 前端、Express 后端构建一个 TODO 应用"比"做个应用"好得多
2. **用工作区** —— `-w ./apps/api` 防止智能体互相干扰
3. **先锁定契约** —— 在并行启动智能体前运行 `/plan`
4. **主动监控** —— 仪表盘能在合并前发现问题
5. **用重新启动来迭代** —— 优化智能体提示，而不是从头开始
6. **从 `/coordinate` 开始** —— 当你不确定该用哪个工作流时

---

## 故障排除

| 问题 | 解决方案 |
|------|---------|
| IDE 中检测不到技能 | 确认 `.agents/skills/` 存在且包含 `SKILL.md` 文件，重启 IDE |
| 找不到 CLI | `which gemini` / `which claude` —— 安装缺失的工具 |
| 智能体产出冲突代码 | 使用独立工作区（`-w`），审查输出，用修正后的提示重新启动 |
| 仪表盘显示"No agents detected" | 智能体还没写入 `.serena/memories/` —— 等一下或检查 session ID |
| Web 仪表盘无法启动 | 先运行 `bun install` |
| QA 报告有 50+ 个问题 | 先处理 CRITICAL/HIGH 级别，其余记录下来之后再处理 |

---

关于集成到现有项目，参见[集成指南](./integration)。
