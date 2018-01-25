const mongoose = require('mongoose');

const UserModel = require('../models/UserModel');
const PollModel = require('../models/PollModel');

module.exports = {
  Query: {
    user(root, args) {
      return {
        id: 1,
        name: 'Cool Guy',
        email: 'coolguys0711@live.com',
      };
    },
    users(root, args) {
      return UserModel.find().then(users =>
        users.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
        }))
      );
    },
    poll(root, args) {
      return {
        id: 123,
        name: 'Cool Poll',
        pollOptions: [{ name: 'cooler' }, { name: 'lame' }],
        votes: 923,
      };
    },
    allPolls(root, args) {
      return [
        {
          id: 123,
          name: 'Cool Poll',
          pollOptions: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 923,
        },
        {
          id: 234,
          name: 'Cooler Poll',
          pollOptions: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 234,
        },
        {
          id: 457,
          name: 'Coolest Poll',
          pollOptions: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 26,
        },
      ];
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
    createdBy(user) {
      return {
        id: 1,
        name: 'Cool Guy',
        email: 'coolguys0711@live.com',
        polls: [
          { name: 'Fav Color?' },
          { name: 'Fav Actor?' },
          { name: 'Fav singer?' },
        ],
      };
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
