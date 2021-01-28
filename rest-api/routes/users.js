const express = require('express');
const router = express.Router();

const users = require.main.require('./data/users.js');

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res, next) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    return res.send(user);
  }
  return next();
});

router.put('/:id', (req, res, next) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    if (req.body.username && req.body.username != user.username) {
      user.username = req.body.username;
      user.updated = new Date().toISOString().replace('T', ' ').substring(0, 19);
      return res.send(user);
    }
    return res.status(400).send({error: 400, message: 'Bad Request'});
  }
  return next();
});

router.post('/', (req, res) => {
  const user = {
    id: (users.reduce((max, obj) => {
      return obj.id > max.id ? obj : max;
    })).id + 1 || 1,
    username: req.body.username,
    score: 0,
    updated: new Date().toISOString().replace('T', ' ').substring(0, 19),
    created: new Date().toISOString().replace('T', ' ').substring(0, 19),
  }
  users.push(user);
  return res.send(user);
});

router.delete('/:id', (req, res, next) => {
  const index = users.map(u => u.id).indexOf(parseInt(req.params.id));
  if (index > -1) {
    const user = users[index];
    users.splice(index, 1);
    return res.send(user);
  }
  return next();
});

module.exports = router;
