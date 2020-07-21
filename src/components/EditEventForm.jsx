/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    Switch,
    Button,
    TextField,
    Fab,
    Checkbox,
    Snackbar,
    Avatar,
    IconButton,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Row, Col, Label } from 'reactstrap';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';
import { LocalForm, Control, Errors } from 'react-redux-form';
import * as Utils from '../utils';

class EditEventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.dumEvents[props.index].name,
            description: props.dumEvents[props.index].description,
            start_date: props.dumEvents[props.index].start_date,
            end_date: props.dumEvents[props.index].end_date,
            embed_code: props.dumEvents[props.index].embed_code,
            display_on_website: props.dumEvents[props.index].display_on_website,
            url: props.dumEvents[props.index].url,
            assignee: props.dumEvents[props.index].assignee,
            orgEvent: props.dumEvents[props.index],
            event: props.dumEvents[props.index],
            urlFields: Array.from(props.dumEvents[props.index].url).map(
                ([key, value]) => ({
                    type: key,
                    url: value,
                })
            ),
            memberNames: props.dumUsers
                .filter((user) => user.privelege_level !== 'Unapproved_User')
                .map((user) => user.name),
            selectedMembers: props.dumEvents[props.index].assignee.map(
                (userId) =>
                    props.dumUsers.filter((user) => user._id === userId)[0].name
            ),
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

    componentWillReceiveProps({ dumEvents, index }) {
        this.setState((prevState) => ({
            ...prevState,
            orgEvent: dumEvents[index],
            event: dumEvents[index],
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
            event: {
                ...prevState.event,
                name: value,
            },
        }));
    };

    changeDescription = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // description: event.target.value,
            event: {
                ...prevState.event,
                description: value,
            },
        }));
    };

    changeEmbedCode = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // embed_code: event.target.value,
            event: {
                ...prevState.event,
                embed_code: value,
            },
        }));
    };

    endDateChange = (date) => {
        this.setState((prevState) => ({
            ...prevState,
            // end_date: date,
            event: {
                ...prevState.event,
                end_date: date,
            },
        }));
    };

    startDateChange = (date) => {
        this.setState((prevState) => ({
            ...prevState,
            // start_date: date,
            event: {
                ...prevState.event,
                start_date: date,
            },
        }));
    };

    changeDisplayState = (event) => {
        const { checked } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            // display_on_website: event.target.checked,
            event: {
                ...prevState.event,
                display_on_website: checked,
            },
        }));
    };

    handleAddUrlFields = () => {
        // const urlVals = new Map(this.state.url);
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

    changeAssignee = (values) => {
        this.setState((prevState) => ({
            ...prevState,
            // assignee: event.target.value,
            // event: {
            //   ...event,
            //   assignee: event.target.value,
            // },
            selectedMembers: values,
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

    cancelEdit = () => {
        const { dumUsers } = this.props;
        this.setState(
            (prevState) => ({
                ...prevState,
                event: {
                    ...prevState.orgEvent,
                },
                urlFields: Array.from(
                    prevState.orgEvent.url
                ).map(([key, value]) => ({ type: key, url: value })),
                memberNames: dumUsers
                    .filter(
                        (user) => user.privelege_level !== 'Unapproved_User'
                    )
                    .map((user) => user.name),
                selectedMembers: prevState.orgEvent.assignee.map(
                    (userId) =>
                        dumUsers.filter((user) => user._id === userId)[0].name
                ),
            }),
            () => this.handleFormClose()
        );
    };

    handleDelete = () => {
        const { deleteEvent } = this.props;
        // Call delete thunk here,
        // this.props.deleteEvent(dumEvents[index]._id);
        const { event } = this.state;
        deleteEvent(event._id);
        // console.log('Deleting: ', this.state.name);
        this.confirmDeleteClose();
        this.handleFormClose();
    };

    strMapToObj = (strMap) => {
        const obj = Object.create(null);
        Array.from(strMap).map(([k, v]) => {
            obj[k] = v;
            return null;
        });
        return obj;
    };

    handleSubmit = () => {
        const urlMap = new Map();
        const { dumUsers, serverError, editEvent } = this.props;
        const { event, urlFields, selectedMembers } = this.state;
        urlFields.for((urlField) => {
            const fixedUrl =
                urlField.url.startsWith('https://') ||
                urlField.url.startsWith('http://')
                    ? urlField.url
                    : ['https://', urlField.url].join('');
            urlMap.set(urlField.type, fixedUrl);
        });

        const updatedEvent = {
            ...event,
            url: Utils.strMapToObj(urlMap),
            assignee: selectedMembers.map(
                (name) => dumUsers.filter((user) => user.name === name)[0]._id
            ),
        };

        editEvent(updatedEvent);
        // this.props.editEvent(event);
        // console.log('got values: ', updatedEvent);
        if (serverError === null) {
            this.setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        }
        this.handleFormClose();
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
        const { isInTable } = this.props;
        const {
            success,
            isDailogOpen,
            event,
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
                    open={success}
                    autoHideDuration={2000}
                    onClose={this.handleSuccessClose}
                    message="Event edited Successfully !"
                />
                {isInTable ? (
                    <IconButton
                        onClick={() => this.handleFormOpen()}
                        variant="outlined"
                        color="secondary"
                        component="span"
                    >
                        <EditIcon fontSize="small" color="secondary" />
                    </IconButton>
                ) : (
                    <Button
                        onClick={() => {
                            this.handleFormOpen();
                        }}
                        color="secondary"
                        variant="contained"
                    >
                        Edit Event
                    </Button>
                )}
                <Dialog
                    open={isDailogOpen}
                    maxWidth="sm"
                    fullWidth
                    onClose={this.handleFormClose}
                    scroll="paper"
                >
                    <DialogTitle>
                        <Typography variant="h4">Edit Event</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <LocalForm
                            onSubmit={(values) => this.handleSubmit(values)}
                        >
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>
                                    <h6>Name of Event:</h6>
                                </Label>
                                <Col md={8}>
                                    <Control.text
                                        model=".name"
                                        id="name"
                                        name="name"
                                        // defaultValue={this.state.name}
                                        defaultValue={event.name}
                                        placeholder="Event Name*"
                                        className="form-control"
                                        onChange={this.changeName}
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
                                        placeholder="Event Description*"
                                        // defaultValue={this.state.description}
                                        defaultValue={event.description}
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
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="startdate-picker-dialog"
                                            label="Select Start Date of Event"
                                            format="MM/dd/yyyy"
                                            // value={this.state.start_date}
                                            // defaultValue={this.state.orgEvent.start_date}
                                            value={event.start_date}
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
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="enddate-picker-dialog"
                                            label="Select End Date of Event"
                                            format="MM/dd/yyyy"
                                            // defaultValue={this.state.orgEvent.end_date}
                                            value={event.end_date}
                                            onChange={this.endDateChange}
                                            minDate={event.start_date}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="embed_code" md={12}>
                                    <h6>Embedded Code:</h6>
                                </Label>
                                <Col md={{ size: 8, offset: 2 }}>
                                    <Control.textarea
                                        model=".embed_code"
                                        id="embed_code"
                                        name="embed_code"
                                        // defaultValue={this.state.embed_code}
                                        defaultValue={event.embed_code}
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
                                    <Label htmlFor="embed_code" sm={5}>
                                        <h6>Display on website: </h6>
                                    </Label>
                                    <FormControlLabel
                                        sm={2}
                                        control={
                                            <Switch
                                                checked={
                                                    event.display_on_website
                                                }
                                                onChange={
                                                    this.changeDisplayState
                                                }
                                            />
                                        }
                                    />
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
                                                        onChange={(e) =>
                                                            this.handleUrlFieldChange(
                                                                index,
                                                                e
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
                                                        onChange={(e) =>
                                                            this.handleUrlFieldChange(
                                                                index,
                                                                e
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
                                <Col xs={12}>
                                    <Autocomplete
                                        multiple
                                        fullWidth
                                        id="assignees"
                                        options={memberNames}
                                        disableCloseOnSelect
                                        value={selectedMembers}
                                        onChange={(e, v) =>
                                            this.changeAssignee(v)
                                        }
                                        ChipProps={{
                                            variant: 'outlined',
                                            avatar: <Avatar />,
                                            color: 'secondary',
                                        }}
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
                                        Delete Event
                                    </Button>
                                </Col>
                                <Dialog
                                    open={isDeleteDailogOpen}
                                    onClose={this.confirmDeleteClose}
                                >
                                    <DialogContent>
                                        <Typography variant="h5">
                                            Are you sure you want to delete the
                                            event {event.name}
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
                                                    onClick={this.handleDelete}
                                                    variant="contained"
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
                                {/* md={{ size: 4, offset: 3 }} */}
                                <Col
                                    xs={{ size: 7, offset: 1 }}
                                    md={{ size: 4, offset: 3 }}
                                >
                                    <Button
                                        fullWidth
                                        onClick={this.handleSubmit}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Save changes
                                    </Button>
                                </Col>
                                {/* md={{ size: 2 }} */}
                                <Col xs={3} md={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
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

EditEventForm.propTypes = {
    dumEvents: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    dumUsers: PropTypes.object.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired,
    serverError: PropTypes.string.isRequired,
    isInTable: PropTypes.bool.isRequired,
};

export default EditEventForm;
