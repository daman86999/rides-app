import React, { useState } from 'react';
import {
  Button,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { UPDATE_DRIVER } from '../../queries/UPDATE_DRIVER';

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

const Driver = ({ email }) => {
  const classes = useStyles();

  const [driverDetails, setDriverDetails] = useState({
    drivername: '',
    driverphonenumber: '',
    status: 'available',
  });

  const handleOnChangefordriver = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDriverDetails((prev) => ({ ...prev, [name]: value }));
  };

  const [updateData] = useMutation(UPDATE_DRIVER);

  const handleUpdate = () => {
    const data = {
      ...driverDetails,
      email,
    };
    updateData({
      variables: data,
    });
  };
  const { drivername, driverphonenumber, status } = driverDetails;
  return (
    <div>
      <div className={classes.displayFlex}>
        Drivername: &nbsp; &nbsp;
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="drivername"
          name="drivername"
          value={drivername}
          onChange={handleOnChangefordriver}
          autoFocus
        />
      </div>
      <div className={classes.displayFlex}>
        Email: &nbsp; &nbsp;
        <TextField
          variant="outlined"
          margin="normal"
          disabled
          fullWidth
          required
          id="email"
          name="email"
          autoComplete="email"
          value={email}
          autoFocus
        />
      </div>
      <div className={classes.displayFlex}>
        Phone number: &nbsp; &nbsp;
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="driverphonenumber"
          name="driverphonenumber"
          onChange={handleOnChangefordriver}
          value={driverphonenumber}
          autoFocus
        />
      </div>
      <div className={classes.displayFlex}>
        Status: &nbsp; &nbsp;
        <Select
          labelId="demo-simple-select-outlined-label"
          id="status"
          name="status"
          value={status}
          onChange={handleOnChangefordriver}
        >
          <MenuItem value={'available'}>Available</MenuItem>
          <MenuItem value={'offline'}>Offline</MenuItem>
        </Select>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleUpdate}
      >
        Update Driver
      </Button>
    </div>
  );
};

export default Driver;
