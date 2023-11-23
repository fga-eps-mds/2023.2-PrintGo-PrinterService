FROM node:18

WORKDIR /src

ENV PORT=8001

COPY ./package.json .
RUN yarn install

COPY . .

EXPOSE $PORT

CMD [ "yarn", "start" ]