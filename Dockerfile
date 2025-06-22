# Etapa 1: build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.* ./
COPY tsconfig*.json ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: produção
FROM node:20-slim

WORKDIR /app

# Instala o `serve` para rodar o build
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
