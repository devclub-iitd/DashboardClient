/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Button,
    TextField,
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
import { Redirect, withRouter, Link } from 'react-router-dom';
import { loginUser, loginErrorFin } from '../actions/userActions';
import logo from '../images/LogoSVG.svg';

const styles = (theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.default,
    },
    image: {
        backgroundImage: `url(${logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    imagePaper: {
        // height: document.documentElement.clientHeight * 0.5,
        backgroundColor: '#8e8e93',
        margin: theme.spacing(5, 5, 0),
        paddingBottom: '1.5em',
    },
    paper: {
        margin: theme.spacing(4),
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
    inputs: {
        color: '#8e8e93',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(1),
    },
    submit: {
        width: '56%',
        paddingTop: theme.spacing(0.05),
        paddingBottom: theme.spacing(0.05),
        marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(1),
        fontSize: '1.5rem',
        fontWeight: 600,
        marginLeft: '22%',
        marginRight: '22%',
    },
    errSnack: {
        backgroundColor: 'black',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

function SignInSide(props) {
    const { classes, login, auth } = props;

    const [uname, setUsername] = React.useState('');
    const changeUsername = (event) => {
        setUsername(event.target.value);
    };

    const [pass, setPassword] = React.useState('');
    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleClose = () => {
        props.finishError();
    };

    const handleSubmit = () => {
        const creds = {
            entry_no: uname,
            password: pass,
        };
        login(creds);
    };

    if (auth.isLoading) {
        return (
            <Backdrop className={classes.backdrop} open={auth.isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (auth.isAuthenticated) {
        return <Redirect to="/dashboard/home" />;
    }

    return (
        <Grid
            className={classes.root}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
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
                    <TextField
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
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="center">
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
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

SignInSide.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    // errorMsg: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    finishError: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    // errorMsg: state.loginReducer.errorMsg,
    auth: state.Auth,
});

const mapDispatchToProps = (dispatch) => ({
    login: (creds) => dispatch(loginUser(creds)),
    finishError: () => dispatch(loginErrorFin()),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInSide))
);
