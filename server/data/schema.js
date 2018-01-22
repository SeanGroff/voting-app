const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');
const mocks = require('./mocks');

const typeDefs = `
type Query {
  user(id: Int!): User
  poll(id: Int!): Poll
  allPolls: [Poll]
}

type User {
  id: Int
  username: String
  email: String
  polls: [Poll]
}

type Poll {
  id: Int
  name: String
  options: [VoteOption]
  votes: Int
}

type VoteOption {
  id: Int
  name: String
  votes: Int
  voters: [User]
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
