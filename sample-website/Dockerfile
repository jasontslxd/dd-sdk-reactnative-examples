FROM node:18-alpine AS builder
ENV NODE_ENV=production

WORKDIR /app

COPY yarn.lock package.json ./
RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.27.2-alpine AS production
ENV NODE_ENV=production

WORKDIR /usr/local/bin

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
