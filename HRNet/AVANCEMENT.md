# Avancement — HRNet (Projet 14 OpenClassrooms)

Conversion de l'application HRNet (jQuery) en React.

## Les 4 plugins jQuery à convertir

| # | Plugin jQuery d'origine | Usage | Composant React                      | État |
|---|-------------------------|-------|--------------------------------------|------|
| 1 | Select menu / dropdown  | State, Department | `components/Select/Select.tsx`       | ✅ Fait |
| 2 | DataTable               | Liste des employés | `components/DataTable/DataSheet.tsx` | ✅ Fait |
| 3 | Date picker             | Date of Birth, Start Date | `wh-react-datepicker` (package npm) | ✅ Fait |
| 4 | Modale (jquery.modal.js)| Confirmation création | `components/Modal/Modal.tsx`         | ✅ Fait |

> Rappel : au moins **un** plugin doit être converti et publié en **package npm** → ce sera le **DatePicker**.

## Fait

- [x] Initialisation du projet (React 19 + Vite + Tailwind)
- [x] Formulaire « Create Employee » + validation
- [x] Navigation entre pages (React Router) : `CreateEmployee` + `EmployeeList`
- [x] Store Redux Toolkit (`employee-slice`, action `addEmployee`)
- [x] Champs date en `<input type="date">` *(temporaire, en attendant le DatePicker)*
- [x] Plugin **Select** converti en React
- [x] Plugin **DataTable** converti en React (`DataTable` : tri, recherche, pagination)
- [x] Données métier en `.json` (`states.json`, `departments.json`)
- [x] Conventions de code + ESLint (`quotes` doubles, `curly` accolades)
- [x] Migration en **TypeScript** (`strict`) : `.tsx`/`.ts`, store typé, props typées
- [x] Contraintes `maxLength` sur les inputs + regex de validation plus strictes (données dans `validation-config.json`)
- [x] Plugin **Modale** converti en React (`Modal` : portal, Échap, clic-extérieur, `aria-modal`) → confirmation à la création puis redirection vers la liste
- [x] Plugin **DatePicker** : composant React (`date-utils.ts` + `DatePicker.tsx`) — input MM/DD/YYYY, popover calendrier, navigation clavier, FocusTrap
- [x] Intégré le DatePicker dans `CreateEmployee` (Date of Birth, Start Date)

## À faire

- [x] Publier le DatePicker en **package npm** (repo séparé `wh-react-datepicker`, build lib Vite)
- [x] Tests de performance **Lighthouse** : comparaison jQuery vs React — voir `COMPARAISON.md`
- [x] Documentation / rapport de performance (`COMPARAISON.md` à la racine du projet)
- [x] Tests **end-to-end Playwright** : 40 tests (validation, navigation, recherche, tri, pagination,
      persistance, dataset de démo)
- [x] Tests unitaires Vitest : `validation.ts` (35 tests) — `pnpm test` dans `HRNet/`
- [x] Tests unitaires du DatePicker : `date-utils.ts` (30 tests) — `pnpm test` dans le repo `wh-react-datepicker`
- [x] Déploiement
- [x] Persistance des employés (localStorage)

## Notes

- État Redux persisté dans `localStorage` (`store/persistence.ts`, clé `employees`) : un refresh
  conserve la liste. Pas de `redux-persist` — un `store.subscribe` suffit ici.
- Le lien « View Current Employees » et le logo renvoient vers les bonnes routes.
- **Dataset de démo** : `/employees?seed=2000` charge `public/employees-2000.json`
  (2000 employés, 389 Ko / 57 Ko gzip). Sans le paramètre, l'app est dans son état normal —
  les deux démos (fonctionnelle et perf) se font sans rien recompiler. En mode seed la
  persistance est désactivée : la démo ne laisse rien dans le `localStorage`.
- Lighthouse scores : React 100/100/100/100 vs jQuery 87/94/92/80 (2000 employés mockés).
  ⚠️ **Les mesures React sont à refaire** : le seed passait par `window.__store__` (mémoire seule),
  donc le rechargement effectué par Lighthouse en mode « Navigation » vidait la liste avant la
  mesure — le score React était mesuré sur une table vide. Voir « Protocole de mesure » dans
  `COMPARAISON.md`.
- 40 tests E2E Playwright passent en ~11s (`pnpm test:e2e` dans `HRNet/`).
- Fixtures mock réutilisables dans `HRNet/e2e/fixtures/employees.ts` (12 employés).
- `window.__store__` n'est exposé qu'en développement (`import.meta.env.DEV`), pas dans le bundle
  de production.
- Le repo `wh-react-datepicker` doit être cloné en dossier frère seulement pour travailler sur le
  DatePicker ; HRNet consomme la version publiée sur npm et se build sans lui.