FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./