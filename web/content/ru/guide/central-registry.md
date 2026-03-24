---
title: Центральный Реестр
description: Используйте oh-my-agent как версионированный реестр для синхронизации нескольких проектов.
---

# Центральный Реестр для Мульти-Репо Установки

Несколько проектов используют oh-my-agent? Вы можете использовать этот репозиторий как **центральный реестр** — версионируйте навыки, и все проекты-потребители остаются синхронизированными.

## Как Это Работает

```text
┌─────────────────────────────────────────────────────────┐
│  Центральный Реестр (репозиторий oh-my-agent)           │
│  • release-please для автоверсионирования               │
│  • Автогенерация CHANGELOG.md                           │
│  • prompt-manifest.json (версии + контрольные суммы)    │
│  • agent-skills.tar.gz артефакт релиза                  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Ваш Проект                                             │
│  • .agent-registry.yml фиксирует версию                 │
│  • GitHub Action обнаруживает новые версии → открывает PR│
│  • Проверьте и слейте для обновления                    │
└─────────────────────────────────────────────────────────┘
```

## Для Мейнтейнеров Реестра

Релизы автоматизированы через [release-please](https://github.com/googleapis/release-please):

1. Используйте Conventional Commits (`feat:`, `fix:`, `chore:`)
2. Push в `main` → Release PR создаётся/обновляется
3. Мердж Release PR → GitHub Release публикуется с:
   - `CHANGELOG.md`
   - `prompt-manifest.json` (список файлов + SHA256 контрольные суммы)
   - `agent-skills.tar.gz` (сжатая `.agents/`)

## Для Проектов-Потребителей

Скопируйте шаблоны в ваш проект:

```bash
cp docs/consumer-templates/.agent-registry.yml your-project/
cp docs/consumer-templates/check-registry-updates.yml your-project/.github/workflows/
cp docs/consumer-templates/sync-agent-registry.yml your-project/.github/workflows/
```

Зафиксируйте версию:

```yaml
# .agent-registry.yml
registry:
  repo: first-fluke/oh-my-agent
  version: "4.7.0"
```

Workflows:
- `check-registry-updates.yml` — Проверяет новые версии, открывает PR
- `sync-agent-registry.yml` — Синхронизирует `.agents/` при обновлении зафиксированной версии

**Автомердж отключён намеренно.** Все обновления проходят ревью человеком.

## Центральный Реестр vs. GitHub Action

| | GitHub Action | Центральный Реестр |
|:--|:--:|:--:|
| Усилия на настройку | 1 файл workflow | 3 файла |
| Метод обновления | `oma update` CLI | Скачивание tarball |
| Контроль версий | Всегда последняя | Явная фиксация |
| Лучше для | Большинства проектов | Строгий контроль версий |

Большинству команд следует использовать подход [GitHub Action](./automated-updates). Используйте Центральный Реестр, если нужна строгая фиксация версий или нельзя использовать сторонние actions.
