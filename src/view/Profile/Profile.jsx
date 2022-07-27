import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Driver from './Driver';
import Cabs from './Cab';

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
  const { user } = useAuth0();
  const { email, sub: driverid } = user;

  const classes = useStyles();

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
            <Driver email={email} driverid={driverid} />
            <Cabs driverid={driverid} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
