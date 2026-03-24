---
title: Dashboard Monitoring
description: Bekijk je agents in realtime werken met terminal- en web-dashboards.
---

# Dashboard Monitoring

Wanneer je meerdere agents parallel draait, wil je zien wat er gebeurt. Daar zijn dashboards voor.

## Start een Dashboard

```bash
# Terminal UI
oma dashboard

# Web UI
oma dashboard:web
# → http://localhost:9847
```

## Aanbevolen Setup

Gebruik 3 terminals naast elkaar:

| Terminal | Doel |
|---------|-----|
| 1 | `oma dashboard` — live agent-status |
| 2 | Agent spawn-commando's |
| 3 | Test- en build-logs |

Houd het web-dashboard open in een browser voor gedeelde zichtbaarheid tijdens teamsessies.

## Wat Je Ziet

Dashboards monitoren `.serena/memories/` en tonen:

- **Sessiestatus** — draaiend, voltooid of gefaald
- **Takenbord** — welke agent welke taak heeft
- **Agent-voortgang** — beurtentelling, huidige activiteit
- **Resultaten** — eindresultaten zodra ze binnenkomen

Updates zijn event-driven (bestandswijzigingsdetectie) — geen polling-loops die je CPU opeten.

## Probleemoplossingssignalen

| Je Ziet | Wat Te Doen |
|---------|-----------|
| "No agents detected" | Controleer of agents zijn gespawned met hetzelfde `session-id`. Verifieer dat `.serena/memories/` wordt beschreven. |
| Sessie vast op "running" | Controleer `progress-*` bestandstijdstempels. Herstart geblokkeerde agents met duidelijkere prompts. |
| Frequente reconnects (web) | Controleer firewall/proxy. Herstart `dashboard:web` en ververs de pagina. |
| Ontbrekende activiteit | Verifieer dat de orchestrator naar de juiste workspace-map schrijft. |

## Voordat Je Mergt

Snelle checklist vanuit het dashboard:

- Alle agents hebben "completed" status bereikt
- Geen onopgeloste QA-bevindingen met hoge ernst
- Resultaatbestanden aanwezig voor elke agent
- Integratietests uitgevoerd na eindresultaten

## Wanneer Je Klaar Bent

De monitoringfase is compleet wanneer:
- Sessie toont eindstatus (completed of stopped)
- Activiteitengeschiedenis verklaart wat er is gebeurd
- Je hebt je merge/release-beslissing genomen met volledige zichtbaarheid
