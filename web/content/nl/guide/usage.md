---
title: Gebruiksgids
description: Praktijkvoorbeelden die laten zien hoe je oh-my-agent gebruikt — van simpele taken tot volledige multi-agent orkestratie.
---

# Hoe oh-my-agent Te Gebruiken

> Weet je niet waar te beginnen? Typ `/coordinate` gevolgd door wat je wilt bouwen.

## Snelstart

1. Open je project in een AI-IDE (Claude Code, Gemini, Cursor, etc.)
2. Skills worden automatisch gedetecteerd uit `.agents/skills/`
3. Begin te chatten — beschrijf wat je wilt

Dat is het. oh-my-agent regelt de rest.

---

## Voorbeeld 1: Simpele Enkele Taak

**Je typt:**
```
"Maak een loginformulier-component met e-mail- en wachtwoordvelden met Tailwind CSS"
```

**Wat er gebeurt:**
- De `oma-frontend` skill activeert
- Laadt zijn uitvoeringsprotocol en tech-stack resources on-demand
- Je krijgt een React-component met TypeScript, Tailwind, formuliervalidatie en tests

Geen slash-commando's nodig. Beschrijf gewoon wat je wilt.

## Voorbeeld 2: Multi-Domein Project

**Je typt:**
```
"Bouw een TODO-app met gebruikersauthenticatie"
```

**Wat er gebeurt:**

1. Trefwoorddetectie ziet dat dit multi-domein is → stelt `/coordinate` voor
2. **PM-agent** plant het werk: auth API, database-schema, frontend UI, QA-scope
3. **Je start agents:**
   ```bash
   oma agent:spawn backend "JWT authentication API" session-01 -w ./apps/api &
   oma agent:spawn frontend "Login and TODO UI" session-01 -w ./apps/web &
   wait
   ```
4. **Agents werken parallel** — elk in hun eigen workspace
5. **QA-agent reviewt** — beveiligingsaudit, integratiecheck
6. **Je itereert** — herstart agents met verfijningen indien nodig

## Voorbeeld 3: Bugfix

**Je typt:**
```
"Er is een bug — klikken op login toont 'Cannot read property map of undefined'"
```

**Wat er gebeurt:**

1. `oma-debug` activeert automatisch (trefwoord: "bug")
2. Root cause gevonden — component mapt over `todos` voordat data geladen is
3. Fix toegepast — laadstatussen en null-checks
4. Regressietest geschreven
5. Vergelijkbare patronen gevonden en proactief gefixed in 3 andere componenten

## Voorbeeld 4: Design System

**Je typt:**
```
"Ontwerp een donkere premium landingspagina voor mijn SaaS-product"
```

**Wat er gebeurt:**

1. `oma-design` activeert (trefwoord: "ontwerp", "landingspagina")
2. Verzamelt context — publiek, merk, esthetische richting
3. Stelt 2-3 designrichtingen voor met kleur-, typografie- en lay-outopties
4. Genereert `DESIGN.md` met tokens, componentpatronen en toegankelijkheidsregels
5. Voert audit uit — responsive, WCAG, Nielsen-heuristieken
6. Klaar voor `oma-frontend` om te implementeren

## Voorbeeld 5: CLI Parallelle Uitvoering

```bash
# Enkele agent
oma agent:spawn backend "Implement JWT auth API" session-01

# Meerdere agents parallel
oma agent:spawn backend "Auth API + DB migration" session-01 -w ./apps/api &
oma agent:spawn frontend "Login form + error states" session-01 -w ./apps/web &
oma agent:spawn mobile "Auth screens + biometrics" session-01 -w ./apps/mobile &
wait

# Realtime monitoren
oma dashboard        # terminal UI
oma dashboard:web    # web UI op http://localhost:9847
```

---

## Workflow-Commando's

Typ deze in je AI-IDE om gestructureerde processen te starten:

| Commando | Wat Het Doet | Wanneer Te Gebruiken |
|----------|-------------|---------------------|
| `/brainstorm` | Vrije ideevorming en verkenning | Voordat je een aanpak kiest |
| `/plan` | PM-taakontleding → `.agents/plan.json` | Voor elke complexe feature |
| `/exec-plan` | Voer een bestaand plan stap voor stap uit | Na `/plan` |
| `/coordinate` | Stapsgewijze multi-domein coördinatie | Features die meerdere agents beslaan |
| `/orchestrate` | Geautomatiseerde parallelle agent-uitvoering | Grote projecten, maximaal parallellisme |
| `/ultrawork` | 5-fasen kwaliteitsworkflow (11 review-poorten) | Maximale kwaliteitslevering |
| `/review` | Beveiliging + prestatie + toegankelijkheidsaudit | Voor het mergen |
| `/debug` | Gestructureerd root-cause debuggen | Bugs onderzoeken |
| `/design` | 7-fasen design workflow → `DESIGN.md` | Design systems bouwen |
| `/commit` | Conventional commit met type/scope analyse | Wijzigingen committen |
| `/setup` | Projectconfiguratie | Eerste configuratie |
| `/tools` | MCP-serverbeheer | Externe tools toevoegen |
| `/stack-set` | Tech stack configuratie | Taal/framework voorkeuren instellen |
| `/deepinit` | Volledige projectinitialisatie | Setup in bestaande codebase |

