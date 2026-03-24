---
title: Komendy CLI
description: Kazda komenda dostepna w CLI oh-my-agent -- z przykladami.
---

# Komendy CLI

Po globalnej instalacji (`bun install --global oh-my-agent`) uzywaj `oma` lub `oh-my-ag`.

## Konfiguracja i Utrzymanie

```bash
oma                    # Interaktywny instalator — wybierz preset, zainstaluj umiejetnosci
oma doctor             # Kontrola stanu: CLI, konfiguracje MCP, status umiejetnosci
oma update             # Zaktualizuj umiejetnosci do najnowszej wersji z rejestru
oma cleanup            # Usun osierocone procesy i pliki tymczasowe
```

## Monitorowanie

```bash
oma dashboard          # Dashboard terminala — status agentow na zywo
oma dashboard:web      # Dashboard webowy na http://localhost:9847
oma stats              # Przejrzyj metryki produktywnosci
oma retro [days]       # Retrospektywa inzynierska z trendami
```

## Zarzadzanie Agentami

```bash
# Uruchom pojedynczego agenta
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Sprawdz status agenta
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Uruchom wielu agentow rownolegle
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Pamiec i Weryfikacja

```bash
# Zainicjalizuj schemat pamieci Serena
oma memory:init

# Zweryfikuj jakosc wynikow agenta
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Integracja i Narzedzia

```bash
oma auth:status        # Sprawdz status uwierzytelniania CLI
oma usage:anti         # Pokaz kwoty uzycia Antigravity IDE
oma bridge [url]       # Most MCP stdio do Streamable HTTP
oma visualize          # Wygeneruj graf zaleznosci projektu
oma describe [cmd]     # Introspekcja JSON dowolnej komendy CLI
oma star               # Daj gwiazdke oh-my-agent na GitHub
```

## Uzyskiwanie Pomocy

```bash
oma help               # Pokaz wszystkie komendy
oma version            # Pokaz numer wersji
oma <command> --help   # Pomoc dla konkretnej komendy
```
