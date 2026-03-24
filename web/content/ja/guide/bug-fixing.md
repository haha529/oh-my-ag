---
title: "ユースケース: バグ修正"
description: 構造化されたデバッグ — 問題の再現からリグレッションテストの作成まで。
---

# ユースケース: バグ修正

## 良いバグレポートから始める

バグレポートが良いほど、修正は早くなります：

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

## まずトリアージ

| 深刻度 | 意味 | 対応 |
|----------|--------------|----------|
| **P0** | データ損失、認証バイパス、本番障害 | すべてを中断、QA/セキュリティに関与 |
| **P1** | 主要ユーザーフローの障害 | 現在のスプリントで修正 |
| **P2** | 劣化しているが回避策あり | 修正をスケジュール |
| **P3** | 軽微、ブロッキングなし | バックログ |

## デバッグループ

1. **再現** — 最小限の環境で正確に再現
2. **分離** — 根本原因を見つける（症状だけでなく）
3. **修正** — 最小限の安全な変更
4. **テスト** — 失敗パスのリグレッションテスト
5. **スキャン** — 同じパターンが隣接コードにないか確認

## プロンプトテンプレート

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

## エスカレーションのタイミング

バグが以下に関わる場合は、QAまたはセキュリティに相談してください：

- 認証 / セッション / トークンリフレッシュ
- パーミッション境界
- 決済 / トランザクション整合性
- 負荷下のパフォーマンス

## 修正後に

以下を確認してください：
- 元の再現手順で失敗しなくなった
- 関連フローに新しいエラーがない
- テストが修正前に失敗し、修正後にパスする
- 必要に応じてロールバックパスが明確
