import { useMutation } from '@apollo/client';
import { Button, Card, CircularProgress } from '@material-ui/core';
import React from 'react';
import { sendDataToSentry } from '../..';
import { END_RIDE } from '../../queries';
import getdatetime from '../../utils/getdatetime';
import { checkValidArray } from '../../utils/validator';

export default function ActiveRides({
  activeRides,
  refetch,
  driverid,
  classes,
}) {
  const [endRide, { loading: mutationLoading, error: mutationError }] =
    useMutation(END_RIDE, {
      onCompleted: refetch,
    });

  if (mutationError) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: `END_RIDE query failed`,
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }

  const handleEnd = (id) => {
    const data = {
      id,
      rideendtime: new Date(Date.now()).toISOString(),
      driverid,
    };
    endRide({
      variables: data,
    });
  };

  return checkValidArray(activeRides)
    ? activeRides?.map((ride, i) => {
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
              <div>Ride Request time</div>
              <div>{getdatetime(ride?.riderequesttime)}</div>
            </div>
            <div className={classes.displayFlex}>
              <div>Ride Start time</div>
              <div>{getdatetime(ride?.ridestarttime)}</div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleEnd(ride?.id)}
            >
              {mutationLoading ? (
                <CircularProgress style={{ color: 'white' }} />
              ) : (
                'End ride'
              )}
            </Button>
          </Card>
        );
      })
    : 'nill';
}
