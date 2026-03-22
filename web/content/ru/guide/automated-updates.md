---
title: Автоматические обновления через GitHub Action
description: Поддерживайте навыки oh-my-agent в актуальном состоянии с помощью официального GitHub Action.
---

# Автоматические обновления через GitHub Action

**oh-my-agent update action** запускает `oma update` по расписанию и создаёт PR (или делает коммит напрямую) при появлении новых версий навыков.

## Быстрый старт

Добавьте этот workflow в любой репозиторий, использующий oh-my-agent:

```yaml
# .github/workflows/update-oma.yml
name: Update oh-my-agent

on:
  schedule:
    - cron: "0 9 * * 1" # Every Monday at 09:00 UTC
  workflow_dispatch:

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

Проверяет наличие обновлений еженедельно и открывает PR при обнаружении изменений.

## Справочник по Action

Action доступен по адресам:

- **Путь в монорепо**: `first-fluke/oh-my-agent/action@v1`
- **Marketplace**: [`first-fluke/oma-update-action@v1`](https://github.com/marketplace/actions/oh-my-agent-update)

### Входные параметры

| Параметр | Описание | По умолчанию |
|:---------|:---------|:-------------|
| `mode` | `pr` — создаёт pull request, `commit` — пушит напрямую | `pr` |
| `base-branch` | Базовая ветка для PR или цель прямого коммита | `main` |
| `force` | Перезаписывать пользовательские конфиги (`--force`) | `false` |
| `pr-title` | Произвольный заголовок PR | `chore(deps): update oh-my-agent skills` |
| `pr-labels` | Метки PR через запятую | `dependencies,automated` |
| `commit-message` | Произвольное сообщение коммита | `chore(deps): update oh-my-agent skills` |
| `token` | GitHub токен для создания PR | `${{ github.token }}` |

### Выходные параметры

| Параметр | Описание |
|:---------|:---------|
| `updated` | `true`, если изменения обнаружены |
| `version` | Версия oh-my-agent после обновления |
| `pr-number` | Номер PR (только в режиме `pr`) |
| `pr-url` | URL PR (только в режиме `pr`) |

## Примеры

### Режим прямого коммита

Пропустить PR и запушить изменения прямо в базовую ветку:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    mode: commit
    commit-message: "chore: sync oh-my-agent skills"
```

### С персональным токеном доступа

Требуется для форк-репозиториев, где `GITHUB_TOKEN` не имеет прав на запись:

```yaml
- uses: first-fluke/oh-my-agent/action@v1
  with:
    token: ${{ secrets.PAT_TOKEN }}
```

### Условное уведомление

Запустить дополнительный шаг только при наличии применённого обновления:

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
      - run: echo "oh-my-agent was updated to ${{ needs.update.outputs.version }}"
```

## Как это работает

1. Устанавливает CLI `oh-my-agent` через Bun
2. Запускает `oma update --ci` (неинтерактивный режим, без запросов)
3. Определяет изменения в директориях `.agents/` и `.claude/`
4. Создаёт PR или делает коммит напрямую в зависимости от параметра `mode`

## Сравнение с центральным реестром

| | GitHub Action | Central Registry |
|:--|:--:|:--:|
| Настройка | 1 файл workflow | 3 файла (config + 2 workflows) |
| Метод обновления | `oma update` CLI | Скачивание tarball + ручная синхронизация |
| Настраиваемость | Входные параметры Action | `.agent-registry.yml` |
| Фиксация версий | Всегда последняя | Явная фиксация версии |

Используйте **GitHub Action** для большинства проектов. Используйте подход с **Central Registry**, если необходима строгая фиксация версий или нет возможности применять сторонние actions.
