import { React } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';
import Connection from './Connection';
import { RoutesAll } from './routes/Routes';
import Navbar from './components/Navbar';

export default function App() {
  const { isLoading, isAuthenticated, user } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  const client = Connection();
  return (
    <ApolloProvider client={client}>
      <div>
        {isAuthenticated ? <Navbar /> : null}
        <RoutesAll isAuthenticated={isAuthenticated} user={user} />
      </div>
    </ApolloProvider>
  );
}
