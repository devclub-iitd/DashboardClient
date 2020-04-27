/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Card, CardContent, Typography, Dialog, DialogTitle, Tooltip,
  Backdrop, DialogContent, Avatar, TextField, Fab,
  FormControlLabel, Radio, RadioGroup, Snackbar, CircularProgress,
} from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import {
  Control, LocalForm, Errors,
} from 'react-redux-form';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import {
  Label, Button, Row, Col, CardLink,
} from 'reactstrap';

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
    height: 0,
    paddingTop: '56.25%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    width: 'auto',
    maxHeight: document.documentElement.clientHeight * 0.4,
  },
  imgcontainer: {
  },
  pad: {
    padding: '1em',
    font: '2rem',
  },
  iconright: {
    position: 'fixed',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  large: {
    width: theme.spacing(28),
    height: theme.spacing(28),
    marginLeft: '1em',
  },
}));

const Profile = ({
  user, serverError, updateUser, isLoading,
}) => {
  const [state, setState] = React.useState({
    editUser: user,
    orgUser: user,
    urlFields: Array.from(user.url).map(([index, value]) => ({ type: index, url: value })),
    editSuccess: false,
    isModalOpen: false,
  });

  const classes = useStyles();

  const handleSuccessClose = () => {
    setState({
      ...state,
      editSuccess: false,
    });
  };

  const handleFormValuesChange = (event, name) => {
    // setUser({
    //   ...user,
    //   [event.target.name]: [event.target.value],
    // });
    // // console.log('Name: ', name);
    // // console.log('Event: ', event);

    if (name === 'birth_date') {
      setState({
        ...state,
        editUser: {
          ...state.editUser,
          birth_date: event,
        },
      });
    } else if (name === 'join_year') {
      setState({
        ...state,
        editUser: {
          ...state.editUser,
          join_year: event,
        },
      });
    } else if (name === 'grad_year') {
      setState({
        ...state,
        editUser: {
          ...state.editUser,
          grad_year: event,
        },
      });
    } else {
      setState({
        ...state,
        editUser: {
          ...state.editUser,
          [event.target.name]: event.target.value,
        },
      });
    }
    // setState({
    //   ...state,
    //   editUser: {
    //     ...state.editUser,
    //     [event.target.name]: [event.target.value],
    //   },
    // });
  };

  // const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpen = () => {
    // setIsModalOpen(true);
    setState({
      ...state,
      isModalOpen: true,
    });
  };

  const handleClose = () => {
    // setIsModalOpen(false);
    setState({
      ...state,
      isModalOpen: false,
    });
  };

  const handleAddUrlFields = () => {
    const values = [...state.urlFields];
    values.push({ type: '', url: '' });
    setState({
      ...state,
      urlFields: values,
    });
    // setUrlFields(values);
    // setUser({
    //   ...user,
    //   url: urlFields,
    // });
    // const urlVals = user.url;
    // urlVals.set('type', 'url');
    // setUser({
    //   ...user,
    //   url: urlVals,
    // });
  };

  const handleRemoveUrlFields = (index) => {
    const values = [...state.urlFields];
    values.splice(index, 1);
    setState({
      ...state,
      urlFields: values,
    });
    // setUrlFields(values);
    // setUser({
    //   ...user,
    //   url: urlFields,
    // });
    // const urlVals = user.url;
    // urlVals.delete(index);
    // setUser({
    //   ...user,
    //   url: urlVals,
    // });
  };

  const handleUrlFieldChange = (index, event) => {
    const values = [...state.urlFields];
    if (event.target.name === 'type') {
      values[index].type = event.target.value;
    } else {
      values[index].url = event.target.value;
    }
    setState({
      ...state,
      urlFields: values,
    });
    // setUrlFields(values);
    // setUser({
    //   ...user,
    //   url: urlFields,
    // });
    // const urlVals = user.url;
    // urlVals.set(index, event.target.value);
    // setUser({
    //   ...user,
    //   url: urlVals,
    // });
  };

  function strMapToObj(strMap) {
    const obj = Object.create(null);
    Array.from(strMap).map(([k, v]) => { obj[k] = v; });
    return obj;
  }

  const handleSubmit = () => {
    // setUser({
    //   ...user,
    //   values,
    // });
    // setUser({
    //   ...user,
    //   birth_date: DOB,
    //   join_year: joinDate,
    //   grad_year: gradDate,
    // });

    // const newUser = {
    //   ...user,
    //   birth_date: DOB,
    //   join_year: joinDate,
    //   grad_year: gradDate,
    // };
    const urlMap = new Map();
    state.urlFields.map(urlField => urlMap.set(urlField.type, urlField.url));
    const newUser = {
      ...state.editUser,
      url: strMapToObj(urlMap),
    };

    updateUser(newUser);
    // setUserOrg(user);
    if (serverError === null) {
      setState({
        ...state,
        editSuccess: true,
        orgUser: {
          ...state.editUser,
        },
      });
    }
    // console.log('Submitting user details update info: ', state.editUser);
    handleClose();
  };

  const cancelEdit = () => {
    // setUser({
    //   ...user,
    //   userOrg,
    // });
    setState({
      ...state,
      editUser: {
        ...state.orgUser,
      },
    });
    handleClose();
    // console.log(state.editUser);
  };

  const required = val => val && val.length;
  const maxLength = len => val => !(val) || (val.length <= len);
  const minLength = len => val => (val) && (val.length >= len);

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={state.editSuccess}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          message="Profile updated Successfully !"
        />
        <div>
          <Dialog open={state.isModalOpen} maxWidth="md" fullWidth onClose={() => { cancelEdit(); }} scroll="paper">
            <DialogTitle>
              <Typography variant="h4" className={classes.head}>
                Edit Your Profile
              </Typography>
            </DialogTitle>
            <DialogContent>
              <LocalForm>
                <Row className="form-group">
                  <Label htmlFor="name" md={4}><h6>Name:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder="Name*"
                      // defaultValue={user.name}
                      defaultValue={state.editUser.name}
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
                      // defaultValue={user.entry_no}
                      defaultValue={state.editUser.entry_no}
                      onChange={handleFormValuesChange}
                      placeholder="Entry Number*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(11), maxLength: maxLength(11),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".entry_no"
                      show="touched"
                      messages={{
                        required: 'Required ',
                        minLength: 'Enter 11 character Entry Number',
                        maxLength: 'Enter 11 character Entry Number',
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
                      // defaultValue={user.email}
                      defaultValue={state.editUser.email}
                      onChange={handleFormValuesChange}
                      placeholder="Email*"
                      className="form-control"
                      validators={{
                        required,
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
                      name="hostel"
                      // defaultValue={user.hostel}
                      defaultValue={state.editUser.hostel}
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
                      // defaultValue={user.intro}
                      defaultValue={state.editUser.intro}
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
                        // value={DOB}
                        value={state.editUser.birth_date}
                        name="birth_date"
                        // onChange={DOBChange}
                        onChange={date => handleFormValuesChange(date, 'birth_date')}
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
                    <RadioGroup row aria-label="gender" name="gender" defaultValue={state.editUser.gender} onChange={handleFormValuesChange}>
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="female"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="male"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio color="primary" />}
                        label="other"
                        labelPlacement="end"
                      />
                      {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                    </RadioGroup>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="join_year" md={4}><h6>Date of Joining:</h6></Label>
                  <Col md={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date of Joining"
                        format="MM/dd/yyyy"
                        value={state.editUser.join_year}
                        name="join_year"
                        // onChange={DOBChange}
                        onChange={date => handleFormValuesChange(date, 'join_year')}
                        maxDate={Date.now()}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="grad_year" md={4}><h6>Date of Graduation:</h6></Label>
                  <Col md={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date of Graduation"
                        format="MM/dd/yyyy"
                        value={state.editUser.grad_year}
                        name="grad_year"
                        // onChange={DOBChange}
                        onChange={date => handleFormValuesChange(date, 'grad_year')}
                        // maxDate={Date.now()}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="mobile_number" md={4}><h6>Mobile Number:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".mobile_number"
                      id="mobile_number"
                      name="mobile_number"
                      // defaultValue={user.mobile_number}
                      defaultValue={state.editUser.mobile_number}
                      onChange={handleFormValuesChange}
                      placeholder="Mobile Number*"
                      className="form-control"
                      validators={{
                        required, minLength: minLength(10), maxLength: maxLength(10),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".mobile_nhumber"
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
                      // defaultValue={user.hometown}
                      defaultValue={state.editUser.hometown}
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
                      // defaultValue={user.interests}
                      defaultValue={state.editUser.interests}
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
                      // defaultValue={user.specialization}
                      defaultValue={state.editUser.specialization}
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
                      // defaultValue={user.category}
                      defaultValue={state.editUser.category}
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
                    {state.urlFields.map((urlField, index) => (
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
                    {/* {Array.from(user.url).map(([index, value]) => (
                      <Fragment key={`${index}`}>
                        <Row className="form-group">
                          sm={12} md={{ size: 4, offset: 1 }}
                          <Col sm={12} md={{ size: 4, offset: 1 }}>
                            <TextField
                              label="type"
                              // className="form-control"
                              // className={classes.urlField}
                              id="type"
                              name="type"
                              variant="filled"
                              value={index}
                              onChange={event => handleUrlFieldChange(index, event)}
                            />
                          </Col>
                          sm={12} md={4}
                          <Col sm={12} md={4}>
                            <TextField
                              label="url"
                              // className="form-control"
                              // className={classes.urlField}
                              id="url"
                              name="url"
                              variant="filled"
                              value={value}
                              onChange={event => handleUrlFieldChange(index, event)}
                            />
                          </Col>
                          sm={2}
                          <Col md={2}>
                            <Fab size="small" aria-label="delete" onClick={() => handleRemoveUrlFields(index)}>
                              <DeleteOutlinedIcon />
                            </Fab>
                          </Col>
                        </Row>
                      </Fragment>
                    ))} */}
                    <Fab size="small" color="primary" aria-label="add" onClick={() => handleAddUrlFields()}>
                      <AddIcon />
                    </Fab>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col sm={{ size: 4, offset: 3 }}>
                    <Button color="primary" onClick={handleSubmit}>
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
        <Grid item xs={12}>
          <Tooltip title="Edit Profile" aria-label="edit">
            <Fab onClick={handleOpen} color="secondary">
              <EditIcon color="action" />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item sm={9} lg={5}>
          <Card className={classes.card}>
            <Grid style={{ marginTop: '2em' }} container alignContent="center" justify="center">
              <Grid item xs={{ size: 6, offset: 3 }}>
                <Avatar alt={state.orgUser.name.substr(0, 1)} src={state.orgUser.url.get('picture_url')} className={classes.large} />
              </Grid>
            </Grid>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="right">
                {state.orgUser.name}
              </Typography>
              <Typography width="75%" variant="body2" color="textSecondary" component="p" align="right">
                {state.orgUser.intro}
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid item xs={2}>
                  <EmailOutlinedIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" color="textPrimary" align="left" display="inline">
                    {state.orgUser.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <PhoneIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textPrimary" align="left">
                    {state.orgUser.mobile_number}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={9} lg={5}>
          <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
            <Grid style={{ width: '100%' }} item xs={12}>
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
                        {state.orgUser.entry_no}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>Hostel:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                        {state.orgUser.hostel}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>Gender:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                        {state.orgUser.gender}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>DOB:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                        {state.orgUser.birth_date.toDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>Join Year:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                        {state.orgUser.join_year.toDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>Grad Year:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                        {state.orgUser.grad_year.toDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>Hometown:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                        {state.orgUser.hometown}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>Category:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="left">
                        {state.orgUser.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.pad} gutterBottom variant="p" color="textPrimary" align="right">
                        <b>Urls:</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      {
                        Array.from(state.orgUser.url).map(([key, value]) => (
                          <Typography color="textPrimary" variant="body1">
                            {`${key}: `}
                            <CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink>
                          </Typography>
                        ))
                      }
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid style={{ width: '100%' }} item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="textPrimary" align="left">
                    <b>Interests</b>
                  </Typography>
                  <Typography variant="p" gutterBottom color="textPrimary" align="left">
                    {state.orgUser.interests}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid style={{ width: '100%' }} item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="textPrimary" align="left">
                    <b>Specializations</b>
                  </Typography>
                  <Typography variant="p" gutterBottom color="textPrimary" align="left">
                    {state.orgUser.specialization}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  // }
};

export default Profile;
