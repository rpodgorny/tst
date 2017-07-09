FROM node:8.1.3-alpine

WORKDIR /app

RUN npm install express express-csp express-cache-headers helmet

COPY server.js server.js

COPY /dist/ /app/dist

EXPOSE 8080

CMD node server.js
