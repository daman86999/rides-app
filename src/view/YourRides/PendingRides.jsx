import { useMutation } from '@apollo/client';
import { Button, Card, CircularProgress } from '@material-ui/core';
import React from 'react';
import { START_RIDE } from '../../queries';
import getdatetime from '../../utils/getdatetime';
import { checkValidArray } from '../../utils/validator';

export default function PendingRides({
  pendingRides,
  refetch,
  driverid,
  classes,
}) {
  const [startRide, { loading: mutationLoading, error: mutationError }] =
    useMutation(START_RIDE, {
      onCompleted: refetch,
    });

  if (mutationError) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: ` START_RIDE query failed`,
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }

  const handleStart = (id) => {
    const data = {
      id,
      ridestarttime: new Date(Date.now()).toISOString(),
      driverid,
    };
    startRide({
      variables: data,
    });
  };

  return checkValidArray(pendingRides)
    ? pendingRides?.map((ride, i) => {
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
            <Button
              variant="contained"
              color="primary"
              disabled={
                ride?.riderequesttime > new Date(Date.now()).toISOString()
              }
              className={classes.submit}
              onClick={() => handleStart(ride?.id)}
            >
              {mutationLoading ? (
                <CircularProgress style={{ color: 'white' }} />
              ) : (
                'Start ride'
              )}
            </Button>
          </Card>
        );
      })
    : 'nill';
}
