---
title: Workflows
description: Slash-commando's die meerstaps processen orkestreren — planning, review, debugging en meer.
---

# Workflows

Workflows zijn de gestructureerde sequenties die oh-my-agent meer maken dan een verzameling prompts. Typ een slash-commando en een meerstaps proces start met gedefinieerde fasen, kwaliteitspoorten en voltooiingscriteria.

## Alle Workflow-Commando's

### Grote Orkestratie-Workflows

Deze zijn **persistent** — ze blijven draaien tot alle taken klaar zijn en kunnen niet per ongeluk worden onderbroken.

| Commando | Wat Het Doet |
|----------|-------------|
| `/orchestrate` | Start agents parallel via CLI, coördineert via geheugen, monitort voortgang, voert verificatie uit. De "doe alles" modus. |
| `/coordinate` | Stapsgewijze multi-domein coördinatie. PM plant eerst, dan voeren agents uit met kruislingse review en QA-loops. |
| `/ultrawork` | De kwaliteitsobsessie workflow. 5 fasen, 11 reviewstappen van de 17 totaal. Plan → Implementeer → Verifieer → Verfijn → Verzend. |

### Planning & Verkenning

| Commando | Wat Het Doet |
|----------|-------------|
| `/plan` | PM-gestuurde taakontleding. Geeft een gestructureerd plan uit naar `.agents/plan.json`. |
| `/exec-plan` | Neemt het plan van `/plan` en voert het stap voor stap uit. |
| `/brainstorm` | Vrije ideevorming. Verken benaderingen voordat je je committeert aan implementatie. |
| `/deepinit` | Volledige projectinitialisatie — analyseert codebase, stelt conventies in, configureert tools. |

### Kwaliteit & Review

| Commando | Wat Het Doet |
|----------|-------------|
| `/review` | QA-review: OWASP-beveiliging, prestaties, toegankelijkheid. Delegeert aan de qa-reviewer agent. |
| `/debug` | Gestructureerd debuggen: reproduceren → diagnosticeren → fixen → regressietest. |

### Design

| Commando | Wat Het Doet |
|----------|-------------|
| `/design` | 7-fasen design workflow. Maakt DESIGN.md met tokens, componentpatronen, toegankelijkheidsregels en overdracht-specificaties. |

### Hulpmiddelen

| Commando | Wat Het Doet |
|----------|-------------|
| `/commit` | Analyseert je wijzigingen en maakt een conventional commit met correct type/scope. |
| `/setup` | Interactieve projectconfiguratie. |
| `/tools` | Beheer MCP-serververbindingen. |
| `/stack-set` | Stel je tech stack voorkeuren in. |

## Je Hebt Niet Altijd Slash-Commando's Nodig

oh-my-agent detecteert trefwoorden in je natuurlijke taal en activeert workflows automatisch. Zeg "plan de authenticatie-feature" en de plan-workflow start — geen `/plan` nodig.

Dit werkt in **11 talen** (Engels, Koreaans, Japans, Chinees, Spaans, Frans, Duits, Portugees, Russisch, Nederlands, Pools).

Vragen zoals "wat is orchestrate?" worden herkend als informatief en triggeren niets.

## Skills vs. Workflows

Eenvoudig onderscheid:
- **Skills** = agent-expertise (wat een agent kan)
- **Workflows** = georkestreerde processen (hoe meerdere agents samenwerken)

Een skill kan zijn "bouw een React-component." Een workflow is "plan de feature → bouw de componenten → review de beveiliging → commit de code."

## Typische Sequenties

### Snelle Feature
```
/plan → bekijk de output → /exec-plan
```

### Complex Multi-Domein Project
```
/coordinate → PM plant → agents spawnen → QA reviewt → fix problemen → verzend
```

### Maximale Kwaliteitslevering
```
/ultrawork → 5-fasen poortproces met 11 review-checkpoints
```

### Bugfix
```
/debug → reproduceren → root cause → fixen → regressietest
```
