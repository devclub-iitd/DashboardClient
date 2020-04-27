import React, { Component } from 'react';
import {
  Typography,
  Dialog, DialogTitle, DialogContent,
  FormControlLabel, Switch, Button,
  Snackbar,
} from '@material-ui/core';
import {
  Row, Col, Label,
} from 'reactstrap';
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
      resource: this.props.dumResources[this.props.index],
      orgResource: this.props.dumResources[this.props.index],
      isDailogOpen: false,
      isDeleteDailogOpen: false,
      success: false,
    };

    this.handleFormValuesChange = this.handleFormValuesChange.bind(this);
    this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
    this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSuccessClose = this.handleSuccessClose.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      orgResource: props.dumResources[props.index],
      resource: props.dumResources[props.index],
    });
  }

  handleFormValuesChange = (event, name) => {
    if (name === 'archive') {
      this.setState({
        ...this.state,
        resource: {
          ...this.state.resource,
          archive: event.target.checked,
        },
      });
    } else if (name === 'display_on_website') {
      this.setState({
        ...this.state,
        resource: {
          ...this.state.resource,
          display_on_website: event.target.checked,
        },
      });
    } else if (name === 'new') {
      this.setState({
        ...this.state,
        resource: {
          ...this.state.resource,
          new: event.target.checked,
        },
      });
    } else {
      this.setState({
        ...this.state,
        resource: {
          ...this.state.resource,
          [event.target.name]: event.target.value,
        },
      });
    }
  }

  handleSuccessClose = () => {
    this.setState({
      ...this.state,
      success: false,
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
    // console.log('Deleting: ', this.state.name);
    this.confirmDeleteClose();
  };

  cancelEdit = () => {
    this.setState({
      ...this.state,
      resource: {
        ...this.state.orgResource,
      },
    }, () => this.handleFormClose());
    // window.location.reload(false);
  };

  handleSubmit = () => {
    // const updatedResource = {
    //   ...this.props.dumResources[this.props.index],
    //   ...this.state,
    // };

    // delete updatedResource.isDailogOpen;
    // delete updatedResource.isDeleteDailogOpen;
    // delete updatedResource.serverError;

    // this.props.editResource(updatedResource);
    this.props.editResource(this.state.resource);
    if (this.props.serverError === null) {
      this.setState({
        ...this.state,
        success: true,
      });
    }
    // console.log('got values: ', this.state);
    this.handleFormClose();
  };

  render() {
    const required = val => val && val.length;
    const maxLength = len => val => !(val) || (val.length <= len);
    const minLength = len => val => (val) && (val.length >= len);
    // let { editFailed, removeFailed } = this.props;

    // const [serverError, setServerError] = React.useState(editFailed || removeFailed);

    // const handleClose = () => {
    //   // setServerError(false);
    //   editFailed = false;
    //   removeFailed = false;
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
          message="Resource Edited successfully !"
        />
        <Button
          onClick={() => {
            this.handleFormOpen();
          }}
          variant="contained"
          color="secondary"
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
            <LocalForm model="resourceForm" onSubmit={() => this.handleSubmit()}>
              <Row className="form-group">
                <Label htmlFor="internal_name" md={4}><h6>Internal Name:</h6></Label>
                <Col md={8}>
                  <Control.text
                    model=".internal_name"
                    id="internal_name"
                    name="internal_name"
                    defaultValue={this.state.resource.internal_name}
                      // onChange={this.changeInternalName}
                    onChange={this.handleFormValuesChange}
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
                    defaultValue={this.state.resource.directory_year}
                      // onChange={this.changeDirectoryYear}
                    onChange={this.handleFormValuesChange}
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
                    defaultValue={this.state.resource.subdirectory}
                    onChange={this.handleFormValuesChange}
                      // onChange={this.changeSubDirectory}
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
                    defaultValue={this.state.resource.name}
                      // onChange={this.changeName}
                    onChange={this.handleFormValuesChange}
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
                    defaultValue={this.state.resource.description}
                      // onChange={this.changeDescription}
                    onChange={this.handleFormValuesChange}
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
                    defaultValue={this.state.resource.url}
                      // onChange={this.changeUrl}
                    onChange={this.handleFormValuesChange}
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
                    control={<Switch checked={this.state.resource.display_on_website} onChange={event => this.handleFormValuesChange(event, 'display_on_website')} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="archive" sm={5}><h6>Archive:  </h6></Label>
                  <FormControlLabel
                    sm={2}
                            // label="Display on Website"
                    control={<Switch checked={this.state.resource.archive} onChange={event => this.handleFormValuesChange(event, 'archive')} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="new" sm={5}><h6>New Resource:  </h6></Label>
                  <FormControlLabel
                    sm={2}
                                // label="Display on Website"
                    control={<Switch checked={this.state.resource.new} onChange={event => this.handleFormValuesChange(event, 'new')} />}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                {/* md={{ size: 2 }} */}
                <Col sm={{ size: 6, offset: 3 }}>
                  <Button fullWidth variant="outlined" color="primary" onClick={this.confirmDeleteOpen}>
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
                    <Row style={{ marginTop: '2em' }} className="form-group">
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
                <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                  <Button fullWidth variant="contained" type="submit" color="primary">
                    Save Changes
                  </Button>
                </Col>
                <Col xs={3} md={2}>
                  <Button fullWidth variant="contained" type="reset" color="primary" onClick={this.cancelEdit}>
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
