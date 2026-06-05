# Conventions de code - Projet Wealth Health

## Langage & Stack
- Projet basé sur React 19 avec Vite
- Utilisation de Javascript ES6+ et JSX
- Pas de TypeScript
- Utilisation de `const` et `let` pour les variables, pas de `var
- Nommage des index de boucle avec des noms explicites (ex: `itemIndex` au lieu de `i`)
- Guillemets doubles `"` pour les chaînes de caractères, pas les guillemets simples `'` (imposé par la règle ESLint `quotes`)

## Nommage

| Type                        | Convention        | Exemple                   |
|Fonctions                   | camelCase         | `loadPreset()`            |
|Constantes globales         | UPPER_SNAKE_CASE  | `MAX_PRESETS`             |
| Fichiers JS                 | kebab-case        | `preset-manager.js`       |
| Fichiers CSS                | kebab-case        | `preset-card.css`         |
| IDs / classes HTML          | kebab-case        | `preset-card`, `btn-load
| Fichier JSX                     | PascalCase        | `PresetCard.jsx`          |


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