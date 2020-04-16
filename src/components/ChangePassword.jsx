import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

export default function ChangePassword(props) {
  const [confirmPassError, setConfirmPassError] = React.useState(false);

  handleChange(e, type) {
    const { value } = e.target;
    this.setState({ [type]: value });
    if (type === 'confirmPassword') {
      const { password } = this.state;
      this.setState({ confirmPassError: (value !== password) });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { confirmPassError } = this.state;

    if (confirmPassError) {
      return;
    }

    const { target } = e;

    props.changePass(target.password.value);

    window.location.reload(false);

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
              label=" Confirm Password"
              type="password"
              error={confirmPassError}
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
