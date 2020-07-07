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
import { withRouter, Link } from 'react-router-dom';
import { registerUser, regErrorFin } from '../actions/userActions';
import logo from '../images/LogoSquare.jpg';

const styles = (theme) => ({
    // '@global': {
    //     body: {
    //         backgroundColor: theme.palette.background.default,
    //     },
    // },
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.default,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        width: theme.spacing(15),
        height: theme.spacing(15),
        backgroundColor: '#8e8e93',
    },
    form: {
        // width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(3),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(1),
    },
    categoryField: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
    submit: {
        // margin: theme.spacing(3, 0, 2),
        width: '56%',
        paddingTop: theme.spacing(0.05),
        paddingBottom: theme.spacing(0.05),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        fontSize: '1.5rem',
        fontWeight: 600,
        marginLeft: '22%',
        marginRight: '22%',
    },
    buttonDiv: {
        width: '56%',
        // paddingTop: theme.spacing(0.05),
        // paddingBottom: theme.spacing(0.05),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        // fontSize: '1.5rem',
        // fontWeight: 600,
        marginLeft: '22%',
        marginRight: '22%',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmPassError: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { confirmPassError } = this.state;

        if (confirmPassError) {
            return;
        }

        const { target } = e;

        const body = {
            name: target.name.value,
            entry_no: target.entrynumber.value,
            category: target.category.value,
            email: target.email.value,
            password: target.password.value,
        };

        // console.log('Register body:', body);

        // const { register } = this.props;
        // window.location.reload(false);
        const { register, registerUser: registerUserDis } = this.props;

        registerUserDis(body);
        if (register.errMess === null) {
            this.setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                failure: true,
            }));
        }
    };

    handleChange = (e, type) => {
        const { value } = e.target;
        this.setState({ [type]: value });
        if (type === 'confirmPassword') {
            const { password } = this.state;
            this.setState({ confirmPassError: value !== password });
        }
    };

    render() {
        const { classes, register, sucErrFin } = this.props;

        const { confirmPassError } = this.state;
        const categories = [
            'Fresher',
            'Sophomore',
            'Junior Undergraduate',
            'Senior Undergraduate',
            'Alumni',
        ];

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
                    open={register.errMess === 'Success'}
                    autoHideDuration={4000}
                    onClose={sucErrFin}
                    message="Registration Successful! Request for approval sent to Administrator. Wait before login."
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
                <Backdrop
                    className={classes.backdrop}
                    open={register.isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/* <CssBaseline /> */}
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
                            margin="normal"
                            required
                        >
                            {categories.map((option) => (
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
                        <TextField
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
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="center">
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
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    register: state.Register,
});

const mapDispatchToProps = (dispatch) => ({
    registerUser: (registerCreds) => dispatch(registerUser(registerCreds)),
    sucErrFin: () => dispatch(regErrorFin()),
});

SignUp.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    register: PropTypes.objectOf(PropTypes.any).isRequired,
    registerUser: PropTypes.func.isRequired,
    sucErrFin: PropTypes.func.isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))
);
