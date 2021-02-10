const jwt = require('jsonwebtoken');
const fs = require('fs');
const moment = require('moment');

const path = require('path');
const appDir = path.dirname(require.main.filename);

class Token {
  generate(user) {
    const privateKey = fs.readFileSync(path.join(appDir, './pem/jwt.pem'));
    const algo = 'RS256';
    const expires = moment().add(60 * 60 * 24, 'seconds').unix();
    const payload = {
      sub: user._id,
      name: user.username,
      exp: expires,
    };
    try {
      const token = jwt.sign(payload, privateKey, {algorithm: algo});
      return token;
    } catch (err) {
      return err;
    }
  };

  verify(token) {
    const cert = fs.readFileSync(path.join(appDir, './pem/jwt.crt'));
    try {
      const decoded = jwt.verify(token, cert);
      if (decoded.exp <= moment().unix()) {
        const error = 'Access token has expired';
        return error;
      } else {
        return decoded;
      }
    } catch (err) {
      return err;
    }
  }
};

module.exports = new Token();
