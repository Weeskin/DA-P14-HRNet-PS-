# Conventions de code - Projet Wealth Health

## Langage & Stack
- Projet basé sur React 19 avec Vite
- Utilisation de TypeScript (`.ts`) et TSX (`.tsx`), `strict: true` activé dans `tsconfig.json`
- Typer les props des composants, l'état du store (`Employee`, `RootState`, `AppDispatch`) et les hooks (`useAppDispatch`/`useAppSelector`)
- Utilisation de `const` et `let` pour les variables, pas de `var
- Nommage des index de boucle avec des noms explicites (ex: `itemIndex` au lieu de `i`)
- Guillemets doubles `"` pour les chaînes de caractères, pas les guillemets simples `'` (imposé par la règle ESLint `quotes`)
- Toujours mettre les accolades `{}` pour les blocs `if`/`else`, même sur une seule ligne (imposé par la règle ESLint `curly`)
- Les données pures (listes métier : États, départements…) sont stockées dans des fichiers `.json` dans `src/data`, pas en `.ts`. Le `.ts` est réservé au code avec logique (ex: `validation.ts`).
- Dans une constante tableau, un élément par ligne :
```js
const tableau = [
  item1,
  item2,
  item3,
]
```

## Nommage

| Type                        | Convention        | Exemple                   |
|Fonctions                   | camelCase         | `loadPreset()`            |
|Constantes globales         | UPPER_SNAKE_CASE  | `MAX_PRESETS`             |
| Fichiers TS                 | kebab-case        | `employee-slice.ts`       |
| Fichiers CSS                | kebab-case        | `preset-card.css`         |
| IDs / classes HTML          | kebab-case        | `preset-card`, `btn-load
| Fichier TSX                 | PascalCase        | `PresetCard.tsx`          |


## Fichier JSX
- Les fichiers JSX doivent être nommés en PascalCase et contenir un composant React principal du même nom.
- Exemple : `PresetCard.jsx` doit contenir un composant `PresetCard`.
- Les composants React doivent être écrits en utilisant des fonctions fléchées et suivre les conventions de nommage des fonctions.
- Exemple :
```jsx
export default function Collapse({ id, title, description }) {
  // State et constantes
  const [isSelected, setIsSelected] = useState(false);
  // Comportement
    const handleSelect = () => {
        setIsSelected(!isSelected);
    };
  // Rendu du composant
    return (
        <div className="preset-card">
            {/* Rendu du composant */}
        </div>
    );
}
```

## Commentaires

- Commenter **pourquoi**, pas **quoi**
- Pas de JsDoc
- Mettre des commentaires pour chaque fonction sous forme :
```
    // --- CRÉE ET INSÈRE LE DIV AFFICHANT LE MESSAGE D'ALERTE DE SYNCHRONISATION. ---
    _insertDivAlert(p_container){
    ...
    }

```

## Ce que Claude ne doit pas faire
- Changer les conventions de nommage existantes sans accord
- Ajouter des dépendances npm sans validation