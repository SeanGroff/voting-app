import React from 'react';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from 'apollo-client-preset';
import { withClientState } from 'apollo-link-state';
import { CachePersistor } from 'apollo-cache-persist';

import defaultState from '../graphql/defaultState';
import resolvers from '../graphql/resolvers';

const httpLink = new HttpLink({ uri: 'http://localhost:1337/graphql' });

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: localStorage,
});

const stateLink = withClientState({
  cache,
  resolvers,
  defaults: defaultState,
});

const link = ApolloLink.from([stateLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true, // Needs Production env variable
});

export default function SetupApolloHOC(WrappedComponent) {
  return props => (
    <ApolloProvider client={client}>
      <WrappedComponent persistor={persistor} {...props} />
    </ApolloProvider>
  );
}
