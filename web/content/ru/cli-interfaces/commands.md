---
title: Команды CLI
description: Все команды CLI oh-my-agent — с примерами.
---

# Команды CLI

После глобальной установки (`bun install --global oh-my-agent`) используйте `oma` или `oh-my-ag`.

## Установка и Обслуживание

```bash
oma                    # Интерактивный установщик — выбор пресета, установка навыков
oma doctor             # Проверка здоровья: CLI, конфигурации MCP, статус навыков
oma update             # Обновить навыки до последней версии из реестра
oma cleanup            # Удалить осиротевшие процессы и временные файлы
```

## Мониторинг

```bash
oma dashboard          # Дашборд в терминале — живой статус агентов
oma dashboard:web      # Веб-дашборд на http://localhost:9847
oma stats              # Просмотр метрик продуктивности
oma retro [days]       # Инженерная ретроспектива с трендами
```

## Управление Агентами

```bash
# Запустить одного агента
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Проверить статус агента
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Запустить несколько агентов параллельно
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Память и Проверка

```bash
# Инициализировать схему памяти Serena
oma memory:init

# Проверить качество выходных данных агента
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Интеграция и Утилиты

```bash
oma auth:status        # Проверить статус аутентификации CLI
oma usage:anti         # Показать квоты использования Antigravity IDE
oma bridge [url]       # Мост MCP stdio к Streamable HTTP
oma visualize          # Сгенерировать граф зависимостей проекта
oma describe [cmd]     # JSON-интроспекция любой команды CLI
oma star               # Поставить звезду oh-my-agent на GitHub
```

## Получение Помощи

```bash
oma help               # Показать все команды
oma version            # Показать номер версии
oma <command> --help   # Помощь по конкретной команде
```
