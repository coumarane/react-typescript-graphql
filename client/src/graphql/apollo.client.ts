import ApolloClient, { InMemoryCache } from 'apollo-boost';

const cache = new InMemoryCache({ freezeResults: true });
const apolloClient = new ApolloClient({
  cache,
  uri: process.env.REACT_APP_GRAPH_URI,
  assumeImmutableResults: true
});

export default apolloClient;