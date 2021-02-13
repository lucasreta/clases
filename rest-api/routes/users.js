const express = require('express');
const router = express.Router();

const {User} = require('../models/User.js');

const token = require('../helpers/token.js');
const authenticate = require('../helpers/authentication.js');

router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send({
        message : "Error on Login"
      });
    } else if (user === null) {
      console.error(`User ${req.body.username} not found`);
      return next();
    } else {
      user.validPassword(req.body.password)
        .then((result) => {
          if (!result) {
            return res.status(401).send({error: 401, message: 'Unauthorized'});
          }
          token.generate(user)
            .then((t) => {
              return res.send({
                id: user._id,
                username: user.username,
                token: t,
              });
            })
            .catch((error) => {
              console.error(error);
              return res.status(500).send({
                message : "Error on Login"
              });
            });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).send({
            message : "Error on Login"
          });
        });
    }
  });
});

router.post('/signup', (req, res) => {
  const newUser = new User();
  console.log(req.body);
  newUser.setPassword(req.body.password)
    .then((hash) => {
      newUser.username = req.body.username;
      newUser.password = hash;
      newUser.save((err, user) => {
        if (err) {
          console.error(err);
          return res.status(400).send({
            message: "Error on Signup"
          });
        }
        else {
          token.generate(user)
            .then((t) => {
              return res.send({
                id: user._id,
                username: user.username,
                token: t,
              });
            })
            .catch((error) => {
              console.error(error);
              return res.status(500).send({
                message : "Error on Login"
              });
            });
        }
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({
        message : "Error on Signup"
      });
    });
});

router.get('/users/:id', authenticate, async (req, res, next) => {
  const id = req.params.id;
  if (req.login.sub === id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(id, "-password");
      if (user) {
        return res.send(user);
      }
    }
  } else {
    return res.status(401).send({error: 401, message: 'Unauthorized'});
  }
  return next();
});

module.exports = router;
