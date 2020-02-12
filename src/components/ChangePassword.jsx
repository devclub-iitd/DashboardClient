import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

export default function ChangePassword() {
  const handleSubmit = () => (true);
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
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="c_password"
              label="Current Password"
              type="password"
              id="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="n_password"
              id="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label=" Confirm Password"
              type="co_password"
              id="password"
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
