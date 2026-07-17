# Comparaison Lighthouse — jQuery HRNet vs React HRNet

**Outil** : Lighthouse 13.3.0 · **Émulation** : Ordinateur · **Dataset** : 2 000 employés mockés
**Date** : 17 juillet 2026

---

## Scores globaux

| Catégorie         | jQuery HRNet | React HRNet |
|-------------------|:------------:|:-----------:|
| **Performance**   | 87           | **100**     |
| **Accessibilité** | 94           | **100**     |
| **Bonnes pratiques** | 92        | **100**     |
| **SEO**           | 80           | **100**     |

---

## Métriques de performance (Core Web Vitals)

| Métrique                        | jQuery HRNet | React HRNet | Écart        |
|---------------------------------|:------------:|:-----------:|:------------:|
| **FCP** (First Contentful Paint) | 0,5 s       | 0,3 s       | −40 %        |
| **LCP** (Largest Contentful Paint) | 0,6 s    | 0,3 s       | −50 %        |
| **TBT** (Total Blocking Time)   | **300 ms**   | **0 ms**    | **−100 %**   |
| **CLS** (Cumulative Layout Shift) | 0,001      | 0           | ✅           |
| **Speed Index**                 | 0,8 s        | 0,3 s       | −63 %        |

> **Le TBT est la métrique la plus révélatrice.** jQuery/DataTables bloque le thread principal pendant 300 ms pour rendre 2 000 lignes. React ne le bloque pas du tout (0 ms), quelle que soit la volumétrie.

---

## Ressources réseau

| Ressource                   | jQuery HRNet                          | React HRNet               |
|-----------------------------|---------------------------------------|---------------------------|
| **Sources externes (CDN)**  | Google CDN + datatables.net           | Aucune                    |
| jQuery                      | 30,4 KiB depuis ajax.googleapis.com  | —                         |
| DataTables JS               | 27,4 KiB depuis cdn.datatables.net   | —                         |
| DataTables CSS              | 2,1 KiB depuis cdn.datatables.net    | —                         |
| **Total CDN**               | **~60 KiB depuis 2 domaines tiers**  | **0 KiB**                 |
| Bundle JS propriétaire      | 1,0 KiB                              | 86,3 KiB (React + app)   |
| **Payload total**           | 67 KiB                               | ~118 KiB (tout en local) |

> jQuery dépend de 2 CDN externes (Google + datatables.net) : latence réseau supplémentaire, dépendance de disponibilité tierce, risques RGPD. React est entièrement auto-hébergé.

---

## Thread principal

| Indicateur                          | jQuery HRNet | React HRNet |
|-------------------------------------|:------------:|:-----------:|
| Travail total du thread principal   | **0,9 s**    | 0,2 s       |
| Tâche longue la plus coûteuse       | jquery.min.js — **354 ms** | Aucune     |
| Blocage du rendu (render-blocking)  | **280 ms**   | 0 ms        |
| Délai d'exécution JS                | 0,2 s        | 0,0 s       |

---

## Accessibilité & qualité du code

| Point                            | jQuery HRNet                         | React HRNet              |
|----------------------------------|--------------------------------------|--------------------------|
| Attribut `lang` sur `<html>`     | ❌ Absent                            | ✅ `lang="fr"`           |
| `<!doctype html>`                | ❌ Absent (mode quirks)              | ✅ Présent               |
| `<meta charset>`                 | ❌ Absent ou tardif                  | ✅ Présent               |
| Repère `<main>`                  | ❌ Absent                            | ✅ Présent               |
| `meta description`               | ❌ Absente                           | ✅ Présente              |
| `robots.txt`                     | ❌ Absent                            | ✅ Valide                |
| Liens de pagination explorables  | ❌ `a.paginate_button` non explorables | ✅ Routing React Router |

---

## Conclusion

La migration de jQuery vers React apporte des gains mesurables et objectifs :

1. **TBT : 300 ms → 0 ms** — React ne bloque jamais le thread principal, même avec 2 000 lignes. C'est l'avantage structurel du Virtual DOM et de la réconciliation React vs la manipulation directe du DOM par jQuery/DataTables.

2. **Zéro dépendance CDN** — L'application React est entièrement auto-hébergée. jQuery charge jQuery et DataTables depuis des CDN tiers à chaque visite.

3. **Score Lighthouse 87 → 100** — Grâce à la stack moderne (Vite, React 19, Tailwind) et aux bonnes pratiques HTML appliquées nativement.

4. **Accessibilité 94 → 100** — Le template jQuery d'origine manquait de plusieurs attributs fondamentaux (`lang`, `doctype`, `<main>`). React impose une structure HTML correcte dès le départ.
