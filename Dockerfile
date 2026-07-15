FROM node:22-bookworm

WORKDIR /app

# 1. Copie exclusive des fichiers de gestion de paquets pour optimiser le cache
COPY package.json package-lock.json ./

# 2. Installation des dépendances de manière propre (npm ci)
RUN npm ci

# 3. Copie des fichiers de configuration TypeScript et Webpack spécifiques au projet
COPY tsconfig.json tsconfig.lib.json webpack.lib.cjs webpack.lib.vue.cjs ./

# 4. Copie des répertoires contenant la logique et les composants
COPY scripts ./scripts
COPY src ./src

# 5. Lancement du processus de compilation de la librairie
RUN npm run build

# 6. Commande de maintien (optionnelle, utile si vous devez explorer le conteneur ensuite)
CMD ["tail", "-f", "/dev/null"]