import React from 'react';
import { TextField } from '@material-ui/core';

export default function ChangePassword() {
  return (
    <div>
      <TextField
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
      />
    </div>
  );
}
