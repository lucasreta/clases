const {OAuth2Client} = require('google-auth-library');

const clientId = process.env.CLIENT_ID;

const client = new OAuth2Client(clientId);

function verify(token) {
  return new Promise((resolve, reject) => {
    client.verifyIdToken({
      idToken: token,
      audience: clientId,
    })
      .then((ticket) => {
        resolve(ticket);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = verify;
