---
title: Skills
description: Wie die Zwei-Schichten-Skill-Architektur Agenten schlau haelt, ohne Tokens zu verschwenden.
---

# Skills

Skills sind das, was jeden Agenten zum Experten macht. Sie sind strukturiertes Wissen — nicht nur Prompts, sondern Ausfuehrungsprotokolle, Code-Templates, Fehler-Playbooks und Qualitaets-Checklisten.

## Das Zwei-Schichten-Design

Hier ist der clevere Teil: Skills laden nicht alles auf einmal. Sie nutzen progressive Offenlegung, um ~75% der Tokens zu sparen.

### Schicht 1: SKILL.md (~800 Bytes)

Immer geladen. Enthaelt:
- Agenten-Identitaet und Rolle
- Wann aktivieren (Routing-Bedingungen)
- Kernregeln und Einschraenkungen
- Was NICHT zu tun ist

### Schicht 2: resources/ (bei Bedarf geladen)

Wird nur geladen, wenn der Agent tatsaechlich arbeitet. Enthaelt das Tiefergehende:

| Ressource | Was Sie Tut |
|-----------|-----------|
| `execution-protocol.md` | Schritt-fuer-Schritt-Ablauf: Analysieren → Planen → Implementieren → Verifizieren |
| `tech-stack.md` | Detaillierte Technologie-Specs und Versionen |
| `error-playbook.md` | Was zu tun ist, wenn etwas schiefgeht (mit "3 Strikes"-Eskalation) |
| `checklist.md` | Domainspezifische Qualitaetspruefungen |
| `snippets.md` | Einsatzbereite Code-Muster |
| `examples/` | Few-Shot-Eingabe/Ausgabe-Beispiele |

### So Sieht Es Aus

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← Immer geladen (~800 Bytes)
└── resources/
    ├── execution-protocol.md         ← Bei Bedarf
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## Geteilte Ressourcen

Alle Agenten teilen gemeinsame Grundlagen aus `.agents/skills/_shared/`:

| Ressource | Zweck |
|-----------|-------|
| `skill-routing.md` | Ordnet Aufgaben dem richtigen Agenten zu |
| `context-loading.md` | Welche Ressourcen fuer welchen Aufgabentyp laden |
| `prompt-structure.md` | Ziel → Kontext → Einschraenkungen → Fertig Wenn |
| `clarification-protocol.md` | Wann fragen vs. einfach annehmen |
| `context-budget.md` | Token-effizientes Dateilesen pro Modell-Tier |
| `difficulty-guide.md` | Einfache / Mittlere / Komplexe Aufgabenbewertung |
| `reasoning-templates.md` | Strukturierte Denkvorlagen zum Ausfuellen |
| `quality-principles.md` | Universelle Qualitaetsstandards |
| `vendor-detection.md` | Erkennen, welche IDE/welches CLI laeuft |

## Bedingte Ressourcen

Einige Ressourcen werden nur bei bestimmten Bedingungen geladen:

| Ressource | Wann Sie Geladen Wird |
|-----------|----------------------|
| `quality-score.md` | Qualitaetsbewertung angefordert |
| `experiment-ledger.md` | Experimenteller Ansatz wird ausprobiert |
| `exploration-loop.md` | Iterative Erkundung im Gange |

## Vendor-Spezifische Ausfuehrung

Jedes unterstuetzte CLI hat sein eigenes Ausfuehrungsprotokoll in `.agents/skills/_shared/runtime/execution-protocols/`:
- `claude.md` — Claude-spezifische Muster
- `gemini.md` — Gemini-spezifische Muster
- `codex.md` — Codex-spezifische Muster
- `qwen.md` — Qwen-spezifische Muster

## Warum Das Wichtig Ist

Ohne progressive Offenlegung wuerde das Laden von 5 Agenten dein Kontextfenster aufbrauchen, bevor irgendeine Arbeit beginnt. Mit ihr bekommst du schlankes initiales Laden und tiefe Ausfuehrung, wenn es darauf ankommt.
