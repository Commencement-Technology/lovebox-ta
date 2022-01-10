FROM node:16

WORKDIR /lovebox

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:dev

CMD ["node", "dist/main.js"]
