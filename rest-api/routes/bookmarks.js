const express = require('express');
const router = express.Router();

const {User} = require('../models/User.js');

const authenticate = require('../helpers/authentication.js');

router.post('/', authenticate, async (req, res, next) => {
  User.findById(req.login.sub, "-password")
    .then((user) => {
      user.bookmarks.push(req.body);
      user.save()
        .then((finalUser) => res.send(finalUser))
        .catch((error) => {
          console.error(error);
          return res.status(500).send({
            message : "Error on Signup"
          });
        });
    })
    .catch((error) => {
      console.error(error);
      return res.status(401).send({error: 401, message: 'Unauthorized'});
    });
});

router.delete('/:id', authenticate, async (req, res, next) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    await User.updateOne(
      { _id: req.login.sub },
      { $pull: { bookmarks: { _id: id } } }
    )
    const user = await User.findById(req.login.sub, "-password");
    return res.send(user);
  }
  return next();
});

module.exports = router;
