import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Driver from './Driver';
import Cabs from './Cab';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
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
  const { user } = useAuth0();
  const { email, sub: driverid } = user;

  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        component="main"
        justifyContent={'space-between'}
        className={classes.root}
      >
        <Grid item xs={8}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Driver email={email} driverid={driverid} />
            <Cabs driverid={driverid} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
