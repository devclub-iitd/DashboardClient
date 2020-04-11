import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl,
  TextField, Fab, Checkbox, ListItemText,
} from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import {
  Card, CardImg, CardImgOverlay, CardText,
  CardBody, CardTitle, CardFooter, CardLink, Button, Popover,
  PopoverHeader, PopoverBody, ListGroup, ListGroupItem,
  Row, Col, CardHeader, CardSubtitle, Label,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import classnames from 'classnames';
import { LocalForm, Control, Errors } from 'react-redux-form';

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

        const required = val => val && val.length;
        const maxLength = len => val => !(val) || (val.length <= len);
        const minLength = len => val => (val) && (val.length >= len);

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

export default EditProjectForm;