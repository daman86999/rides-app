import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.REACT_APP_GRAPHQL_API}`,
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET_KEY,
      },
    }),
    cache: new InMemoryCache(),
  });
};
export default createApolloClient;
