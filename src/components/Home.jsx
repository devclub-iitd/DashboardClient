import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl, 
  TextField, Fab, Checkbox, ListItemText } from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import { Card, CardImg, CardImgOverlay, CardText, 
  CardBody, CardTitle, CardFooter, CardLink, Button, Popover,
  PopoverHeader, PopoverBody, ListGroup, ListGroupItem,
  Row, Col, CardHeader, CardSubtitle, Label,
  TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import classnames from 'classnames';
import { LocalForm, Control, Errors } from 'react-redux-form';
// import {dumTasks} from './dumTasks';
import dumUsers from './dumUser';
import dumProjects from './dumProjects';
import dumEvents from './dumEvents';
import dumResources from './dumResources';
// import { classNames } from 'react-select/src/utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 250,
    maxHeight: 250,
    width: '100%',
  },
  gridL: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
  },
  gridR: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
    // maxHeight: 330,
    // scrollBehavior: 'smooth',
  },
  textPadding: {
    paddingTop: '1em',
    paddingBottom: '0.5em',
  },
  borderJ: {
    border: '3px solid',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // tableContainer: {
  //   maxHeight: 
  // }
  cardBorderL: {
    // border: '3px solid',
    // height: 450,
    // overflowY: 'scroll',
  },
  cardBorderR: {
    // border: '3px solid',
    height: 450,
    overflowY: 'scroll',
  },
  popBody: {
    height: 300,
    // minwidth: '80%',
    // width: 500,
    padding: 0,
    overflowY: 'scroll',
  },
  popHeader: {
    // width: 500,
  },
  popCardBody: {
    fontSize: '0.75rem',
  },
  popCardFooter: {
    fontSize: '0.5rem'
  },
  dialog: {
    maxWidth: '60%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

function TaskData() {
  const classes = useStyles();

  return (
    // <Paper className={classes.root}>
    // <h1>Pending Tasks</h1>
    null
  );
}

const required = val => val && val.length;
const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => (val) && (val.length >= len);

class EditEventForm extends Component {

  constructor (props) {
    super(props);

    this.state = {
      name: this.props.dumEvents[this.props.index].name,
      description: this.props.dumEvents[this.props.index].description,
      start_date: this.props.dumEvents[this.props.index].start_date,
      end_date: this.props.dumEvents[this.props.index].end_date,
      embed_code: this.props.dumEvents[this.props.index].embed_code,
      display_on_website: this.props.dumEvents[this.props.index].display_on_website,
      url: this.props.dumEvents[this.props.index].url,
      assignee: this.props.dumEvents[this.props.index].assignee,
      isDailogOpen: false,
      isDeleteDailogOpen: false,
    };

    this.endDateChange = this.endDateChange.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.changeDisplayState = this.changeDisplayState.bind(this);
    this.handleAddUrlFields = this.handleAddUrlFields.bind(this);
    this.handleRemoveUrlFields = this.handleRemoveUrlFields.bind(this);
    this.handleUrlFieldChange = this.handleUrlFieldChange.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeEmbedCode = this.changeEmbedCode.bind(this);
    this.changeAssignee = this.changeAssignee.bind(this);
    this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
    this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  changeName = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  changeDescription = (event) => {
    this.setState({
      ...this.state,
      description: event.target.value,
    });
  };

  changeEmbedCode = (event) => {
    this.setState({
      ...this.state,
      embed_code: event.target.value,
    })
  }
  
  endDateChange = (date) => {
    this.setState({
      ...this.state,
      end_date: date,
    });
  };

  startDateChange = (date) => {
    this.setState({
      ...this.state,
      start_date: date,
    });
  };

  changeDisplayState = (event) => {
    this.setState({
      ...this.state,
      display_on_website: event.target.checked,
    });
  };

  handleAddUrlFields = () => {
    const urlVals = new Map(this.state.url);
    urlVals.set('type', 'url');
    this.setState({
      ...this.state,
      url: urlVals,
    });
  };

  handleRemoveUrlFields = (index) => {
    const urlVals = this.state.url;
    urlVals.delete(index);
    this.setState({
      ...this.state,
      url: urlVals,
    });
  };

  handleUrlFieldChange = (index, event) => {
    const urlVals = this.state.url;
    urlVals.set(index, event.target.value);
    this.setState({
      ...this.state,
      url: urlVals,
    });
  };

  changeAssignee = (event) => {
    this.setState({
      ...this.state,
      assignee: event.target.value,
    });
  };

  handleFormOpen = () => {
    this.setState({
      ...this.state,
      isDailogOpen: true,
    });
  }

  handleFormClose = () => {
    this.setState({
      ...this.state,
      isDailogOpen: false,
    });
  };

  confirmDeleteOpen = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: true,
    });
  };

  confirmDeleteClose = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: false,
    });
  };

  handleDelete = () => {
    // Call delete thunk here,
    console.log('Deleting: ', this.state.name);
    this.confirmDeleteClose();
  }

  handleSubmit = () => {
    const updatedEvent = {
      ...this.props.dumEvents[this.props.index],
      ...this.state,
    };
    delete updatedEvent.isDailogOpen;
    delete updatedEvent.isDeleteDailogOpen;

    this.props.editEvent(updatedEvent);
    console.log('got values: ', this.state);
    this.handleFormClose();
  };

  render() {
    return (
      <div>
        <Button onClick={() => { 
          this.handleFormOpen(); 
        }} 
          color="primary"
        >
          Edit Event
        </Button>
        <Dialog open={this.state.isDailogOpen} maxWidth="sm" fullWidth onClose={this.handleFormClose} scroll="paper">
          <DialogTitle>
            <Typography variant="h4">
              Edit Event
            </Typography>
          </DialogTitle>
          <DialogContent>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}><h6>Name of Event:</h6></Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    defaultValue={this.state.name}
                    placeholder="Event Name*"
                    className="form-control"
                    onChange={this.changeName}
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
                    defaultValue={this.state.description}
                    rows="8"
                    className="form-control"
                    onChange={this.changeDescription}
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
                      value={this.state.start_date}
                      onChange={this.startDateChange}
                      // minDate={Date.now()}
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
                      value={this.state.end_date}
                      onChange={this.endDateChange}
                      minDate={this.state.start_date}
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
                    defaultValue={this.state.embed_code}
                    placeholder="Type embedded code"
                    rows="4"
                    className="form-control"
                    onChange={this.changeEmbedCode}
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
                    control={<Switch checked={this.state.display_on_website} onChange={this.changeDisplayState} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="urlFields" md={12}><h6>Url:</h6></Label>
                <Col sm={12}>
                {Array.from(this.state.url).map(([index, value]) => (
                    <Fragment key={`${index}`}>
                      <Row className="form-group">
                        {/* sm={12} md={{ size: 4, offset: 1 }} */}
                        <Col sm={12} md={{ size: 4, offset: 1 }}>
                          <TextField
                            label="type"
                            // className="form-control"
                            // className={classes.urlField}
                            id="type"
                            name="type"
                            variant="filled"
                            value={index}
                            onChange={event => this.handleUrlFieldChange(index, event)}
                          />
                        </Col>
                        {/* sm={12} md={4} */}
                        <Col sm={12} md={4}>
                          <TextField
                            label="url"
                            // className="form-control"
                            // className={classes.urlField}
                            id="url"
                            name="url"
                            variant="filled"
                            value={value}
                            onChange={event => this.handleUrlFieldChange(index, event)}
                          />
                        </Col>
                        {/* sm={2} */}
                        <Col md={2}>
                          <Fab size="small" aria-label="delete" onClick={() => this.handleRemoveUrlFields(index)}>
                            <DeleteOutlinedIcon />
                          </Fab>
                        </Col>
                      </Row>
                    </Fragment>
                  ))}
                  <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleAddUrlFields()}>
                    <AddIcon />
                  </Fab>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <FormControl variant="outlined">
                    <InputLabel id="assignee">
                      Assigned Member
                    </InputLabel>
                    <Select
                      labelId="assignee"
                      id="assignee"
                      value={this.state.assignee}
                      onChange={this.changeAssignee}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        this.props.dumUsers.filter((dumUser) => dumUser.privelege_level !== 'Unapproved_User').map((user) => {
                          return(
                            <MenuItem value={user.name}>{user.name}</MenuItem>
                          );
                        })
                      }
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row className="form-group">
                {/* md={{ size: 2 }} */}
                <Col sm={{ size: 5, offset: 4 }}>
                  <Button color="primary" onClick={this.confirmDeleteOpen}>
                    Delete Event
                  </Button>
                </Col>
                <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
                  <DialogContent>
                    <Typography variant='h5'>
                      Are you sure you want to delete the event {this.state.name}
                    </Typography>
                    <Row className="form-group">
                      <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                        <Button onClick={this.handleDelete} color="primary">
                          Confirm Delete
                        </Button>
                      </Col>
                      <Col xs={3} md={{ size: 2 }}>
                        <Button color="primary" onClick={this.confirmDeleteClose}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </DialogContent>
                </Dialog>
              </Row>
              <Row className="form-group">
              {/* md={{ size: 4, offset: 3 }} */}
              <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                <Button onClick={this.handleSubmit} color="primary">
                  Save changes
                </Button>
              </Col>
              {/* md={{ size: 2 }} */}
              <Col xs={3} md={{ size: 2 }}>
                <Button color="primary" onClick={this.handleFormClose}>
                  Cancel
                </Button>
              </Col>
            </Row>
            </LocalForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};

