# stage #1
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

#stage #2
FROM nginx:1.17.1-alpine
EXPOSE 80
COPY --from=build /usr/src/app/dist/calculadora_financiera_angular/browser /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Etapa de producción
# FROM node:20-alpine
# WORKDIR /app
# COPY --from=builder /app/dist/calculadora_financiera_angular /usr/share/nginx/html
# RUN npm install -g http-server
# CMD ["http-server", "/usr/share/nginx/html", "-p", "80", "--spa"]



# FROM node:20-alpine3.19 as dev-deps
# WORKDIR /app
# COPY package.json package.json
# RUN npm install


# FROM node:20-alpine3.19 as builder
# WORKDIR /app
# COPY --from=dev-deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# # FROM nginx:1.23.3 as prod
# # EXPOSE 80
# # COPY --from=build /app/dist/calculadora-financiera-angular /usr/share/nginx/html
# # CMD ["nginx", "-g", "daemon off;"]
