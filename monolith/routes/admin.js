const express = require('express');
const fs = require('fs');
const app = express.Router();

const middleware = require('../middleware.js');

app.get('/', middleware.auth, (req, res, next) => {
  middleware.index(res, `
  <p>¡Bienvenido!</p>
  <p>Todavía no hay ninguna página creada.</p>
  <p>Dale click al botón de Nueva Página en la navegación para crear una.</p>
  `, '/admin/');
});

app.get('/:page', middleware.auth, (req, res, next) => {
  const filename = `./storage/pages/${req.params.page}.json`;
  let page = {
    url: req.params.page,
    title: req.params.page,
    body: '<strong>Ingresar contenido.</strong>'
  };
  if (fs.existsSync(filename)) {
    page = JSON.parse(fs.readFileSync(filename).toString());
  }
  res.render('admin/page_edit', page);
});

app.post('/:page', middleware.auth, (req, res, next) => {
  const url = (req.body.url || req.params.page)
    .toLowerCase()
    .replace(/ [ ]*/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/[-][-]*/g, '-');
  const filename = `./storage/pages/${url}.json`;
  let page = {
    url,
    title: req.body.title || req.params.page,
    body: req.body.body || '<strong>Ingresar contenido.</strong>'
  };
  fs.writeFileSync(filename, JSON.stringify(page));
  middleware.updateMenu(req.params.page, url, page.title);
  if (req.params.page !== page.url) {
    fs.unlinkSync(`./storage/pages/${req.params.page}.json`);
    return res.redirect(`/admin/${url}`);
  }
  res.render('admin/page_edit', page);
});

app.delete('/:page', middleware.auth, (req, res, next) => {
  const filename = `./storage/pages/${req.params.page}.json`;
  try {
    fs.unlinkSync(filename);
    middleware.deleteFromMenu(req.params.page);
  } catch(error) {
    console.error(error);
  }
  res.status(200).json({status: 200, message: 'Deleted OK'});
});

module.exports = app;
