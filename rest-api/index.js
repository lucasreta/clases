require('dotenv').config();
const mongoose = require('mongoose');
const cachegoose = require('cachegoose');
require('./helpers/logger.js');

const db = process.env.MONGO_URI;

const databaseConfiguration = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: process.env.MONGO_POOL_SIZE || 5,
};

cachegoose(mongoose);

mongoose
    .connect(db, databaseConfiguration)
    .then(() => serve())
    .catch((error) => console.error(`An error occurred while trying to connect to database: ${error}`));


const serve = () => {
  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors());

  app.use('/users', require('./routes/users.js'));
  app.use('/', require('./routes/auth.js'));

  app.use('/', (req, res) => {
    res.status(404).send({error: 404, message: 'Not Found'});
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
