
const token = require('./token.js');

const authenticate = async (req, res, next) => {

  let authorization = req.headers.authorization || null;
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    console.error(`Authentication Error, no Token Sent (${req.originalUrl})`);
    return res.status(401).send({error: 401, message: 'Unauthorized'});
  }
  
  token.verify(authorization.split(' ')[1])
    .then((t) => {
      console.log(`Authentication Success for ${t.name} UID: ${t.sub} (${req.originalUrl})`);
      req.login = t;
      return next();
    })
    .catch((error) => {
      console.error(`Authentication Error, Token verification failed (${req.originalUrl}): ${error}`);
      return res.status(401).send({error: 401, message: 'Unauthorized'});
    });
}

module.exports = authenticate;
