const express = require('express');
const router = express.Router();

const users = require.main.require('./data/users.js');

router.post('/login', (req, res, next) => {
  const user = users.find(u => u.username == req.body.username);
  if (user) {
    if (req.body.password && req.body.password == user.password) {
      return res.send(user);
    }
    return res.status(401).send({error: 401, message: 'Unauthorized'});
  }
  return next();
});

router.post('/signup', (req, res, next) => {
  
});

module.exports = router;
