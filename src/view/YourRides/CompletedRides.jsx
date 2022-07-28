import { Card } from '@material-ui/core';
import React from 'react';
import getdatetime from '../../utils/getdatetime';
import { checkValidArray } from '../../utils/validator';

export default function CompletedRides({ completedRides, classes }) {
  return checkValidArray(completedRides)
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
              <div>Ride Request time</div>
              <div>{getdatetime(ride?.riderequesttime)}</div>
            </div>
            <div className={classes.displayFlex}>
              <div>Ride Start time</div>
              <div>{getdatetime(ride?.ridestarttime)}</div>
            </div>
            <div className={classes.displayFlex}>
              <div>Ride end time</div>
              <div>{getdatetime(ride?.rideendtime)}</div>
            </div>
          </Card>
        );
      })
    : 'nill';
}
