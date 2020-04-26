import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl, Button, 
  TextField, Fab, Checkbox, ListItemText, Snackbar } from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import { Card, CardImg, CardImgOverlay, CardText, 
  CardBody, CardTitle, CardFooter, CardLink, Popover,
  PopoverHeader, PopoverBody, ListGroup, ListGroupItem,
  Row, Col, CardHeader, CardSubtitle, Label,
  TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import classnames from 'classnames';
import { LocalForm, Control, Errors } from 'react-redux-form';

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
        orgEvent: this.props.dumEvents[this.props.index],
        event: this.props.dumEvents[this.props.index],
        urlFields: Array.from(this.props.dumEvents[this.props.index].url).map(([key, value]) => ({type: key, url: value})),
        memberNames: this.props.dumUsers.filter((user) => user.privelege_level !== 'Unapproved_User').map(user => user.name),
        selectedMembers: this.props.dumEvents[this.props.index].assignee.map((userId) => (this.props.dumUsers.filter(user => user._id === userId)[0]).name),
        isDailogOpen: false,
        isDeleteDailogOpen: false,
        success: false,
        cancelled: true,
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
      this.handleSuccessClose = this.handleSuccessClose.bind(this);
      this.strMapToObj = this.strMapToObj.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentWillReceiveProps (props) {
      this.setState({
        ...this.state,
        orgEvent: props.dumEvents[props.index],
        event: props.dumEvents[props.index],
      });
    }

    handleSuccessClose = () => {
      this.setState({
        ...this.state,
        success: false,
      });
    };
  
    changeName = (event) => {
      this.setState({
        ...this.state,
        // name: event.target.value,
        event: {
          ...this.state.event,
          name: event.target.value,
        },
      });
    };
  
    changeDescription = (event) => {
      this.setState({
        ...this.state,
        // description: event.target.value,
        event: {
          ...this.state.event,
          description: event.target.value,
        },
      });
    };
  
    changeEmbedCode = (event) => {
      this.setState({
        ...this.state,
        // embed_code: event.target.value,
        event: {
          ...this.state.event,
          embed_code: event.target.value,
        },
      });
    };
    
    endDateChange = (date) => {
      this.setState({
        ...this.state,
        // end_date: date,
        event: {
          ...this.state.event,
          end_date: date,
        },
      });
    };
  
    startDateChange = (date) => {
      this.setState({
        ...this.state,
        // start_date: date,
        event: {
          ...this.state.event,
          start_date: date,
        },
      });
    };
  
    changeDisplayState = (event) => {
      this.setState({
        ...this.state,
        // display_on_website: event.target.checked,
        event: {
          ...this.state.event,
          display_on_website: event.target.checked,
        },
      });
    };
  
    handleAddUrlFields = () => {
      // const urlVals = new Map(this.state.url);
      // urlVals.set('type', 'url');
      // this.setState({
      //   ...this.state,
      //   url: urlVals,
      // });
      const values = [...this.state.urlFields];
      values.push({ type: '', url: '' });
      this.setState({
        ...this.state,
        urlFields: values,
      });
    };
  
    handleRemoveUrlFields = (index) => {
      // const urlVals = this.state.url;
      // urlVals.delete(index);
      // this.setState({
      //   ...this.state,
      //   url: urlVals,
      // });
      const values = [...this.state.urlFields];
      values.splice(index, 1);
      this.setState({
        ...this.state,
        urlFields: values,
      });
    };
  
    handleUrlFieldChange = (index, event) => {
      // const urlVals = this.state.url;
      // urlVals.set(index, event.target.value);
      // this.setState({
      //   ...this.state,
      //   url: urlVals,
      // });
      const values = [...this.state.urlFields];
      if (event.target.name === 'type') {
        values[index].type = event.target.value;
      } else {
        values[index].url = event.target.value;
      }
      this.setState({
        ...this.state,
        urlFields: values,
      });
    };
  
    changeAssignee = (event) => {
      this.setState({
        ...this.state,
        // assignee: event.target.value,
        // event: {
        //   ...this.state.event,
        //   assignee: event.target.value,
        // },
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

    cancelEdit = () => {
      this.setState({
        ...this.state,
        event: {
          ...this.state.orgEvent,
        },
        urlFields: Array.from(this.state.orgEvent.url).map(([key, value]) => ({type: key, url: value})),
        memberNames: this.props.dumUsers.filter((user) => user.privelege_level !== 'Unapproved_User').map(user => user.name),
        selectedMembers: this.state.orgEvent.assignee.map((userId) => (this.props.dumUsers.filter(user => user._id === userId)[0]).name),
      }, () => this.handleFormClose());
    };
  
    handleDelete = () => {
      // Call delete thunk here,
      // this.props.deleteEvent(this.props.dumEvents[this.props.index]._id);
      this.props.deleteEvent(this.state.event._id);
      console.log('Deleting: ', this.state.name);
      this.confirmDeleteClose();
    }

    strMapToObj = (strMap) => {
      const obj = Object.create(null);
      Array.from(strMap).map(([k, v]) => { obj[k] = v; });
      return obj;
    }

  
    handleSubmit = () => {

      const urlMap = new Map();
      this.state.urlFields.map(urlField => urlMap.set(urlField.type, urlField.url));

      const updatedEvent = {
        ...this.state.event,
        url: this.strMapToObj(urlMap),
        assignee: this.state.selectedMembers.map((name) => (this.props.dumUsers.filter((user) => user.name === name)[0])._id),
      };

      this.props.editEvent(updatedEvent);
      // this.props.editEvent(this.state.event);
      console.log('got values: ', updatedEvent);
      if (this.props.serverError === null) {
        this.setState({
          ...this.state,
          success: true,
        });
      }
      this.handleFormClose();
    };
  
    render() {
        const required = val => val && val.length;
        const maxLength = len => val => !(val) || (val.length <= len);
        const minLength = len => val => (val) && (val.length >= len);
        // const { editFailed, removeFailed } = this.props;
        
        // const [serverError, setServerError] = React.useState(editFailed || removeFailed);

        // const handleClose = () => {
        //   setServerError(false);
        // };

        return (
            <div>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={this.state.success}
              autoHideDuration={2000}
              onClose={this.handleSuccessClose}
              message="Event edited Successfully !"
            />
            <Button onClick={() => { 
                this.handleFormOpen(); 
            }} 
                color="secondary"
                variant="contained"
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
                        // defaultValue={this.state.name}
                        defaultValue={this.state.event.name}
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
                        // defaultValue={this.state.description}
                        defaultValue={this.state.event.description}
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
                            // value={this.state.start_date}
                            // defaultValue={this.state.orgEvent.start_date}
                            value={this.state.event.start_date}
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
                            // defaultValue={this.state.orgEvent.end_date}
                            value={this.state.event.end_date}
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
                        // defaultValue={this.state.embed_code}
                        defaultValue={this.state.event.embed_code}
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
                        control={<Switch checked={this.state.event.display_on_website} onChange={this.changeDisplayState} />}
                        />
                    </Col>
                    </Row>
                    <Row className="form-group">
                    <Label htmlFor="urlFields" md={12}><h6>Url:</h6></Label>
                    <Col sm={12}>
                    {/* {Array.from(this.state.url).map(([index, value]) => ( */}
                      {this.state.urlFields.map((urlField, index) => (
                        <Fragment key={`${urlField}~${index}`}>
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
                                // value={index}
                                value={urlField.type}
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
                                // value={value}
                                value={urlField.url}
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
                        <Fab size="small" color="secondary" aria-label="add" onClick={() => this.handleAddUrlFields()}>
                          <AddIcon />
                        </Fab>
                    </Col>
                    </Row>
                    <Row className="form-group">
                      <Col>
                        <FormControl>
                        <InputLabel id="demo-mutiple-checkbox-label">Assignees</InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          value={this.state.selectedMembers}
                          onChange={this.changeAssignee}
                          input={<Input />}
                          renderValue={selected => selected.join(', ')}
                          // MenuProps={MenuProps}
                        >
                          {
                            this.state.memberNames.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={this.state.selectedMembers.indexOf(name) !== -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                            ))
                          }
                        </Select>
                        </FormControl>
                      </Col>
                    </Row>
                    <Row className="form-group">
                    {/* md={{ size: 2 }} */}
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Button fullWidth variant="outlined" color="primary" onClick={this.confirmDeleteOpen}>
                        Delete Event
                        </Button>
                    </Col>
                    <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
                        <DialogContent>
                        <Typography variant='h5'>
                            Are you sure you want to delete the event {this.state.name}
                        </Typography>
                        <Row style={{ marginTop: '2em' }} className="form-group">
                            <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                            <Button onClick={this.handleDelete} variant="contained" color="primary">
                                Confirm Delete
                            </Button>
                            </Col>
                            <Col xs={3} md={2}>
                            <Button variant="outlined" color="primary" onClick={this.confirmDeleteClose}>
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
                        <Button fullWidth onClick={this.handleSubmit} variant="contained" color="primary">
                            Save changes
                        </Button>
                      </Col>
                    {/* md={{ size: 2 }} */}
                      <Col xs={3} md={2}>
                        <Button fullWidth variant="contained" color="primary" onClick={this.cancelEdit}>
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

export default EditEventForm;