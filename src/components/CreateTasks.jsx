/* eslint-disable no-console */
import React from 'react';
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
  Grid, FormControl, FormControlLabel, InputLabel, FormLabel, RadioGroup, Radio, Select, Switch,
} from '@material-ui/core';
import {
  Card, CardText, CardBody, CardTitle, Row, Col, Label, Button, ButtonGroup,
} from 'reactstrap';
import {
  Control, Form, LocalForm, Errors,
} from 'react-redux-form';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
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
}));

export default function IntegrationReactSelect() {
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

  const required = val => val && val.length;
  const maxLength = len => val => !(val) || (val.length <= len);
  const minLength = len => val => (val) && (val.length >= len);

  const [urlState, setUrlState] = React.useState({});
  const UrlInput = () => {
    const code = null;
    return (
      <div>
        <TextField
          required
          id="standard-required"
          label="Type"
        />
        <TextField
          required
          id="standard-required"
          label="Type"
        />
        {/* <Fab>
          <AddIcon />
        </Fab> */}
      </div>
    );
  };

  const handleSubmit = (values) => {
    // const nvalues = {
    //   ...values,
    //   deadline: selectedDate,
    //   type: itemType,
    // };
    // const nvalues = JSON.stringify(values);
    // nvalues.deadline = selectedDate;
    // values.add('deadline', selectedDate);
    console.log('Values received: ', JSON.stringify(values));
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
                </Row>
                {
                  itemType === 'event'
                    ? (
                      <LocalForm model="createEvent" onSubmit={values => handleSubmit(values)}>
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
                          <Label htmlFor="url" md={12}><h6>Url:</h6></Label>
                          <Col md={{ size: 8, offset: 2 }}>
                            <Control.textarea
                              model=".url"
                              id="url"
                              name="url"
                              placeholder="Url"
                              rows="4"
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
                                required: 'Required',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <FormLabel component="legend">Type of Item</FormLabel>
                          <RadioGroup row value={itemType}>
                            <FormControlLabel
                              value="event"
                              label="Event"
                              control={(
                                <Radio />
                            )}
                            />
                            <FormControlLabel
                              value="project"
                              label="Project"
                              control={(
                                <Radio />
                            )}
                            />
                            <FormControlLabel
                              value="resource"
                              label="Resource"
                              control={(
                                <Radio />
                          )}
                            />
                          </RadioGroup>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                          <Col md={10}>
                            <Control.text
                              model=".telnum"
                              id="telnum"
                              name="telnum"
                              placeholder="Tel. Number"
                              className="form-control"
                              validators={{
                                required, minLength: minLength(3), maxLength: maxLength(15),
                              }}
                            />
                            <Errors
                              className="text-danger"
                              model=".telnum"
                              show="touched"
                              messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 numbers',
                                maxLength: 'Must be 15 numbers or less',
                                isNumber: 'Must be a number',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="email" md={2}>Email</Label>
                          <Col md={10}>
                            <Control.text
                              model=".email"
                              id="email"
                              name="email"
                              placeholder="Email"
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
                                required: 'Required',
                                validEmail: 'Invalid Email Address',
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col md={{ size: 6, offset: 2 }}>
                            <div className="form-check">
                              <Label check>
                                <Control.checkbox
                                  model=".agree"
                                  name="agree"
                                  className="form-check-input"
                                />
                                {' '}
                                {' '}
                                <strong>May we contact you?</strong>
                              </Label>
                            </div>
                          </Col>
                          <Col md={{ size: 3, offset: 1 }}>
                            <Control.select
                              model=".contactType"
                              name="contactType"
                              className="form-control"
                            >
                              <option>Tel.</option>
                              <option>Email</option>
                            </Control.select>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="message" md={2}>Your Feedback</Label>
                          <Col md={10}>
                            <Control.textarea
                              model=".message"
                              id="message"
                              name="message"
                              rows="12"
                              className="form-control"
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Col md={{ size: 10, offset: 2 }}>
                            <Button type="submit" color="primary">
                                          Send Feedback
                            </Button>
                          </Col>
                        </Row>
                      </LocalForm>
                    )
                    : null
                }

                {/* </div> */}
              </CardBody>
            </Card>
            {/* <form className={classes.form} noValidate autoComplete="off">
                  {/* <TextField
                    required
                    id="filled-required"
                    label=""
                    placeholder="Task Name"
                    variant="filled"
                  /> */}
            {/* <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="taskName"
                    label="Task Name"
                    name="taskName"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="taskDescription"
                    label="Task Description"
                    name="taskDescription"
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="taskDeadline"
                      label="Task Deadline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <FormLabel component="legend">Priority</FormLabel>
                  <RadioGroup row value={radioValue} onChange={handleRadioChange}>
                    <FormControlLabel
                      value="low"
                      label="Low"
                      control={(
                        <Radio />
                        )}
                    />
                    <FormControlLabel
                      value="medium"
                      label="Medium"
                      control={(
                        <Radio />
                        )}
                    />
                    <FormControlLabel
                      value="high"
                      label="High"
                      control={(
                        <Radio />
                      )}
                    />
                  </RadioGroup>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="type">
                      Type
                    </InputLabel>
                    <Select
                      native
                      value={typeState.type}
                      onChange={handleTypeChange('type')}
                      labelWidth={labelWidth}
                      inputProps={{
                        name: 'type',
                        id: 'type',
                      }}
                    >
                      <option value="" />
                      <option value={0}>Project</option>
                      <option value={1}>Event</option>
                      <option value={2}>Resource</option>
                    </Select>
                  </FormControl>
                  <br />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="startTime"
                      label="Select start time"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="endTime"
                      label="Select end time"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <Grid container justify="center">
                    <Grid item xs={6}>
                      <Button variant="contained" size="large" color="primary" className={classes.margin}>
                        Create Task
                      </Button>
                    </Grid>
                  </Grid>
                </form> */}

            {/* </Grid>
            </Grid> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