class EditProjectForm extends Component {

  constructor (props) {
    super(props);

    this.state = {
      name: this.props.dumProjects[this.props.index].name,
      description: this.props.dumProjects[this.props.index].description,
      members: this.props.dumProjects[this.props.index].members,
      status: this.props.dumProjects[this.props.index].status,
      start_date: this.props.dumProjects[this.props.index].start_date,
      end_date: this.props.dumProjects[this.props.index].end_date,
      origin: this.props.dumProjects[this.props.index].origin,
      origin_contact: this.props.dumProjects[this.props.index].origin_contact,
      perks: this.props.dumProjects[this.props.index].perks,
      requirements: this.props.dumProjects[this.props.index].requirements,
      display_on_website: this.props.dumProjects[this.props.index].display_on_website,
      is_internal: this.props.dumProjects[this.props.index].is_internal,
      showcase: this.props.dumProjects[this.props.index].showcase,
      labels: this.props.dumProjects[this.props.index].labels,
      url: this.props.dumProjects[this.props.index].url,
      memberNames: this.props.dumUsers.map(user => user.name),
      selectedMembers: this.props.dumProjects[this.props.index].members.map((user) => user.name),
      isDailogOpen: false,
      isDeleteDailogOpen: false,
    };

    this.changeName = this.changeName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.changeOrigin = this.changeOrigin.bind(this);
    this.changeContactOrigin = this.changeContactOrigin.bind(this);
    this.changePerks = this.changePerks.bind(this);
    this.changeRequirements = this.changeRequirements.bind(this);
    this.changeInternalState = this.changeInternalState.bind(this);
    this.changeShowcaseState = this.changeShowcaseState.bind(this);
    this.changeDisplayState = this.changeDisplayState.bind(this);
    this.handleAddLabelFields = this.handleAddLabelFields.bind(this);
    this.handleLabelFieldChange = this.handleLabelFieldChange.bind(this);
    this.handleRemoveLabelFields = this.handleRemoveLabelFields.bind(this);
    this.handleAddUrlFields = this.handleAddUrlFields.bind(this);
    this.handleRemoveUrlFields = this.handleRemoveUrlFields.bind(this);
    this.handleUrlFieldChange = this.handleUrlFieldChange.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
    this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  changeName = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  changeDescription = (event) => {
    this.setState({
      ...this.state,
      description: event.target.value,
    });
  };

  changeStatus = (event) => {
    this.setState({
      ...this.state,
      status: event.target.value,
    });
  };
  
  endDateChange = (date) => {
    this.setState({
      ...this.state,
      // editEvent: {
      //   ...this.state.editEvent,
      //   end_date: date,
      // },
      end_date: date,
    });
  };

  startDateChange = (date) => {
    this.setState({
      ...this.state,
      // editEvent: {
      //   ...this.state.editEvent,
      //   start_date: date,
      // },
      start_date: date,
    });
  };

  changeOrigin = (event) => {
    this.setState({
      ...this.state,
      origin: event.target.value,
    });
  };

  changeContactOrigin = (event) => {
    this.setState({
      ...this.state,
      origin_contact: event.target.value,
    });
  };

  changePerks = (event) => {
    this.setState({
      ...this.state,
      perks: event.target.value,
    });
  };

  changeRequirements = (event) => {
    this.setState({
      ...this.state,
      requirements: event.target.value,
    });
  };

  changeDisplayState = (event) => {
    this.setState({
      ...this.state,
      // editEvent: {
      //   ...this.state.editEvent,
      //   display_on_website: event.target.checked,
      // },
      display_on_website: event.target.checked,
    });
  };

  changeInternalState = (event) => {
    this.setState({
      ...this.state,
      is_internal: event.target.checked,
    });
  };

  changeShowcaseState = (event) => {
    this.setState({
      ...this.state,
      showcase: event.target.checked,
    });
  };

  handleAddLabelFields = () => {
    const values = this.state.labels;
    values.push('');
    this.setState({
      ...this.state,
      labels: values,
    });
  };

  handleRemoveLabelFields = (index) => {
    const values = this.state.labels;
    values.splice(index, 1);
    this.setState({
      ...this.state,
      labels: values,
    });
  };

  handleLabelFieldChange = (index, event) => {
    const values = this.state.labels;
    values[index] = event.target.value;
    this.setState({
      ...this.state,
      labels: values,
    });
  };

  handleAddUrlFields = () => {
    const urlVals = this.state.url;
    urlVals.set('type', 'url');
    this.setState({
      ...this.state,
      url: urlVals,
    });
  };

  handleRemoveUrlFields = (index) => {
    const urlVals = this.state.url;
    urlVals.delete(index);
    this.setState({
      ...this.state,
      url: urlVals,
    });
  };

  handleUrlFieldChange = (index, event) => {
    const urlVals = this.state.url;
    urlVals.set(index, event.target.value);
    this.setState({
      ...this.state,
      url: urlVals,
    });
  };

  handleMemberChange = event => {
    this.setState({
      ...this.state,
      selectedMembers: event.target.value,
    });
  };

  handleFormOpen = () => {
    this.setState({
      ...this.state,
      isDailogOpen: true,
    });
  }

  handleFormClose = () => {
    this.setState({
      ...this.state,
      isDailogOpen: false,
    });
  };

  confirmDeleteOpen = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: true,
    });
  };

  confirmDeleteClose = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: false,
    });
  };

  handleDelete = () => {
    // Call delete thunk here,
    console.log('Deleting: ', this.state.name);
    this.confirmDeleteClose();
  }

  handleSubmit = () => {
    this.setState({
      ...this.state,
      members: this.state.selectedMembers.map((name) => this.props.dumUsers.filter((user) => user.name === name)[0]._id),
    });
    
    const updatedProject = {
      ...this.props.dumProjects[this.props.index],
      ...this.state,
    };

    delete updatedProject.memberNames;
    delete updatedProject.selectedMembers;
    delete updatedProject.isDailogOpen;
    delete updatedProject.isDeleteDailogOpen;

    this.props.editProject(updatedProject);
    console.log('got values: ', this.state);
    this.handleFormClose();
    // console.log('submitting edited event: ', this.state.editEvent);
  };

  render() {
    return (
      <div>
        <Button onClick={() => { 
          this.handleFormOpen(); 
        }} 
          color="primary"
        >
          Edit Project
        </Button>
        <Dialog open={this.state.isDailogOpen} maxWidth="sm" fullWidth onClose={this.handleFormClose} scroll="paper">
          <DialogTitle>
            <Typography variant="h4">
              Edit Project
            </Typography>
          </DialogTitle>
          <DialogContent>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}><h6>Name of Project:</h6></Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    defaultValue={this.state.name}
                    onChange={this.changeName}
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
                    defaultValue={this.state.description}
                    onChange={this.changeDescription}
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
                      value={this.state.start_date}
                      onChange={this.startDateChange}
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
                      value={this.state.end_date}
                      onChange={this.endDateChange}
                      minDate={this.state.start_date}
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
                    defaultValue={this.state.origin}
                    onChange={this.changeOrigin}
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
                    defaultValue={this.state.origin_contact}
                    onChange={this.changeContactOrigin}
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
                    defaultValue={this.state.perks}
                    onChange={this.changePerks}
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
                    defaultValue={this.state.requirements}
                    onChange={this.changeRequirements}
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
                    control={<Switch checked={this.state.display_on_website} onChange={this.changeDisplayState} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="embed_code" sm={5}><h6>Internal Project:  </h6></Label>
                  <FormControlLabel
                    sm={2}
                    // label="Display on Website"
                    control={<Switch checked={this.state.is_internal} onChange={this.changeInternalState} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="showcase" sm={5}><h6>Showcase Project:  </h6></Label>
                  <FormControlLabel
                    sm={2}
                    // label="Display on Website"
                    control={<Switch checked={this.state.showcase} onChange={this.changeShowcaseState} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="labelFields" md={12}><h6>Add Label:</h6></Label>
                <Col sm={12}>
                  {this.state.labels.map((labelField, index) => (
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
                            onChange={event => this.handleLabelFieldChange(index, event)}
                          />
                        </Col>
                        <Col sm={2}>
                          <Fab size="small" aria-label="delete" onClick={() => this.handleRemoveLabelFields(index)}>
                            <DeleteOutlinedIcon />
                          </Fab>
                        </Col>
                      </Row>
                    </Fragment>
                  ))}
                  <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleAddLabelFields()}>
                    <AddIcon />
                  </Fab>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="urlFields" md={12}><h6>Url:</h6></Label>
                <Col sm={12}>
                {Array.from(this.state.url).map(([index, value]) => (
                    <Fragment key={`${index}`}>
                      <Row className="form-group">
                        {/* sm={12} md={{ size: 4, offset: 1 }} */}
                        <Col sm={12} md={{ size: 4, offset: 1 }}>
                          <TextField
                            label="type"
                            // className="form-control"
                            // className={classes.urlField}
                            id="type"
                            name="type"
                            variant="filled"
                            value={index}
                            onChange={event => this.handleUrlFieldChange(index, event)}
                          />
                        </Col>
                        {/* sm={12} md={4} */}
                        <Col sm={12} md={4}>
                          <TextField
                            label="url"
                            // className="form-control"
                            // className={classes.urlField}
                            id="url"
                            name="url"
                            variant="filled"
                            value={value}
                            onChange={event => this.handleUrlFieldChange(index, event)}
                          />
                        </Col>
                        {/* sm={2} */}
                        <Col md={2}>
                          <Fab size="small" aria-label="delete" onClick={() => this.handleRemoveUrlFields(index)}>
                            <DeleteOutlinedIcon />
                          </Fab>
                        </Col>
                      </Row>
                    </Fragment>
                  ))}
                  <Fab size="small" color="primary" aria-label="add" onClick={() => this.handleAddUrlFields()}>
                    <AddIcon />
                  </Fab>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <FormControl>
                    <InputLabel id="demo-mutiple-checkbox-label">Members</InputLabel>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
                      value={this.state.selectedMembers}
                      onChange={this.handleMemberChange}
                      input={<Input />}
                      renderValue={selected => selected.join(', ')}
                      // MenuProps={MenuProps}
                    >
                      {this.state.memberNames.map(name => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={this.state.selectedMembers.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row className="form-group">
                {/* md={{ size: 2 }} */}
                <Col sm={{ size: 5, offset: 4 }}>
                  <Button color="primary" onClick={this.confirmDeleteOpen}>
                    Delete Project
                  </Button>
                </Col>
                <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
                  <DialogContent>
                    <Typography variant='h5'>
                      Are you sure you want to delete the project {this.state.name}
                    </Typography>
                    <Row className="form-group">
                      <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                        <Button onClick={this.handleDelete} color="primary">
                          Confirm Delete
                        </Button>
                      </Col>
                      <Col xs={3} md={{ size: 2 }}>
                        <Button color="primary" onClick={this.confirmDeleteClose}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </DialogContent>
                </Dialog>
              </Row>
              <Row className="form-group">
                <Col sm={{ size: 4, offset: 3 }}>
                  <Button color="primary" onClick={this.handleSubmit}>
                    Save Changes
                  </Button>
                </Col>
                <Col sm={{ size: 2 }}>
                  <Button type="reset" color="primary" onClick={this.handleFormClose}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};

class EditResourceForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      internal_name: this.props.dumResources[this.props.index].internal_name,
      directory_year: this.props.dumResources[this.props.index].directory_year,
      subdirectory: this.props.dumResources[this.props.index].subdirectory,
      name: this.props.dumResources[this.props.index].name,
      archive: this.props.dumResources[this.props.index].archive,
      description: this.props.dumResources[this.props.index].description,
      url: this.props.dumResources[this.props.index].url,
      new: this.props.dumResources[this.props.index].new,
      display_on_website: this.props.dumResources[this.props.index].display_on_website,
      isDailogOpen: false,
      isDeleteDailogOpen: false,
    };

    this.changeInternalName = this.changeInternalName.bind(this);
    this.changeDirectoryYear = this.changeDirectoryYear.bind(this);
    this.changeSubDirectory = this.changeSubDirectory.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeArchiveState = this.changeArchiveState.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.changeNewState = this.changeNewState.bind(this);
    this.changeDisplayState = this.changeDisplayState.bind(this);
    this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
    this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  changeInternalName = (event) => {
    this.setState({
      ...this.state,
      internal_name: event.target.value,
    });
  };

  changeDirectoryYear = (event) => {
    this.setState({
      ...this.state,
      directory_year: event.target.value,
    });
  };

  changeSubDirectory = (event) => {
    this.setState({
      ...this.state,
      subdirectory: event.target.value,
    });
  };

  changeName = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  changeArchiveState = (event) => {
    this.setState({
      ...this.state,
      archive: event.target.checked,
    });
  };

  changeDescription = (event) => {
    this.setState({
      ...this.state,
      description: event.target.value,
    });
  };

  changeUrl = (event) => {
    this.setState({
      ...this.state,
      url: event.target.value,
    });
  };

  changeNewState = (event) => {
    this.setState({
      ...this.state,
      new: event.target.checked,
    });
  };

  changeDisplayState = (event) => {
    this.setState({
      ...this.state,
      display_on_website: event.target.checked,
    });
  };

  handleFormOpen = () => {
    this.setState({
      ...this.state,
      isDailogOpen: true,
    });
  };

  handleFormClose = () => {
    this.setState({
      ...this.state,
      isDailogOpen: false,
    });
  };

  confirmDeleteOpen = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: true,
    });
  };

  confirmDeleteClose = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: false,
    });
  };

  handleDelete = () => {
    // Call delete thunk here,
    console.log('Deleting: ', this.state.name);
    this.confirmDeleteClose();
  };

  handleSubmit = () => {
    const updatedResource = {
      ...this.props.dumResources[this.props.index],
      ...this.state,
    };

    delete updatedResource.isDailogOpen;
    delete updatedResource.isDeleteDailogOpen;

    this.props.editResource(updatedResource);

    console.log('got values: ', this.state);
    this.handleFormClose();
  };

  render() {
    return (
      <div>
        <Button onClick={() => { 
          this.handleFormOpen(); 
        }} 
          color="primary"
        >
          Edit Resource
        </Button>
        <Dialog open={this.state.isDailogOpen} maxWidth="sm" fullWidth onClose={this.handleFormClose} scroll="paper">
          <DialogTitle>
            <Typography variant="h4">
              Edit Resource
            </Typography>
          </DialogTitle>
          <DialogContent>
            <LocalForm model="resourceForm" onSubmit={values => this.handleSubmit()}>
              <Row className="form-group">
                <Label htmlFor="internal_name" md={4}><h6>Internal Name:</h6></Label>
                <Col md={8}>
                  <Control.text
                    model=".internal_name"
                    id="internal_name"
                    name="internal_name"
                    defaultValue={this.state.internal_name}
                    onChange={this.changeInternalName}
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
                    defaultValue={this.state.directory_year}
                    onChange={this.changeDirectoryYear}
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
                <Label htmlFor="sub_directory" md={4}><h6>Sub-Directory:</h6></Label>
                <Col md={8}>
                  <Control.text
                    model=".sub_directory"
                    id="sub_directory"
                    name="sub_directory"
                    placeholder="Sub-Directory*"
                    defaultValue={this.state.subdirectory}
                    onChange={this.changeSubDirectory}
                    className="form-control"
                    validators={{
                      required, minLength: minLength(1), maxLength: maxLength(20),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".sub_directory"
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
                    defaultValue={this.state.name}
                    onChange={this.changeName}
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
                    defaultValue={this.state.description}
                    onChange={this.changeDescription}
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
                    defaultValue={this.state.url}
                    onChange={this.changeUrl}
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
                    control={<Switch checked={this.state.display_on_website} onChange={this.changeDisplayState} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="archive" sm={5}><h6>Archive:  </h6></Label>
                  <FormControlLabel
                    sm={2}
                    // label="Display on Website"
                    control={<Switch checked={this.state.archive} onChange={this.changeArchiveState} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="new" sm={5}><h6>New Resource:  </h6></Label>
                  <FormControlLabel
                    sm={2}
                    // label="Display on Website"
                    control={<Switch checked={this.state.new} onChange={this.changeNewState} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                {/* md={{ size: 2 }} */}
                <Col sm={{ size: 5, offset: 4 }}>
                  <Button color="primary" onClick={this.confirmDeleteOpen}>
                    Delete Resource
                  </Button>
                </Col>
                <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
                  <DialogContent>
                    <Typography variant='h5'>
                      Are you sure you want to delete the resource {this.state.name}
                    </Typography>
                    <Row className="form-group">
                      <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                        <Button onClick={this.handleDelete} color="primary">
                          Confirm Delete
                        </Button>
                      </Col>
                      <Col xs={3} md={{ size: 2 }}>
                        <Button color="primary" onClick={this.confirmDeleteClose}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </DialogContent>
                </Dialog>
              </Row>
              <Row className="form-group">
                <Col sm={{ size: 5, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Save Changes
                  </Button>
                </Col>
                <Col sm={{ size: 2 }}>
                  <Button type="reset" color="primary" onClick={this.handleFormClose}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

};

class EditOtherUserForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: this.props.dumUsers[this.props.index],
      isDailogOpen: false,
      isDeleteDailogOpen: false,
      // privelege_level: this.state.dumUsers[this.props.index].privelege_level,
      // display_on_website: this.state.dumUsers[this.props.index].display_on_website,
    };

    this.changeDisplayState = this.changeDisplayState.bind(this);
    this.changePrivLevel = this.changePrivLevel.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.cancelUserEdit = this.cancelUserEdit.bind(this);
    this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
    this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  changeDisplayState = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        display_on_website: event.target.value,
      },
    });
  };

  changePrivLevel = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        privelege_level: event.target.value,
      },
    });
  };

  handleFormOpen = () => {
    this.setState({
      ...this.state,
      isDailogOpen: true,
    });
  };

  handleFormClose = () => {
    this.setState({
      ...this.state,
      isDailogOpen: false,
    });
  };

  cancelUserEdit = () => {
    this.handleFormClose();
  };

  confirmDeleteOpen = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: true,
    });
  };

  confirmDeleteClose = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: false,
    });
  };

  handleDelete = () => {
    // Call delete thunk here,
    console.log('Deleting: ', this.state.user.name);
    this.confirmDeleteClose();
  }

  handleSubmit = () => {

  }

  render() {
    return(
      <div>
        <Button onClick={() => { 
          this.handleFormOpen(); 
        }} 
          color="primary"
        >
          Edit User
        </Button>
          <Dialog open={this.state.isDailogOpen} maxWidth="sm" fullWidth onClose={this.handleFormClose} scroll="paper">
            <DialogTitle>
              <Typography variant="h4">
                Manage User
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Card>
                <CardHeader>
                  <Typography variant='h2'>{this.state.user.name}</Typography>
                </CardHeader>
                <CardBody>
                  <CardTitle>
                    <Typography variant='h5'>{this.state.user.entry_no}</Typography>
                  </CardTitle>
                  <CardSubtitle>
                    <Typography variant='h6'>{this.state.user.category}</Typography>
                  </CardSubtitle>
                  <CardText>
                    <Typography variant='body1'>{this.state.user.intro}</Typography>
                    <Typography variant='body1'>{`Interests: ${this.state.user.interests}`}</Typography>
                    <Typography variant='body1'>{`Specializations: ${this.state.user.specializations}`}</Typography>
                    <Typography variant='body1'>{`Hostel: ${this.state.user.hostel}`}</Typography>
                    <Typography variant='caption'>{`Email: ${this.state.user.email}`}</Typography>
                    <Typography variant='body1'>{`Mobile: ${this.state.user.mobile_number}`}</Typography>
                    {
                      Array.from(this.state.user.url).map(([key, value]) => {
                        return(
                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                        );
                      })
                    }
                  </CardText>
                </CardBody>
                <CardFooter>
                  <LocalForm>
                    <Row className="form-group">
                      <Label htmlFor="privelege_level" md={12}><h6>Set privelege level:</h6></Label>
                      <Col sm={12}>
                        <RadioGroup row aria-label="privelege_level" name="privelege_level" defaultValue={this.state.user.privelege_level} onChange={this.handlePrivChange}>
                          <FormControlLabel
                            value="Unapproved_User"
                            control={<Radio color="primary" />}
                            label="Unapprove User"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="Approved_User"
                            control={<Radio color="primary" />}
                            label="A[pprove User"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="Admin"
                            control={<Radio color="secondary" />}
                            label="Make Admin"
                            labelPlacement="start"
                          />
                          {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                        </RadioGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col>
                        <Label htmlFor="display_on_website" sm={5}><h6>Display on website:  </h6></Label>
                        <FormControlLabel
                          sm={2}
                          // label="Display on Website"
                          control={<Switch checked={this.state.user.display_on_website} onChange={this.changeDisplayState} />}
                        />
                      </Col>
                    </Row>
                  </LocalForm>
                </CardFooter>
              </Card>
              <Row className="form-group">
                {/* md={{ size: 2 }} */}
                <Col sm={{ size: 5, offset: 4 }}>
                  <Button color="primary" onClick={this.confirmDeleteOpen}>
                    Remove User
                  </Button>
                </Col>
                <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
                  <DialogContent>
                    <Typography variant='h5'>
                      Are you sure you want to remove the user {this.state.user.name}
                    </Typography>
                    <Row className="form-group">
                      <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                        <Button onClick={this.handleDelete} color="primary">
                          Confirm Delete
                        </Button>
                      </Col>
                      <Col xs={3} md={{ size: 2 }}>
                        <Button color="primary" onClick={this.confirmDeleteClose}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </DialogContent>
                </Dialog>
              </Row> 
              <Row className="form-group">
                <Col sm={{ size: 4, offset: 3 }}>
                  <Button color="primary" onClick={this.handleSubmit}>
                    Save Changes
                  </Button>
                </Col>
                <Col sm={{ size: 2 }}>
                  <Button color="primary" onClick={this.cancelUserEdit}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </DialogContent>
            {/* </ModalBody> */}
          </Dialog>
      </div>
    );
  }
};

