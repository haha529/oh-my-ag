---
title: Установка
description: Запустите oh-my-agent в вашем проекте — три способа установки, все быстрые.
---

# Установка

## Что Вам Нужно

- **IDE с ИИ** — Antigravity, Claude Code, Cursor, Gemini CLI, Codex CLI или аналоги
- **bun** и **uv** — устанавливаются автоматически, если отсутствуют

## Вариант 1: Одна Строка (Рекомендуется)

```bash
curl -fsSL https://raw.githubusercontent.com/first-fluke/oh-my-agent/main/cli/install.sh | bash
```

Это определяет отсутствующие зависимости (bun, uv), устанавливает их и запускает интерактивную настройку. Готово примерно за минуту.

## Вариант 2: Ручная Установка

```bash
bunx oh-my-agent
```

Вы увидите меню для выбора пресета:

| Пресет | Что Вы Получаете |
|--------|-----------------|
| ✨ All | Все агенты и навыки |
| 🌐 Fullstack | frontend + backend + db + pm + qa + debug + brainstorm + commit |
| 🎨 Frontend | frontend + pm + qa + debug + brainstorm + commit |
| ⚙️ Backend | backend + db + pm + qa + debug + brainstorm + commit |
| 📱 Mobile | mobile + pm + qa + debug + brainstorm + commit |
| 🚀 DevOps | tf-infra + dev-workflow + pm + qa + debug + brainstorm + commit |

Навыки устанавливаются в `.agents/skills/` с созданием симлинков для вашей IDE.

## Вариант 3: Глобальная Установка

Для частого использования CLI (дашборды, запуск агентов, диагностика):

```bash
# Homebrew
brew install oh-my-agent

# или npm/bun
bun install --global oh-my-agent
```

Теперь вы можете использовать `oma` где угодно:

```bash
oma doctor          # Проверить, что всё в порядке
oma dashboard       # Мониторинг в реальном времени
oma agent:spawn     # Запустить агентов из терминала
```

## Выберите CLI для ИИ

Вам нужна хотя бы одна:

| CLI | Установка | Как Авторизоваться |
|-----|----------|-------------------|
| Gemini | `bun install --global @google/gemini-cli` | Автоматически при первом запуске |
| Claude | `curl -fsSL https://claude.ai/install.sh \| bash` | Автоматически при первом запуске |
| Codex | `bun install --global @openai/codex` | `codex login` |
| Qwen | `bun install --global @qwen-code/qwen-code` | `/auth` внутри CLI |

## Первоначальная Настройка

После установки выполните `/setup` в вашей IDE с ИИ для настройки:

- Язык ответов
- CLI-вендор по умолчанию
- Маппинг CLI по агентам (используйте разные инструменты ИИ для разных агентов)

Это создаёт `.agents/config/user-preferences.yaml` — файл, который управляет всеми вашими настройками.

## Проверьте, Что Всё Работает

```bash
oma doctor
```

Это проверяет установки CLI, конфигурации MCP и статус навыков. Если что-то не так, точно скажет, что исправить.

## Что Дальше?

Откройте проект в вашей IDE с ИИ и начните общение. Навыки определяются автоматически. Попробуйте что-нибудь вроде:

```
"Создай форму логина с валидацией email на Tailwind CSS"
```

Или перейдите к [Руководству по Использованию](/guide/usage) для дополнительных примеров.
