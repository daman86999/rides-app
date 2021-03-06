import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AVAILABLE_RIDES } from '../queries/GET_AVAILABLE_RIDES';
import { ACCEPT_RIDE } from '../queries';
import { checkValidArray } from '../utils/validator';
import { sendDataToSentry } from '..';

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

const Dashboard = ({ driverid }) => {
  const classes = useStyles();
  const { data, error, loading } = useQuery(GET_AVAILABLE_RIDES);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: 'GET_AVAILABLE_RIDES query failed',
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }

  // const [acceptride] = useMutation(ACCEPT_RIDE);

  // const handleAccept = (id) => {
  //   const data = { id, driverid };
  //   acceptride({
  //     variables: data,
  //   });
  // };
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography>Rides Available</Typography>
      </Grid>
      <Grid container direction="row">
        {checkValidArray(data?.rides)
          ? data?.rides?.map((ride, i) => {
              return (
                <Card key={i} className={classes.card}>
                  <div className={classes.displayFlex}>
                    <div>id</div>
                    <div>{ride?.id}</div>
                  </div>
                  <div className={classes.displayFlex}>
                    <div>Ride Start Location</div>
                    <div>{ride?.ridestartlocation}</div>
                  </div>
                  <div className={classes.displayFlex}>
                    <div>Ride End Location</div>
                    <div>{ride?.rideendlocation}</div>
                  </div>
                  <div className={classes.displayFlex}>
                    <div>Ride Start time</div>
                    <div>{ride?.ridestarttime}</div>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => handleAccept(ride?.id)}
                  >
                    Accept
                  </Button>
                </Card>
              );
            })
          : 'nill'}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
