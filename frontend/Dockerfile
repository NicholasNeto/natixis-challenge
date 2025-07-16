# Estágio 1: Build da Aplicação React
FROM node:18-slim AS build
WORKDIR /app

# ✅ ALTERAÇÃO CRÍTICA: Copia APENAS o package.json
# Isto força o npm a construir uma árvore de dependências nova dentro do contentor Linux.
COPY package.json ./

# Instala as dependências a partir do zero
RUN npm install

# Copia o resto do código fonte
COPY . .

# Executa o build de produção
RUN npm run build


# Estágio 2: Servir a Aplicação com Nginx (Esta parte não muda)
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
