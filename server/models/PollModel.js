const mongoose = require('mongoose');

const poll = new mongoose.Schema({
  name: String,
  createdBy: {
    id: String,
    name: String,
    email: String,
  },
  votes: Number,
  pollOptions: [
    {
      name: String,
      votes: Number,
    },
  ],
});

module.exports = mongoose.model('PollModel', poll);
