FROM node:8.2.1-alpine
RUN npm install -g create-react-app
RUN mkdir /meubus
WORKDIR /meubus
COPY package.json ./
RUN npm install --silent
ADD . /meubus
CMD npm start