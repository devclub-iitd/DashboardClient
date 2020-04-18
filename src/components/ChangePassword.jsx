import React from 'react';
import {
  TextField, Button, Grid, Snackbar,
} from '@material-ui/core';

export default function ChangePassword(props) {
  // const [confirmPassError, setConfirmPassError] = React.useState(false);

  const [state, setState] = React.useState({
    password: '',
    ChangePassword: '',
    confirmPassError: null,
    changePassError: props.users.passwordFailed,
  });

  const handleChange = (e, type) => {
    const { value } = e.target;
    setState({
      ...state,
      [type]: value,
    });
    if (type === 'confirmPassword') {
      const { password } = state;
      setState({
        ...state,
        confirmPassError: (value !== password),
      });
    }
  };

  const handlePassErrorClose = () => {
    setState({
      ...state,
      password: '',
      ChangePassword: '',
      confirmPassError: null,
      changePassError: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { confirmPassError } = state;

    if (confirmPassError) {
      return;
    }

    const { target } = e;

    props.changePass(state.password);
    setState({
      ...state,
      password: '',
      confirmPassword: '',
      confirmPassError: null,
      changePassError: false,
    });

    // window.location.reload(false);
  };

  return (
    <div>
      {/* <TextField
        id="current-password"
        label="Current Password"
      />
      <br />
      <TextField
        id="new-password"
        label="New Password"
      />
      <br />
      <TextField
        id="confirm-new-password"
        label="Confirm New Password"
      /> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={state.passwordError}
        autoHideDuration={2000}
        onClose={handlePassErrorClose}
        message="Server Error !!! Try again"
      />
      <Grid container justify="center">
        <Grid item xs={8} md={7} lg={5}>
          <form onSubmit={handleSubmit}>
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="c_password"
              label="Current Password"
              type="password"
              id="password"
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={state.password}
              label="New Password"
              type="password"
              onChange={event => handleChange(event, 'password')}
              id="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              value={state.confirmPassword}
              label=" Confirm Password"
              type="password"
              error={state.confirmPassError}
              onChange={event => handleChange(event, 'confirmPassword')}
              id="confirmPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Change
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
