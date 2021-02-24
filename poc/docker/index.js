const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hola', (req, res) => {
  res.send('hola');
});

app.get('/hola/:nombre', (req, res) => {
  res.send(`hola ${req.params.nombre}`);
});

app.use('/', (req, res) => {
  res.status(404).send({error: 404, message: 'Not Found'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
