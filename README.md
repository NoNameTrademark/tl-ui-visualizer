# TL UI Visualizer — Enhanced

Cette version ajoute une base de données de composants, une gestion de résolution dynamique, un sélecteur de langue, des filtres, et des validations plus robustes.

## Utilisation

1. Ouvrez `index.html` (hébergé ou en local via un serveur statique).
2. Cliquez sur “Choisir un fichier” et **sélectionnez un JSON** exporté depuis votre .azj (voir Conversion ci-dessous).
3. La scène s’affiche, la légende et les compteurs se mettent à jour.

> Important: les fichiers `.azj` du jeu sont généralement binaires et **ne sont pas lisibles directement** dans le navigateur. Convertissez d'abord en JSON.

## Conversion .azj → JSON

Le dossier [`parser/`](parser) contient un petit exemple de script Node pour manipuler un JSON de test, mais **ce n’est pas un convertisseur binaire `.azj`**.

Si vous disposez d'un `.azj` déjà exporté en JSON (par un outil externe), importez directement ce JSON dans le visualiseur.

Sinon:
- Préparez/obtenez une conversion de votre `.azj` binaire vers un JSON lisible (outils externes/communauté).
- Vérifiez que le JSON commence par `{` ou `[` et qu'il contient une liste de composants (ex: `components`, `items`, `ui`, `nodes` ou `payload.transforms`).

Exemples (Node.js requis) pour manipuler le JSON de test fourni:
```bash
cd parser
node parser.js
# -> génère parser/output.json à partir de parser/test.json
```

## Import dans l’UI

- Le champ de fichier accepte `.json,.azj`.
- Si le contenu n’est pas du JSON, un message clair s’affiche avec le rappel de conversion.
- Un événement `window` est émis quand un fichier valide est chargé:
  - `window.addEventListener('azj:loaded', (e) => { console.log(e.detail); });`
  - `e.detail` contient: `{ name, meta, components }`

## Back-compat (ancien index)

Pour ne pas casser l’existant, `utils.js` expose toujours:
- `scales`
- `getNameById(id)`
- `getCorrectedAlignment(alignment, translation)`

Les nouvelles fonctions/utilitaires:
- `loadDatabase()` charge `components-database.json`
- `parseAzj(text)` normalise le JSON d’entrée
- `computeViewportTransform(meta)` calcule les dimensions d’affichage

## Dépannage

- Rien ne se passe quand je choisis un `.azj`:
  - C’est probablement un binaire. Convertissez-le d'abord en JSON.
- Erreur “Invalid JSON”:
  - Le contenu du fichier doit être du texte JSON valide (commencer par `{` ou `[`).
- `components-database.json` introuvable:
  - Assurez-vous que le fichier est bien à la racine et accessible, rechargez la page (Ctrl+F5).
