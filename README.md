# Asterix Web Places

Web interface for __Asterix Places__.

## Install

```
npm install
```

## Development

Optional: create local config and set custom values if needed:

```
cp config.local.default.json config.local.json
```

Start the _webpac-dev-server_ is started with hot module replacement:

```
npm start
```

App runs on _http://localhost:9000_.

### ESLint

Check rules by `npm run test:list`.

## Production Build

Build project with production configuration (minified, uglified):

```
npm run build
```

Start server providing builded sources from _dist_ folder:

```
node server.js
```

Server runs on _http://localhost:8080_.

### Docker

```
docker build -t asterix-web-places .
docker run -e "PLACES_URL=http://localhost:7779" -p 8080:8080 -d asterix-web-places
```
