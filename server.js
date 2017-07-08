if (!process.env.PLACES_URL) {
  console.log('process.env.PLACES_URL must be defined!');
  process.exit(1);
}

const fs = require('fs');
fs.readFile('./dist/index.html', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  start(data);
});

const start = (data) => {
  const configMap = {
    placesUrl: process.env.PLACES_URL
  };

  const path = require('path');
  const express = require('express');
  const cache = require('express-cache-headers');

  const config = 'CONFIG_MAP=' + JSON.stringify(configMap);
  const html = data.replace('</head>', '<script type="text/javascript" src="config.js"></script></head>');

  const app = express();

  app.use(cache({ ttl: 86400, private: true }));

  // Static assets
  app.use('/fonts', express.static(path.join(__dirname, './dist/fonts')));
  app.use('/styles', express.static(path.join(__dirname, './dist/styles')));
  app.use('/scripts', express.static(path.join(__dirname, './dist/scripts')));

  // Dynamically created config
  app.get('/config.js', cache({ nocache: true }), function (req, res) {
    res.type('text/javascript');
    res.send(config);
  });

  // Main HTML
  app.get('*', cache({ nocache: true }), function (req, res) { res.send(html) });

  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}
