---
title: Parallelle Uitvoering
description: Voer meerdere agents tegelijkertijd uit — want wachten tot één klaar is voor je de volgende start is traag.
---

# Parallelle Uitvoering

De echte kracht van oh-my-agent is het gelijktijdig uitvoeren van meerdere agents. Terwijl de backend-agent je API bouwt, is de frontend-agent al de UI aan het maken.

## Basispatroon

```bash
oma agent:spawn backend "Implement auth API" session-01 &
oma agent:spawn frontend "Create login form" session-01 &
wait
```

De `&` voert elke agent op de achtergrond uit. `wait` blokkeert tot beiden klaar zijn.

## Workspace-Patroon

Geef elke agent een eigen map om merge-conflicten te vermijden:

```bash
oma agent:spawn backend "Auth + DB migration" session-02 -w ./apps/api
oma agent:spawn frontend "Login + token refresh" session-02 -w ./apps/web
oma agent:spawn mobile "Auth screens" session-02 -w ./apps/mobile
```

## `agent:parallel` Gebruiken

Voor schonere syntax:

```bash
oma agent:parallel -i backend:"Implement auth API" frontend:"Build login form" mobile:"Auth screens"
```

Voeg `--no-wait` toe om te starten en te vergeten:

```bash
oma agent:parallel -i backend:"task" frontend:"task" --no-wait
```

## Monitor Terwijl Ze Werken

Open een aparte terminal:

```bash
# Terminal-dashboard
oma dashboard

# Of web-dashboard
oma dashboard:web
# → http://localhost:9847
```

Het dashboard toont live status per agent — genomen beurten, huidige taak, voltooiingsstatus.

## Multi-CLI Configuratie

Niet alle AI-tools zijn gelijk. Stuur agents naar de CLI die het beste met hun domein omgaat:

```yaml
# .agents/config/user-preferences.yaml
default_cli: gemini

agent_cli_mapping:
  frontend: claude      # Complexe UI-redenering
  backend: gemini       # Snelle API-generatie
  mobile: gemini
  qa: claude            # Grondige beveiligingsreview
  debug: claude         # Diepgaande root-cause analyse
  pm: gemini            # Snelle ontleding
```

## CLI Vendor Resolutie

Bij het starten van een agent wordt de CLI gekozen in deze volgorde:

1. `--vendor` vlag (hoogste prioriteit)
2. `agent_cli_mapping` voor die specifieke agent
3. `default_cli` instelling
4. `active_vendor` uit `cli-config.yaml`
5. `gemini` (fallback)

## Tips voor Parallelle Runs

- **Gebruik één session ID per feature** — houdt agent-output gegroepeerd
- **Vergrendel API-contracten eerst** — voer `/plan` uit voor je implementatie-agents start
- **Aparte workspaces** — voorkom dat agents in elkaars bestanden werken
- **Monitor actief** — vang problemen vroeg op via dashboard in plaats van bij het mergen
