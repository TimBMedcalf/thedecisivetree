FROM node:alpine

RUN npm install -g nodemon

WORKDIR /api

COPY package*.json /api

RUN npm install

COPY . 

EXPOSE 8080

CMD ["node", "server.jjs"]