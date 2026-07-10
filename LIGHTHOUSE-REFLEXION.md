# Réflexion : Tests de performance Lighthouse — jQuery HRNet vs React HRNet

## Problème central : comparer ce qui est comparable

Lighthouse mesure les performances **au moment du chargement et du rendu de la page**. Si l'application jQuery affiche une liste de 5 000 employés et l'application React en affiche 0, les scores ne reflètent pas les performances du framework mais la différence de charge de données.

**Conclusion : il faut injecter les mêmes données dans les deux versions avant de mesurer.**

---

## Les métriques Lighthouse pertinentes pour ce projet

| Métrique | Ce qu'elle mesure | Pertinence |
|---|---|---|
| **FCP** (First Contentful Paint) | Temps avant que quelque chose s'affiche | Élevée — mesure le chargement initial |
| **LCP** (Largest Contentful Paint) | Temps avant que le plus gros élément s'affiche | Élevée — impacté par la taille du bundle |
| **TBT** (Total Blocking Time) | Temps où le thread principal est bloqué | Très élevée — mesure l'impact du JS lourd |
| **TTI** (Time to Interactive) | Temps avant que la page soit utilisable | Élevée |
| **Speed Index** | Vitesse visuelle de remplissage | Moyenne |
| **CLS** (Cumulative Layout Shift) | Stabilité visuelle | Faible pour ce projet |

Pour ce projet, **FCP, LCP et TBT** sont les indicateurs les plus significatifs car ils révèlent directement l'impact du bundle jQuery + plugins vs le bundle React léger.

---

## Stratégie de données mockées

### Objectif
Charger **le même jeu de données** dans les deux applications pour neutraliser la variable "volume de données" et mesurer uniquement l'impact du framework/rendu.

### Volume recommandé
Tester avec **3 paliers** pour observer l'évolution de la performance sous charge :
- **100 employés** — usage léger
- **500 employés** — usage normal
- **2 000 employés** — stress test (révèle les limites du DOM jQuery vs le virtual DOM React)

### Comment injecter les données

#### Application React (HRNet)
Le store Redux est initialisé avec un état vide. Pour injecter des données mockées, deux approches :

**Option A — Pré-remplir le store au démarrage (propre, sans modifier le code de prod)**
Créer un script `src/mock-data.ts` qui génère N employés et les charge dans `localStorage` avec la clé attendue par le store :
```ts
// scripts/seed-mock-data.ts (à exécuter dans la console du navigateur)
const employees = Array.from({ length: 500 }, (_, i) => ({
  firstName: `Prénom${i}`, lastName: `Nom${i}`,
  dateOfBirth: "1990-01-01", startDate: "2020-06-15",
  street: `${i} Main St`, city: "Springfield",
  state: "IL", zipCode: "62701", department: "Sales",
}))
localStorage.setItem("employees", JSON.stringify(employees))
```
Puis recharger la page — si le store est configuré avec `redux-persist` ou lit le localStorage, les données apparaissent.

**Option B — Modifier temporairement le store pour un build de test**
Remplacer `initialState: { employees: [] }` par un import de données générées. Faire un build dédié "perf-test", ne jamais committer ce changement.

#### Application jQuery (HRNet original)
Le plugin DataTables charge les données depuis le DOM ou une source définie. Il faut identifier comment les employés sont chargés et injecter le même JSON.

Si les données sont dans une variable JS globale côté serveur ou un fichier JSON, remplacer cette source par le même dataset que React.

---

## Protocole de test rigoureux

Pour que la comparaison soit valide, tous ces paramètres doivent être **identiques** entre les deux mesures :

### Environnement
- Tester en mode **production** (pas `dev`) — les deux apps doivent être buildées et servies via `pnpm preview` ou un serveur statique (ex: `npx serve dist`)
- Navigateur : Chrome en mode **incognito** (pas d'extensions)
- Onglets : fermer tous les autres onglets
- Réseau : utiliser le throttling Lighthouse intégré (ne pas tester sur du WiFi variable)

### Conditions Lighthouse
- **Device** : Desktop ET Mobile (deux mesures séparées)
- **Throttling** : "Applied Slow 4G, 4x CPU slowdown" (réglage par défaut de Lighthouse)
- **Répétitions** : faire **3 mesures consécutives** et prendre la médiane (les premiers runs incluent parfois du cache froid)

### Pages à tester
Tester les **deux pages critiques** de l'application :

| Page | Ce qu'elle révèle |
|---|---|
| `/` ou `/create` — formulaire | Impact du chargement initial du bundle, du datepicker |
| `/employees` — liste | Impact du rendu d'un grand tableau (ici le plus différenciant entre jQuery/DataTables et React) |

---

## Ce que l'on s'attend à observer

### Bundle size
React + Vite tree-shaking produit un bundle plus petit que jQuery + DataTables + jQuery-UI + plugins.
Vérifiable avec : `pnpm build` puis regarder la taille du JS dans `dist/assets/`.

### TBT sur la liste employés avec 2 000 lignes
- **jQuery/DataTables** : DataTables manipule le DOM nativement pour chaque ligne — le thread principal est bloqué longtemps
- **React** : le virtual DOM et la réconciliation React gèrent mieux les grandes listes (encore mieux avec `react-window` si on l'utilisait)

### FCP
- React devrait être plus rapide car le bundle initial est plus léger (pas de jQuery chargé)

---

## Format de rendu des résultats

Créer un tableau comparatif simple :

| Métrique | jQuery — 100 emp. | React — 100 emp. | jQuery — 2000 emp. | React — 2000 emp. |
|---|---|---|---|---|
| FCP | | | | |
| LCP | | | | |
| TBT | | | | |
| TTI | | | | |
| Score perf. | | | | |

---

## Points de vigilance

- **Ne pas comparer le mode dev** : Vite dev server est volontairement non-optimisé. Toujours comparer les builds de production.
- **La présence de fonts lourdes** : HRNet React charge Google Sans (~10 Mo). Si la version jQuery ne le charge pas, c'est un biais. Harmoniser les assets entre les deux versions.
- **Le cache** : Lighthouse a une option "Clear storage" — l'activer pour simuler un premier visiteur.
- **Le réseau réel vs simulé** : Lighthouse simule le réseau via du throttling CPU/réseau. Les résultats peuvent différer en conditions réelles. C'est acceptable pour une comparaison relative.
