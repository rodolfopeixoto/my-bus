FROM node:8.2.1-alpine
RUN npm install -g create-react-app \
                   create-react-native-app \
                   react-native-cli
RUN mkdir /meubus
WORKDIR /meubus
COPY package.json ./
RUN npm install
ADD . /meubus
CMD npm start
RUN npm install -g firebase-tools