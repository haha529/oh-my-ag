---
title: Интеграция в Существующий Проект
description: Добавьте oh-my-agent в проект, над которым уже работаете — безопасно и без разрушений.
---

# Интеграция в Существующий Проект

Уже есть проект? Вот как добавить oh-my-agent, ничего не сломав.

## Простой Способ (CLI)

Выполните это в корне вашего проекта:

```bash
bunx oh-my-agent
```

Что это делает:
- Устанавливает навыки в `.agents/skills/`
- Копирует общие ресурсы в `.agents/skills/_shared/`
- Создаёт симлинки для вашей IDE (`.claude/skills/` и т.д.)
- Устанавливает workflows в `.agents/workflows/`
- Создаёт конфигурацию по умолчанию в `.agents/config/user-preferences.yaml`

## Ручной Способ

Когда вам нужен полный контроль над тем, что копируется:

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config .claude/skills

# Скопируйте нужные навыки
for skill in oma-pm oma-frontend oma-backend oma-qa oma-debug oma-commit; do
  [ -d ".agents/skills/$skill" ] || cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/
done

# Скопируйте общие ресурсы
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/

# Скопируйте workflows
for wf in coordinate.md plan.md review.md debug.md commit.md setup.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/
done

# Конфигурация по умолчанию (только если отсутствует)
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/
```

## Проверьте, Что Всё Работает

```bash
oma doctor
```

Или проверьте вручную:
```bash
ls .agents/skills/          # Должны быть директории навыков
ls .agents/workflows/       # Должны быть .md файлы workflows
cat .agents/config/user-preferences.yaml  # Должна быть ваша конфигурация
```

## Мульти-IDE Симлинки

Во время `bunx oh-my-agent` вас спросят:

```text
Also create symlinks for other CLI tools?
  ○ Cursor (.cursor/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Один источник истины (`.agents/skills/`), несколько IDE читают из него:

```text
.agents/skills/oma-frontend/     ← Источник (SSOT)
.claude/skills/oma-frontend/     → симлинк
.cursor/skills/oma-frontend/     → симлинк
.github/skills/oma-frontend/     → симлинк
```

## Советы по Безопасности

**Перед интеграцией** создайте контрольную точку:

```bash
git add -A && git commit -m "chore: checkpoint before oh-my-agent"
```

- CLI никогда не перезаписывает существующие папки навыков
- Ваши специфические конфигурации остаются под вашим контролем
- `oma doctor` укажет на любые проблемы

## Опционально: Дашборды

```bash
oma dashboard        # Мониторинг в терминале
oma dashboard:web    # Веб UI на http://localhost:9847
```

## Что Дальше?

Начните общение в вашей IDE с ИИ, или посмотрите [Руководство по Использованию](./usage) для примеров workflows.
