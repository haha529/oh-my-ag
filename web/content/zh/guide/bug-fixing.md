---
title: "使用场景：Bug 修复"
description: 结构化调试 —— 从复现问题到编写回归测试。
---

# 使用场景：Bug 修复

## 从一份好的报告开始

Bug 报告写得越好，修复就越快：

```text
Symptom: Login button throws TypeError
Environment: Chrome 130, macOS, production build
Steps to reproduce:
  1. Go to /login
  2. Enter valid credentials
  3. Click "Sign In"
Expected: Redirect to dashboard
Actual: White screen, console shows "Cannot read property 'map' of undefined"
Logs: [paste relevant logs]
```

## 先分级

| 严重程度 | 含义 | 响应 |
|---------|------|------|
| **P0** | 数据丢失、认证绕过、生产故障 | 放下一切，拉上 QA/安全团队 |
| **P1** | 主要用户流程中断 | 当前迭代内修复 |
| **P2** | 功能降级但有变通方案 | 安排修复计划 |
| **P3** | 小问题，不阻塞 | 放入待办列表 |

## 调试循环

1. **复现** —— 在最小环境中精确复现
2. **隔离** —— 找到根因（不只是表面症状）
3. **修复** —— 最小的安全变更
4. **测试** —— 为失败路径编写回归测试
5. **扫描** —— 检查相邻代码中是否有相同模式

## 提示词模板

```text
Bug: Login throws "Cannot read property 'map' of undefined"
Repro: Click sign-in with valid credentials
Scope: src/components/auth/*, src/hooks/useAuth.ts
Expected: Redirect to dashboard
Need:
1) root cause analysis
2) minimal fix
3) regression tests
4) scan for similar patterns
```

## 何时升级

在 Bug 涉及以下内容时，拉上 QA 或安全团队：

- 认证 / 会话 / token 刷新
- 权限边界
- 支付 / 交易一致性
- 负载下的性能

## 修复之后

验证：
- 原始复现步骤不再失败
- 相关流程没有新错误
- 测试在修复前失败、修复后通过
- 如果需要，有明确的回滚路径
