const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
});

module.exports =  {
  LinkSchema,
  Link: mongoose.model('Link', LinkSchema),
};
