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
      this.props.deleteResource(this.props.dumResources[this.props.index]._id);
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
      const required = val => val && val.length;
      const maxLength = len => val => !(val) || (val.length <= len);
      const minLength = len => val => (val) && (val.length >= len);

      return (
        <div>
          <Button
            onClick={() => {
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
                      <Typography variant="h5">
                                    Are you sure you want to delete the resource
                        {' '}
                        {this.state.name}
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
}

export default EditResourceForm;
