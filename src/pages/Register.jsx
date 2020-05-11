import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Backdrop,
    CircularProgress,
    Snackbar,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/userActions';

const styles = (theme) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
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
            success: false,
            failure: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFailureClose = this.handleFailureClose.bind(this);
        this.handleSuccessClose = this.handleSuccessClose.bind(this);
        this.objToStrMap = this.objToStrMap.bind(this);
    }

    handleSuccessClose = () => {
        this.setState({
            ...this.state,
            success: false,
        });
    };

    handleFailureClose = () => {
        this.setState({
            ...this.state,
            failure: false,
        });
    };

    objToStrMap = (obj) => {
        const strMap = new Map();
        Object.keys(obj).map((k) => strMap.set(k, obj[k]));
        return strMap;
    };

    handleSubmit(e) {
        e.preventDefault();

        const { confirmPassError } = this.state;

        if (confirmPassError) {
            return;
        }

        const { target } = e;

        const urlMap = new Map([['', '']]);

        const body = {
            name: target.name.value,
            entry_no: target.entrynumber.value,
            category: target.category.value,
            url: this.objToStrMap(urlMap),
            email: target.email.value,
            password: target.password.value,
        };

        // console.log('Register body:', body);

        // const { register } = this.props;
        // window.location.reload(false);

        this.props.registerUser(body);
        if (this.props.register.errMess === null) {
            this.setState({
                ...this.state,
                success: true,
            });
        } else {
            this.setState({
                ...this.state,
                failure: true,
            });
        }
    }

    handleChange(e, type) {
        const { value } = e.target;
        this.setState({ [type]: value });
        if (type === 'confirmPassword') {
            const { password } = this.state;
            this.setState({ confirmPassError: value !== password });
        }
    }

    render() {
        const { classes, register } = this.props;

        const { confirmPassError } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.success}
                    autoHideDuration={2000}
                    onClose={this.handleSuccessClose}
                    message="Registration Successful! Request for approval sent to Administrator. Wait before login."
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.failure}
                    autoHideDuration={2000}
                    onClose={this.handleFailureClose}
                    message="Registration Failed !! Please try again."
                />
                <Backdrop
                    className={classes.backdrop}
                    open={register.isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="entryNumber"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="entrynumber"
                                    label="Entry Number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="filled"
                                    className={classes.formControl}
                                >
                                    <InputLabel id="category">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        name="category"
                                        label="category"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Fresher">
                                            Fresher
                                        </MenuItem>
                                        <MenuItem value="Sophomore">
                                            Sophomore
                                        </MenuItem>
                                        <MenuItem value="Junior Undergraduate">
                                            Junior Undergraduate
                                        </MenuItem>
                                        <MenuItem value="Senior Undergraduate">
                                            Senior Undergraduate
                                        </MenuItem>
                                        <MenuItem value="Alumni">
                                            Alumni
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) =>
                                        this.handleChange(e, 'password')
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
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
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    register: state.Register,
});

const mapDispatchToProps = (dispatch) => ({
    registerUser: (registerCreds) => dispatch(registerUser(registerCreds)),
});

SignUp.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    register: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))
);
