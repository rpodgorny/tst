if (!process.env.PLACES_URL) {
  console.log('process.env.PLACES_URL must be defined!');
  process.exit(1);
}

const path = require('path');
const express = require('express');
const cache = require('express-cache-headers');
const helmet = require('helmet');
const csp = require('express-csp');

const app = express();
app.use(helmet());
csp.extend(app, {
  policy: {
    useScriptNonce: false,
    useStyleNonce: false,
    directives: {
      'default-src': ['self'],
      'style-src': ['self'],
      'font-src': ['self'],
      'script-src': ['self'],
      'connect-src': ['self', process.env.PLACES_URL],
      'img-src': ['self'],
      'frame-ancestors' : ["'none'"]
    }
  }
});
app.use(cache({ ttl: 86400, private: true }));

// Static assets
// Static assets
app.use('/fonts', express.static(path.join(__dirname, './dist/fonts')));
app.use('/styles', express.static(path.join(__dirname, './dist/styles')));
app.use('/scripts', express.static(path.join(__dirname, './dist/scripts')));
app.use('/icons', express.static(path.join(__dirname, './dist/icons')));

// Return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
