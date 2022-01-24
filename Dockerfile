FROM node:alpine

RUN mkdir /viddle-client

WORKDIR /viddle-client

COPY . .

RUN yarn install --production

RUN yarn run build

CMD ["yarn", "start"]