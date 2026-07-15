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

Cette image est autonome et ne dépend d’aucun autre dossier du dépôt.

## Build du package

```bash
npm run build
```

Génère le package distribuable dans `dist/` :

- `index.js` pour enregistrer les composants à la demande
- `register.js` pour enregistrer tous les custom elements automatiquement
- `register.css` pour les styles des composants en usage custom elements
- `vue.js` pour importer les composants Vue bruts (voir plus bas)
- `styles.css` pour les tokens et le reset global
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
import '@tom/design-system/styles.css';   // tokens + reset
import '@tom/design-system/register.css'; // styles des composants
import '@tom/design-system/register';     // enregistre les <ds-*>
```

Les custom elements sont enregistrés avec `shadowRoot: false` : leurs styles ne sont pas
encapsulés et doivent être chargés dans le document. `register.css` est donc obligatoire — sans
lui les `<ds-*>` s'affichent sans style.

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

## Utilisation dans une appli Vue

Pour un site consommateur qui est lui-même en Vue 3 (ex. le site de documentation), il est préférable d'importer les composants Vue bruts plutôt que les custom elements : props/slots typés nativement, pas de sérialisation d'attributs.

```ts
import { BaseButton, BaseDialog } from '@tom/design-system/vue';
import '@tom/design-system/styles.css';
```

```vue
<template>
  <BaseButton variant="primary">Valider</BaseButton>
</template>
```

`vue` est déclaré en `peerDependencies` : l'appli consommatrice doit avoir sa propre installation de Vue 3 (ce bundle ne l'embarque pas, contrairement à `register.js`).

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
