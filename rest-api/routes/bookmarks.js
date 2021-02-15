const express = require('express');
const router = express.Router();

const {User} = require('../models/User.js');

const authenticate = require('../helpers/authentication.js');

router.post('/', authenticate, async (req, res, next) => {
  User.updateOne(
    { _id: req.login.sub },
    { $push: { bookmarks: req.body } },
  )
    .then(() => {
      User.findById(req.login.sub, '-password')
        .then((user) => {
          console.log('user', user);
          return res.send(user);
        })
    })
    .catch((error) => {
      console.error(error);
      return next();
    });
});

router.delete('/:id', authenticate, async (req, res, next) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    await User.updateOne(
      { _id: req.login.sub },
      { $pull: { bookmarks: { _id: id } } },
    )
    const user = await User.findById(req.login.sub, "-password");
    return res.send(user);
  }
  return next();
});

module.exports = router;
