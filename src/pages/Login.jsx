import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormLabel } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
// import login from '../actions/loginActions';
import { loginUser, loginErrorFin } from '../actions/userActions';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(./logo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

  const [errMess, setErrMess] = React.useState(auth.loginFailed);
  const handleClose = () => {
    // setErrMess(false);
    props.finishError();
  };

  const handleSubmit = () => {
    const creds = {
      entry_no: uname,
      password: pass,
    };
    console.log(creds);
    console.log(JSON.stringify(creds));
    login(creds);
  };

  // if (auth.isAuthenticated) {
  //   return <Redirect to="/dashboard/home" />;
  // }

  if (auth.isLoading) {
    return (
      <Backdrop className={classes.backdrop} open={auth.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <Redirect to="/dashboard/home" />
    );
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={auth.errMess !== null}
        autoHideDuration={2000}
        onClose={handleClose}
        message={auth.errMess === 'Unapproved' ? 'You are not approved yet. Ask the admin to approve your registration !' : 'Login Error !!! Try again'}
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
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className="h1" variant="h3">
            Club DashBoard
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
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
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <FormLabel error>
              {/* {errorMsg} */}
            </FormLabel>
            <Box mt={5}>
              {/* <MadeWithLove /> */}
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
// };


SignInSide.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  // errorMsg: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  finishError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // errorMsg: state.loginReducer.errorMsg,
  auth: state.Auth,
});

const mapDispatchToProps = dispatch => ({
  login: creds => dispatch(loginUser(creds)),
  finishError: () => dispatch(loginErrorFin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInSide));
