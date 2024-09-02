FROM node:20-alpine3.19 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install


FROM node:20-alpine3.19 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
