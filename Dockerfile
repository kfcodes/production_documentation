# Dockerfile

# pull the official docker image
# FROM node:18-alpine
FROM node:lts-bookworm-slim
# FROM lts-alpine3.20
FROM node:alpine

# set work directory
WORKDIR /app

# install dependencies
# COPY public/ /app/public
# COPY src/ /app/src
# COPY package.json /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
