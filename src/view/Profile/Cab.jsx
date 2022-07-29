import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { INSERT_CAB, UPDATE_CAB } from '../../queries';
import { useMutation } from '@apollo/client';
import { validateData } from '../../utils/validator';

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

const Cabs = ({ cab }) => {
  const classes = useStyles();

  const [cabDetails, setCabDetials] = useState({
    baserate: cab?.baserate ?? '',
    cabmodel: cab?.cabmodel ?? '',
    cabtype: cab?.cabtype ?? '',
    carbrand: cab?.carbrand ?? '',
    registrationnumber: cab?.registrationnumber ?? '',
  });

  const validData = validateData(cab);

  const mutationQuery = validData ? UPDATE_CAB : INSERT_CAB;

  const [updateData, { error, loading }] = useMutation(mutationQuery);

  if (error) {
    sendDataToSentry({
      name: 'GraphQL Error',
      message: 'INSERT_CAB query failed',
      tags: { severity: 'CRITICAL' },
      extra: [{ type: 'errorEncounter', error }],
    });
    return <div>Error!</div>;
  }

  const handleOnChangeforCab = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCabDetials((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    const data = {
      ...cabDetails,
      driverid: cab?.driverid,
    };
    updateData({
      variables: data,
    });
  };

  const { baserate, cabmodel, cabtype, carbrand, registrationnumber } =
    cabDetails;

  return (
    <div>
      {' '}
      <div className={classes.displayFlex}>
        CabModel: &nbsp; &nbsp;
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="cabmodel"
          name="cabmodel"
          value={cabmodel}
          onChange={handleOnChangeforCab}
          autoFocus
        />
      </div>
      <div className={classes.displayFlex}>
        CabType: &nbsp; &nbsp;
        <Select
          labelId="demo-simple-select-outlined-label"
          id="cabtype"
          name="cabtype"
          value={cabtype}
          onChange={handleOnChangeforCab}
        >
          <MenuItem value={'Hatchback'}>Hatchback</MenuItem>
          <MenuItem value={'SUV'}>SUV</MenuItem>
          <MenuItem value={'Sedan'}>Sedan</MenuItem>
        </Select>
      </div>
      <div className={classes.displayFlex}>
        Cab Registraion Number: &nbsp; &nbsp;
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="registrationnumber"
          name="registrationnumber"
          value={registrationnumber}
          onChange={handleOnChangeforCab}
          autoFocus
        />
      </div>
      <div className={classes.displayFlex}>
        Cab Brand: &nbsp; &nbsp;
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="carbrand"
          name="carbrand"
          value={carbrand}
          onChange={handleOnChangeforCab}
          autoFocus
        />
      </div>
      <div className={classes.displayFlex}>
        Cab baserate: &nbsp; &nbsp;
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="baserate"
          name="baserate"
          value={baserate}
          onChange={handleOnChangeforCab}
          autoFocus
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleUpdate}
      >
        {loading ? (
          <CircularProgress style={{ color: 'white' }} />
        ) : validData ? (
          'Update Cab'
        ) : (
          'Insert Cab'
        )}
      </Button>
    </div>
  );
};
export default Cabs;
