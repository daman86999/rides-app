import { React } from 'react';
// import Dashboard from './Dashboard/Dashboard';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginSignup from './view/Login';
import { CircularProgress } from '@material-ui/core';
import Profile from './view/Profile';
import { ApolloProvider } from '@apollo/client';
import Connection from './Connection';
import useAccessToken from './hooks/useAcessToken';

export default function App() {
  const idToken = useAccessToken();
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) {
    return <CircularProgress />;
  }

  const client = Connection(idToken);
  return (
    <ApolloProvider client={client}>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={!isAuthenticated ? '/login' : '/profile'} />}
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}
