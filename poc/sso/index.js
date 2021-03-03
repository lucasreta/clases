require('dotenv').config();
const http = require('http');
const fs = require('fs');

fs.readFile('index.template.html', 'utf8', function (error, data) {
  if (error) {
    return console.error(error);
  }
  var result = data.replace(/ENV_CLIENT_ID/g, process.env.CLIENT_ID);

  fs.writeFile('index.html', result, 'utf8', function (error) {
     if (error) return console.log(error);
  });
});

const verify = require('./verify.js');

const router = function (req, res) {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('index.html').pipe(res);
      break;
    case '/verify':
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        const dataArray = data.split('=');
        if (dataArray.length > 1) {
          const token = dataArray[1];
          verify(token)
            .then((ticket) => {
              const payload = ticket.getPayload();
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify(payload));
              res.end();
            })
            .catch(console.error);
        } else {
          console.error("No token was found.");
        }
      });
      break;
    case '/styles.css':
      res.writeHead(200, { 'Content-Type': 'text/css' });
      fs.createReadStream('styles.css').pipe(res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      fs.createReadStream('404.html').pipe(res);
  }
}

const server = http.createServer(router);

const port = process.env.PORT || 3000;

server.listen(port);

console.log(`Node.js web server at port ${port} is running...`);
