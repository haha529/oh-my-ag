---
title: "Gebruiksscenario: Enkele Skill"
description: Wanneer je maar één agent nodig hebt voor een gerichte taak — het snelle pad.
---

# Gebruiksscenario: Enkele Skill

## Wanneer Dit Te Gebruiken

Gebruik dit wanneer je taak smal afgebakend is en tot één domein behoort:

- Eén UI-component
- Eén API-endpoint
- Eén bug in één laag
- Eén refactoring in één module

Als de taak cross-domein coördinatie nodig heeft (API + UI + QA), schakel over naar [Multi-Agent Project](./multi-agent-project).

## Voordat Je Promptt

Snelle checklist:

1. **Wat is de output?** — specifiek bestand of gedrag
2. **Welke stack?** — framework, taal, versies
3. **Wat is "klaar"?** — acceptatiecriteria
4. **Welke tests?** — kritieke gevallen om te dekken

## Prompt-Sjabloon

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## Echt Voorbeeld

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## Wat Er Gebeurt

1. De juiste skill activeert automatisch op basis van je prompt
2. Agent verklaart zijn aannames (charter preflight)
3. Je bevestigt of past aan
4. Agent schrijft code en tests
5. Je voert lokale verificatie uit

## Voordat Je Mergt

Controleer dat:
- Gedrag overeenkomt met je acceptatiecriteria
- Tests het happy path en belangrijke randgevallen dekken
- Geen ongerelateerde bestandswijzigingen erin geslopen zijn
- Gedeelde modules niet kapot zijn

## Wanneer Op Te Schalen

Schakel over naar multi-agent flow wanneer:
- UI-werk een nieuw API-contract nodig heeft
- Eén fix cascadeert over lagen
- Scope groeit voorbij één domein na de eerste iteratie
