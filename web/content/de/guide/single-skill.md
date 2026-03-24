---
title: "Anwendungsfall: Einzelner Skill"
description: Wenn du nur einen Agenten fuer eine fokussierte Aufgabe brauchst — der schnelle Weg.
---

# Anwendungsfall: Einzelner Skill

## Wann Dies Verwenden

Verwende dies, wenn deine Aufgabe eng eingegrenzt ist und einem einzigen Domain gehoert:

- Eine UI-Komponente
- Ein API-Endpoint
- Ein Bug in einer Schicht
- Ein Refactoring in einem Modul

Wenn die Aufgabe domainuebergreifende Koordination braucht (API + UI + QA), wechsle zum [Multi-Agenten-Projekt](./multi-agent-project).

## Bevor Du Deinen Prompt Schreibst

Schnell-Checkliste:

1. **Was ist die Ausgabe?** — bestimmte Datei oder Verhalten
2. **Welcher Stack?** — Framework, Sprache, Versionen
3. **Was ist "fertig"?** — Akzeptanzkriterien
4. **Welche Tests?** — kritische Faelle abzudecken

## Prompt-Template

```text
Build <specific artifact> using <stack>.
Constraints: <style/perf/security constraints>.
Acceptance criteria:
1) ...
2) ...
Add tests for: <critical cases>.
```

## Echtes Beispiel

```text
Create a login form component in React + TypeScript + Tailwind CSS.
Constraints: accessible labels, client-side validation, no external form library.
Acceptance criteria:
1) email and password validation messages
2) disabled submit while invalid
3) keyboard and screen-reader friendly
Add unit tests for valid/invalid submit paths.
```

## Was Passiert

1. Der richtige Skill aktiviert sich automatisch basierend auf deinem Prompt
2. Agent deklariert seine Annahmen (Charter Preflight)
3. Du bestaetigst oder passt an
4. Agent schreibt Code und Tests
5. Du fuehrst lokale Verifikation durch

## Vor dem Merge

Pruefe, dass:
- Verhalten mit deinen Akzeptanzkriterien uebereinstimmt
- Tests den Happy Path und wichtige Grenzfaelle abdecken
- Keine unzugehoerigen Dateiaenderungen eingeschlichen sind
- Geteilte Module nicht kaputt sind

## Wann Eskalieren

Wechsle zum Multi-Agenten-Flow, wenn:
- UI-Arbeit einen neuen API-Vertrag braucht
- Ein Fix sich ueber Schichten ausbreitet
- Der Umfang nach der ersten Iteration ueber eine Domain hinauswaechst
