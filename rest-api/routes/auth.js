const express = require('express');
const router = express.Router();

const {User} = require('../models/User.js');

const token = require('../helpers/token.js');

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
        .then(async (result) => {
          if (!result) {
            return res.status(401).send({error: 401, message: 'Unauthorized'});
          }
          try {
            const t = await token.generate(user);
            return res.send({
              id: user._id,
              username: user.username,
              token: t,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).send({
              message : "Error on Login"
            });
          } 
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

router.post('/signup', async (req, res) => {
  const newUser = new User();
  newUser.setPassword(req.body.password)
    .then((hash) => {
      newUser.name = req.body.username;
      newUser.password = hash;
      newUser.save((err, user) => {
        if (err) {
          console.error(err);
          return res.status(400).send({
            message : "Error on Signup"
          });
        }
        else {
          return res.status(201).send({
            message : "User added successfully."
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

module.exports = router;
