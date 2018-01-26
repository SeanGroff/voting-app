const mongoose = require('mongoose');

const UserModel = require('../models/UserModel');
const PollModel = require('../models/PollModel');

module.exports = {
  Query: {
    async user(root, args) {
      const { _id, name, email } = await UserModel.findOne({ _id: args.id });
      return {
        id: _id,
        name,
        email,
      };
    },
    async users(root, args) {
      const users = await UserModel.find();
      return users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
      }));
    },
    async poll(root, args) {
      const {
        _id,
        name,
        createdBy,
        votes,
        pollOptions,
      } = await PollModel.findOne({ _id: args.id });
      return {
        id: _id,
        name,
        createdBy,
        votes,
        pollOptions,
      };
    },
    async allPolls(root, args) {
      const polls = await PollModel.find();
      return polls.map(poll => ({
        id: poll._id,
        name: poll.name,
        createdBy: poll.createdBy,
        votes: poll.votes,
        pollOptions: poll.pollOptions,
      }));
    },
    voteOption(root, args) {
      return {
        name: 'Coolest',
        votes: 76,
      };
    },
  },
  User: {},
  Poll: {
    createdBy(poll) {
      console.log(poll);
      return poll.createdBy;
    },
    pollOptions(poll) {
      return [
        {
          name: 'Coolest',
          votes: 76,
        },
        {
          name: 'Cool',
          votes: 29,
        },
      ];
    },
  },
  VoteOption: {
    poll() {
      return {
        id: 123,
      };
    },
  },
};
