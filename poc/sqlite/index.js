const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/proof-of-concept.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the POC SQlite database.');
  db.each('SELECT * FROM langs', function(err, row) {
    console.log("Language: " + row.name);
  });
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
