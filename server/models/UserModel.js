const mongoose = require('mongoose');
const validator = require('validator');

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    // unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  // tokens: [
  //   {
  //     access: {
  //       type: String,
  //       required: true,
  //     },
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
});

module.exports = mongoose.model('UserModel', user);
