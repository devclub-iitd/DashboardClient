import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormLabel } from '@material-ui/core';
import postRegister from '../actions/registerActions';

const mapStateToProps = state => ({
  errorMsg: state.registerReducer.errorMsg,
});

const mapDispatchToProps = dispatch => ({
  postRegister: postRegister(dispatch),
});

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
});


class SignUp extends React.Component {
  state = {
    confirmPassError: false,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { confirmPassError } = this.state;

    if (confirmPassError) {
      return;
    }

    const { target } = e;

    const body = {
      name: target.name.value,
      entryNumber: target.entrynumber.value,
      email: target.email.value,
      password: target.password.value,
    };

    const { postRegister: postReg } = this.props;

    postReg(body);
  }

  handleChange(e, type) {
    const { value } = e.target;
    this.setState({ [type]: value });
    if (type === 'confirmPassword') {
      const { password } = this.state;
      this.setState({ confirmPassError: (value !== password) });
    }
  }

  render() {
    const { classes, errorMsg } = this.props;

    const { confirmPassError } = this.state;
    return (
      <Container component="main" maxWidth="xs">
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
                  autoFocus
                />
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
                  onChange={e => this.handleChange(e, 'password')}
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
                  onChange={e => this.handleChange(e, 'confirmPassword')}
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
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <FormLabel error>
              {errorMsg}
            </FormLabel>
          </form>
        </div>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  postRegister: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
