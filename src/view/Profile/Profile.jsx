import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Driver from './Driver';
import Cabs from './Cab';
import { GET_DRIVER_INFO } from '../../queries';
import { useQuery } from '@apollo/client';
import { sendDataToSentry } from '../..';

const useStyles = makeStyles((theme) => ({
  root2: {
    height: '100vh',
  },
  root: {
    margin: theme.spacing(2, 0),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 2),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { user } = useAuth0();
  const { sub: driverid } = user;

  const { data, error, loading, refetch } = useQuery(GET_DRIVER_INFO, {
    variables: { driverid },
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: `GET_DRIVER_INFO query failed`,
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }

  const driver = data?.driver?.[0];
  const cab = data?.driver?.[0]?.cab?.[0];

  return (
    <div className={classes.root}>
      <Grid
        container
        component="main"
        justifyContent={'space-between'}
        className={classes.root2}
      >
        <Grid item xs={8}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Driver driver={driver} refetch={refetch} />
            <Cabs cab={cab} refetch={refetch} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
