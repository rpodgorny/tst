const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

// Static assets
app.use('/fonts', express.static(path.join(__dirname, './dist/fonts')));
app.use('/styles', express.static(path.join(__dirname, './dist/styles')));
app.use('/scripts', express.static(path.join(__dirname, './dist/scripts')));

// Return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
