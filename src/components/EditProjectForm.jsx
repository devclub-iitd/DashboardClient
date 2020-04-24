import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl, Button,
  TextField, Fab, Checkbox, ListItemText, Snackbar
} from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import {
  Card, CardImg, CardImgOverlay, CardText,
  CardBody, CardTitle, CardFooter, CardLink, Popover,
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
        urlFields: Array.from(this.props.dumProjects[this.props.index].url).map(([key, value]) => ({type: key, url: value})),
        memberNames: this.props.dumUsers.filter((user) => user.privelege_level !== 'Unapproved_User').map(user => user.name),
        selectedMembers: this.props.dumProjects[this.props.index].members.map((userId) => (this.props.dumUsers.filter(user => user._id === userId)[0]).name),
        // selectedMembers: this.props.dumUsers.filter(user => this.props.dumProjects[this.props.index].members.includes(user._id)),
        project: this.props.dumProjects[this.props.index],
        isDailogOpen: false,
        isDeleteDailogOpen: false,
        success: false,
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
      this.handleSuccessClose = this.handleSuccessClose.bind(this);
      this.strMapToObj = this.strMapToObj.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentWillReceiveProps (props) {
      this.setState({
        ...this.state,
        project: props.dumProjects[props.index],
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
        project: {
          ...this.state.project,
          name: event.target.value,
        },
      });
    };
  
    changeDescription = (event) => {
      this.setState({
        ...this.state,
        // description: event.target.value,
        project: {
          ...this.state.project,
          description: event.target.value,
        },
      });
    };
  
    changeStatus = (event) => {
      this.setState({
        ...this.state,
        // status: event.target.value,
        project: {
          ...this.state.project,
          status: event.target.value,
        },
      });
    };
    
    endDateChange = (date) => {
      this.setState({
        ...this.state,
        project: {
          ...this.state.project,
          end_date: date,
        },
        // end_date: date,
      });
    };
  
    startDateChange = (date) => {
      this.setState({
        ...this.state,
        project: {
          ...this.state.project,
          start_date: date,
        },
        // start_date: date,
      });
    };
  
    changeOrigin = (event) => {
      this.setState({
        ...this.state,
        // origin: event.target.value,
        project: {
          ...this.state.project,
          origin: event.target.value,
        },
      });
    };
  
    changeContactOrigin = (event) => {
      this.setState({
        ...this.state,
        // origin_contact: event.target.value,
        project: {
          ...this.state.project,
          origin_contact: event.target.value,
        },
      });
    };
  
    changePerks = (event) => {
      this.setState({
        ...this.state,
        // perks: event.target.value,
        project: {
          ...this.state.project,
          perks: event.target.value,
        },
      });
    };
  
    changeRequirements = (event) => {
      this.setState({
        ...this.state,
        // requirements: event.target.value,
        project: {
          ...this.state.project,
          requirements: event.target.value,
        },
      });
    };
  
    changeDisplayState = (event) => {
      this.setState({
        ...this.state,
        project: {
          ...this.state.project,
          display_on_website: event.target.checked,
        },
        // display_on_website: event.target.checked,
      });
    };
  
    changeInternalState = (event) => {
      this.setState({
        ...this.state,
        // is_internal: event.target.checked,
        project: {
          ...this.state.project,
          is_internal: event.target.checked,
        },
      });
    };
  
    changeShowcaseState = (event) => {
      this.setState({
        ...this.state,
        // showcase: event.target.checked,
        project: {
          ...this.state.project,
          showcase: event.target.checked,
        },
      });
    };
  
    handleAddLabelFields = () => {
      const values = [...this.state.project.labels];
      values.push('');
      this.setState({
        ...this.state,
        // labels: values,
        project: {
          ...this.state.project,
          labels: values,
        },
      });
    };
  
    handleRemoveLabelFields = (index) => {
      const values = [...this.state.project.labels];
      values.splice(index, 1);
      this.setState({
        ...this.state,
        // labels: values,
        project: {
          ...this.state.project,
          labels: values,
        },
      });
    };
  
    handleLabelFieldChange = (index, event) => {
      const values = [...this.state.project.labels];
      values[index] = event.target.value;
      this.setState({
        ...this.state,
        // labels: values,
        project: {
          ...this.state.project,
          labels: values,
        },
      });
    };
  
    handleAddUrlFields = () => {
      // const urlVals = this.state.url;
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
      this.props.deleteProject(this.props.dumProjects[this.props.index]._id);
      console.log('Deleting: ', this.state.name);
      this.confirmDeleteClose();
    }

    strMapToObj = (strMap) => {
      const obj = Object.create(null);
      Array.from(strMap).map(([k, v]) => { obj[k] = v; });
      return obj;
    }

    cancelEdit = () => {
      window.location.reload(false);
    }
  
    handleSubmit = () => {
      const urlMap = new Map();
      this.state.urlFields.map(urlField => urlMap.set(urlField.type, urlField.url));
      
      const updatedProject = {
        ...this.state.project,
        url: this.strMapToObj(urlMap),
        members: this.state.selectedMembers.map((name) => (this.props.dumUsers.filter((user) => user.name === name)[0])._id),
      };
  
      // delete updatedProject.memberNames;
      // delete updatedProject.selectedMembers;
      // delete updatedProject.isDailogOpen;
      // delete updatedProject.isDeleteDailogOpen;
      // delete updatedProject.serverError;
  
      this.props.editProject(updatedProject);
      if (this.props.serverError === null) {
        this.setState({
          ...this.state,
          success: true,
        });
      }
      this.handleFormClose();
      // this.props.editProject(this.state.project);
      console.log('got values: ', updatedProject);
      // console.log('submitting edited event: ', this.state.editEvent);
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
              open={this.state.serverError}
              autoHideDuration={2000}
              onClose={this.handleServerErrorClose}
              message="Server Error !!! Try again"
            />
          <Button onClick={() => { 
              this.handleFormOpen(); 
          }} 
              variant="contained"
              color="secondary"
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
                      // defaultValue={this.state.name}
                      defaultValue={this.state.project.name}
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
                      // defaultValue={this.state.description}
                      defaultValue={this.state.project.description}
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
                          // value={this.state.start_date}
                          value={this.state.project.start_date}
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
                          // value={this.state.end_date}
                          value={this.state.project.end_date}
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
                      // defaultValue={this.state.origin}
                      defaultValue={this.state.project.origin}
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
                      // defaultValue={this.state.origin_contact}
                      defaultValue={this.state.project.origin_contact}
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
                      // defaultValue={this.state.perks}
                      defaultValue={this.state.project.perks}
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
                      // defaultValue={this.state.requirements}
                      defaultValue={this.state.project.requirements}
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
                      // control={<Switch checked={this.state.display_on_website} onChange={this.changeDisplayState} />}
                      control={<Switch checked={this.state.project.display_on_website} onChange={this.changeDisplayState} />}
                      />
                  </Col>
                  </Row>
                  <Row className="form-group">
                  <Col>
                      <Label htmlFor="embed_code" sm={5}><h6>Internal Project:  </h6></Label>
                      <FormControlLabel
                      sm={2}
                      // label="Display on Website"
                      // control={<Switch checked={this.state.is_internal} onChange={this.changeInternalState} />}
                      control={<Switch checked={this.state.project.is_internal} onChange={this.changeInternalState} />}
                      />
                  </Col>
                  </Row>
                  <Row className="form-group">
                  <Col>
                      <Label htmlFor="showcase" sm={5}><h6>Showcase Project:  </h6></Label>
                      <FormControlLabel
                      sm={2}
                      // label="Display on Website"
                      // control={<Switch checked={this.state.showcase} onChange={this.changeShowcaseState} />}
                      control={<Switch checked={this.state.project.showcase} onChange={this.changeShowcaseState} />}
                      />
                  </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="status" md={12}><h6>Set status of project:</h6></Label>
                    <Col sm={12}>
                      <RadioGroup row aria-label="status" name="status" defaultValue={this.state.project.status} onChange={this.changeStatus}>
                        <FormControlLabel
                          value="IDEA"
                          control={<Radio color="secondary" />}
                          label="Idea"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="ONGOING"
                          control={<Radio color="secondary" />}
                          label="Ongoing"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="COMPLETED"
                          control={<Radio color="primary" />}
                          label="Completed"
                          labelPlacement="end"
                        />
                        {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                      </RadioGroup>
                    </Col>
                  </Row>
                  <Row className="form-group">
                  <Label htmlFor="labelFields" md={12}><h6>Add Label:</h6></Label>
                  <Col sm={12}>
                      {this.state.project.labels.map((labelField, index) => (
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
                      <Fab size="small" color="secondary" aria-label="add" onClick={() => this.handleAddLabelFields()}>
                      <AddIcon />
                      </Fab>
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
                              <Checkbox checked={this.state.selectedMembers.indexOf(name) !== -1} />
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
                      <Button variant="outlined" color="primary" onClick={this.confirmDeleteOpen}>
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
                            <Button variant="contained" onClick={this.handleDelete} color="primary">
                                Confirm Delete
                            </Button>
                          </Col>
                          <Col xs={3} md={{ size: 2 }}>
                            <Button variant="outlined" color="primary" onClick={this.confirmDeleteClose}>
                                Cancel
                            </Button>
                          </Col>
                      </Row>
                      </DialogContent>
                  </Dialog>
                  </Row>
                  <Row className="form-group">
                  <Col sm={{ size: 4, offset: 3 }}>
                      <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                      Save Changes
                      </Button>
                  </Col>
                  <Col sm={{ size: 2 }}>
                      <Button variant="contained" type="reset" color="primary" onClick={this.cancelEdit}>
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