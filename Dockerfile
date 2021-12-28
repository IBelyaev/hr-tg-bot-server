FROM node:12-alpine

COPY . .

RUN yarn && yarn build:prod

EXPOSE 8000

CMD ["node", "./dist/server.js"]
