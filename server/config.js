const mongoose = require('mongoose');
const TokenModel = require('./models/TokenModel');
const uuidV4 = require('uuid/v4');

module.exports = {
  database: 'mongodb://localhost/pollz',
  secret: async function() {
    try {
      const dbSecret = await TokenModel.find();
      if (!dbSecret.length) {
        const { secret } = await TokenModel.create({ secret: uuidV4() });
        return secret;
      }
      return dbSecret[0].secret;
    } catch (err) {
      console.error(err);
    }
  }
};
