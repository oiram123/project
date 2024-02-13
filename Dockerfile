FROM node:21.6.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./tsconfig.json

COPY jest.config.js .

COPY . .

RUN npm run build

RUN npm test

EXPOSE 5000

CMD ["node", "build/index.js"]
