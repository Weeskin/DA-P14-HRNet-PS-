# Avancement — HRNet (Projet 14 OpenClassrooms)

Conversion de l'application HRNet (jQuery) en React.

## Les 4 plugins jQuery à convertir

| # | Plugin jQuery d'origine | Usage | Composant React                      | État |
|---|-------------------------|-------|--------------------------------------|------|
| 1 | Select menu / dropdown  | State, Department | `components/Select/Select.tsx`       | ✅ Fait |
| 2 | DataTable               | Liste des employés | `components/DataTable/DataTable.tsx` | ✅ Fait |
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
- [x] Tests **end-to-end Playwright** : 32 tests (validation, navigation, recherche, tri, pagination)
- [x] Tests unitaires Vitest : `date-utils.ts` (30 tests) + `validation.ts` (35 tests) — `pnpm test` dans `HRNet/`
- [ ] Déploiement
- [ ] Persistance des employés (localStorage) *(optionnel)*

## Notes

- État Redux non persisté : un refresh vide la liste (pas de redux-persist).
- Le lien « View Current Employees » et le logo renvoient vers les bonnes routes.
- Lighthouse scores : React 100/100/100/100 vs jQuery 87/94/92/80 (2000 employés mockés).
- 32 tests E2E Playwright passent en ~5s (`pnpm test:e2e` dans `HRNet/`).
- Fixtures mock réutilisables dans `HRNet/e2e/fixtures/employees.ts` (12 employés).