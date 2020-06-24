FROM node:14.4.0-alpine3.12

ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /code
ADD . /code

RUN yarn install && yarn build && npm install -g http-server

EXPOSE 8080

CMD http-server ./build -p 8080