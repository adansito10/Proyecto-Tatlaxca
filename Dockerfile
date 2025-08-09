# ---- build ----
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .
ARG NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_OPTIONS=$NODE_OPTIONS

RUN npm run build -- --configuration production

# ---- runtime ----
FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/cafeteria-tatlaxca/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]