---

## Auto-Detectie (Geen Slash-Commando's Nodig)

oh-my-agent detecteert trefwoorden in 11 talen en activeert workflows automatisch:

| Je Zegt | Workflow Die Activeert |
|---------|----------------------|
| "plan the auth feature" | `/plan` |
| "버그 수정해줘" | `/debug` |
| "do everything in parallel" | `/orchestrate` |
| "レビューして" | `/review` |
| "diseña la página" | `/design` |
| "brainstorm some ideas" | `/brainstorm` |

Vragen zoals "what is orchestrate?" worden gefilterd — ze triggeren geen workflows per ongeluk.

---

## Beschikbare Skills

| Skill | Het Beste Voor | Output |
|-------|---------------|--------|
| oma-pm | "plan dit", "ontleed" | `.agents/plan.json` |
| oma-frontend | UI, componenten, styling | React-componenten, tests |
| oma-backend | API's, databases, auth | Endpoints, modellen, tests |
| oma-db | Schema, ERD, migraties | Schema-ontwerp, query-optimalisatie |
| oma-mobile | Mobiele apps | Flutter-schermen, state management |
| oma-design | UI/UX, design systems | `DESIGN.md` met tokens |
| oma-brainstorm | Ideevorming, verkenning | Ontwerpdocument |
| oma-qa | Beveiliging, prestaties, a11y | QA-rapport met geprioriteerde fixes |
| oma-debug | Bugs, fouten, crashes | Gefixte code + regressietests |
| oma-tf-infra | Cloud-infrastructuur | Terraform-modules |
| oma-dev-workflow | CI/CD, automatisering | Pipeline-configuraties |
| oma-translator | Vertaling | Natuurlijke meertalige content |
| oma-orchestrator | Parallelle uitvoering | Agent-resultaten |
| oma-commit | Git-commits | Conventional commits |

---

## Dashboards

### Terminal Dashboard

```bash
oma dashboard
```

Live tabel met sessiestatus, agent-statussen, beurten en laatste activiteit. Monitort `.serena/memories/` voor realtime updates.

### Web Dashboard

```bash
oma dashboard:web
# → http://localhost:9847
```

Functies:
- Realtime updates via WebSocket
- Auto-reconnect bij verbindingsonderbrekingen
- Sessiestatus met gekleurde agent-indicatoren
- Activiteitenlog uit voortgangs- en resultaatbestanden

### Aanbevolen Layout

Gebruik 3 terminals:
1. Dashboard (`oma dashboard`)
2. Agent spawn-commando's
3. Test/build logs

---

## Tips

1. **Wees specifiek** — "Bouw een TODO-app met JWT auth, React frontend, Express backend" is beter dan "maak een app"
2. **Gebruik workspaces** — `-w ./apps/api` voorkomt dat agents in elkaars bestanden werken
3. **Vergrendel contracten eerst** — voer `/plan` uit voor parallelle agents
4. **Monitor actief** — dashboards vangen problemen voor het mergen
5. **Itereer met re-spawns** — verfijn agent-prompts in plaats van opnieuw te beginnen
6. **Begin met `/coordinate`** — als je niet zeker weet welke workflow

---

## Probleemoplossing

| Probleem | Oplossing |
|---------|----------|
| Skills niet gedetecteerd in IDE | Controleer of `.agents/skills/` bestaat met `SKILL.md` bestanden, herstart IDE |
| CLI niet gevonden | `which gemini` / `which claude` — installeer ontbrekende |
| Agents produceren conflicterende code | Gebruik aparte workspaces (`-w`), review outputs, herstart met correcties |
| Dashboard toont "No agents detected" | Agents hebben nog niet naar `.serena/memories/` geschreven — wacht of controleer session ID |
| Web-dashboard start niet | Voer eerst `bun install` uit |
| QA-rapport heeft 50+ problemen | Focus op CRITICAL/HIGH eerst, documenteer de rest voor later |

---

Voor integratie in bestaande projecten, zie [Integratiegids](./integration).
