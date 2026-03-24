---
title: Автоматические Обновления
description: Поддерживайте навыки oh-my-agent актуальными с помощью GitHub Action, которая открывает PR при выходе новых версий.
---

# Автоматические Обновления с GitHub Action

Настройте один раз, забудьте. GitHub Action проверяет новые версии oh-my-agent и открывает PR, когда обновления доступны.

## Быстрая Настройка

Добавьте это в ваш репозиторий:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1"   # Каждый понедельник в 09:00 UTC
  workflow_dispatch:        # Или запустите вручную

permissions:
  contents: write
  pull-requests: write

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
```

Вот и всё. Вы будете получать PR каждый раз при обновлении навыков.

## Входные Параметры Action

| Параметр | Что Делает | По Умолчанию |
|---------|-----------|-------------|
| `mode` | `pr` открывает PR, `commit` пушит напрямую | `pr` |
| `base-branch` | Целевая ветка | `main` |
| `force` | Перезаписать кастомные конфигурации | `false` |
| `pr-title` | Пользовательский заголовок PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Метки PR через запятую | `dependencies,automated` |
| `commit-message` | Пользовательское сообщение коммита | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub-токен | `${{ github.token }}` |

## Выходные Параметры Action

| Параметр | Что Содержит |
|---------|-------------|
| `updated` | `true`, если обнаружены изменения |
| `version` | Версия oh-my-agent после обновления |
| `pr-number` | Номер PR (только режим pr) |
| `pr-url` | URL PR (только режим pr) |

## Примеры

### Пропустить PR, Коммитить Напрямую

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### С Персональным Токеном Доступа

Для форк-репозиториев, где `GITHUB_TOKEN` не имеет прав на запись:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Уведомление при Обновлении

```yaml
jobs:
  update:
    runs-on: ubuntu-latest
    outputs:
      updated: ${{ steps.oma.outputs.updated }}
    steps:
      - uses: actions/checkout@v6
      - uses: first-fluke/oh-my-agent/action@v1
        id: oma

  notify:
    needs: update
    if: needs.update.outputs.updated == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Updated to ${{ needs.update.outputs.version }}"
```

## Как Это Работает Внутри

1. Устанавливает CLI `oh-my-agent` через Bun
2. Запускает `oma update --ci` (неинтерактивно)
3. Обнаруживает изменения в `.agents/` и `.claude/`
4. Создаёт PR или коммит в зависимости от `mode`
