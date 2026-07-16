# @tommaniglier/design-system-lib

Bibliothèque de design system, publiée sur [npm](https://www.npmjs.com/package/@tommaniglier/design-system-lib).

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
docker build -t design-system-lib .
docker run --rm design-system-lib
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

## Publier sur npm

Le paquet est scoppé sous `@tommaniglier`. Un paquet scoppé doit être publié avec `--access
public` la première fois (déjà fait pour ce paquet) :

```bash
npm version patch   # ou minor / major
npm publish
```

## Utilisation dans Twig / TypeScript / SCSS

TypeScript :

```ts
import '@tommaniglier/design-system-lib/styles.css';   // tokens + reset
import '@tommaniglier/design-system-lib/register.css'; // styles des composants
import '@tommaniglier/design-system-lib/register';     // enregistre les <ds-*>
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
@use '@tommaniglier/design-system-lib/scss/tokens.scss' as *;
```

Les composants simples sont directement utilisables en Twig. Les composants à données structurées (`accordion`, `tabs`, `table`, `chart`, `navigation-menu`, `sidebar`, `select`, `multiselect`) sont mieux pilotés via TypeScript en assignant des propriétés sur l'élément custom.

## Utilisation dans une appli Vue

Pour un site consommateur qui est lui-même en Vue 3 (ex. le site de documentation), il est préférable d'importer les composants Vue bruts plutôt que les custom elements : props/slots typés nativement, pas de sérialisation d'attributs.

```ts
import { BaseButton, BaseDialog } from '@tommaniglier/design-system-lib/vue';
import '@tommaniglier/design-system-lib/styles.css';
```

```vue
<template>
  <BaseButton variant="primary">Valider</BaseButton>
</template>
```

`vue` est déclaré en `peerDependencies` : l'appli consommatrice doit avoir sa propre installation de Vue 3 (ce bundle ne l'embarque pas, contrairement à `register.js`).

## Structure

```
src/
├── lib/               # Entrée publique du package npm
├── styles/
│   ├── tokens/        # Design tokens SCSS
│   └── base/          # Reset global
└── components/ui/     # Composants source Vue
```
