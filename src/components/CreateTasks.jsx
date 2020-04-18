/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Grid, FormControl, FormControlLabel, InputLabel, FormLabel, RadioGroup, Radio, Select, Switch, Fab,
} from '@material-ui/core';
import {
  Card, CardText, CardBody, CardTitle, Row, Col, Label, Button, ButtonGroup,
} from 'reactstrap';
import {
  Control, Form, LocalForm, Errors,
} from 'react-redux-form';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import isURL from 'validator/lib/isURL';
import { dumUsers } from './dumUser';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  margin: {
    // margin: theme.spacing(1),
    marginTop: '1em',
    marginBottom: '2em',
    width: '100%',
  },
  head: {
    marginBottom: '0.5em',
    marginTop: '1em',
    textAlign: 'center',
  },
  urlField: {
    marginBottom: 10,
  },
}));

export default function CreateTasks(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [itemType, setItemType] = React.useState(null);
  const handleTypeChange = (value) => {
    setItemType(value);
  };

  const [endDate, setEndDate] = React.useState(new Date(Date.now()));
  const endDateChange = (date) => {
    setEndDate(date);
  };

  const [startDate, setStartDate] = React.useState(new Date(Date.now()));
  const startDateChange = (date) => {
    setStartDate(date);
  };

  const [displayState, setDisplayState] = React.useState(false);
  const changeDisplayState = (event) => {
    setDisplayState(event.target.checked);
  };

  const [archiveState, setArchiveState] = React.useState(false);
  const changeArchiveState = (event) => {
    setArchiveState(event.target.checked);
  };

  const [newState, setNewState] = React.useState(false);
  const changeNewState = (event) => {
    setNewState(event.target.checked);
  };

  const [internalState, setInternalState] = React.useState(false);
  const changeInternalState = (event) => {
    setInternalState(event.target.checked);
  };

  const required = val => val && val.length;
  const maxLength = len => val => !(val) || (val.length <= len);
  const minLength = len => val => (val) && (val.length >= len);

  const [urlFields, setUrlFields] = React.useState([
    { type: '', url: '' },
  ]);
  const handleAddUrlFields = () => {
    const values = [...urlFields];
    values.push({ type: '', url: '' });
    setUrlFields(values);
  };

  const handleRemoveUrlFields = (index) => {
    const values = [...urlFields];
    values.splice(index, 1);
    setUrlFields(values);
  };

  const handleUrlFieldChange = (index, event) => {
    const values = [...urlFields];
    if (event.target.name === 'type') {
      values[index].type = event.target.value;
    } else {
      values[index].url = event.target.value;
    }
    setUrlFields(values);
  };

  // const handleEventFormReset = () => {
  //   console.log('Reset Event form');
  //   props.resetEventForm();
  // };

  const [labelFields, setLabelFields] = React.useState([
    '',
  ]);
  const handleAddLabelFields = () => {
    const values = [...labelFields];
    values.push('');
    setLabelFields(values);
  };

  const handleRemoveLabelFields = (index) => {
    const values = [...labelFields];
    values.splice(index, 1);
    setLabelFields(values);
  };

  const handleLabelFieldChange = (index, event) => {
    const values = [...labelFields];
    values[index] = event.target.value;
    setLabelFields(values);
  };

  // const handleProjectFormReset = () => {
  //   console.log('Reset Project form');
  //   props.resetProjectForm();
  // };

  // const handleResourceFormReset = () => {
  //   console.log('Reset Resource form');
  //   props.resetResourceForm();
  // };

  const resetEForm = () => {
    props.resetEventForm();
    setUrlFields([
      { type: '', url: '' },
    ]);
  };
  const resetPForm = () => {
    props.resetProjectForm();
    setUrlFields([
      { type: '', url: '' },
    ]);
    setLabelFields([
      '',
    ]);
  };
  const resetRForm = () => {
    props.resetResourceForm();
  };

  const strMapToObj = (strMap) => {
    const obj = Object.create(null);
    Array.from(strMap).map(([k, v]) => { obj[k] = v; });
    return obj;
  };

  const submitEventForm = (values) => {
    const urlMap = new Map();
    urlFields.map(urlField => urlMap.set(urlField.type, urlField.url));
    const newEvent = {
      ...values,
      start_date: startDate,
      end_date: endDate,
      display_on_website: displayState,
      url: strMapToObj(urlMap),
      assignee: '',
    };
    console.log('event: ', newEvent);
    props.createEvent(newEvent);
    resetEForm();
  };

  const submitProjectForm = (values) => {
    const urlMap = new Map();
    urlFields.map(urlField => urlMap.set(urlField.type, urlField.url));

    const newProject = {
      ...values,
      members: [],
      start_date: startDate,
      end_date: endDate,
      display_on_website: displayState,
      is_internal: internalState,
      labels: labelFields,
      url: strMapToObj(urlMap),
    };
    console.log('project: ', newProject);
    props.createProject(newProject);
    resetPForm();
  };

  const submitResourceForm = (values) => {
    const newResource = {
      ...values,
      display_on_website: displayState,
      archive: archiveState,
      new: newState,
    };
    console.log('resource: ', newResource);
    props.createResource(newResource);
    resetRForm();
  };

  return (
    <div>

      {/* {'Change type of field (date/checkbox/text) accordingly'}
      <br /> */}
      <Grid container direction="row" justify="center">
        <Grid item sm={10} lg={6}>
          <Paper elevation={3}>
            <Card>
              <CardBody>
                <CardTitle>
                  <Typography variant="h4" className={classes.head}>
                    Create a new Item
                  </Typography>
                </CardTitle>
                <Row className="form-group">
                  <Label htmlFor="type" sm={12}><h6>Type of Item:</h6></Label>
                  <Col sm={12}>
                    <Grid container direction="row" justify="space-evenly">
                      <Grid item sm={3}>
                        <Button outline active={itemType === 'event'} color="primary" onClick={() => handleTypeChange('event')}>Event</Button>
                      </Grid>
                      <Grid item sm={3}>
                        <Button outline active={itemType === 'project'} color="primary" onClick={() => handleTypeChange('project')}>Project</Button>
                      </Grid>
                      <Grid item sm={3}>
                        <Button outline active={itemType === 'resource'} color="primary" onClick={() => handleTypeChange('resource')}>Resource</Button>
                      </Grid>
                    </Grid>
                  </Col>
                </Row>
                {
                  itemType === 'event'
                    ? (
                      <Form model="eventForm" onSubmit={values => submitEventForm(values)}>
                        <Row className="form-group">
                          <Label htmlFor="name" md={4}><h6>Name of Event:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".name"
                              id="name"
                              name="name"
                              placeholder="Event Name*"
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
                          <Label htmlFor="description" md={12}><h6>Description:</h6></Label>
                          <Col md={12}>
                            <Control.textarea
                              model=".description"
                              id="description"
                              name="description"
                              placeholder="Event Description*"
                              rows="8"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".description"
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
                                label="Select Start Date of Event"
                                format="MM/dd/yyyy"
                                value={startDate}
                                onChange={startDateChange}
                                minDate={Date.now()}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Select End Date of Event"
                                format="MM/dd/yyyy"
                                value={endDate}
                                onChange={endDateChange}
                                minDate={startDate}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="embed_code" md={12}><h6>Embedded Code:</h6></Label>
                          <Col md={{ size: 8, offset: 2 }}>
                            <Control.textarea
                              model=".embed_code"
                              id="embed_code"
                              name="embed_code"
                              placeholder="Type embedded code"
                              rows="4"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".embed_code"
                              show="touched"
                              messages={{
                                required: 'Required',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <Label htmlFor="embed_code" sm={5}><h6>Display on website:  </h6></Label>
                            <FormControlLabel
                              sm={2}
                              // label="Display on Website"
                              control={<Switch checked={displayState} onChange={changeDisplayState} />}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="urlFields" md={12}><h6>Url:</h6></Label>
                          <Col sm={12}>
                            {urlFields.map((urlField, index) => (
                              <Fragment key={`${urlField}~${index}`}>
                                <Row className="form-group">
                                  {/* sm={12} md={{ size: 4, offset: 1 }} */}
                                  <Col sm={12} md={{ size: 4, offset: 1 }}>
                                    <TextField
                                      label="type"
                                      // className="form-control"
                                      className={classes.urlField}
                                      id="type"
                                      name="type"
                                      variant="filled"
                                      value={urlField.type}
                                      onChange={event => handleUrlFieldChange(index, event)}
                                    />
                                  </Col>
                                  {/* sm={12} md={4} */}
                                  <Col sm={12} md={4}>
                                    <TextField
                                      label="url"
                                      // className="form-control"
                                      className={classes.urlField}
                                      id="url"
                                      name="url"
                                      variant="filled"
                                      value={urlField.url}
                                      onChange={event => handleUrlFieldChange(index, event)}
                                    />
                                  </Col>
                                  {/* sm={2} */}
                                  <Col md={2}>
                                    <Fab size="small" aria-label="delete" onClick={() => handleRemoveUrlFields(index)}>
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
                          {/* md={{ size: 4, offset: 3 }} */}
                          <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                            <Button type="submit" color="primary">
                              Create Event
                            </Button>
                          </Col>
                          {/* md={{ size: 2 }} */}
                          <Col xs={3} md={{ size: 2 }}>
                            <Button type="reset" color="primary" onClick={() => resetEForm()}>
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )
                    : null
                }
                {
                  itemType === 'project'
                    ? (
                      <Form model="projectForm" onSubmit={values => submitProjectForm(values)}>
                        <Row className="form-group">
                          <Label htmlFor="name" md={4}><h6>Name of Project:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".name"
                              id="name"
                              name="name"
                              placeholder="Project Name*"
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
                          <Label htmlFor="description" md={12}><h6>Description:</h6></Label>
                          <Col md={12}>
                            <Control.textarea
                              model=".description"
                              id="description"
                              name="description"
                              placeholder="Project Description*"
                              rows="8"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".description"
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
                                label="Select proposed Start Date of Project"
                                format="MM/dd/yyyy"
                                value={startDate}
                                onChange={startDateChange}
                                minDate={Date.now()}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Select proposed End Date of Project"
                                format="MM/dd/yyyy"
                                value={endDate}
                                onChange={endDateChange}
                                minDate={startDate}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="origin" md={4}><h6>Origin of Project:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".origin"
                              id="origin"
                              name="origin"
                              placeholder="Origin*"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".origin"
                              show="touched"
                              messages={{
                                required: 'Required ',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="origin_contact" md={4}><h6>Contact of Origin:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".origin_contact"
                              id="origin_contact"
                              name="origin_contact"
                              placeholder="Origin Contact*"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".origin_contact"
                              show="touched"
                              messages={{
                                required: 'Required ',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="perks" md={4}><h6>Perks:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".perks"
                              id="perks"
                              name="perks"
                              placeholder="Perks*"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".perks"
                              show="touched"
                              messages={{
                                required: 'Required ',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="requirements" md={4}><h6>Requirements:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".requirements"
                              id="requirements"
                              name="requirements"
                              placeholder="Requirements*"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".requirements"
                              show="touched"
                              messages={{
                                required: 'Required ',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <Label htmlFor="embed_code" sm={5}><h6>Display on website:  </h6></Label>
                            <FormControlLabel
                              sm={2}
                              // label="Display on Website"
                              control={<Switch checked={displayState} onChange={changeDisplayState} />}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <Label htmlFor="embed_code" sm={5}><h6>Internal Project:  </h6></Label>
                            <FormControlLabel
                              sm={2}
                              // label="Display on Website"
                              control={<Switch checked={internalState} onChange={changeInternalState} />}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="labelFields" md={12}><h6>Add Label:</h6></Label>
                          <Col sm={12}>
                            {labelFields.map((labelField, index) => (
                              <Fragment key={`${labelField}~${index}`}>
                                <Row className="form-group">
                                  <Col sm={{ size: 4, offset: 4 }}>
                                    <TextField
                                      label="label"
                                      className="form-control"
                                      id="label"
                                      name="label"
                                      variant="filled"
                                      value={labelField}
                                      onChange={event => handleLabelFieldChange(index, event)}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <Fab size="small" aria-label="delete" onClick={() => handleRemoveLabelFields(index)}>
                                      <DeleteOutlinedIcon />
                                    </Fab>
                                  </Col>
                                </Row>
                              </Fragment>
                            ))}
                            <Fab size="small" color="primary" aria-label="add" onClick={() => handleAddLabelFields()}>
                              <AddIcon />
                            </Fab>
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
                              Create Project
                            </Button>
                          </Col>
                          <Col sm={{ size: 2 }}>
                            <Button type="reset" color="primary" onClick={() => resetPForm()}>
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )
                    : null
                }
                {
                  itemType === 'resource'
                    ? (
                      <Form model="resourceForm" onSubmit={values => submitResourceForm(values)}>
                        <Row className="form-group">
                          <Label htmlFor="internal_name" md={4}><h6>Internal Name:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".internal_name"
                              id="internal_name"
                              name="internal_name"
                              placeholder="Internal Name*"
                              className="form-control"
                              validators={{
                                required, minLength: minLength(1), maxLength: maxLength(20),
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".internal_name"
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
                          <Label htmlFor="directory_year" md={4}><h6>Directory year:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".directory_year"
                              id="directory_year"
                              name="directory_year"
                              placeholder="Directory Year*"
                              className="form-control"
                              validators={{
                                required, minLength: minLength(1), maxLength: maxLength(20),
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".directory_year"
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
                          <Label htmlFor="subdirectory" md={4}><h6>Sub-Directory:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".subdirectory"
                              id="subdirectory"
                              name="subdirectory"
                              placeholder="Sub-Directory*"
                              className="form-control"
                              validators={{
                                required, minLength: minLength(1), maxLength: maxLength(20),
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".subdirectory"
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
                          <Label htmlFor="name" md={4}><h6>Name of Resource:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".name"
                              id="name"
                              name="name"
                              placeholder="Resource Name*"
                              className="form-control"
                              validators={{
                                required, minLength: minLength(1), maxLength: maxLength(30),
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
                          <Label htmlFor="description" md={12}><h6>Description:</h6></Label>
                          <Col md={12}>
                            <Control.textarea
                              model=".description"
                              id="description"
                              name="description"
                              placeholder="Resource Description*"
                              rows="8"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".description"
                              show="touched"
                              messages={{
                                required: 'Required',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="url" md={4}><h6>Url of Resource:</h6></Label>
                          <Col md={8}>
                            <Control.text
                              model=".url"
                              id="url"
                              name="url"
                              placeholder="Resource Url*"
                              className="form-control"
                              validators={{
                                required,
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".url"
                              show="touched"
                              messages={{
                                required: 'Required ',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <Label htmlFor="displayOnWebsite" sm={5}><h6>Display on website:  </h6></Label>
                            <FormControlLabel
                              sm={2}
                              // label="Display on Website"
                              control={<Switch checked={displayState} onChange={changeDisplayState} />}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <Label htmlFor="archive" sm={5}><h6>Archive:  </h6></Label>
                            <FormControlLabel
                              sm={2}
                              // label="Display on Website"
                              control={<Switch checked={archiveState} onChange={changeArchiveState} />}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col>
                            <Label htmlFor="new" sm={5}><h6>New Resource:  </h6></Label>
                            <FormControlLabel
                              sm={2}
                              // label="Display on Website"
                              control={<Switch checked={newState} onChange={changeNewState} />}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col sm={{ size: 5, offset: 2 }}>
                            <Button type="submit" color="primary">
                              Create Resource
                            </Button>
                          </Col>
                          <Col sm={{ size: 2 }}>
                            <Button type="reset" color="primary" onClick={() => resetRForm()}>
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )
                    : null
                }
              </CardBody>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
