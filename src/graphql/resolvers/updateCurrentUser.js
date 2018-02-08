import gql from 'graphql-tag';

export default (_, { id, email, name }, { cache }) => {
  // query the current user from client cache
  const query = gql`
    query GetCurrentUser {
      currentUser @client {
        __typename
        id
        email
        name
      }
    }
  `;

  // get previous state from client cache
  const previousState = cache.readQuery({ query });

  // Update the data with new values
  const data = {
    currentUser: {
      ...previousState.currentUser,
      id,
      email,
      name,
    },
  };

  // Set new state in the client cache
  cache.writeData({ query, data });
  return data.currentUser;
};