export default function Home(props) {
  const classes = useStyles();
  // const curUser = dumUsers[0];
  const curUser = props.user;
  const dumUsers = props.users.allUsers;
  const dumEvents = props.events.allEvents;
  const dumProjects = props.projects.allProjects;
  const dumResources = props.resources.allResources;

  const [eventPopOpen, setEventPopOpen] = React.useState(false);
  const toggleEventPop = () => setEventPopOpen(!eventPopOpen);

  const [projectPopOpen, setProjectPopOpen] = React.useState(false);
  const toggleProjectPop = () => setProjectPopOpen(!projectPopOpen);

  const [resourcePopOpen, setResourcePopOpen] = React.useState(false);
  const toggleResourcePop = () => setResourcePopOpen(!resourcePopOpen);

  const [memPopOpen, setMemPopOpen] = React.useState(false);
  const toggleMemPop = () => {
    setMemPopOpen(!memPopOpen);
  };

  const [eventDailogOpen, setEventDailogOpen] =  React.useState(false);
  const [projectDailogOpen, setProjectDailogOpen] =  React.useState(false);
  const [resourceDailogOpen, setResourceDailogOpen] =  React.useState(false);
  const [userDailogOpen, setUserDailogOpen] =  React.useState(false);

  const handleEventCardOpen = () => {
    console.log('Event card clicked');
    setEventDailogOpen(true);
  }
  const handleEventCardClose = () => {
    console.log('Event card clicked');
    setEventDailogOpen(false);
  }

  const [activeTab, setActiveTab] = React.useState('Ongoing');
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [activeTaskTab, setActiveTaskTab] = React.useState('Events');
  const toggleTask = tab => {
    if (activeTaskTab !== tab) {
      setActiveTaskTab(tab);
    }
  };

  const handleProjectCardOpen = () => {
    console.log('Project card clicked');
    setProjectDailogOpen(true);
  }
  const handleProjectCardClose = () => {
    console.log('Project card clicked');
    setProjectDailogOpen(false);
  }

  const handleResourceCardOpen = () => {
    console.log('card clicked');
    setResourceDailogOpen(true);
  }
  const handleResourceCardClose = () => {
    console.log('card clicked');
    setResourceDailogOpen(false);
  }

  const handleUserCardOpen = () => {
    console.log('card clicked');
    setUserDailogOpen(true);
  }
  const handleUserCardClose = () => {
    console.log('card clicked');
    setUserDailogOpen(false);
  }

  function isOngoing (startDate: Date, endDate: Date) {
    let today = new Date();
    if(today > startDate && today < endDate) {
      return true;
    }
    else {
      return false;
    }
  }

  function isCompleted (endDate: Date) {
    let today = new Date();
    if(today > endDate) {
      return true;
    }
    else {
      return false;
    }
  }

  function isUpcoming (startDate: Date) {
    let today = new Date();
    if(today < startDate) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <div>
      <Grid id="pageContainer" container spacing={3} justify="space-evenly">
        {/* <Grid item xs={12} md={8} lg={9}>
          <Paper className="">
            <TaskData />
            
          </Paper>
        </Grid> */}
        <Grid item id="popContainer" spacing={3} container xs={12} md={5} justify="space-evenly" className={classes.cardBorderL}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">Club Activities</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="btn" id="eventCard" onClick={handleEventCardOpen}>
              <CardBody>
                <CardTitle>Events</CardTitle>
                <CardText>{dumEvents.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={eventDailogOpen} maxWidth="sm" fullWidth onClose={handleEventCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Events
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Ongoing
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Upcoming
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Completed
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Ongoing'>
                    {
                      props.events.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Events</h4>
                        <h4>{props.events.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isOngoing(event.start_date, event.end_date)).map((event, index) => {
                            return(
                              <Fragment key={`${event}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{event.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{event.description}</Typography>
                                        {
                                          Array.from(event.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: {event.assignee}
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Upcoming'>
                    {
                      props.events.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Events</h4>
                        <h4>{props.events.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isUpcoming(event.start_date)).map((event, index) => {
                            return(
                              <Fragment key={`${event}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{event.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{event.description}</Typography>
                                        {
                                          Array.from(event.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: {event.assignee !== '' ? event.assignee: 'None'}
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Completed'>
                    {
                      props.events.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Events</h4>
                        <h4>{props.events.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isCompleted(event.end_date)).map((event, index) => {
                            return(
                              <Fragment key={`${event}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{event.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{event.description}</Typography>
                                        {
                                          Array.from(event.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: {event.assignee}
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={eventPopOpen}
              target="eventCard"
              // container="pageContainer"
              // className={classes.pops}
              // boundariesElement='popContainer'
              toggle={toggleEventPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>Club Events</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumEvents.map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{event.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{event.description}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                Assigned to: {event.assignee !== '' ? event.assignee: 'None'}
                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                {
                                  curUser.privelege_level === 'Admin'
                                    ?
                                    <EditEventForm dumEvents={dumEvents} dumUsers={dumUsers} editEvent={props.editEvent} index={index} />
                                    : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="btn" id="projectCard" onClick={handleProjectCardOpen}>
              <CardBody>
                <CardTitle>Projects</CardTitle>
                <CardText>{dumProjects.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={projectDailogOpen} maxWidth="sm" fullWidth onClose={handleProjectCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Projects
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Ongoing
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Upcoming
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Completed
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Ongoing'>
                    {
                      props.projects.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Projects</h4>
                        <h4>{props.projects.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumProjects.filter((project) => project.status === 'ONGOING').map((project, index) => {
                            return(
                              <Fragment key={`${project}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{project.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{project.description}</Typography>
                                        {
                                          Array.from(project.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        project.members.map((mem) => ' ' +  mem.name + ',')
                                      }
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Upcoming'>
                    {
                      props.projects.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Projects</h4>
                        <h4>{props.projects.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumProjects.filter((project) => project.status === 'IDEA').map((project, index) => {
                            return(
                              <Fragment key={`${project}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{project.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{project.description}</Typography>
                                        {
                                          Array.from(project.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        project.members.map((mem) => ' ' +  mem.name + ',')
                                      }
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Completed'>
                    {
                      props.projects.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Projects</h4>
                        <h4>{props.projects.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumProjects.filter((project) => project.status === 'COMPLETED').map((project, index) => {
                            return(
                              <Fragment key={`${project}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{project.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{project.description}</Typography>
                                        {
                                          Array.from(project.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        project.members.map((mem) => ' ' +  mem.name + ',')
                                      }
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={projectPopOpen}
              target="projectCard"
              toggle={toggleProjectPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}>
                <Typography>Club Projects</Typography>
              </PopoverHeader>
              <PopoverBody className={classes.popBody}>
                <ListGroup>
                  {
                    dumProjects.map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{project.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{project.description}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}\n${project.members[0] !== undefined ? project.members[0].name : null}...`}</Typography>
                                {
                                  curUser.privelege_level === 'Admin'
                                  ?
                                  <EditProjectForm dumProjects={dumProjects} dumUsers={dumUsers} editProject={props.editProject} index={index} />
                                  : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card id="resourceCard" className="btn" onClick={handleResourceCardOpen}>
              <CardBody>
                <CardTitle>Resources</CardTitle>
                <CardText>{dumResources.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={resourceDailogOpen} maxWidth="sm" fullWidth onClose={handleResourceCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Resources
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Archived
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Current
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Completed'>
                    {
                      props.resources.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.resources.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumResources.filter((res) => res.archive).map((res, index) => {
                            return(
                              <Fragment key={`${res}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{res.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{res.directory_year}</Typography>
                                        {
                                          curUser.privelege_level !== 'Unapproved_User'
                                          ?
                                          <Typography variant='body1'>({res.internal_name})</Typography>
                                          : null
                                        }
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{res.description}</Typography>
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      <CardLink href={res.url}>Access resource</CardLink>
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Ongoing'>
                    {
                      props.resources.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.resources.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumResources.filter((res) => !(res.archive)).map((res, index) => {
                            return(
                              <Fragment key={`${res}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{res.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{res.directory_year}</Typography>
                                        {
                                          curUser.privelege_level !== 'Unapproved_User'
                                          ?
                                          <Typography variant='body1'>({res.internal_name})</Typography>
                                          : null
                                        }
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{res.description}</Typography>
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      <CardLink href={res.url}>Access resource</CardLink>
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={resourcePopOpen}
              target="resourceCard"
              toggle={toggleResourcePop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>Club Resources</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumResources.map((res, index) => {
                      return(
                        <Fragment key={`${res}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{res.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{`${res.description.substr(0, 30)}...`}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                {/* <Typography className={classes.popCardFooter} color="textSecondary">{res.url}</Typography> */}
                                <CardLink href={res.url}>Access resource</CardLink>
                                {
                                  curUser.privelege_level === 'Admin'
                                  ?
                                  <EditResourceForm dumResources={dumResources} dumUsers={dumUsers} editResource={props.editResource} index={index} />
                                  : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card id="memCard" className="btn" onClick={handleUserCardOpen}>
              <CardBody>
                <CardTitle>Members</CardTitle>
                <CardText>{dumUsers.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={userDailogOpen} maxWidth="sm" fullWidth onClose={handleUserCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Members
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Admin
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Approved
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Unapproved
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Ongoing'>
                    {
                      props.users.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Admin').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h2'>{user.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Upcoming'>
                    {
                      props.users.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Approved_User').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h2'>{user.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Completed'>
                    {
                      props.users.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Unapproved_User').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h2'>{user.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={memPopOpen}
              target="memCard"
              toggle={toggleMemPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>All Dashboard Users</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumUsers.map((user, index) => {
                      return(
                        <Fragment key={`${user}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{user.name}</Typography>
                                  <Typography variant="body2">{user.entry_no}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{`${user.intro.substr(0, 30)}...`}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${user.category}\n${(user.privelege_level === 'Unapproved_User' ? 'Unapproved':'')}`}</Typography>
                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                  {
                                    curUser.privelege_level === 'Admin'
                                    ?
                                    <EditOtherUserForm dumUsers={dumUsers} editUser={props.editOtherUser} index={index} />
                                    : null
                                  }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
        </Grid>
        <Grid item id="myTaskContainer" spacing={3} xs={12} md={5} className={classes.cardBorderR}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">My Tasks</Typography>
          </Grid>
          <Grid item xs={12}>
            <Nav tabs>
              <NavItem className="btn">
                <NavLink
                  className={classnames({ active: activeTaskTab === 'Events' })}
                  onClick={() => toggleTask('Events')}
                >
                  Events
                </NavLink>
              </NavItem>
              <NavItem className="btn">
                <NavLink
                  className={classnames({ active: activeTaskTab === 'Upcoming' })}
                  onClick={() => toggleTask('Projects')}
                >
                  Projects
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTaskTab}>
              <TabPane tabId='Events'>
                {
                  <ListGroup>
                    {
                      dumEvents.filter((event) => event.assignee === curUser.name).map((event, index) => {
                        return(
                          <Fragment key={`${event}~${index}`}>
                            <ListGroupItem>
                              <Card color="primary" outline>
                                <CardHeader>
                                  <Typography variant='h4'>{event.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                  <CardTitle>
                                    <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                  </CardTitle>
                                  <CardText>
                                    <Typography variant='body1' >{event.description}</Typography>
                                    {
                                      Array.from(event.url).map(([key, value]) => {
                                        return(
                                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                        );
                                      })
                                    }
                                  </CardText>
                                </CardBody>
                                {/* <CardFooter>
                                  Assigned to: {event.assignee}
                                </CardFooter> */}
                              </Card>
                            </ListGroupItem>
                          </Fragment>
                        );
                      })
                    }
                  </ListGroup>
                }
              </TabPane>
              <TabPane tabId='Projects'>
                {
                  <ListGroup>
                    {
                      dumProjects.filter((project) => project.members.map((mem) => mem.name).indexOf(curUser.name) !== -1).map((project, index) => {
                        return(
                          <Fragment key={`${project}~${index}`}>
                            <ListGroupItem>
                              <Card color="primary" outline>
                                <CardHeader>
                                  <Typography variant='h4'>{project.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                  <CardTitle>
                                    <Typography variant='h6'>{project.status}</Typography>
                                    <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                  </CardTitle>
                                  <CardText>
                                    <Typography variant='body1' >{project.description}</Typography>
                                    {
                                      Array.from(project.url).map(([key, value]) => {
                                        return(
                                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                        );
                                      })
                                    }
                                  </CardText>
                                </CardBody>
                                <CardFooter>
                                  Assigned to: 
                                  {
                                    project.members.map((mem) => ' ' +  mem.name + ',')
                                  }
                                </CardFooter>
                              </Card>
                            </ListGroupItem>
                          </Fragment>
                        );
                      })
                    }
                  </ListGroup>
                }
              </TabPane>
            </TabContent>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}