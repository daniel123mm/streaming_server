FROM node:12

COPY ./src /app

COPY ./package.json /app

WORKDIR /app

RUN npm install