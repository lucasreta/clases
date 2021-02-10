const express = require('express');
const router = express.Router();

const {User} = require('../models/User.js');

router.get('/', async (req, res) => {
  const users = await User.find({}, "-password");
  res.send(users);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const user = await User.findById(id, "-password");
    if (user) {
      return res.send(user);
    }
  }
  return next();
});

module.exports = router;
