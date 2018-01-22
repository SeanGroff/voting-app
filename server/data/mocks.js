const casual = require('casual');
const { MockList } = require('graphql-tools');

module.exports = {
  String: () => casual.title,
  Query: () => ({
    user: (root, args) => {
      return {
        id: args.id,
        username: 'coolguy0711',
        email: 'coolguy0711@live.com',
        polls: [
          'Favorite Colors',
          'Whats your favorite food?',
          'Favorite framework?',
        ],
      };
    },
    poll: (root, args) => {
      return {
        id: args.id,
        name: casual.title,
        options: casual.array_of_words((n = 7)),
        votes: casual.integer((from = 0), (to = 1000)),
      };
    },
    allPolls: () =>
      new MockList(5, () => ({
        id: casual.id,
        name: casual.title,
        options: casual.array_of_words((n = 7)),
        votes: casual.integer((from = 0), (to = 1000)),
      })),
  }),
  User: () => ({
    id: () => casual.id,
    username: () => casual.username,
    email: () => casual.email,
  }),
  Poll: () => ({
    id: () => casual.id,
    name: () => casual.title,
    options: () => casual.array_of_words((n = 7)),
    votes: casual.integer((from = 0), (to = 10000)),
  }),
  VoteOption: () => ({
    option: () => casual.title,
  }),
};
