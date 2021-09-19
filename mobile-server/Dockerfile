FROM node:12.22-slim 

WORKDIR /user/src/app

ADD package.json ./

RUN npm install

ADD . .

RUN npm run build

CMD ["npm","run","server"]