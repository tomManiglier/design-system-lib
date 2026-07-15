# @tom/design-system

Bibliothèque de design system installable via npm.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Webpack 5 pour le build de package
- SCSS (Dart Sass)
- Custom Elements pour l'intégration hors Vue

## Prérequis

- Node.js ≥ 20.9

## Installation

```bash
npm install
```

## Image Docker

```bash
docker build -t tom-design-system-lib .
docker run --rm tom-design-system-lib
```

## Build du package

```bash
npm run build
```

Génère le package distribuable dans `dist/` :

- `index.js` pour enregistrer les composants à la demande
- `register.js` pour enregistrer tous les custom elements automatiquement
- `styles.css` pour les tokens et styles globaux nécessaires
- les types `.d.ts`

## Vérification de type

```bash
npm run typecheck
```

## Flux recommandé pour la documentation

Le site de documentation vit dans un autre dépôt et doit consommer cette bibliothèque comme n'importe quel site externe.

En local, le plus simple est d'utiliser l'un de ces flux :

- `npm pack` dans ce dépôt puis installation du tarball dans le dépôt docs
- dépendance `file:` pointant vers ce dépôt pendant la migration
- publication sur le registre privé puis installation d'une version publiée

## Utilisation dans Twig / TypeScript / SCSS

TypeScript :

```ts
import '@tom/design-system/styles.css';
import '@tom/design-system/register';
```

Twig :

```twig
<ds-button variant="primary">Valider</ds-button>
<ds-alert variant="info" title="Mise à jour">Contenu</ds-alert>
```

SCSS :

```scss
@use '@tom/design-system/scss/tokens.scss' as *;
```

Les composants simples sont directement utilisables en Twig. Les composants à données structurées (`accordion`, `tabs`, `table`, `chart`, `navigation-menu`, `sidebar`, `select`, `multiselect`) sont mieux pilotés via TypeScript en assignant des propriétés sur l'élément custom.

Exemple local de validation du package :

```bash
npm pack
```

## Structure

```
src/
├── lib/               # Entrée publique du package npm
├── styles/
│   ├── tokens/        # Design tokens SCSS
│   └── base/          # Reset global
└── components/ui/     # Composants source Vue
```
