FROM node:12.8.0-alpine
ENV APP_PORT=4003
ENV TARGET_URL="http://localhost:4004/ping"
COPY . /usr/mev-spa
WORKDIR /usr/mev-spa
EXPOSE $APP_PORT
RUN npm install --save
ENTRYPOINT npm start
