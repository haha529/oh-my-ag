---
title: Skills
description: Hoe de twee-laags skill-architectuur agents slim houdt zonder tokens te verspillen.
---

# Skills

Skills zijn wat elke agent tot een expert maakt. Het is gestructureerde kennis — niet alleen prompts, maar uitvoeringsprotocollen, codesjablonen, fout-playbooks en kwaliteitschecklists.

## Het Twee-Laags Ontwerp

Hier is het slimme deel: skills laden niet alles tegelijk. Ze gebruiken progressieve onthulling om ~75% tokens te besparen.

### Laag 1: SKILL.md (~800 bytes)

Altijd geladen. Bevat:
- Agent-identiteit en rol
- Wanneer te activeren (routeringsvoorwaarden)
- Kernregels en beperkingen
- Wat NIET te doen

### Laag 2: resources/ (on-demand geladen)

Alleen geladen wanneer de agent daadwerkelijk werkt. Bevat de diepgaande content:

| Resource | Wat Het Doet |
|----------|-------------|
| `execution-protocol.md` | Stapsgewijze workflow: Analyseren → Plannen → Implementeren → Verifiëren |
| `tech-stack.md` | Gedetailleerde technologiespecificaties en versies |
| `error-playbook.md` | Wat te doen als dingen misgaan (met "3 strikes" escalatie) |
| `checklist.md` | Domeinspecifieke kwaliteitscontroles |
| `snippets.md` | Kant-en-klare codepatronen |
| `examples/` | Few-shot input/output voorbeelden |

### Hoe Dit Eruitziet

```
.agents/skills/oma-frontend/
├── SKILL.md                          ← Altijd geladen (~800 bytes)
└── resources/
    ├── execution-protocol.md         ← On-demand
    ├── tech-stack.md
    ├── tailwind-rules.md
    ├── component-template.tsx
    ├── snippets.md
    ├── error-playbook.md
    ├── checklist.md
    └── examples/
```

## Gedeelde Resources

Alle agents delen gemeenschappelijke basis uit `.agents/skills/_shared/`:

| Resource | Doel |
|----------|-----|
| `skill-routing.md` | Koppelt taken aan de juiste agent |
| `context-loading.md` | Welke resources te laden voor welk taaktype |
| `prompt-structure.md` | Doel → Context → Beperkingen → Klaar Wanneer |
| `clarification-protocol.md` | Wanneer vragen vs. gewoon aannemen |
| `context-budget.md` | Token-efficiënt bestanden lezen per modeltier |
| `difficulty-guide.md` | Eenvoudig / Gemiddeld / Complex taakbeoordeling |
| `reasoning-templates.md` | Gestructureerde redeneersjablonen om in te vullen |
| `quality-principles.md` | Universele kwaliteitsstandaarden |
| `vendor-detection.md` | Detecteren welke IDE/CLI draait |

## Voorwaardelijke Resources

Sommige resources laden alleen wanneer specifieke voorwaarden getriggerd worden:

| Resource | Wanneer Het Laadt |
|----------|------------------|
| `quality-score.md` | Kwaliteitsbeoordeling gevraagd |
| `experiment-ledger.md` | Experimentele aanpak wordt geprobeerd |
| `exploration-loop.md` | Iteratieve verkenning bezig |

## Vendor-Specifieke Uitvoering

Elke ondersteunde CLI heeft een eigen uitvoeringsprotocol in `.agents/skills/_shared/runtime/execution-protocols/`:
- `claude.md` — Claude-specifieke patronen
- `gemini.md` — Gemini-specifieke patronen
- `codex.md` — Codex-specifieke patronen
- `qwen.md` — Qwen-specifieke patronen

## Waarom Dit Belangrijk Is

Zonder progressieve onthulling zou het laden van 5 agents je contextvenster vullen voordat er werk begint. Hiermee krijg je licht initieel laden en diepgaande uitvoering wanneer het ertoe doet.
