---
title: "Cas d'Usage : Correction de Bugs"
description: Debogage structure — de la reproduction du probleme a l'ecriture de tests de regression.
---

# Cas d'Usage : Correction de Bugs

## Commencez Par un Bon Rapport

Meilleur est votre rapport de bug, plus rapide sera la correction :

```text
Symptom: Login button throws TypeError
Environment: Chrome 130, macOS, production build
Steps to reproduce:
  1. Go to /login
  2. Enter valid credentials
  3. Click "Sign In"
Expected: Redirect to dashboard
Actual: White screen, console shows "Cannot read property 'map' of undefined"
Logs: [paste relevant logs]
```

## Triez D'Abord

| Severite | Ce Que Ca Signifie | Reponse |
|----------|-------------------|---------|
| **P0** | Perte de donnees, bypass d'auth, panne production | Tout lacher, impliquer QA/securite |
| **P1** | Flux utilisateur principal casse | Corriger dans le sprint en cours |
| **P2** | Degrade mais a un contournement | Planifier la correction |
| **P3** | Mineur, non bloquant | Backlog |

## La Boucle de Debogage

1. **Reproduire** — exactement, dans un environnement minimal
2. **Isoler** — trouver la cause racine (pas juste le symptome)
3. **Corriger** — le plus petit changement sur
4. **Tester** — test de regression pour le chemin en echec
5. **Scanner** — verifier le code adjacent pour le meme pattern

## Template de Prompt

```text
Bug: Login throws "Cannot read property 'map' of undefined"
Repro: Click sign-in with valid credentials
Scope: src/components/auth/*, src/hooks/useAuth.ts
Expected: Redirect to dashboard
Need:
1) root cause analysis
2) minimal fix
3) regression tests
4) scan for similar patterns
```

## Quand Escalader

Impliquez QA ou securite quand le bug touche :

- Authentification / session / refresh de token
- Limites de permissions
- Coherence de paiements / transactions
- Performance sous charge

## Apres la Correction

Verifiez :
- La reproduction originale ne echoue plus
- Pas de nouvelles erreurs dans les flux lies
- Les tests echouent avant la correction, passent apres
- Le chemin de rollback est clair si necessaire
