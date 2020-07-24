/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Switch,
    Button,
    TextField,
    Fab,
    Checkbox,
    Snackbar,
    Avatar,
    IconButton,
    Tooltip,
    Grid,
    Hidden,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
    EditRounded,
    Delete,
    AddCircleRounded,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import * as Utils from '../utils';

export default function EditEventForm(props) {
    const { dumEvents, index, dumUsers } = props;

    // const dumEvents[index] = dumEvents.filter((event) => event._id === eventId);

    const [state, setState] = React.useState({
        orgEvent: dumEvents[index],
        event: dumEvents[index],
        urlFields: Array.from(dumEvents[index].url).map(([key, value]) => ({
            type: key,
            url: value,
        })),
        memberNames: dumUsers
            .filter((user) => user.privelege_level !== 'Unapproved_User')
            .map((user) => user.name),
        selectedMembers: dumEvents[index].assignee.map(
            (userId) => dumUsers.filter((user) => user._id === userId)[0].name
        ),
        isDailogOpen: false,
        isDeleteDailogOpen: false,
        success: false,
        cancelled: true,
    });

    React.useEffect(() => {
        setState({
            orgEvent: dumEvents[index],
            event: dumEvents[index],
            urlFields: Array.from(dumEvents[index].url).map(([key, value]) => ({
                type: key,
                url: value,
            })),
            memberNames: dumUsers
                .filter((user) => user.privelege_level !== 'Unapproved_User')
                .map((user) => user.name),
            selectedMembers: dumEvents[index].assignee.map(
                (userId) =>
                    dumUsers.filter((user) => user._id === userId)[0].name
            ),
            isDailogOpen: false,
            isDeleteDailogOpen: false,
            success: false,
            cancelled: true,
        });
    }, [dumEvents, index, dumUsers]);

    const handleFormValuesChange = (event, name) => {
        if (name === 'start_date') {
            setState({
                ...state,
                event: {
                    ...state.event,
                    start_date: event,
                },
            });
        } else if (name === 'end_date') {
            setState({
                ...state,
                event: {
                    ...state.event,
                    end_date: event,
                },
            });
        } else if (name === 'display_on_website') {
            setState({
                ...state,
                event: {
                    ...state.event,
                    display_on_website: event.target.checked,
                },
            });
        } else {
            setState({
                ...state,
                event: {
                    ...state.event,
                    [event.target.name]: event.target.value,
                },
            });
        }
    };

    const handleSuccessClose = () => {
        setState((prevState) => ({
            ...prevState,
            success: false,
        }));
    };

    const handleAddUrlFields = () => {
        const { urlFields } = state;
        const values = [...urlFields];
        values.push({ type: '', url: '' });
        setState((prevState) => ({
            ...prevState,
            urlFields: values,
        }));
    };

    const handleRemoveUrlFields = (idx) => {
        const { urlFields } = state;
        const values = [...urlFields];
        values.splice(idx, 1);
        setState((prevState) => ({
            ...prevState,
            urlFields: values,
        }));
    };

    const handleUrlFieldChange = (idx, event) => {
        const { urlFields } = state;
        const values = [...urlFields];
        if (event.target.name === 'type') {
            if (values[idx].type === 'url') {
                return;
            }
            values[idx].type = event.target.value;
        } else {
            values[idx].url = event.target.value;
        }
        setState((prevState) => ({
            ...prevState,
            urlFields: values,
        }));
    };

    const changeAssignee = (values) => {
        setState((prevState) => ({
            ...prevState,
            selectedMembers: values,
        }));
    };

    const handleFormOpen = () => {
        setState((prevState) => ({
            ...prevState,
            isDailogOpen: true,
        }));
    };

    const handleFormClose = () => {
        setState((prevState) => ({
            ...prevState,
            isDailogOpen: false,
        }));
    };

    const confirmDeleteOpen = () => {
        setState((prevState) => ({
            ...prevState,
            isDeleteDailogOpen: true,
        }));
    };

    const confirmDeleteClose = () => {
        setState((prevState) => ({
            ...prevState,
            isDeleteDailogOpen: false,
        }));
    };

    const cancelEdit = () => {
        setState((prevState) => ({
            ...prevState,
            event: {
                ...prevState.orgEvent,
            },
            urlFields: Array.from(
                prevState.orgEvent.url
            ).map(([key, value]) => ({ type: key, url: value })),
            memberNames: dumUsers
                .filter((user) => user.privelege_level !== 'Unapproved_User')
                .map((user) => user.name),
            selectedMembers: prevState.orgEvent.assignee.map(
                (userId) =>
                    dumUsers.filter((user) => user._id === userId)[0].name
            ),
        }));
        handleFormClose();
    };

    const handleDelete = () => {
        const { deleteEvent } = props;
        const { event } = state;
        deleteEvent(event._id);
        confirmDeleteClose();
        handleFormClose();
    };

    const handleSubmit = () => {
        const urlMap = new Map();
        const { serverError, editEvent } = props;
        const { event, urlFields, selectedMembers } = state;
        urlFields.forEach((urlField) => {
            const fixedUrl = Utils.isValidUrl(urlField.url)
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
        if (serverError === null) {
            setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        }
        handleFormClose();
    };

    const FieldSep = () => {
        return <Grid item xs={12} style={{ height: '8px' }} />;
    };

    const {
        success,
        isDailogOpen,
        event,
        urlFields,
        memberNames,
        selectedMembers,
        isDeleteDailogOpen,
    } = state;

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={success}
                autoHideDuration={2000}
                onClose={handleSuccessClose}
                message="Event updated Successfully !"
            />
            <Tooltip title="Edit Event">
                <Fab
                    onClick={() => handleFormOpen()}
                    size="small"
                    color="primary"
                >
                    <EditRounded
                        fontSize="small"
                        style={{ color: '#636366' }}
                    />
                </Fab>
            </Tooltip>
            <Dialog
                open={isDailogOpen}
                maxWidth="sm"
                fullWidth
                onClose={handleFormClose}
                scroll="paper"
            >
                <DialogTitle>
                    <Typography variant="h4">Edit Event</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="h6">Name of Event:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                value={event.name}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'name')
                                }
                                id="name"
                                label="Name"
                            />
                        </Grid>
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">Description:</Typography>
                        </Grid>
                        <Grid item xs={10} sm={8}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rowsMax={5}
                                id="description"
                                name="description"
                                label="Description"
                                value={event.description}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'description')
                                }
                            />
                        </Grid>
                        <FieldSep />
                        <Grid xs={6}>
                            <Typography variant="h6">Starting Date:</Typography>
                        </Grid>
                        <Hidden xsDown>
                            <Grid xs={6}>
                                <Typography variant="h6">
                                    Ending Date:
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={10} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="start_date"
                                    label="Starting Date of Event"
                                    format="MM/dd/yyyy"
                                    value={event.start_date}
                                    name="start_date"
                                    onChange={(date) =>
                                        handleFormValuesChange(
                                            date,
                                            'start_date'
                                        )
                                    }
                                    miaxDate={new Date()}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    required
                                    style={{ width: '90%' }}
                                    inputVariant="outlined"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Hidden only={['sm', 'md', 'lg', 'drawerMin', 'xl']}>
                            <Grid xs={6}>
                                <Typography variant="h6">
                                    Ending Date:
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item xs={10} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="end_date"
                                    label="Ending Date of Event"
                                    format="MM/dd/yyyy"
                                    value={event.start_date}
                                    name="end_date"
                                    onChange={(date) =>
                                        handleFormValuesChange(date, 'end_date')
                                    }
                                    miaxDate={new Date()}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    required
                                    style={{ width: '90%' }}
                                    inputVariant="outlined"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <FieldSep />
                        <Grid xs={12}>
                            <Typography variant="h6">Embedded Code:</Typography>
                        </Grid>
                        <Grid item xs={10} sm={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                rows={5}
                                margin="normal"
                                multiline
                                rowsMax={8}
                                id="embed_code"
                                name="embed_code"
                                label="Embedded Code"
                                value={event.embed_code}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'embed_code')
                                }
                            />
                        </Grid>
                        <FieldSep />
                        <Grid container item xs={12} alignItems="center">
                            <Grid item xs={5}>
                                <Typography variant="h6">
                                    Display on website:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch
                                    checked={event.display_on_website}
                                    onChange={(e) =>
                                        handleFormValuesChange(
                                            e,
                                            'display_on_website'
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>

                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">Urls:</Typography>
                        </Grid>
                        <Grid item container alignItems="center" xs={12}>
                            {urlFields.map(({ type, url }, idx) => (
                                <>
                                    <Grid item xs={8} sm={5}>
                                        <TextField
                                            style={{ width: '90%' }}
                                            required
                                            small
                                            margin="normal"
                                            label="type"
                                            id="type"
                                            name="type"
                                            variant="outlined"
                                            value={type}
                                            onChange={(e) =>
                                                handleUrlFieldChange(idx, e)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={8} sm={5}>
                                        <TextField
                                            style={{ width: '90%' }}
                                            required
                                            small
                                            margin="normal"
                                            label="url"
                                            id="url"
                                            name="url"
                                            variant="outlined"
                                            value={url}
                                            onChange={(e) =>
                                                handleUrlFieldChange(idx, e)
                                            }
                                        />
                                    </Grid>
                                    {type === 'url' ? null : (
                                        <Grid item xs={2}>
                                            <Tooltip title="Delete this url field">
                                                <IconButton
                                                    edge="start"
                                                    style={{
                                                        color: '#fff',
                                                    }}
                                                    onClick={() =>
                                                        handleRemoveUrlFields(
                                                            idx
                                                        )
                                                    }
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    )}
                                </>
                            ))}
                            <Grid alignItems="center" item xs={2}>
                                <Tooltip title="Add new url field">
                                    <IconButton
                                        style={{
                                            color: '#fff',
                                        }}
                                        onClick={() => handleAddUrlFields()}
                                    >
                                        <AddCircleRounded />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Select Members:
                            </Typography>
                        </Grid>
                        <FieldSep />
                        <Grid xs={11} sm={10}>
                            <Autocomplete
                                multiple
                                fullWidth
                                id="assignees"
                                options={memberNames}
                                disableCloseOnSelect
                                value={selectedMembers}
                                onChange={(e, v) => changeAssignee(v)}
                                ChipProps={{
                                    variant: 'outlined',
                                    avatar: <Avatar />,
                                    color: 'primary',
                                }}
                                noOptionsText="No members in club"
                                getOptionLabel={(option) => option}
                                renderOption={(option, { selected }) => {
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
                                        {...params}
                                        variant="outlined"
                                        label="Members"
                                        placeholder="Search"
                                    />
                                )}
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            item
                            xs={12}
                        >
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={confirmDeleteOpen}
                                >
                                    Delete Event
                                </Button>
                            </Grid>
                        </Grid>
                        <FieldSep />
                        <Dialog
                            open={isDeleteDailogOpen}
                            onClose={confirmDeleteClose}
                        >
                            <DialogContent>
                                <Typography variant="h5">
                                    Are you sure you want to delete the event{' '}
                                    {event.name}
                                </Typography>
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    spacing={3}
                                    style={{ marginTop: '1em', width: '100%' }}
                                >
                                    <Grid item xs={8} sm={6}>
                                        <Button
                                            fullWidth
                                            onClick={handleDelete}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Confirm Delete
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            onClick={confirmDeleteClose}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </Dialog>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            item
                            spacing={3}
                            xs={12}
                        >
                            <Grid item xs={6} sm={4}>
                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                >
                                    Save changes
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
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
