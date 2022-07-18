import React, { useState } from 'react';
import {
  Button,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { INSERT_CAB } from '../../queries';
import { useMutation } from '@apollo/client';

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

const Cabs = ({ driverid }) => {
  const classes = useStyles();
  const [cabDetails, setCabDetials] = useState({
    baserate: '',
    cabmodel: '',
    cabtype: '',
    carbrand: '',
    registrationnumber: '',
  });
  const handleOnChangeforCab = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCabDetials((prev) => ({ ...prev, [name]: value }));
  };
  const [updateData] = useMutation(INSERT_CAB);

  const handleUpdate = () => {
    const data = {
      ...cabDetails,
      driverid,
    };
    // console.log({ cab: data });
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
        Update Cab
      </Button>
    </div>
  );
};
export default Cabs;
