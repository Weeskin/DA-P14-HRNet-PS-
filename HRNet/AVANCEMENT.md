# Avancement — HRNet (Projet 14 OpenClassrooms)

Conversion de l'application HRNet (jQuery) en React.

## Les 4 plugins jQuery à convertir

| # | Plugin jQuery d'origine | Usage | Composant React | État |
|---|-------------------------|-------|-----------------|------|
| 1 | Select menu / dropdown  | State, Department | `components/Select/Select.jsx` | ✅ Fait |
| 2 | DataTable               | Liste des employés | `components/DataSheet/DataSheet.jsx` | ✅ Fait |
| 3 | Date picker             | Date of Birth, Start Date | *(à venir — package npm)* | ⬜ À faire |
| 4 | Modale (jquery.modal.js)| Confirmation création | *(à venir)* | ⬜ À faire |

> Rappel : au moins **un** plugin doit être converti et publié en **package npm** → ce sera le **DatePicker**.

## Fait

- [x] Initialisation du projet (React 19 + Vite + Tailwind)
- [x] Formulaire « Create Employee » + validation
- [x] Navigation entre pages (React Router) : `CreateEmployee` + `EmployeeList`
- [x] Store Redux Toolkit (`employee-slice`, action `addEmployee`)
- [x] Champs date en `<input type="date">` *(temporaire, en attendant le DatePicker)*
- [x] Plugin **Select** converti en React
- [x] Plugin **DataTable** converti en React (`DataSheet` : tri, recherche, pagination)
- [x] Données métier en `.json` (`states.json`, `departments.json`)
- [x] Conventions de code + ESLint (`quotes` doubles, `curly` accolades)

## À faire

- [ ] Plugin **DatePicker** : composant React
- [ ] Publier le DatePicker en **package npm**
- [ ] Intégrer le DatePicker à la place des `<input type="date">`
- [ ] Plugin **Modale** de confirmation après création d'un employé
- [ ] Persistance des employés (localStorage) *(optionnel)*
- [ ] Tests de performance **Lighthouse** : comparaison ancienne (jQuery) vs nouvelle app (React)
- [ ] Documentation / rapport de performance
- [ ] Déploiement

## Notes

- État Redux non persisté pour l'instant : un refresh vide la liste.
- Le lien « View Current Employees » et le logo renvoient vers les bonnes routes.
