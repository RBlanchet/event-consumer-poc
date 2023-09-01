FROM node:18-buster-slim

RUN apt-get update && \
    apt-get install -y openssl && \
    apt-get install -y procps  && \
    apt-get install -y curl && \
    npm install -g @nestjs/cli && \
    npm install -g rimraf

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npx prisma generate

HEALTHCHECK --interval=15s --timeout=1m CMD curl --fail http://localhost/health || exit 1
