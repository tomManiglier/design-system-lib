FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json tsconfig.lib.json webpack.lib.cjs webpack.lib.vue.cjs ./
COPY scripts ./scripts
COPY src ./src

RUN npm ci
RUN npm run build
