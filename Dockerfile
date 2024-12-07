FROM node:18-alpine

WORKDIR /app


RUN apk update && apk add --no-cache curl bash

RUN curl -o /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /wait-for-it.sh


COPY . .
RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run build

ENTRYPOINT ["/wait-for-it.sh", "postgres_db:5432", "--"]

EXPOSE 3000

CMD ["node", "./dist/src/main.js"]