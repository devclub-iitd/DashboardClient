/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    Switch,
    Button,
    Snackbar,
} from '@material-ui/core';
import { Row, Col, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { LocalForm, Control, Errors } from 'react-redux-form';

class EditResourceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            internal_name: props.dumResources[props.index].internal_name,
            directory_year: props.dumResources[props.index].directory_year,
            subdirectory: props.dumResources[props.index].subdirectory,
            name: props.dumResources[props.index].name,
            archive: props.dumResources[props.index].archive,
            description: props.dumResources[props.index].description,
            url: props.dumResources[props.index].url,
            new: props.dumResources[props.index].new,
            display_on_website:
                props.dumResources[props.index].display_on_website,
            resource: props.dumResources[props.index],
            orgResource: props.dumResources[props.index],
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
        this.setState((prevState) => ({
            ...prevState,
            orgResource: props.dumResources[props.index],
            resource: props.dumResources[props.index],
        }));
    }

    handleFormValuesChange = (event, fieldName) => {
        const { checked, value, name } = event.target;
        if (fieldName === 'archive') {
            this.setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    archive: checked,
                },
            }));
        } else if (fieldName === 'display_on_website') {
            this.setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    display_on_website: checked,
                },
            }));
        } else if (fieldName === 'new') {
            this.setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    new: checked,
                },
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    [name]: value,
                },
            }));
        }
    };

    handleSuccessClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            success: false,
        }));
    };

    handleFormOpen = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDailogOpen: true,
        }));
    };

    handleFormClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDailogOpen: false,
        }));
    };

    confirmDeleteOpen = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDeleteDailogOpen: true,
        }));
    };

    confirmDeleteClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDeleteDailogOpen: false,
        }));
    };

    handleDelete = () => {
        // Call delete thunk here,
        const { deleteResource, dumResources, index } = this.props;
        deleteResource(dumResources[index]._id);
        // console.log('Deleting: ', this.state.name);
        this.confirmDeleteClose();
    };

    cancelEdit = () => {
        this.setState(
            (prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.orgResource,
                },
            }),
            () => this.handleFormClose()
        );
        // window.location.reload(false);
    };

    handleSubmit = () => {
        // const updatedResource = {
        //   ...dumResources[index],
        //   ...this.state,
        // };

        // delete updatedResource.isDailogOpen;
        // delete updatedResource.isDeleteDailogOpen;
        // delete updatedResource.serverError;

        // this.props.editResource(updatedResource);
        const { resource } = this.state;
        const { editResource, serverError } = this.props;
        editResource(resource);
        if (serverError === null) {
            this.setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        }
        // console.log('got values: ', this.state);
        this.handleFormClose();
    };

    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !val || val.length <= len;
        const minLength = (len) => (val) => val && val.length >= len;
        // let { editFailed, removeFailed } = this.props;

        // const [serverError, setServerError] = React.useState(editFailed || removeFailed);

        // const handleClose = () => {
        //   // setServerError(false);
        //   editFailed = false;
        //   removeFailed = false;
        // };
        const {
            success,
            isDailogOpen,
            resource,
            isDeleteDailogOpen,
        } = this.state;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={success}
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
                <Dialog
                    open={isDailogOpen}
                    maxWidth="sm"
                    fullWidth
                    onClose={this.handleFormClose}
                    scroll="paper"
                >
                    <DialogTitle>
                        <Typography variant="h4">Edit Resource</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <LocalForm
                            model="resourceForm"
                            onSubmit={() => this.handleSubmit()}
                        >
                            <Row className="form-group">
                                <Label htmlFor="internal_name" md={4}>
                                    <h6>Internal Name:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".internal_name"
                                        id="internal_name"
                                        name="internal_name"
                                        defaultValue={resource.internal_name}
                                        // onChange={this.changeInternalName}
                                        onChange={this.handleFormValuesChange}
                                        placeholder="Internal Name*"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(20),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".internal_name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:
                                                'Must be greater than 2 characters',
                                            maxLength:
                                                'Must be 25 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="directory_year" md={4}>
                                    <h6>Directory year:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".directory_year"
                                        id="directory_year"
                                        name="directory_year"
                                        placeholder="Directory Year*"
                                        defaultValue={resource.directory_year}
                                        // onChange={this.changeDirectoryYear}
                                        onChange={this.handleFormValuesChange}
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(20),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".directory_year"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:
                                                'Must be greater than 2 characters',
                                            maxLength:
                                                'Must be 25 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="sub_directory" md={4}>
                                    <h6>Sub-Directory:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".sub_directory"
                                        id="sub_directory"
                                        name="sub_directory"
                                        placeholder="Sub-Directory*"
                                        defaultValue={resource.subdirectory}
                                        onChange={this.handleFormValuesChange}
                                        // onChange={this.changeSubDirectory}
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(20),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".sub_directory"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:
                                                'Must be greater than 2 characters',
                                            maxLength:
                                                'Must be 25 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>
                                    <h6>Name of Resource:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".name"
                                        id="name"
                                        name="name"
                                        placeholder="Resource Name*"
                                        defaultValue={resource.name}
                                        // onChange={this.changeName}
                                        onChange={this.handleFormValuesChange}
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(30),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:
                                                'Must be greater than 2 characters',
                                            maxLength:
                                                'Must be 25 characters or less',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="description" md={12}>
                                    <h6>Description:</h6>
                                </Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model=".description"
                                        id="description"
                                        name="description"
                                        placeholder="Resource Description*"
                                        defaultValue={resource.description}
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
                                <Label htmlFor="url" md={4}>
                                    <h6>Url of Resource:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".url"
                                        id="url"
                                        name="url"
                                        placeholder="Resource Url*"
                                        defaultValue={resource.url}
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
                                    <Label htmlFor="displayOnWebsite" sm={5}>
                                        <h6>Display on website: </h6>
                                    </Label>
                                    <FormControlLabel
                                        sm={2}
                                        // label="Display on Website"
                                        control={
                                            <Switch
                                                checked={
                                                    resource.display_on_website
                                                }
                                                onChange={(event) =>
                                                    this.handleFormValuesChange(
                                                        event,
                                                        'display_on_website'
                                                    )
                                                }
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="archive" sm={5}>
                                        <h6>Archive: </h6>
                                    </Label>
                                    <FormControlLabel
                                        sm={2}
                                        // label="Display on Website"
                                        control={
                                            <Switch
                                                checked={resource.archive}
                                                onChange={(event) =>
                                                    this.handleFormValuesChange(
                                                        event,
                                                        'archive'
                                                    )
                                                }
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="new" sm={5}>
                                        <h6>New Resource: </h6>
                                    </Label>
                                    <FormControlLabel
                                        sm={2}
                                        // label="Display on Website"
                                        control={
                                            <Switch
                                                checked={resource.new}
                                                onChange={(event) =>
                                                    this.handleFormValuesChange(
                                                        event,
                                                        'new'
                                                    )
                                                }
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                {/* md={{ size: 2 }} */}
                                <Col sm={{ size: 6, offset: 3 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        onClick={this.confirmDeleteOpen}
                                    >
                                        Delete Resource
                                    </Button>
                                </Col>
                                <Dialog
                                    open={isDeleteDailogOpen}
                                    onClose={this.confirmDeleteClose}
                                >
                                    <DialogContent>
                                        <Typography variant="h5">
                                            Are you sure you want to delete the
                                            resource {resource.name}
                                        </Typography>
                                        <Row
                                            style={{ marginTop: '2em' }}
                                            className="form-group"
                                        >
                                            <Col
                                                xs={{ size: 7, offset: 1 }}
                                                md={{ size: 4, offset: 3 }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    onClick={this.handleDelete}
                                                    color="primary"
                                                >
                                                    Confirm Delete
                                                </Button>
                                            </Col>
                                            <Col xs={3} md={{ size: 2 }}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={
                                                        this.confirmDeleteClose
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            </Col>
                                        </Row>
                                    </DialogContent>
                                </Dialog>
                            </Row>
                            <Row className="form-group">
                                <Col
                                    xs={{ size: 7, offset: 1 }}
                                    md={{ size: 4, offset: 3 }}
                                >
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                    >
                                        Save Changes
                                    </Button>
                                </Col>
                                <Col xs={3} md={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="reset"
                                        color="primary"
                                        onClick={this.cancelEdit}
                                    >
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

EditResourceForm.propTypes = {
    dumResources: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    serverError: PropTypes.string.isRequired,
};

export default EditResourceForm;
