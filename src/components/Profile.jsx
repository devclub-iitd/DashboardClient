/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Grid, Card, CardActionArea, CardMedia, CardContent, Button, Typography, CardActions,
} from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Control, Form, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../redux/userActionCreator';
// import { fetchUser } from '../actions/userActions';

// const mapStateToProps = state => ({
//   user: state.user,
// });

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  card: {
    maxWidth: '100%',
  },
  media: {
    maxWidth: 300,
  },
  image: {
    width: '100%',
    height: 'auto',
    // border: 'solid blue 3px',
  },
  imgcontainer: {
    // border: 'solid red 3px',
  },
  gcontainer: {
    border: 'solid yellow 3px',
  },
  pad: {
    padding: '1em',
    font: '2rem',
  },
  iconright: {
    position: 'fixed',
  },
}));

const user = {
  email: 'anweshanbor@gmail.com',
  name: 'Anweshan Bor',
  password: '12345678',
  entry_no: '2018EE30878',
  hostel: 'KUMAON',
  gender: 'male',
  join_year: '23/07/2018',
  grad_year: '20/05/2022',
  birth_date: '17/06/1999',
  mobile_number: '9582575393',
  hometown: 'Bishnupur, West Bengal',
  interests: 'Arduino, Machine Learning, RaspberryPi, Python, WebDev, Signal Processing',
  specialization: 'Python, C++, Java, Frontend Webdev',
  intro: 'My name is Anweshan Bor. My name is Anweshan Bor. My name is Anweshan Bor',
  category: 'frontend',
  display_on_website: true,
  url: 'www.linkedin.com/anweshanbor',
  created_by: null,
  updated_by: null,
  privelege_level: 'Approved_User',
};

// const mapDispatchToProps = dispatch => ({
//   fetchUserProfile: uname => dispatch(fetchUserProfile(uname)),
// });

// const uname = 'Anweshan Bor';

const Profile = () => {
  // const classes = useStyles();

  // componentWillMount() {
  //   this.props.fetchUser(0);
  // }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: '',
  //     name: '',
  //     entry_no: '',
  //     hostel: '',
  //     gender: '',
  //     join_year: '',
  //     grad_year: '',
  //     birth_date: '',
  //     mobile_number: '',
  //     hometown: '',
  //     interests: '',
  //     specialization: '',
  //     intro: '',
  //     category: '',
  //     url: '',
  //   };
  // }

  // componentDidMount() {
  //   this.props.fetchUserProfile(uname);
  // }

  // const user = this.props.user;
  // render() {
  const classes = useStyles();
  // const { user } = this.props;
  return (
    <div>
      {/* <img
          src=""
          alt="Profile"
        />
        <br /> */}
      <Fab color="primary" aria-label="edit" className={classes.iconright}>
        <EditIcon />
      </Fab>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Grid className={classes.gcontainer} item sm={9} lg={5}>
          <Card className={classes.card}>
            <img className={classes.image} src="/logo.png" alt="Profile Pic" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="right">
                {user.name}
              </Typography>
              <Typography width="75%" variant="body2" color="textSecondary" component="p" align="right">
                {user.intro}
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <EmailOutlinedIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" color="textPrimary" align="left" display="inline">
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <PhoneIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textPrimary" align="left">
                    {user.mobile_number}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container direction="column" item sm={9} lg={5} justify="space-evenly" spacing={2}>
          <Grid item sm={12}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container direction="row" justify="center">
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                      <b>Entry Number:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                      {user.entry_no}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                      <b>Hostel:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                      {user.hostel}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                      <b>Gender:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                      {user.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                      <b>Join Year:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                      {user.join_year}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                      <b>Grad Year:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                      {user.grad_year}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                      <b>Hometown:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                      {user.hometown}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                      <b>Category:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                      {user.category}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="textPrimary" align="left">
                  <b>Interests</b>
                </Typography>
                <Typography variant="p" gutterBottom color="textPrimary" align="left">
                  {user.interests}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="textPrimary" align="left">
                  <b>Specializations</b>
                </Typography>
                <Typography variant="p" gutterBottom color="textPrimary" align="left">
                  {user.specialization}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {'Add more fields in mind/database/API'}
    </div>
  );
  // }
};

// Profile.propTypes = {
//   fetchUser: PropTypes.func.isRequired,
//   user: PropTypes.object
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export default Profile;
