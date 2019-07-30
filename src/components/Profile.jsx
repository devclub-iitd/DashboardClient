import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <div>
      <img
        src=""
        alt="Profile"
      />
      <br />

      <TextField
        id="name"
        label="Name"
        className={classes.textField}
        margin="normal"
      />
      <br />

      <TextField
        id="entry-number"
        label="Entry Number"
        className={classes.textField}
        margin="normal"
      />
      <br />

      <TextField
        id="email"
        label="Email"
        className={classes.textField}
        margin="normal"
      />
      <br />

      <TextField
        id="dob"
        label="Date of Birth"
        className={classes.textField}
        margin="normal"
      />
      <br />

      {'Add more fields in mind/database/API'}

    </div>
  );
}
