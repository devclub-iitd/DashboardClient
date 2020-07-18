/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { TextField, Button, Grid, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function ChangePassword(props) {
    // const [confirmPassError, setConfirmPassError] = React.useState(false);
    // const { closeDialog } = props;

    const [state, setState] = React.useState({
        password: '',
        ChangePassword: '',
        confirmPassError: null,
        changePassError: false,
        changeSuccess: false,
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
                confirmPassError: value !== password,
            });
        }
    };

    const handlePassErrorClose = () => {
        setState({
            ...state,
            // password: '',
            // ChangePassword: '',
            // confirmPassError: null,
            changePassError: false,
        });
    };

    const handleSuccessClose = () => {
        setState({
            ...state,
            // password: '',
            // ChangePassword: '',
            // confirmPassError: null,
            changeSuccess: false,
        });
        props.closeDialog();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { confirmPassError } = state;

        if (confirmPassError) {
            return;
        }

        props.changePass(state.password);
        setState({
            ...state,
            password: '',
            confirmPassword: '',
            confirmPassError: null,
        });

        if (props.users.serverError === null) {
            setState({
                ...state,
                password: '',
                ChangePassword: '',
                confirmPassError: null,
                changeSuccess: true,
            });
        } else {
            setState({
                ...state,
                // password: '',
                // ChangePassword: '',
                // confirmPassError: null,
                changePassError: true,
            });
        }
        // props.closeDialog();
        // window.location.reload(false);
    };

    const { closeDialog } = props;

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
                open={state.changePassError}
                autoHideDuration={3000}
                onClose={handlePassErrorClose}
                message="Server Error !!! Try again"
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={state.changeSuccess}
                autoHideDuration={1500}
                onClose={handleSuccessClose}
                message="Password changed succesfully !"
            />
            <Grid container justify="center">
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    item
                    xs={12}
                >
                    <form onSubmit={handleSubmit}>
                        {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="c_password"
              label="Current Password"
              type="password"sm
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
                            onChange={(event) =>
                                handleChange(event, 'password')
                            }
                            id="password"
                            autoFocus
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
                            onChange={(event) =>
                                handleChange(event, 'confirmPassword')
                            }
                            id="confirmPassword"
                        />
                        <Grid
                            container
                            justify="space-evenly"
                            alignItems="center"
                            style={{ marginTop: '16px' }}
                        >
                            <Grid item xs={5}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Change
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

ChangePassword.propTypes = {
    changePass: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
};
