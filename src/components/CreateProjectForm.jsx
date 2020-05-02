/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid, FormControlLabel, Button, Switch, Fab, Snackbar, Typography,
  TextField, Paper,
} from '@material-ui/core';
import {
  Card, CardBody, CardTitle, Row, Col, Label,
} from 'reactstrap';
import {
  Control, Form, Errors, LocalForm,
} from 'react-redux-form';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';

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

  const [state, setState] = React.useState({
    newProject: {
      name: '',
      description: '',
      status: 'IDEA',
      start_date: new Date(),
      end_date: new Date(),
      origin: '',
      origin_contact: '',
      perks: '',
      requirements: '',
      display_on_website: false,
      is_internal: true,
      showcase: false,
      labels: [],
      url: new Map([
        ['photo_url', ''],
      ]),
      members: [],
    },
    urlFields: [
      { type: 'photo_url', url: '' },
    ],
    success: false,
  });

  const handleFormValuesChange = (event, name) => {
    if (name === 'start_date') {
      setState({
        ...state,
        newProject: {
          ...state.newProject,
          start_date: event,
        },
      });
    } else if (name === 'end_date') {
      setState({
        ...state,
        newProject: {
          ...state.newProject,
          end_date: event,
        },
      });
    } else if (name === 'display') {
      setState({
        ...state,
        newProject: {
          ...state.newProject,
          display_on_website: event.target.checked,
        },
      });
    } else if (name === 'internal') {
      setState({
        ...state,
        newProject: {
          ...state.newProject,
          is_internal: event.target.checked,
        },
      });
    } else if (name === 'showcase') {
      setState({
        ...state,
        newProject: {
          ...state.newProject,
          showcase: event.target.checked,
        },
      });
    } else {
      setState({
        ...state,
        newProject: {
          ...state.newProject,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  const required = val => val && val.length;
  const maxLength = len => val => !(val) || (val.length <= len);
  const minLength = len => val => (val) && (val.length >= len);

  const handleAddUrlFields = () => {
    const values = [...state.urlFields];
    values.push({ type: '', url: '' });
    setState({
      ...state,
      urlFields: values,
    });
  };

  const handleRemoveUrlFields = (index) => {
    const values = [...state.urlFields];
    values.splice(index, 1);
    setState({
      ...state,
      urlFields: values,
    });
  };

  const handleUrlFieldChange = (index, event) => {
    const values = [...state.urlFields];
    if (event.target.name === 'type') {
      if (values[index].type === 'photo_url') {
        return;
      }
      values[index].type = event.target.value;
    } else {
      values[index].url = event.target.value;
    }
    setState({
      ...state,
      urlFields: values,
    });
  };

  const handleAddLabelFields = () => {
    const values = [...state.newProject.labels];
    values.push('');
    setState({
      ...state,
      newProject: {
        ...state.newProject,
        labels: values,
      },
    });
  };

  const handleRemoveLabelFields = (index) => {
    const values = [...state.newProject.labels];
    values.splice(index, 1);
    setState({
      ...state,
      newProject: {
        ...state.newProject,
        labels: values,
      },
    });
  };

  const handleLabelFieldChange = (index, event) => {
    const values = [...state.newProject.labels];
    values[index] = event.target.value;
    setState({
      ...state,
      newProject: {
        ...state.newProject,
        labels: values,
      },
    });
  };


  const handleSuccessClose = () => {
    setState({
      ...state,
      success: false,
    });
  };

  const resetForm = () => {
    setState({
      ...state,
      newProject: {
        ...state.newProject,
        name: '',
        description: '',
        status: 'IDEA',
        start_date: new Date(),
        end_date: new Date(),
        origin: '',
        origin_contact: '',
        perks: '',
        requirements: '',
        display_on_website: false,
        is_internal: true,
        showcase: false,
        labels: [],
        url: new Map([
          ['photo_url', ''],
        ]),
        members: [],
      },
      urlFields: [
        { type: 'photo_url', url: '' },
      ],
    });
  };

  const strMapToObj = (strMap) => {
    const obj = Object.create(null);
    Array.from(strMap).map(([k, v]) => { obj[k] = v; });
    return obj;
  };

  const submitProjectForm = () => {
    const urlMap = new Map();
    state.urlFields.map(urlField => urlMap.set(urlField.type, urlField.url));
    const newProject = {
      ...state.newProject,
      url: urlMap,
    };
    // console.log('event: ', newProject);
    props.createProject(newProject);
    if (props.projectError === null) {
      setState({
        ...state,
        newProject: {
          ...state.newProject,
          name: '',
          description: '',
          status: 'IDEA',
          start_date: new Date(),
          end_date: new Date(),
          origin: '',
          origin_contact: '',
          perks: '',
          requirements: '',
          display_on_website: false,
          is_internal: true,
          showcase: false,
          labels: [],
          url: new Map([
            ['photo_url', ''],
          ]),
          members: [],
        },
        urlFields: [
          { type: 'photo_url', url: '' },
        ],
        success: true,
      });
    }
  };

  return (
    <div>

      {/* {'Change type of field (date/checkbox/text) accordingly'}
      <br /> */}
      <Grid container direction="row" justify="center">
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={state.success}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          message="Project created successfully !"
        />
        <LocalForm onSubmit={submitProjectForm}>
          <Row className="form-group">
            <Label htmlFor="name" md={4}><h6>Name of Project:</h6></Label>
            <Col md={8}>
              <Control.text
                model=".name"
                id="name"
                name="name"
                placeholder="Project Name*"
                value={state.newProject.name}
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
            <Label htmlFor="description" md={12}><h6>Description:</h6></Label>
            <Col md={12}>
              <Control.textarea
                model=".description"
                id="description"
                name="description"
                placeholder="Project Description*"
                rows="8"
                value={state.newProject.description}
                onChange={handleFormValuesChange}
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
                  value={state.newProject.start_date}
                  onChange={e => handleFormValuesChange(e, 'start_date')}
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
                  value={state.newProject.end_date}
                  onChange={e => handleFormValuesChange(e, 'end_date')}
                  minDate={state.newProject.start_date}
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
                value={state.newProject.origin}
                onChange={handleFormValuesChange}
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
                value={state.newProject.origin_contact}
                onChange={handleFormValuesChange}
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
                value={state.newProject.perks}
                onChange={handleFormValuesChange}
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
                value={state.newProject.requirements}
                onChange={handleFormValuesChange}
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
                control={<Switch checked={state.newProject.display_on_website} onChange={e => handleFormValuesChange(e, 'display')} />}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Label htmlFor="embed_code" sm={5}><h6>Internal Project:  </h6></Label>
              <FormControlLabel
                sm={2}
                control={<Switch checked={state.newProject.is_internal} onChange={e => handleFormValuesChange(e, 'internal')} />}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="labelFields" md={12}><h6>Add Label:</h6></Label>
            <Col sm={12}>
              {
                state.newProject.labels.map((labelField, index) => (
                  <Fragment key={`${labelField}~${index}`}>
                    <Row className="form-group">
                      <Col sm={{ size: 4, offset: 4 }}>
                        <TextField
                          label="label"
                          className="form-control"
                          id="label"
                          name="label"
                          variant="filled"
                          defaultValue={labelField}
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
                ))
              }
              <Fab size="small" color="secondary" aria-label="add" onClick={() => handleAddLabelFields()}>
                <AddIcon />
              </Fab>
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="urlFields" md={12}><h6>Url:</h6></Label>
            <Col sm={12}>
              {
                state.urlFields.map((urlField, index) => (
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
                      {
                        urlField.type === 'photo_url'
                          ? null
                          : (
                            <Col sm={2}>
                              <Fab sm={2} size="small" aria-label="delete" onClick={() => handleRemoveUrlFields(index)}>
                                <DeleteOutlinedIcon />
                              </Fab>
                            </Col>
                          )
                      }
                    </Row>
                  </Fragment>
                ))
              }
              <Fab size="small" color="secondary" aria-label="add" onClick={() => handleAddUrlFields()}>
                <AddIcon />
              </Fab>
            </Col>
          </Row>
          <Row className="form-group">
            <Col sm={{ size: 4, offset: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Create Project
              </Button>
            </Col>
            <Col sm={{ size: 2 }}>
              <Button type="reset" variant="contained" color="primary" onClick={() => resetForm()}>
                Reset
              </Button>
            </Col>
          </Row>
        </LocalForm>
      </Grid>
    </div>
  );
}