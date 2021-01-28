require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/users', require('./routes/users.js'));
app.use('/scores', require('./routes/scores.js'));

app.use('/', (req, res) => {
  res.status(404).send({error: 404, message: 'Not Found'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
