const mongoose = require('mongoose');

const poll = new mongoose.Schema({
  name: String,
  createdBy: String,
  votes: Number,
  pollOptions: [
    {
      name: String,
      votes: Number,
    },
  ],
});

module.exports = mongoose.model('PollModel', poll);
