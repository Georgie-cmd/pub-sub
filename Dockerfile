FROM node:17-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json ..

RUN npm install

COPY dist dist

CMD ["npm", "run", "start:dev"]





