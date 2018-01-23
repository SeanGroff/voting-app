module.exports = {
  Query: {
    user(root, args) {
      return {
        id: 1,
        username: 'coolguy',
        email: 'coolguys0711@live.com',
        polls: [
          { name: 'Fav Color?' },
          { name: 'Fav Actor?' },
          { name: 'Fav singer?' },
        ],
      };
    },
    poll(root, args) {
      return {
        id: 123,
        name: 'Cool Poll',
        options: [{ name: 'cooler' }, { name: 'lame' }],
        votes: 923,
      };
    },
    allPolls(root, args) {
      return [
        {
          id: 123,
          name: 'Cool Poll',
          options: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 923,
        },
        {
          id: 234,
          name: 'Cooler Poll',
          options: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 234,
        },
        {
          id: 457,
          name: 'Coolest Poll',
          options: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 26,
        },
      ];
    },
    voteOption(root, args) {
      return {
        id: 34,
        name: 'Coolest',
        votes: 76,
        voters: [
          { username: 'Tom' },
          { username: 'Dude' },
          { username: 'Toby' },
        ],
      };
    },
  },
  User: {
    polls(allPolls) {
      return [
        {
          id: 123,
          name: 'Cool Poll',
          options: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 923,
        },
        {
          id: 234,
          name: 'Cooler Poll',
          options: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 234,
        },
        {
          id: 457,
          name: 'Coolest Poll',
          options: [{ name: 'cooler' }, { name: 'lame' }],
          votes: 26,
        },
      ];
    },
  },
  Poll: {
    createdBy(user) {
      return {
        id: 1,
        username: 'coolguy',
        email: 'coolguys0711@live.com',
        polls: [
          { name: 'Fav Color?' },
          { name: 'Fav Actor?' },
          { name: 'Fav singer?' },
        ],
      };
    },
    pollOptions(poll) {
      return {
        id: 123,
        name: 'Cool Poll',
        votes: 923,
        options: [
          {
            id: 34,
            name: 'Coolest',
            votes: 76,
            voters: [{ username: 'Tom' }, { name: 'Dude' }, { name: 'Toby' }],
          },
          {
            id: 78,
            name: 'Cool',
            votes: 29,
            voters: [{ username: 'Sean' }, { name: 'Dude' }, { name: 'Toby' }],
          },
        ],
      };
    },
  },
  VoteOption: {
    poll() {
      return {
        id: 123,
        name: 'Cool Poll',
        votes: 923,
        options: [
          {
            id: 34,
            name: 'Coolest',
            votes: 76,
            voters: [{ username: 'Tom' }, { name: 'Dude' }, { name: 'Toby' }],
          },
          {
            id: 78,
            name: 'Cool',
            votes: 29,
            voters: [{ username: 'Sean' }, { name: 'Dude' }, { name: 'Toby' }],
          },
        ],
      };
    },
    voters(users) {
      return {
        id: 34,
        name: 'Coolest',
        votes: 76,
        voters: [{ username: 'Sean' }, { name: 'Dude' }, { name: 'Toby' }],
      };
    },
  },
};
