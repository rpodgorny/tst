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
  const helmet = require('helmet');
  const csp = require('express-csp');

  //ph: Tohle není úplně hezký způsob, jak dostávat konfiguraci do hlavního skriptu. Musí se to potom ohýbat na všech místech, kde se k CONFIG_MAP přistupuje, aby eslint neřval a navíc se tady musí lepit kus javascriptového kódu v rámci stringu. Udělej to spíše tak, že uděláš endpoint pro stažení konfigurace čistě jako JSON a ten potom aktivně z hlavního striptu stáhni. Je to trochu složitější řešení, ale mnohem elegantnější.
  const config = 'CONFIG_MAP=' + JSON.stringify(configMap);
  const html = data.replace('</head>', '<script type="text/javascript" src="config.js"></script></head>');

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
        'connect-src': ['self', configMap.placesUrl],
        'img-src': ['self'],
        'frame-ancestors' : ["'none'"]
      }
    }
  });
  app.use(cache({ ttl: 86400, private: true }));

  // Static assets
  app.use('/fonts', express.static(path.join(__dirname, './dist/fonts')));
  app.use('/styles', express.static(path.join(__dirname, './dist/styles')));
  app.use('/scripts', express.static(path.join(__dirname, './dist/scripts')));
  app.use('/icons', express.static(path.join(__dirname, './dist/icons')));

  // Dynamically created config
  app.get('/config.js', cache({ nocache: true }), function (req, res) {
    res.type('text/javascript');
    res.send(config);
  });

  // Main HTML
  app.get('*', cache({ nocache: true }), function (req, res) { res.send(html) });

  const port = process.env.PORT || 8080;//ph: dal bych sem spíše port 3000, je to jakýsi nepsaný standard v node.js světě
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}
