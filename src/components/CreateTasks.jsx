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
  Control, Form, Errors,
} from 'react-redux-form';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import CreateEventForm from './CreateEventForm';
import CreateProjectForm from './CreateProjectForm';
import CreateResourceForm from './CreateResourceForm';

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
  //   // console.log('Reset Event form');
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
  //   // console.log('Reset Project form');
  //   props.resetProjectForm();
  // };

  // const handleResourceFormReset = () => {
  //   // console.log('Reset Resource form');
  //   props.resetResourceForm();
  // };

  const [successState, setSuccessState] = React.useState({
    eventSuccess: false,
    projectSuccess: false,
    resourceSuccess: false,
  });

  const handleSuccessClose = () => {
    setSuccessState({
      ...successState,
      eventSuccess: false,
      projectSuccess: false,
      resourceSuccess: false,
    });
  };

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
      assignee: [],
    };
    // console.log('event: ', newEvent);
    props.createEvent(newEvent);
    if (props.eventError === null) {
      setSuccessState({
        ...successState,
        eventSuccess: true,
      });
    }
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
    // console.log('project: ', newProject);
    props.createProject(newProject);
    if (props.projectError == null) {
      setSuccessState({
        ...successState,
        projectSuccess: true,
      });
    }
    resetPForm();
  };

  const submitResourceForm = (values) => {
    const newResource = {
      ...values,
      display_on_website: displayState,
      archive: archiveState,
      new: newState,
    };
    // console.log('resource: ', newResource);
    props.createResource(newResource);
    if (props.resourceError === null) {
      setSuccessState({
        ...successState,
        resourceSuccess: true,
      });
    }
    resetRForm();
  };

  return (
    <div>

      {/* {'Change type of field (date/checkbox/text) accordingly'}
      <br /> */}
      <Grid container direction="row" justify="center">
        {/* <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={successState.eventSuccess}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          message="Event created successfully !"
        /> */}
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={successState.projectSuccess}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          message="Project created successfully !"
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={successState.resourceSuccess}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          message="Resource created successfully !"
        />
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
                        <Button active={itemType === 'event'} variant={itemType === 'event' ? 'contained' : 'outlined'} color="primary" onClick={() => handleTypeChange('event')}>Event</Button>
                      </Grid>
                      <Grid item sm={3}>
                        <Button active={itemType === 'project'} variant={itemType === 'project' ? 'contained' : 'outlined'} color="primary" onClick={() => handleTypeChange('project')}>Project</Button>
                      </Grid>
                      <Grid item sm={3}>
                        <Button active={itemType === 'resource'} variant={itemType === 'resource' ? 'contained' : 'outlined'} color="primary" onClick={() => handleTypeChange('resource')}>Resource</Button>
                      </Grid>
                    </Grid>
                  </Col>
                </Row>
                {
                  itemType === 'event'
                    ? (
                      <CreateEventForm createEvent={props.createEvent} eventError={props.eventError} />
                    )
                    : null
                }
                {
                  itemType === 'project'
                    ? (
                      <CreateProjectForm createProject={props.createProject} projectError={props.projectError} />
                    )
                    : null
                }
                {
                  itemType === 'resource'
                    ? (
                      <CreateResourceForm createResource={props.createResource} resourceError={props.resourceError} />
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
