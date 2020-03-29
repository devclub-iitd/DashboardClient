/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions,
  Dialog, DialogTitle,
  Modal, Backdrop, DialogContent,
  FormLabel, FormControlLabel, Radio, RadioGroup, FormControl,
} from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {
  Control, Form, LocalForm, Errors,
} from 'react-redux-form';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';

import {
  Label, ModalHeader, ModalBody, Button, Row, Col,
} from 'reactstrap';


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
  modal: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // margin: 'auto',
    // marginLeft: '20rem',
    // marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

// const user = {
//   email: 'anweshanbor@gmail.com',
//   name: 'Anweshan Bor',
//   password: '12345678',
//   entry_no: '2018EE30878',
//   hostel: 'KUMAON',
//   gender: 'male',
//   join_year: '23/07/2018',
//   grad_year: '20/05/2022',
//   birth_date: '17/06/1999',
//   mobile_number: '9582575393',
//   hometown: 'Bishnupur, West Bengal',
//   interests: 'Arduino, Machine Learning, RaspberryPi, Python, WebDev, Signal Processing',
//   specialization: 'Python, C++, Java, Frontend Webdev',
//   intro: 'My name is Anweshan Bor. My name is Anweshan Bor. My name is Anweshan Bor',
//   category: 'frontend',
//   display_on_website: true,
//   url: 'www.linkedin.com/anweshanbor',
//   created_by: null,
//   updated_by: null,
//   privelege_level: 'Approved_User',
// };

const userProfile = {
  email: 'anweshanbor@gmail.com',
  name: 'Anweshan Bor',
  // password: '12345678',
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
  // display_on_website: true,
  url: 'www.linkedin.com/anweshanbor',
  // created_by: null,
  // updated_by: null,
  // privelege_level: 'Approved_User',
};

// const mapDispatchToProps = dispatch => ({
//   fetchUserProfile: uname => dispatch(fetchUserProfile(uname)),
// });

// const uname = 'Anweshan Bor';

