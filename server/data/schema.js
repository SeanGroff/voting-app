const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');
const resolvers = require('./resolvers');
// const mocks = require('./mocks');

const typeDefs = `
type Query {
  user(id: Int!): User
  users: [User]
  userVotes(userId: Int!): [VoteOption]
  poll(id: Int!): Poll
  allPolls(userId: Int): [Poll]
  voteOption: VoteOption
  pollOptions(pollId: Int!): [VoteOption]
  createdBy(userId: Int!): User
}

type User {
  id: Int
  username: String
  email: String
  polls: [Poll]
  userVotes: [VoteOption]
}

type Poll {
  id: Int
  createdBy: User
  name: String
  pollOptions: [VoteOption]
  votes: Int
}

type VoteOption {
  id: Int
  poll: Poll
  name: String
  votes: Int
  voters: [User]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

/* Used for Mock Data */
// addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
