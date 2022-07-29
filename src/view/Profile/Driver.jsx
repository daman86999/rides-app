import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { UPDATE_DRIVER } from '../../queries/UPDATE_DRIVER';
import { sendDataToSentry } from '../..';

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

const Driver = ({ driver, refetch }) => {
  const classes = useStyles();

  const [driverDetails, setDriverDetails] = useState({
    drivername: driver?.drivername ?? '',
    email: driver?.email ?? '',
    driverphonenumber: driver?.driverphonenumber ?? '',
    status: driver?.status ?? 'available',
  });

  const [updateData, { loading, error }] = useMutation(UPDATE_DRIVER, {
    onCompleted: refetch,
  });

  if (error) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: 'UPDATE_DRIVER query failed',
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }

  const handleOnChangefordriver = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDriverDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    const data = {
      ...driverDetails,
      driverid: driver?.driverid,
    };
    updateData({
      variables: data,
    });
  };

  const { drivername, driverphonenumber, email, status } = driverDetails;

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
          inputProps={{ inputMode: 'numeric', pattern: '^[0-9]{10}$' }}
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
        {loading ? (
          <CircularProgress style={{ color: 'white' }} />
        ) : (
          'Update Driver'
        )}
      </Button>
    </div>
  );
};

export default Driver;
