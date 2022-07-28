import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GET_DRIVER_RIDES } from '../../queries';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@apollo/client';
import { sendDataToSentry } from '../..';
import PendingRides from './PendingRides';
import ActiveRides from './ActiveRides';
import CompletedRides from './CompletedRides';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: 500,
    padding: theme.spacing(2, 3),
    margin: theme.spacing(2, 2),
  },
}));

const DriverRides = () => {
  const { user } = useAuth0();
  const { sub: driverid } = user;
  const classes = useStyles();
  const { data, error, loading, refetch } = useQuery(GET_DRIVER_RIDES, {
    variables: { driverid },
  });
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: `GET_DRIVER_RIDES query failed`,
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }
  const pendingRides = data?.driver?.[0].rides?.filter((ride) => {
    if (!ride?.ridestarttime && !ride?.rideendtime) return true;
  });
  const activeRides = data?.driver?.[0].rides?.filter((ride) => {
    if (ride?.ridestarttime && !ride?.rideendtime) return true;
  });
  const completedRides = data?.driver?.[0].rides?.filter((ride) => {
    if (ride?.rideendtime) return true;
  });

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography>Your Pending Rides</Typography>
        <Grid container direction="row">
          <PendingRides
            pendingRides={pendingRides}
            refetch={refetch}
            driverid={driverid}
            classes={classes}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography>Your Active Rides</Typography>
      </Grid>
      <Grid container direction="row">
        <ActiveRides
          activeRides={activeRides}
          refetch={refetch}
          driverid={driverid}
          classes={classes}
        />
      </Grid>
      <Grid item>
        <Typography>Your Completed Rides</Typography>
      </Grid>
      <Grid container direction="row">
        <CompletedRides completedRides={completedRides} classes={classes} />
      </Grid>
    </Grid>
  );
};

export default DriverRides;
