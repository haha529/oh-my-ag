---
title: Параллельное Выполнение
description: Запускайте нескольких агентов одновременно — потому что ждать завершения одного перед запуском следующего медленно.
---

# Параллельное Выполнение

Настоящая сила oh-my-agent — в одновременном запуске нескольких агентов. Пока бэкенд-агент создаёт ваш API, фронтенд-агент уже создаёт UI.

## Базовый Паттерн

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

`&` запускает каждого агента в фоне. `wait` блокирует, пока оба не завершатся.

## Паттерн с Workspace

Дайте каждому агенту свою директорию, чтобы избежать конфликтов слияния:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## Использование `agent:parallel`

Для более чистого синтаксиса:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Добавьте `--no-wait`, чтобы запустить и забыть:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Мониторинг Во Время Работы

Откройте отдельный терминал:

```bash
# Дашборд в терминале
oma dashboard

# Или веб-дашборд
oma dashboard:web
# → http://localhost:9847
```

Дашборд показывает статус каждого агента в реальном времени — количество ходов, текущая задача, состояние завершения.

## Мульти-CLI Конфигурация

Не все инструменты ИИ одинаковы. Направляйте агентов к CLI, которая лучше справляется с их доменом:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Сложное рассуждение по UI
  backend: gemini       # Быстрая генерация API
  mobile: gemini
  qa: claude            # Тщательный аудит безопасности
  debug: claude         # Глубокий анализ корневых причин
  pm: gemini            # Быстрая декомпозиция
```

## Разрешение CLI-Вендора

При запуске агента CLI выбирается в таком порядке:

1. Флаг `--vendor` (высший приоритет)
2. `agent_cli_mapping` для конкретного агента
3. Настройка `default_cli`
4. `active_vendor` из `cli-config.yaml`
5. `gemini` (по умолчанию)

## Советы для Параллельных Запусков

- **Используйте один session ID на фичу** — группирует выходные данные агентов
- **Зафиксируйте контракты API сначала** — выполните `/plan` перед запуском агентов реализации
- **Отдельные workspace** — не позволяйте агентам наступать на файлы друг друга
- **Активно мониторьте** — обнаруживайте проблемы рано через дашборд, а не при слиянии
