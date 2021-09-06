FROM node:12-alpine

COPY . .

RUN yarn && yarn build:dev

EXPOSE 8000

CMD ["node", "./dist/server.js"]