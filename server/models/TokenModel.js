const mongoose = require('mongoose');

const token = new mongoose.Schema({
  secret: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model('TokenModel', token);
