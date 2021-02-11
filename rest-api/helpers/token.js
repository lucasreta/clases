const jwt = require('jsonwebtoken');
const fs = require('fs');
const moment = require('moment');

const path = require('path');
const appDir = path.dirname(require.main.filename);

class Token {
  generate(user) {
    return new Promise((resolve, reject) => {
      const privateKey = fs.readFileSync(path.join(appDir, './certs/jwt.pem'));
      const algo = 'RS256';
      const expires = moment().add(60 * 60 * 24, 'seconds').unix();
      const payload = {
        sub: user._id,
        name: user.username,
        exp: expires,
      };
      try {
        const token = jwt.sign(payload, privateKey, {algorithm: algo});
        return resolve(token);
      } catch (err) {
        return reject(err);
      }
    });
  };

  verify(token) {
    return new Promise((resolve, reject) => {
      const cert = fs.readFileSync(path.join(appDir, './certs/jwt.crt'));
      try {
        const decoded = jwt.verify(token, cert);
        if (decoded.exp <= moment().unix()) {
          const error = 'Access token has expired';
          return reject(error);
        } else {
          return resolve(decoded);
        }
      } catch (err) {
        return reject(err);
      }
    });
  }
};

module.exports = new Token();
