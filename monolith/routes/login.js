const express = require('express');
const app = express.Router();

app.get('/login', (req, res, next) => {
  res.redirect('/admin/login');
});

app.get('/admin/login', (req, res, next) => {
  if (req.session.isLoggedIn) return res.redirect('/admin');
  res.render('admin/login', { title: 'Login' });
});

app.post('/admin/login', (req, res, next) => {
  if (req.session.isLoggedIn) return res.redirect('/admin');
  if (req.body.username === 'admin' && req.body.password === 'admin123') {
    req.session.isLoggedIn = true;
    return req.session.save((error) => {
      console.error(error);
      res.redirect('/admin');
    });
  }
  res.render('admin/login', { title: 'Login', error: 'Datos incorrectos' });
});

app.get('/admin/logout', (req, res, next) => {
  req.session.destroy(error => {
    console.error(error);
    res.redirect('/');
  });
});

module.exports = app;
