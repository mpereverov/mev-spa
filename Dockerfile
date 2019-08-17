FROM node:12.8.0-alpine
ENV APP_PORT=4003
ENV TARGET_URL="http://API:4004/ping"
COPY ./app /usr/mev-spa
WORKDIR /usr/mev-spa
EXPOSE $APP_PORT
RUN npm install --save
ENTRYPOINT npm start
