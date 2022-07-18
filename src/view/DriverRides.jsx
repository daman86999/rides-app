import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { END_RIDE, GET_DRIVER_RIDES } from '../queries';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from '@apollo/client';
import { checkValidArray } from '../utils/validator';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
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
  const { data, error, loading } = useQuery(GET_DRIVER_RIDES, {
    variables: { driverid },
  });
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const incompleteRides = data?.driver?.[0].rides?.filter((ride) => {
    if (!ride?.rideendtime) return true;
  });
  const completedRides = data?.driver?.[0].rides?.filter((ride) => {
    if (ride?.rideendtime) return true;
  });

  // const [endRide] = useMutation(END_RIDE);

  // const handleEnd = (id) => {
  //   const data = { id, rideendtime: new Date(), driverid };
  //   endRide({
  //     variables: data,
  //   });
  // };
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography>Your Incomplete Rides</Typography>
      </Grid>
      <Grid container direction="row">
        {checkValidArray(incompleteRides)
          ? incompleteRides?.map((ride, i) => {
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
                    onClick={() => handleEnd(ride?.id)}
                  >
                    End ride
                  </Button>
                </Card>
              );
            })
          : 'nill'}
      </Grid>
      <Grid item>
        <Typography>Your Completed Rides</Typography>
      </Grid>
      <Grid container direction="row">
        {checkValidArray(completedRides)
          ? completedRides?.map((ride, i) => {
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
                  <div className={classes.displayFlex}>
                    <div>Ride end time</div>
                    <div>{ride?.rideendtime}</div>
                  </div>
                </Card>
              );
            })
          : 'nill'}
      </Grid>
    </Grid>
  );
};

export default DriverRides;
