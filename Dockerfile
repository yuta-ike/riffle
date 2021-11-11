# ベースイメージを指定
FROM node:16

# ARG DATABASE_URL=postgres://postgres:password@db:5432/postgres

# ディレクトリを移動する
WORKDIR /app

# node.js の環境変数を定義する
# 本番環境では production
ENV NODE_ENV=development
ENV HOST="0.0.0.0"

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY packages/server/package.json ./packages/server/
COPY packages/server/tsconfig.json ./packages/server/

RUN yarn install

COPY packages/server/prisma ./packages/server/
RUN yarn workspace server prisma:generate

COPY packages/server packages/server
RUN yarn build:server

EXPOSE 8000

CMD PORT=$PORT yarn start:server