import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.REACT_APP_GRAPHQL_API}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};
export default createApolloClient;
