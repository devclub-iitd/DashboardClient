import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Backdrop,
    CircularProgress,
    Snackbar,
    MenuItem,
    Avatar,
    Button,
    TextField,
    Grid,
    Typography,
    Paper,
} from '@material-ui/core';
import { withRouter, Redirect } from 'react-router-dom';
import { registerUser, regErrorFin, newRegDone } from '../actions/userActions';
import logo from '../images/LogoSquare.jpg';
import { userCategories } from '../utils/userUtils';

const styles = (theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        overflowY: 'auto',
        scrollbarWidth: 'none',
    },
    avatar: {
        margin: theme.spacing(2),
        width: theme.spacing(15),
        height: theme.spacing(15),
        backgroundColor: '#8e8e93',
    },
    form: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(1),
    },
    categoryField: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '55%',
        },
    },
    submit: {
        width: '64%',
        paddingTop: theme.spacing(0.05),
        paddingBottom: theme.spacing(0.05),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontSize: '1.5rem',
        fontWeight: 600,
        marginLeft: '18%',
        marginRight: '18%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10%',
            marginRight: '10%',
            width: '80%',
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     confirmPassError: false,
        // };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // const { confirmPassError } = this.state;

        // if (confirmPassError) {
        //     return;
        // }

        const { target } = e;

        const body = {
            name: target.name.value,
            entry_no: target.entrynumber.value,
            category: target.category.value,
            email: target.email.value,
            // password: target.password.value,
        };

        const { register, registerUser: registerUserDis } = this.props;

        registerUserDis(body);
        if (register.errMess === null) {
            this.setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        } else if (register.errMess === 'Error') {
            this.setState((prevState) => ({
                ...prevState,
                failure: true,
            }));
        }
    };

    handleChange = (e, type) => {
        const { value } = e.target;
        // this.setState({ [type]: value });
        this.setState((prevState) => ({
            ...prevState,
            [type]: value,
        }));
        // if (type === 'confirmPassword') {
        //     const { password } = this.state;
        //     this.setState({ confirmPassError: value !== password });
        // }
    };

    render() {
        const {
            classes,
            register,
            sucErrFin,
            auth,
            newRegDone: newRegDoneT,
        } = this.props;

        // const { confirmPassError } = this.state;
        // if (auth.isAuthenticated) {
        //     return <Redirect to="/dashboard/home" />;
        // }

        if (register.isRegistered || !auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        return (
            <Grid
                container
                component={Paper}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.root}
            >
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={register.newReg}
                    autoHideDuration={6000}
                    onClose={newRegDoneT}
                    message="Just a few more details required to get you started with Dashboard"
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={register.errMess === 'Success'}
                    autoHideDuration={4000}
                    onClose={sucErrFin}
                    message="Registration Successful! Request for approval sent to Administrator. Wait before logging in."
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={register.errMess === 'Error'}
                    autoHideDuration={2000}
                    onClose={sucErrFin}
                    message="Registration Failed !! Please try again."
                />
                {/* <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={register.errMess === 'register'}
                    autoHideDuration={6000}
                    onClose={sucErrFin}
                    message="A few more details required before approval request is sent to DevClub Admin"
                /> */}
                <Backdrop
                    className={classes.backdrop}
                    open={register.isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Grid
                    justify="center"
                    alignContent="center"
                    item
                    container
                    xs={10}
                    sm={8}
                    md={6}
                    lg={4}
                    component={Paper}
                >
                    <Grid item>
                        <Avatar
                            alt="Logo"
                            src={logo}
                            className={classes.avatar}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="center" component="h1" variant="h2">
                            Register
                        </Typography>
                    </Grid>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            name="name"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                        />
                        <TextField
                            name="entryNumber"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="entrynumber"
                            label="Entry Number"
                        />
                        <TextField
                            id="category"
                            select
                            name="category"
                            label="Category"
                            variant="outlined"
                            defaultValue="Fresher"
                            className={classes.categoryField}
                            margin="dense"
                            required
                        >
                            {userCategories.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                        {/* <TextField
                            variant="outlined"
                            required
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e) => this.handleChange(e, 'password')}
                        />
                        <TextField
                            variant="outlined"
                            required
                            margin="normal"
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            error={confirmPassError}
                            onChange={(e) =>
                                this.handleChange(e, 'confirmPassword')
                            }
                        /> */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                        >
                            Send Registration
                        </Button>
                        {/* <Grid container justify="center">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    <p
                                        style={{
                                            color: '#49ceeb',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Already have an account? Sign in
                                    </p>
                                </Link>
                            </Grid>
                        </Grid> */}
                    </form>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    register: state.Register,
    auth: state.Auth,
});

const mapDispatchToProps = (dispatch) => ({
    registerUser: (registerCreds) => dispatch(registerUser(registerCreds)),
    sucErrFin: () => dispatch(regErrorFin()),
    newRegDone: () => dispatch(newRegDone()),
});

SignUp.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    register: PropTypes.objectOf(PropTypes.any).isRequired,
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    registerUser: PropTypes.func.isRequired,
    sucErrFin: PropTypes.func.isRequired,
    newRegDone: PropTypes.func.isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))
);
