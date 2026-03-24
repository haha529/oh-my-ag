---
title: Workflows
description: Slash-Befehle, die mehrstufige Prozesse orchestrieren — Planung, Review, Debugging und mehr.
---

# Workflows

Workflows sind die strukturierten Ablaeufe, die oh-my-agent zu mehr als einer Sammlung von Prompts machen. Tippe einen Slash-Befehl, und ein mehrstufiger Prozess startet mit definierten Phasen, Qualitaets-Gates und Abschlusskriterien.

## Alle Workflow-Befehle

### Grosse Orchestrierungs-Workflows

Diese sind **persistent** — sie laufen weiter, bis alle Aufgaben erledigt sind, und koennen nicht versehentlich unterbrochen werden.

| Befehl | Was Er Tut |
|--------|-----------|
| `/orchestrate` | Startet Agenten parallel via CLI, koordiniert ueber Speicher, ueberwacht Fortschritt, fuehrt Verifikation aus. Der "mach alles"-Modus. |
| `/coordinate` | Schrittweise Multi-Domain-Koordination. PM plant zuerst, dann fuehren Agenten mit Cross-Review und QA-Schleifen aus. |
| `/ultrawork` | Der qualitaetsfixierte Workflow. 5 Phasen, 11 Review-Schritte von 17 insgesamt. Planen → Implementieren → Verifizieren → Verfeinern → Ausliefern. |

### Planung und Erkundung

| Befehl | Was Er Tut |
|--------|-----------|
| `/plan` | PM-gesteuerte Aufgabenzerlegung. Gibt einen strukturierten Plan in `.agents/plan.json` aus. |
| `/exec-plan` | Nimmt den Plan von `/plan` und fuehrt ihn Schritt fuer Schritt aus. |
| `/brainstorm` | Freie Ideenfindung. Erkunde Ansaetze, bevor du dich auf die Implementierung festlegst. |
| `/deepinit` | Vollstaendige Projektinitialisierung — analysiert die Codebase, richtet Konventionen ein, konfiguriert Tools. |

### Qualitaet und Review

| Befehl | Was Er Tut |
|--------|-----------|
| `/review` | QA-Review: OWASP-Sicherheit, Performance, Barrierefreiheit. Delegiert an den qa-reviewer-Agenten. |
| `/debug` | Strukturiertes Debugging: Reproduzieren → Diagnostizieren → Beheben → Regressionstest. |

### Design

| Befehl | Was Er Tut |
|--------|-----------|
| `/design` | 7-Phasen-Design-Workflow. Erstellt DESIGN.md mit Tokens, Komponenten-Mustern, Barrierefreiheits-Regeln und Handoff-Specs. |

### Hilfsprogramme

| Befehl | Was Er Tut |
|--------|-----------|
| `/commit` | Analysiert deine Aenderungen und erstellt einen konventionellen Commit mit passendem Typ/Scope. |
| `/setup` | Interaktive Projektkonfiguration. |
| `/tools` | MCP-Server-Verbindungen verwalten. |
| `/stack-set` | Tech-Stack-Praeferenzen festlegen. |

## Du Brauchst Nicht Immer Slash-Befehle

oh-my-agent erkennt Schluesselwoerter in deiner natuerlichen Sprache und aktiviert Workflows automatisch. Sag "plane das Authentifizierungs-Feature" und der Plan-Workflow startet — kein `/plan` noetig.

Das funktioniert in **11 Sprachen** (Englisch, Koreanisch, Japanisch, Chinesisch, Spanisch, Franzoesisch, Deutsch, Portugiesisch, Russisch, Niederlaendisch, Polnisch).

Fragen wie "was ist orchestrate?" werden als informativ erkannt und loesen nichts aus.

## Skills vs. Workflows

Einfache Unterscheidung:
- **Skills** = Agenten-Expertise (was ein Agent kann)
- **Workflows** = orchestrierte Prozesse (wie mehrere Agenten zusammenarbeiten)

Ein Skill koennte sein "eine React-Komponente bauen." Ein Workflow ist "Feature planen → Komponenten bauen → Sicherheit pruefen → Code committen."

## Typische Ablaeufe

### Schnelles Feature
```
/plan → Ausgabe pruefen → /exec-plan
```

### Komplexes Multi-Domain-Projekt
```
/coordinate → PM plant → Agenten starten → QA prueft → Probleme beheben → ausliefern
```

### Maximale Qualitaets-Auslieferung
```
/ultrawork → 5-Phasen-Prozess mit 11 Review-Checkpoints
```

### Bugfix
```
/debug → reproduzieren → Grundursache → beheben → Regressionstest
```
