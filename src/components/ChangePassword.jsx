/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { TextField, Button, Grid, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function ChangePassword(props) {
    const [state, setState] = React.useState({
        password: '',
        confirmPassword: '',
        confirmPassError: false,
        changePassError: false,
        changeSuccess: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'confirmPassword') {
            const { password } = state;
            setState({
                ...state,
                [name]: value,
                confirmPassError: value !== password,
            });
        } else {
            setState({
                ...state,
                [name]: value,
            });
        }
    };

    const handlePassErrorClose = () => {
        setState({
            ...state,
            changePassError: false,
        });
    };

    const handleSuccessClose = () => {
        setState({
            ...state,
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

        props.changePass(state.password, () => {
            if (props.users.serverError === null) {
                setState({
                    ...state,
                    password: '',
                    confirmPassword: '',
                    confirmPassError: false,
                    changeSuccess: true,
                });
            } else {
                setState({
                    ...state,
                    changePassError: true,
                });
            }
        });
    };

    const { closeDialog } = props;

    return (
        <div>
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={state.password}
                            label="New Password"
                            type="password"
                            onChange={handleChange}
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
                            onChange={handleChange}
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
