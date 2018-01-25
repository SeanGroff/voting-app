const mongoose = require('mongoose');
const casual = require('casual');

const UserModel = require('../models/UserModel');
const PollModel = require('../models/PollModel');

async function mongoData() {
  casual.seed(123);
  for (let i = 0; i < 10; i += 1) {
    await UserModel.create({
      name: casual.first_name,
      email: casual.email,
    });
    await PollModel.create({
      name: casual.title,
      createdBy: casual.email,
      votes: casual.integer((from = 0), (to = 1000)),
      pollOptions: [
        {
          name: casual.title,
          votes: casual.integer((from = 0), (to = 500)),
        },
        {
          name: casual.title,
          votes: casual.integer((from = 0), (to = 500)),
        },
        {
          name: casual.title,
          votes: casual.integer((from = 0), (to = 500)),
        },
      ],
    });
  }
}

module.exports = {
  mongoData,
};
