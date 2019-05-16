FROM node:latest

ENV HTTP_PORT=9090

EXPOSE 9090

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY src /usr/src/app
COPY tsconfig.json /usr/src/app

RUN npm install

CMD ["npm", "start"]