const Profile = () => {
  const classes = useStyles();
  // const { user } = this.props;
  // let isModalOpen = false;
  const [user, setUser] = React.useState({
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
    url: [
      { type: 'linkedIn', url: 'www.linkedin.com/anweshanbor' },
    ],
    created_by: null,
    updated_by: null,
    privelege_level: 'Approved_User',
  });

  const [userOrg, setUserOrg] = React.useState(user);

  const handleFormValuesChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: [event.target.value],
    });
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    console.log('toggling modal to: ');
    // isModalOpen = !isModalOpen;
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  const [DOB, setDOB] = React.useState(new Date(Date.now()));
  const DOBChange = (date) => {
    setDOB(date);
  };

  const [urlFields, setUrlFields] = React.useState(user.url);
  const handleAddUrlFields = () => {
    const values = [...urlFields];
    values.push({ type: '', url: '' });
    setUrlFields(values);
    setUser({
      ...user,
      url: urlFields,
    });
  };

  const handleRemoveUrlFields = (index) => {
    const values = [...urlFields];
    values.splice(index, 1);
    setUrlFields(values);
    setUser({
      ...user,
      url: urlFields,
    });
  };

  const handleUrlFieldChange = (index, event) => {
    const values = [...urlFields];
    if (event.target.name === 'type') {
      values[index].type = event.target.value;
    } else {
      values[index].url = event.target.value;
    }
    setUrlFields(values);
    setUser({
      ...user,
      url: urlFields,
    });
  };

  const handleSubmit = (values) => {
    setUserOrg(user);
    handleClose();
    console.log('Submitting user details update info: ', values);
  };

  const cancelEdit = () => {
    setUser(userOrg);
    handleClose();
    console.log(user);
  };

  // const required = () => user.name && user.name.length;

  const required = val => val && val.length;
  const maxLength = (val, len) => !(val) || (val.length <= len);
  const minLength = (val, len) => (val) && (val.length >= len);

  return (
    <div>
      {/* <img
          src=""
          alt="Profile"
        />
        <br /> */}
      {/* className={classes.iconright} */}
      <Fab onClick={handleOpen} color="primary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <div>
          <Dialog open={isModalOpen} maxWidth="md" fullWidth onClose={() => { handleClose(); cancelEdit(); }} scroll="paper">
            <DialogTitle>
              <Typography variant="h4" className={classes.head}>
                Edit Your Profile
              </Typography>
            </DialogTitle>
            <DialogContent>
              <LocalForm model="userDetailUpdateForm" onSubmit={values => handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="name" md={4}><h6>Name:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder="Name*"
                      value={user.name}
                      onChange={handleFormValuesChange}
                      className="form-control"
                      validators={{
                        required, minLength: minLength(1), maxLength: maxLength(20),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 25 characters or less',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="entry_no" md={4}><h6>Entry Number:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".entry_no"
                      id="entry_no"
                      name="entry_no"
                      value={user.entry_no}
                      onChange={handleFormValuesChange}
                      placeholder="Entry Number*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(1), maxLength: maxLength(20),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".entry_no"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 25 characters or less',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="entry_no" md={4}><h6>Email:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleFormValuesChange}
                      placeholder="Email*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(1), maxLength: maxLength(20),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".email"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 25 characters or less',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="hostel" md={4}><h6>Hostel:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".hostel"
                      id="hostel"
                      name="emhostelail"
                      value={user.hostel}
                      onChange={handleFormValuesChange}
                      placeholder="Hostel*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(1), maxLength: maxLength(20),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".hostel"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 25 characters or less',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="intro" md={12}><h6>Introduction:</h6></Label>
                  <Col md={12}>
                    <Control.textarea
                      model=".intro"
                      id="intro"
                      name="intro"
                      value={user.intro}
                      onChange={handleFormValuesChange}
                      placeholder="Introduction*"
                      rows="8"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".intro"
                      show="touched"
                      messages={{
                        required: 'Required',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date of Birth"
                        format="MM/dd/yyyy"
                        value={DOB}
                        onChange={DOBChange}
                        maxDate={Date.now()}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="intro" md={12}><h6>Gender:</h6></Label>
                  <Col sm={12}>
                    <RadioGroup row aria-label="gender" name="gender" defaultValue={user.gender} onChange={handleFormValuesChange}>
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="female"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="male"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio color="primary" />}
                        label="other"
                        labelPlacement="start"
                      />
                      {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                    </RadioGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="join_year" md={4}><h6>Joining Year:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".join_year"
                      id="join_year"
                      name="join_year"
                      value={user.join_year}
                      onChange={handleFormValuesChange}
                      placeholder="Joining Year*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(4), maxLength: maxLength(4),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".join_year"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Enter 4 digit year',
                        maxLength: 'Enter 4 digit year',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="grad_year" md={4}><h6>Graduation Year:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".grad_year"
                      id="grad_year"
                      name="grad_year"
                      value={user.grad_year}
                      onChange={handleFormValuesChange}
                      placeholder="Graduation Year*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(4), maxLength: maxLength(4),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".grad_year"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Enter 4 digit year',
                        maxLength: 'Enter 4 digit year',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="mobile_number" md={4}><h6>Mobile Number:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".mobile_number"
                      id="mobile_number"
                      name="mobile_number"
                      value={user.mobile_number}
                      onChange={handleFormValuesChange}
                      placeholder="Mobile Number*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(10), maxLength: maxLength(10),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".origin_contact"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Enter 10 digit mobile number',
                        maxLength: 'Enter 10 digit mobile number',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="hometown" md={4}><h6>Hometown:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".hometown"
                      id="hometown"
                      name="hometown"
                      value={user.hometown}
                      onChange={handleFormValuesChange}
                      placeholder="Hometown*"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".hometown"
                      show="touched"
                      messages={{
                        required: 'Required ',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="interests" md={12}><h6>Interests:</h6></Label>
                  <Col md={12}>
                    <Control.textarea
                      model=".interests"
                      id="interests"
                      name="interests"
                      value={user.interests}
                      onChange={handleFormValuesChange}
                      placeholder="Interests*"
                      rows="8"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".interests"
                      show="touched"
                      messages={{
                        required: 'Required',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="specialization" md={12}><h6>Specializations:</h6></Label>
                  <Col md={12}>
                    <Control.textarea
                      model=".specialization"
                      id="specialization"
                      name="specialization"
                      value={user.specialization}
                      onChange={handleFormValuesChange}
                      placeholder="Interests*"
                      rows="8"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".specialization"
                      show="touched"
                      messages={{
                        required: 'Required',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="category" md={4}><h6>Category:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".category"
                      id="category"
                      name="category"
                      value={user.category}
                      onChange={handleFormValuesChange}
                      placeholder="Category*"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".hometown"
                      show="touched"
                      messages={{
                        required: 'Required ',
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="urlFields" md={12}><h6>Url:</h6></Label>
                  <Col sm={12}>
                    {urlFields.map((urlField, index) => (
                      <Fragment key={`${urlField}~${index}`}>
                        <Row className="form-group">
                          <Col sm={{ size: 4, offset: 1 }}>
                            <TextField
                              sm={5}
                              label="type"
                              className="form-control"
                              id="type"
                              name="type"
                              variant="filled"
                              value={urlField.type}
                              onChange={event => handleUrlFieldChange(index, event)}
                            />
                          </Col>
                          <Col sm={4}>
                            <TextField
                              sm={5}
                              label="url"
                              className="form-control"
                              id="url"
                              name="url"
                              variant="filled"
                              value={urlField.url}
                              onChange={event => handleUrlFieldChange(index, event)}
                            />
                          </Col>
                          <Col sm={2}>
                            <Fab sm={2} size="small" aria-label="delete" onClick={() => handleRemoveUrlFields(index)}>
                              <DeleteOutlinedIcon />
                            </Fab>
                          </Col>
                        </Row>
                      </Fragment>
                    ))}
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAddUrlFields()}>
                      <AddIcon />
                    </Fab>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col sm={{ size: 4, offset: 3 }}>
                    <Button type="submit" color="primary">
                      Save Changes
                    </Button>
                  </Col>
                  <Col sm={{ size: 2 }}>
                    <Button color="primary" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </DialogContent>
            {/* </ModalBody> */}
          </Dialog>
        </div>
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
