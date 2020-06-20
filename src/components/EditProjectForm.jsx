/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    Switch,
    Button,
    TextField,
    Fab,
    Checkbox,
    Snackbar,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Row, Col, Label } from 'reactstrap';
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from '@material-ui/icons';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { LocalForm, Control, Errors } from 'react-redux-form';

class EditProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.dumProjects[props.index].name,
            description: props.dumProjects[props.index].description,
            members: props.dumProjects[props.index].members,
            status: props.dumProjects[props.index].status,
            start_date: props.dumProjects[props.index].start_date,
            end_date: props.dumProjects[props.index].end_date,
            origin: props.dumProjects[props.index].origin,
            origin_contact: props.dumProjects[props.index].origin_contact,
            perks: props.dumProjects[props.index].perks,
            requirements: props.dumProjects[props.index].requirements,
            display_on_website:
                props.dumProjects[props.index].display_on_website,
            is_internal: props.dumProjects[props.index].is_internal,
            showcase: props.dumProjects[props.index].showcase,
            labels: props.dumProjects[props.index].labels,
            url: props.dumProjects[props.index].url,
            urlFields: Array.from(
                props.dumProjects[props.index].url
            ).map(([key, value]) => ({ type: key, url: value })),
            memberNames: props.dumUsers
                .filter((user) => user.privelege_level !== 'Unapproved_User')
                .map((user) => user.name),
            selectedMembers: props.dumProjects[props.index].members.map(
                (userId) =>
                    props.dumUsers.filter((user) => user._id === userId)[0].name
            ),
            // selectedMembers: dumUsers.filter(user => dumProjects[index].members.includes(user._id)),
            project: props.dumProjects[props.index],
            orgProject: props.dumProjects[props.index],
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
        this.handleMemberDelete = this.handleMemberDelete.bind(this);
        this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
        this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSuccessClose = this.handleSuccessClose.bind(this);
        // this.strMapToObj = this.strMapToObj.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState((prevState) => ({
            ...prevState,
            project: props.dumProjects[props.index],
        }));
    }

    handleSuccessClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            success: false,
        }));
    };

    changeName = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // name: event.target.value,
            project: {
                ...prevState.project,
                name: value,
            },
        }));
    };

    changeDescription = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // description: event.target.value,
            project: {
                ...prevState.project,
                description: value,
            },
        }));
    };

    changeStatus = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // status: event.target.value,
            project: {
                ...prevState.project,
                status: value,
            },
        }));
    };

    endDateChange = (date) => {
        this.setState((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                end_date: date,
            },
            // end_date: date,
        }));
    };

    startDateChange = (date) => {
        this.setState((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                start_date: date,
            },
            // start_date: date,
        }));
    };

    changeOrigin = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // origin: event.target.value,
            project: {
                ...prevState.project,
                origin: value,
            },
        }));
    };

    changeContactOrigin = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // origin_contact: event.target.value,
            project: {
                ...prevState.project,
                origin_contact: value,
            },
        }));
    };

    changePerks = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // perks: event.target.value,
            project: {
                ...prevState.project,
                perks: value,
            },
        }));
    };

    changeRequirements = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // requirements: event.target.value,
            project: {
                ...prevState.project,
                requirements: value,
            },
        }));
    };

    changeDisplayState = (event) => {
        const { checked } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                display_on_website: checked,
            },
            // display_on_website: event.target.checked,
        }));
    };

    changeInternalState = (event) => {
        const { checked } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // is_internal: event.target.checked,
            project: {
                ...prevState.project,
                is_internal: checked,
            },
        }));
    };

    changeShowcaseState = (event) => {
        const { checked } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // showcase: event.target.checked,
            project: {
                ...prevState.project,
                showcase: checked,
            },
        }));
    };

    handleAddLabelFields = () => {
        const { project } = this.state;
        const values = [...project.labels];
        values.push('');
        this.setState((prevState) => ({
            ...prevState,
            // labels: values,
            project: {
                ...prevState.project,
                labels: values,
            },
        }));
    };

    handleRemoveLabelFields = (index) => {
        const { project } = this.state;
        const values = [...project.labels];
        values.splice(index, 1);
        this.setState((prevState) => ({
            ...prevState,
            // labels: values,
            project: {
                ...prevState.project,
                labels: values,
            },
        }));
    };

    handleLabelFieldChange = (index, event) => {
        const { project } = this.state;
        const values = [...project.labels];
        values[index] = event.target.value;
        this.setState((prevState) => ({
            ...prevState,
            // labels: values,
            project: {
                ...prevState.project,
                labels: values,
            },
        }));
    };

    handleAddUrlFields = () => {
        // const urlVals = this.state.url;
        // urlVals.set('type', 'url');
        // this.setState({
        //   ...this.state,
        //   url: urlVals,
        // });
        const { urlFields } = this.state;
        const values = [...urlFields];
        values.push({ type: '', url: '' });
        this.setState((prevState) => ({
            ...prevState,
            urlFields: values,
        }));
    };

    handleRemoveUrlFields = (index) => {
        // const urlVals = this.state.url;
        // urlVals.delete(index);
        // this.setState({
        //   ...this.state,
        //   url: urlVals,
        // });
        const { urlFields } = this.state;
        const values = [...urlFields];
        values.splice(index, 1);
        this.setState((prevState) => ({
            ...prevState,
            urlFields: values,
        }));
    };

    handleUrlFieldChange = (index, event) => {
        // const urlVals = this.state.url;
        // urlVals.set(index, event.target.value);
        // this.setState({
        //   ...this.state,
        //   url: urlVals,
        // });
        const { urlFields } = this.state;
        const values = [...urlFields];
        if (event.target.name === 'type') {
            values[index].type = event.target.value;
        } else {
            values[index].url = event.target.value;
        }
        this.setState((prevState) => ({
            ...prevState,
            urlFields: values,
        }));
    };

    handleMemberChange = (values) => {
        this.setState((prevState) => ({
            ...prevState,
            selectedMembers: values,
        }));
    };

    handleMemberDelete = (index) => {
        const { selectedMembers } = this.state;
        let mems = [...selectedMembers];
        mems = mems.splice(index, 1);
        this.setState((prevState) => ({
            ...prevState,
            selectedMembers: mems,
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
        const { deleteProject, dumProjects, index } = this.props;
        deleteProject(dumProjects[index]._id);
        // console.log('Deleting: ', this.state.name);
        this.confirmDeleteClose();
    };

    // strMapToObj = (strMap) => {
    //     const obj = Object.create(null);
    //     Array.from(strMap).map(([k, v]) => {
    //         obj[k] = v;
    //         return null;
    //     });
    //     return obj;
    // };

    cancelEdit = () => {
        const { dumUsers } = this.props;
        this.setState(
            (prevState) => ({
                ...prevState,
                project: {
                    ...prevState.orgProject,
                },
                urlFields: Array.from(
                    prevState.orgProject.url
                ).map(([key, value]) => ({ type: key, url: value })),
                memberNames: dumUsers
                    .filter(
                        (user) => user.privelege_level !== 'Unapproved_User'
                    )
                    .map((user) => user.name),
                selectedMembers: prevState.orgProject.members.map(
                    (userId) =>
                        dumUsers.filter((user) => user._id === userId)[0].name
                ),
            }),
            () => this.handleFormClose()
        );
        // window.location.reload(false);
    };

    handleSubmit = () => {
        const urlMap = new Map();
        const { urlFields, project, selectedMembers } = this.state;
        const { dumUsers, editProject, serverError } = this.props;
        urlFields.map((urlField) => urlMap.set(urlField.type, urlField.url));

        const updatedProject = {
            ...project,
            url: urlMap,
            members: selectedMembers.map(
                (name) => dumUsers.filter((user) => user.name === name)[0]._id
            ),
        };

        // delete updatedProject.memberNames;
        // delete updatedProject.selectedMembers;
        // delete updatedProject.isDailogOpen;
        // delete updatedProject.isDeleteDailogOpen;
        // delete updatedProject.serverError;

        editProject(updatedProject);
        if (serverError === null) {
            this.setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        }
        this.handleFormClose();
        // this.props.editProject(project);
        // console.log('got values: ', updatedProject);
        // // console.log('submitting edited event: ', this.state.editEvent);
    };

    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !val || val.length <= len;
        const minLength = (len) => (val) => val && val.length >= len;
        // const { editFailed, removeFailed } = this.props;

        // const [serverError, setServerError] = React.useState(editFailed || removeFailed);

        // const handleClose = () => {
        //   setServerError(false);
        // };
        const {
            serverError,
            isDailogOpen,
            project,
            urlFields,
            memberNames,
            selectedMembers,
            isDeleteDailogOpen,
        } = this.state;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={serverError}
                    autoHideDuration={2000}
                    onClose={this.handleServerErrorClose}
                    message="Server Error !!! Try again"
                />
                <Button
                    onClick={() => {
                        this.handleFormOpen();
                    }}
                    variant="contained"
                    color="secondary"
                >
                    Edit Project
                </Button>
                <Dialog
                    open={isDailogOpen}
                    maxWidth="sm"
                    fullWidth
                    onClose={this.handleFormClose}
                    scroll="paper"
                >
                    <DialogTitle>
                        <Typography variant="h4">Edit Project</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>
                                    <h6>Name of Project:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".name"
                                        id="name"
                                        name="name"
                                        // defaultValue={this.state.name}
                                        defaultValue={project.name}
                                        onChange={this.changeName}
                                        placeholder="Project Name*"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(20),
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
                                        placeholder="Project Description*"
                                        // defaultValue={this.state.description}
                                        defaultValue={project.description}
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
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Select proposed Start Date of Project"
                                            format="MM/dd/yyyy"
                                            // value={this.state.start_date}
                                            value={project.start_date}
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
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Select proposed End Date of Project"
                                            format="MM/dd/yyyy"
                                            // value={this.state.end_date}
                                            value={project.end_date}
                                            onChange={this.endDateChange}
                                            minDate={project.start_date}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="origin" md={4}>
                                    <h6>Origin of Project:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".origin"
                                        id="origin"
                                        name="origin"
                                        // defaultValue={this.state.origin}
                                        defaultValue={project.origin}
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
                                <Label htmlFor="origin_contact" md={4}>
                                    <h6>Contact of Origin:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".origin_contact"
                                        id="origin_contact"
                                        name="origin_contact"
                                        placeholder="Origin Contact*"
                                        // defaultValue={this.state.origin_contact}
                                        defaultValue={project.origin_contact}
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
                                <Label htmlFor="perks" md={4}>
                                    <h6>Perks:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".perks"
                                        id="perks"
                                        name="perks"
                                        placeholder="Perks*"
                                        // defaultValue={this.state.perks}
                                        defaultValue={project.perks}
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
                                <Label htmlFor="requirements" md={4}>
                                    <h6>Requirements:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".requirements"
                                        id="requirements"
                                        name="requirements"
                                        placeholder="Requirements*"
                                        // defaultValue={this.state.requirements}
                                        defaultValue={project.requirements}
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
                                    <Label htmlFor="embed_code" sm={5}>
                                        <h6>Display on website: </h6>
                                    </Label>
                                    <FormControlLabel
                                        sm={2}
                                        // label="Display on Website"
                                        // control={<Switch checked={this.state.display_on_website} onChange={this.changeDisplayState} />}
                                        control={
                                            <Switch
                                                checked={
                                                    project.display_on_website
                                                }
                                                onChange={(e) =>
                                                    this.changeDisplayState(e)
                                                }
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="embed_code" sm={5}>
                                        <h6>Internal Project: </h6>
                                    </Label>
                                    <FormControlLabel
                                        sm={2}
                                        // label="Display on Website"
                                        // control={<Switch checked={this.state.is_internal} onChange={this.changeInternalState} />}
                                        control={
                                            <Switch
                                                checked={project.is_internal}
                                                onChange={
                                                    this.changeInternalState
                                                }
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="showcase" sm={5}>
                                        <h6>Showcase Project: </h6>
                                    </Label>
                                    <FormControlLabel
                                        sm={2}
                                        // label="Display on Website"
                                        // control={<Switch checked={this.state.showcase} onChange={this.changeShowcaseState} />}
                                        control={
                                            <Switch
                                                checked={project.showcase}
                                                onChange={
                                                    this.changeShowcaseState
                                                }
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="status" md={12}>
                                    <h6>Set status of project:</h6>
                                </Label>
                                <Col sm={12}>
                                    <RadioGroup
                                        row
                                        aria-label="status"
                                        name="status"
                                        defaultValue={project.status}
                                        onChange={this.changeStatus}
                                    >
                                        <FormControlLabel
                                            value="IDEA"
                                            control={
                                                <Radio color="secondary" />
                                            }
                                            label="Idea"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="ONGOING"
                                            control={
                                                <Radio color="secondary" />
                                            }
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
                                <Label htmlFor="labelFields" md={12}>
                                    <h6>Add Label:</h6>
                                </Label>
                                <Col sm={12}>
                                    {project.labels.map((labelField, index) => (
                                        <Fragment key={`${labelField}`}>
                                            <Row className="form-group">
                                                <Col
                                                    sm={{
                                                        size: 4,
                                                        offset: 4,
                                                    }}
                                                >
                                                    <TextField
                                                        label="label"
                                                        className="form-control"
                                                        id="label"
                                                        name="label"
                                                        variant="filled"
                                                        value={labelField}
                                                        onChange={(event) =>
                                                            this.handleLabelFieldChange(
                                                                index,
                                                                event
                                                            )
                                                        }
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <Fab
                                                        size="small"
                                                        aria-label="delete"
                                                        onClick={() =>
                                                            this.handleRemoveLabelFields(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <DeleteOutlinedIcon />
                                                    </Fab>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    ))}
                                    <Fab
                                        size="small"
                                        color="secondary"
                                        aria-label="add"
                                        onClick={() =>
                                            this.handleAddLabelFields()
                                        }
                                    >
                                        <AddIcon />
                                    </Fab>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="urlFields" md={12}>
                                    <h6>Url:</h6>
                                </Label>
                                <Col sm={12}>
                                    {/* {Array.from(this.state.url).map(([index, value]) => ( */}
                                    {urlFields.map((urlField, index) => (
                                        <Fragment key={`${urlField}`}>
                                            <Row className="form-group">
                                                {/* sm={12} md={{ size: 4, offset: 1 }} */}
                                                <Col
                                                    sm={12}
                                                    md={{
                                                        size: 4,
                                                        offset: 1,
                                                    }}
                                                >
                                                    <TextField
                                                        label="type"
                                                        // className="form-control"
                                                        // className={classes.urlField}
                                                        id="type"
                                                        name="type"
                                                        variant="filled"
                                                        // value={index}
                                                        value={urlField.type}
                                                        onChange={(event) =>
                                                            this.handleUrlFieldChange(
                                                                index,
                                                                event
                                                            )
                                                        }
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
                                                        onChange={(event) =>
                                                            this.handleUrlFieldChange(
                                                                index,
                                                                event
                                                            )
                                                        }
                                                    />
                                                </Col>
                                                {/* sm={2} */}
                                                <Col md={2}>
                                                    <Fab
                                                        size="small"
                                                        aria-label="delete"
                                                        onClick={() =>
                                                            this.handleRemoveUrlFields(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <DeleteOutlinedIcon />
                                                    </Fab>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    ))}
                                    <Fab
                                        size="small"
                                        color="secondary"
                                        aria-label="add"
                                        onClick={() =>
                                            this.handleAddUrlFields()
                                        }
                                    >
                                        <AddIcon />
                                    </Fab>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Autocomplete
                                        multiple
                                        fullWidth
                                        id="members"
                                        options={memberNames}
                                        disableCloseOnSelect
                                        value={selectedMembers}
                                        onChange={(e, v) =>
                                            this.handleMemberChange(v)
                                        }
                                        ChipProps={{
                                            variant: 'outlined',
                                            // avatar: <Avatar />,
                                            color: 'secondary',
                                        }}
                                        // renderTags={(values, func) => values.map((value, index) => (
                                        //   <Chip
                                        //     label={value.name}
                                        //     variant="outlined"
                                        //     color="secondary"
                                        //     avatar={<Avatar src={value.img}/>}
                                        //     onDelete={() => this.handleMemberDelete(index)}
                                        //   />
                                        // ))}
                                        noOptionsText="No users in club"
                                        getOptionLabel={(option) => option}
                                        renderOption={(
                                            option,
                                            { selected }
                                        ) => {
                                            return (
                                                <>
                                                    <Checkbox
                                                        icon={
                                                            <CheckBoxOutlineBlankIcon fontSize="small" />
                                                        }
                                                        checkedIcon={
                                                            <CheckBoxIcon fontSize="small" />
                                                        }
                                                        style={{
                                                            marginRight: 8,
                                                        }}
                                                        checked={selected}
                                                    />
                                                    {option}
                                                </>
                                            );
                                        }}
                                        style={{ width: '100%' }}
                                        renderInput={(params) => (
                                            <TextField
                                                // eslint-disable-next-line react/jsx-props-no-spreading
                                                {...params}
                                                variant="outlined"
                                                label="Members"
                                                placeholder="Search"
                                            />
                                        )}
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
                                        Delete Project
                                    </Button>
                                </Col>
                                <Dialog
                                    open={isDeleteDailogOpen}
                                    onClose={this.confirmDeleteClose}
                                >
                                    <DialogContent>
                                        <Typography variant="h5">
                                            Are you sure you want to delete the
                                            project {project.name}
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
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={this.handleDelete}
                                                    color="primary"
                                                >
                                                    Confirm Delete
                                                </Button>
                                            </Col>
                                            <Col xs={3} md={2}>
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
                                        color="primary"
                                        onClick={this.handleSubmit}
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

EditProjectForm.propTypes = {
    dumProjects: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    dumUsers: PropTypes.object.isRequired,
    deleteProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    serverError: PropTypes.string.isRequired,
};

export default EditProjectForm;
