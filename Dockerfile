FROM node:12-alpine

COPY . .

RUN yarn && yarn build:admin:prod && yarn build:tg-bot

EXPOSE 8000

CMD ["yarn", "start"]
