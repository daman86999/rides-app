import React from 'react';
import Navbar from './components/Navbar';
import { GET_DRIVER_INFO } from './queries/GET_DRIVER_INFO ';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';

export default function Page({ children, driverid }) {
  const { data, error, loading } = useQuery(GET_DRIVER_INFO, {
    variables: { driverid },
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error || mutationError) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: `${error ? 'GET_AVAILABLE_RIDES' : 'ACCEPT_RIDE'} query failed`,
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }
  console.log({ data });

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
