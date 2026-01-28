# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime stage: static server (nginx) ----
FROM nginx:alpine AS runtime

# Usar configuración custom de nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Servir el sitio en /
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
