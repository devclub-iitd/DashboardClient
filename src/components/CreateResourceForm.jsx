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
    newRes: {
      internal_name: '',
      directory_year: '',
      subdirectory: '',
      name: '',
      archive: false,
      display_on_website: false,
      new: false,
      description: '',
      url: '',
    },
    success: false,
  });

  const handleFormValuesChange = (event, name) => {
    if (name === 'archive') {
      setState({
        ...state,
        newRes: {
          ...state.newRes,
          archive: event.target.checked,
        },
      });
    } else if (name === 'display') {
      setState({
        ...state,
        newRes: {
          ...state.newRes,
          display_on_website: event.target.checked,
        },
      });
    } else if (name === 'new') {
      setState({
        ...state,
        newRes: {
          ...state.newRes,
          new: event.target.checked,
        },
      });
    } else {
      setState({
        ...state,
        newRes: {
          ...state.newRes,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  const required = val => val && val.length;
  const maxLength = len => val => !(val) || (val.length <= len);
  const minLength = len => val => (val) && (val.length >= len);
  const validUrl = val => /^[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(val);

  const handleSuccessClose = () => {
    setState({
      ...state,
      success: false,
    });
  };

  const resetForm = () => {
    setState({
      ...state,
      newRes: {
        ...state.newRes,
        internal_name: '',
        directory_year: '',
        subdirectory: '',
        name: '',
        archive: false,
        display_on_website: false,
        new: false,
        description: '',
        url: '',
      },
    });
  };

  const strMapToObj = (strMap) => {
    const obj = Object.create(null);
    Array.from(strMap).map(([k, v]) => { obj[k] = v; });
    return obj;
  };


  const submitResourceForm = () => {
    const newResource = {
      ...state.newRes,
    };
    // console.log('resource: ', newResource);
    props.createResource(state.newRes);
    if (props.resourceError === null) {
      setState({
        ...state,
        newRes: {
          ...state.newRes,
          internal_name: '',
          directory_year: '',
          subdirectory: '',
          name: '',
          archive: false,
          display_on_website: false,
          new: false,
          description: '',
          url: '',
        },
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
          message="Resource created successfully !"
        />
        <LocalForm onSubmit={submitResourceForm}>
          <Row className="form-group">
            <Label htmlFor="internal_name" md={4}><h6>Internal Name:</h6></Label>
            <Col md={8}>
              <Control.text
                model=".internal_name"
                id="internal_name"
                name="internal_name"
                placeholder="Internal Name*"
                value={state.newRes.internal_name}
                onChange={handleFormValuesChange}
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
                value={state.newRes.directory_year}
                onChange={handleFormValuesChange}
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
                value={state.newRes.subdirectory}
                onChange={handleFormValuesChange}
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
                value={state.newRes.name}
                onChange={handleFormValuesChange}
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
                value={state.newRes.description}
                onChange={handleFormValuesChange}
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
                value={state.newRes.url}
                onChange={handleFormValuesChange}
                placeholder="Resource Url*"
                className="form-control"
                validators={{
                  required, validUrl,
                }}
              />
              <Errors
                className="text-danger"
                model=".url"
                show="touched"
                messages={{
                  required: 'Required ',
                  validUrl: 'Not a valid url',
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Label htmlFor="displayOnWebsite" sm={5}><h6>Display on website:  </h6></Label>
              <FormControlLabel
                sm={2}
                control={<Switch checked={state.newRes.display_on_website} onChange={e => handleFormValuesChange(e, 'display')} />}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Label htmlFor="archive" sm={5}><h6>Archive:  </h6></Label>
              <FormControlLabel
                sm={2}
                control={<Switch checked={state.newRes.archive} onChange={e => handleFormValuesChange(e, 'archive')} />}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Label htmlFor="new" sm={5}><h6>New Resource:  </h6></Label>
              <FormControlLabel
                sm={2}
                control={<Switch checked={state.newRes.new} onChange={e => handleFormValuesChange(e, 'new')} />}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col sm={{ size: 5, offset: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Create Resource
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
