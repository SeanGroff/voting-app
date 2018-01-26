const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');
const resolvers = require('./resolvers');
// const mocks = require('./mocks');

const typeDefs = `
type Query {
  user(id: String!): User
  users: [User]
  poll(id: String!): Poll
  allPolls(userId: String): [Poll]
  voteOption: VoteOption
  pollOptions(pollId: String!): [VoteOption]
  createdBy: User
}

type User {
  id: String
  name: String
  email: String
}

type Poll {
  id: String
  createdBy: User
  name: String
  pollOptions: [VoteOption]
  votes: Int
}

type VoteOption {
  poll: Poll
  name: String
  votes: Int
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

/* Used for Mock Data */
// addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
