const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'token Secreto Super Seguro, No Hardcodear!',
    resave: false,
    saveUninitialized: false
  })
);

const middleware = require('./middleware.js');

app.use((req, res, next) => {
  req.navbar = middleware.getNavbar();
  res.renderParams = res.render;
  res.render = (path, attributes) => {
    res.renderParams(path, {
      ...attributes,
      navbar: req.navbar,
      loggedIn: req.session.isLoggedIn
    });
  };
  next();
});

app.use('/', require('./routes/login.js'));

app.use('/admin', require('./routes/admin.js'));

app.use('/', require('./routes/frontend.js'));

app.use((req, res) => {
  res.locals.message = 'Not Found';
  res.locals.error = 404;
  res.locals.navbar = req.navbar;
  res.status(404);
  res.render('error');
});

module.exports = app;
