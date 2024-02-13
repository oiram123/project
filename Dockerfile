FROM node:21.6.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./tsconfig.json

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "build/index.js"]
