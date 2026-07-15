FROM node:22-bookworm

WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json tsconfig.lib.json webpack.lib.cjs ./
COPY src ./src
COPY node_modules ./node_modules

RUN npm run build

CMD ["npm", "run", "build"]
