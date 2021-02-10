const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {LinkSchema} = require('./Link');

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarks: [LinkSchema],
}, { timestamps: true });

UserSchema.methods.setPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, function(err, hash) {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

UserSchema.methods.validPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, result) {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  UserSchema,
  User: mongoose.model('User', UserSchema),
};
