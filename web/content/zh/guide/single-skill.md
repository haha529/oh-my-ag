---
title: "使用场景：单一技能"
description: 当你只需要一个智能体来完成聚焦任务时 —— 最快的路径。
---

# 使用场景：单一技能

## 何时使用

当你的任务范围明确且由单一领域负责时：

- 一个 UI 组件
- 一个 API 接口
- 一层代码中的一个 Bug
- 一个模块的重构

如果任务需要跨领域协调（API + UI + QA），请切换到[多智能体项目](./multi-agent-project)。

## 提问前的准备

快速清单：

1. **输出是什么？** —— 具体的文件或行为
2. **什么技术栈？** —— 框架、语言、版本
3. **什么算"完成"？** —— 验收标准
4. **需要什么测试？** —— 要覆盖的关键场景

## 提示词模板

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## 实际例子

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## 执行过程

1. 根据你的提示自动激活合适的技能
2. 智能体声明其假设（章程预检）
3. 你确认或调整
4. 智能体编写代码和测试
5. 你在本地验证

## 合并前检查

确认：
- 行为符合你的验收标准
- 测试覆盖了正常路径和关键边界情况
- 没有混入不相关的文件变更
- 共享模块没有被破坏

## 何时升级

切换到多智能体流程的情况：
- UI 工作需要新的 API 契约
- 一个修复在多层之间产生连锁反应
- 第一轮迭代后，范围超出了单一领域
