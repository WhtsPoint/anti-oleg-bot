FROM node:latest

COPY . /bot
WORKDIR bot

RUN npm install
RUN npm install -g typescript
RUN tsc -b

CMD ["node", "build/src/bot.js"]