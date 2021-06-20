import React from 'react';
import {
    Grid,
    Button,
    Switch,
    Snackbar,
    TextField,
    Typography,
    Tooltip,
    IconButton,
    Hidden,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Delete, AddCircleRounded } from '@material-ui/icons';
import * as Utils from '../utils';

export default function CreateTasks(props) {
    const [state, setState] = React.useState({
        newEvent: {
            name: '',
            description: '',
            start_date: new Date(),
            end_date: new Date(),
            embed_code: '',
            display_on_website: false,
            url: new Map([['url', '']]),
            assignee: [],
        },
        urlFields: [{ type: 'url', url: '' }],
        success: false,
    });

    const handleFormValuesChange = (event, name) => {
        if (name === 'start_date') {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    start_date: event,
                },
            });
        } else if (name === 'end_date') {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    end_date: event,
                },
            });
        } else if (name === 'display_on_website') {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    display_on_website: event.target.checked,
                },
            });
        } else {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    [event.target.name]: event.target.value,
                },
            });
        }
    };

    const handleAddUrlFields = () => {
        const values = [...state.urlFields];
        values.push({ type: '', url: '' });
        setState({
            ...state,
            urlFields: values,
        });
    };

    const handleRemoveUrlFields = (index) => {
        const values = [...state.urlFields];
        values.splice(index, 1);
        setState({
            ...state,
            urlFields: values,
        });
    };

    const handleUrlFieldChange = (index, event) => {
        const values = [...state.urlFields];
        if (event.target.name === 'type') {
            if (values[index].type === 'url') {
                return;
            }
            values[index].type = event.target.value;
        } else {
            values[index].url = event.target.value;
        }
        setState({
            ...state,
            urlFields: values,
        });
    };

    const handleSuccessClose = () => {
        setState({
            ...state,
            success: false,
        });
    };

    const resetForm = () => {
        setState({
            ...state,
            newEvent: {
                ...state.newEvent,
                name: '',
                description: '',
                start_date: new Date(),
                end_date: new Date(),
                embed_code: '',
                display_on_website: false,
                url: new Map([['url', '']]),
                assignee: [],
            },
            urlFields: [{ type: 'url', url: '' }],
        });
    };

    const submitEventForm = () => {
        const urlMap = new Map();
        state.urlFields.forEach((urlField) => {
            const fixedUrl = Utils.isValidUrl(urlField.url)
                ? urlField.url
                : ['https://', urlField.url].join('');
            urlMap.set(urlField.type, fixedUrl);
        });
        const newEvent = {
            ...state.newEvent,
            url: Utils.strMapToObj(urlMap),
        };
        props.createEvent(newEvent, () => {
            if (props.eventError === null) {
                setState({
                    ...state,
                    newEvent: {
                        ...state.newEvent,
                        name: '',
                        description: '',
                        start_date: new Date(),
                        end_date: new Date(),
                        embed_code: '',
                        display_on_website: false,
                        url: new Map([['url', '']]),
                        assignee: [],
                    },
                    urlFields: [{ type: 'url', url: '' }],
                    success: true,
                });
            }
        });
    };

    const FieldSep = () => {
        return <Grid item xs={12} style={{ height: '8px' }} />;
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={state.success}
                autoHideDuration={2000}
                onClose={handleSuccessClose}
                message="Event created successfully !"
            />
            <Grid container justify="center" alignItems="center">
                <Grid item xs={4}>
                    <Typography variant="h6">Name of Event:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="name"
                        variant="outlined"
                        required
                        value={state.newEvent.name}
                        onChange={(e) => handleFormValuesChange(e, 'name')}
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
                        value={state.newEvent.description}
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
                        <Typography variant="h6">Ending Date:</Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={10} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="start_date"
                            label="Starting Date of Event"
                            format="MM/dd/yyyy"
                            value={state.newEvent.start_date}
                            name="start_date"
                            onChange={(date) =>
                                handleFormValuesChange(date, 'start_date')
                            }
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
                        <Typography variant="h6">Ending Date:</Typography>
                    </Grid>
                </Hidden>
                <Grid item xs={10} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="end_date"
                            label="Ending Date of Event"
                            format="MM/dd/yyyy"
                            value={state.newEvent.end_date}
                            name="end_date"
                            onChange={(date) =>
                                handleFormValuesChange(date, 'end_date')
                            }
                            minDate={state.newEvent.start_date}
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
                        value={state.newEvent.embed_code}
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
                            checked={state.newEvent.display_on_website}
                            onChange={(e) =>
                                handleFormValuesChange(e, 'display_on_website')
                            }
                        />
                    </Grid>
                </Grid>
                <FieldSep />
                <Grid item xs={12}>
                    <Typography variant="h6">Urls:</Typography>
                </Grid>
                <Grid item container alignItems="center" xs={12}>
                    {state.urlFields.map(({ type, url }, idx) => (
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
                                                handleRemoveUrlFields(idx)
                                            }
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            )}
                        </>
                    ))}
                    <Grid item xs={2}>
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
                            onClick={submitEventForm}
                            variant="contained"
                            color="primary"
                        >
                            Create Event
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

CreateTasks.propTypes = {
    createEvent: PropTypes.func.isRequired,
    eventError: PropTypes.string.isRequired,
};
