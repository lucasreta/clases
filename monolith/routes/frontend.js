const cache = require('memory-cache');
const express = require('express');
const fs = require('fs');

const middleware = require('../middleware.js');

const app = express.Router();
const memCache = new cache.Cache();


app.get('/:page', (req, res, next) => {
  const key = '__express__' + req.originalUrl || req.url;
  const cacheContent = memCache.get(key);
  if (cacheContent) {
    return res.render('index', cacheContent);
  } else {
    const filename = `./storage/pages/${req.params.page}.json`;
    if (fs.existsSync(filename)) {
      const page = JSON.parse(fs.readFileSync(filename).toString());
      if (page.title && page.body) {
        memCache.put(key, page, 30000);
        return res.render('index', page);
      }
    }
    next();
  }
});

app.get('/', (req, res) => {
  middleware.index(res, `
  <p>¡Bienvenido!</p>
  <p>Todavía no hay ninguna página creada.</p>
  <p><a href="/login">Ingresa al panel</a> y crea contenido para verlo reflejado aquí.</p>
  `);
});

module.exports = app;
