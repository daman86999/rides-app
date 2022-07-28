import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import Page from '../Page';

export default function RequireAuth({ children }) {
  const { isAuthenticated, subid: driverid } = useAuth0();

  return isAuthenticated ? (
    <Page driverid={driverid}>{children}</Page>
  ) : (
    <Navigate to="/login" replace />
  );
}
