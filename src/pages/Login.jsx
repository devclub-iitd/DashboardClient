/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Button,
    // TextField,
    Paper,
    Grid,
    Backdrop,
    Snackbar,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { loginErrorFin } from '../actions/userActions';
import logo from '../images/LogoSVG.svg';
import { casiAuthURL } from '../data/api_links';

const styles = (theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.default,
    },
    imagePaper: {
        backgroundColor: '#8e8e93',
        margin: theme.spacing(5, 5, 0),
        paddingBottom: '1.5em',
    },
    logo: {
        height: 'auto',
        width: '82%',
        marginLeft: '9%',
        marginRight: '9%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(0),
        },
    },
    name: {
        color: '#d5d3d3',
        fontWeight: '600',
    },
    form: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(1),
    },
    casiLogin: {
        width: '80%',
        paddingTop: theme.spacing(0.1),
        paddingBottom: theme.spacing(0.1),
        marginTop: theme.spacing(2),
        fontSize: '1.5rem',
        fontWeight: 600,
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

function SignInSide(props) {
    const { classes, auth } = props;

    // const [uname, setUsername] = React.useState('');
    // const changeUsername = (event) => {
    //     setUsername(event.target.value);
    // };

    // const [pass, setPassword] = React.useState('');
    // const changePassword = (event) => {
    //     setPassword(event.target.value);
    // };

    const handleClose = () => {
        props.finishError();
    };

    const handleSubmit = () => {
        // const creds = {
        //     entry_no: uname,
        //     password: pass,
        // };
        // login(creds);
        window.location.href = casiAuthURL;
    };

    // if (auth.isLoading) {
    //     return (
    //         <Backdrop className={classes.backdrop} open={auth.isLoading}>
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //     );
    // }

    if (auth.isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    // if (!auth.isRegistered) {
    //     return <Redirect to="/register" />;
    // }

    return (
        <Grid
            className={classes.root}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Backdrop className={classes.backdrop} open={auth.isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={auth.errMess !== null}
                autoHideDuration={3000}
                onClose={handleClose}
                message={
                    auth.errMess === 'Unapproved'
                        ? 'You are not approved yet. Ask the admin to approve your registration !'
                        : 'Login Error !!! Try again'
                }
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={auth.sessionTimeout}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Your session has timed out!! Login again"
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={auth.isRegistered}
                autoHideDuration={5000}
                onClose={handleClose}
                message="Registration Successful! Request for approval sent to Administrator. Wait before logging in."
            />
            <Grid item xs={10} sm={8} md={6} lg={4} component={Paper}>
                <Paper className={classes.imagePaper}>
                    <img className={classes.logo} src={logo} alt="Logo" />
                    <Typography
                        className={classes.name}
                        align="center"
                        variant="h2"
                    >
                        Dashboard
                    </Typography>
                </Paper>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {/* <TextField
                        variant="outlined"
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Entry Number"
                        value={uname}
                        onChange={changeUsername}
                        name="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        value={pass}
                        onChange={changePassword}
                        type="password"
                        id="password"
                    /> */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.casiLogin}
                    >
                        Login with DevClub CASI
                    </Button>
                    {/* <Grid container justify="center">
                        <Grid item>
                            <Link to="/register" variant="body2">
                                <p
                                    style={{
                                        color: '#49ceeb',
                                        fontWeight: 500,
                                    }}
                                >
                                    Don&#39;t have an account? Sign Up
                                </p>
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </Grid>
        </Grid>
    );
}

SignInSide.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    // login: PropTypes.func.isRequired,
    finishError: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.Auth,
});

const mapDispatchToProps = (dispatch) => ({
    // login: (creds) => dispatch(loginUser(creds)),
    finishError: () => dispatch(loginErrorFin()),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInSide))
);
