import React from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(2, 1),
    display: 'flex',
  },
  logo: {
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    marginLeft: theme.spacing(10),
    '&:hover': {
      borderBottom: '1px solid white',
    },
  },
  logout: {
    marginLeft: theme.spacing(20),
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.flex}>
        <Typography variant="h6" className={classes.logo}>
          Rides App
        </Typography>

        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/yourrides" className={classes.link}>
            Your Rides
          </Link>
          <Link to="/profile" className={classes.link}>
            Profile
          </Link>
        </div>
        <div className={classes.logout}>
          <LogoutButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
