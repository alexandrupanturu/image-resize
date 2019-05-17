FROM node:latest

ENV HTTP_PORT=9090

EXPOSE 9090

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY swagger.json /usr/src/app
COPY ./src /usr/src/app
COPY tsconfig.json /usr/src/app
COPY ./images /usr/src/app/images

RUN npm install
CMD "ls"
CMD ["npm", "start"]