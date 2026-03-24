---
title: CLI-Commando's
description: Elk commando beschikbaar in de oh-my-agent CLI — met voorbeelden.
---

# CLI-Commando's

Na globale installatie (`bun install --global oh-my-agent`), gebruik `oma` of `oh-my-ag`.

## Setup & Onderhoud

```bash
oma                    # Interactieve installer — kies preset, installeer skills
oma doctor             # Gezondheidscheck: CLI's, MCP-configs, skill-status
oma update             # Update skills naar de laatste versie uit het register
oma cleanup            # Verwijder verweesde processen en tijdelijke bestanden
```

## Monitoring

```bash
oma dashboard          # Terminal-dashboard — live agent-status
oma dashboard:web      # Web-dashboard op http://localhost:9847
oma stats              # Bekijk productiviteitsmetrieken
oma retro [days]       # Engineering-retrospective met trends
```

## Agent-Beheer

```bash
# Start een enkele agent
oma agent:spawn <agent-id> <prompt> <session-id>
oma agent:spawn backend "Implement auth API" session-01 -w ./apps/api

# Controleer agent-status
oma agent:status <session-id> [agent-ids...]
oma agent:status session-01 backend frontend

# Voer meerdere agents parallel uit
oma agent:parallel [tasks...]
oma agent:parallel -i backend:"Auth API" frontend:"Login form"
```

## Geheugen & Verificatie

```bash
# Initialiseer Serena-geheugen schema
oma memory:init

# Verifieer agent-output kwaliteit
oma verify <agent-type>
oma verify backend
oma verify frontend
```

## Integratie & Hulpmiddelen

```bash
oma auth:status        # Controleer CLI-authenticatiestatus
oma usage:anti         # Toon Antigravity IDE gebruiksquota
oma bridge [url]       # Bridge MCP stdio naar Streamable HTTP
oma visualize          # Genereer project-afhankelijkheidsgrafiek
oma describe [cmd]     # JSON-introspectie van elk CLI-commando
oma star               # Geef oh-my-agent een ster op GitHub
```

## Hulp Krijgen

```bash
oma help               # Toon alle commando's
oma version            # Toon versienummer
oma <command> --help   # Hulp voor specifiek commando
```
