const express = require('express');
const router = express.Router();

const scores = require.main.require('./data/users.js');

const scoreMapper = (score) => ({
  points: score.score,
  updated: score.updated,
});

router.get('/', (req, res, next) => {
  res.send(scores.map(score => scoreMapper(score)));
});

router.get('/:userId', (req, res, next) => {
  const score = scores.find(s => s.id == req.params.userId);
  if (score) {
    return res.send(scoreMapper(score));
  }
  return next();
});

router.put('/:userId', (req, res, next) => {
  const score = scores.find(s => s.id == req.params.userId);
  if (score) {
    if (req.body.score && req.body.score != score.score) {
      score.score = req.body.score;
      score.updated = new Date().toISOString().replace('T', ' ').substring(0, 19);
      return res.send(scoreMapper(score));
    }
    return res.status(400).send({error: 400, message: 'Bad Request'});
  }
  return next();
});

module.exports = router;
