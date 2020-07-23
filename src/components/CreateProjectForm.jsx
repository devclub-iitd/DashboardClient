import React from 'react';
import {
    Grid,
    Button,
    Switch,
    Snackbar,
    TextField,
    Typography,
    Hidden,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { AddCircleRounded, Delete } from '@material-ui/icons';
import * as Utils from '../utils';

export default function CreateTasks(props) {
    const [state, setState] = React.useState({
        newProject: {
            name: '',
            description: '',
            status: 'IDEA',
            start_date: new Date(),
            end_date: new Date(),
            origin: '',
            origin_contact: '',
            perks: '',
            requirements: '',
            display_on_website: false,
            is_internal: true,
            showcase: false,
            labels: [],
            url: new Map([['web_url', '']]),
            members: [],
        },
        urlFields: [{ type: 'web_url', url: '' }],
        success: false,
    });

    const handleFormValuesChange = (event, name) => {
        if (name === 'start_date') {
            setState({
                ...state,
                newProject: {
                    ...state.newProject,
                    start_date: event,
                },
            });
        } else if (name === 'end_date') {
            setState({
                ...state,
                newProject: {
                    ...state.newProject,
                    end_date: event,
                },
            });
        } else if (name === 'display_on_website') {
            setState({
                ...state,
                newProject: {
                    ...state.newProject,
                    display_on_website: event.target.checked,
                },
            });
        } else if (name === 'is_internal') {
            setState({
                ...state,
                newProject: {
                    ...state.newProject,
                    is_internal: event.target.checked,
                },
            });
        } else if (name === 'showcase') {
            setState({
                ...state,
                newProject: {
                    ...state.newProject,
                    showcase: event.target.checked,
                },
            });
        } else {
            setState({
                ...state,
                newProject: {
                    ...state.newProject,
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
            if (values[index].type === 'web_url') {
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

    const handleAddLabelFields = () => {
        const values = [...state.newProject.labels];
        values.push('');
        setState({
            ...state,
            newProject: {
                ...state.newProject,
                labels: values,
            },
        });
    };

    const handleRemoveLabelFields = (index) => {
        const values = [...state.newProject.labels];
        values.splice(index, 1);
        setState({
            ...state,
            newProject: {
                ...state.newProject,
                labels: values,
            },
        });
    };

    const handleLabelFieldChange = (index, event) => {
        const values = [...state.newProject.labels];
        values[index] = event.target.value;
        setState({
            ...state,
            newProject: {
                ...state.newProject,
                labels: values,
            },
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
            newProject: {
                ...state.newProject,
                name: '',
                description: '',
                status: 'IDEA',
                start_date: new Date(),
                end_date: new Date(),
                origin: '',
                origin_contact: '',
                perks: '',
                requirements: '',
                display_on_website: false,
                is_internal: true,
                showcase: false,
                labels: [],
                url: new Map([['web_url', '']]),
                members: [],
            },
            urlFields: [{ type: 'web_url', url: '' }],
        });
    };

    const submitProjectForm = () => {
        const urlMap = new Map();
        state.urlFields.forEach((urlField) => {
            const fixedUrl =
                urlField.url.startsWith('https://') ||
                urlField.url.startsWith('http://')
                    ? urlField.url
                    : ['https://', urlField.url].join('');
            urlMap.set(urlField.type, fixedUrl);
        });
        const newProject = {
            ...state.newProject,
            url: Utils.strMapToObj(urlMap),
        };
        props.createProject(newProject);
        if (props.projectError === null) {
            setState({
                ...state,
                newProject: {
                    ...state.newProject,
                    name: '',
                    description: '',
                    status: 'IDEA',
                    start_date: new Date(),
                    end_date: new Date(),
                    origin: '',
                    origin_contact: '',
                    perks: '',
                    requirements: '',
                    display_on_website: false,
                    is_internal: true,
                    showcase: false,
                    labels: [],
                    url: new Map([['web_url', '']]),
                    members: [],
                },
                urlFields: [{ type: 'web_url', url: '' }],
                success: true,
            });
        }
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
                message="Project created successfully !"
            />
            <Grid container justify="center" alignItems="center">
                <Grid item xs={4}>
                    <Typography variant="h6">Name of Project:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="name"
                        variant="outlined"
                        required
                        value={state.newProject.name}
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
                        value={state.newProject.description}
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
                            value={state.newProject.start_date}
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
                            value={state.newProject.start_date}
                            name="end_date"
                            onChange={(date) =>
                                handleFormValuesChange(date, 'end_date')
                            }
                            minDate={state.newProject.start_date}
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
                <Grid item xs={4}>
                    <Typography variant="h6">Origin of Project:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="origin"
                        variant="outlined"
                        required
                        value={state.newProject.origin}
                        onChange={(e) => handleFormValuesChange(e, 'origin')}
                        id="origin"
                        label="Origin"
                    />
                </Grid>
                <FieldSep />
                <Grid item xs={4}>
                    <Typography variant="h6">Contact of Origin:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="origin_contact"
                        variant="outlined"
                        required
                        value={state.newProject.origin_contact}
                        onChange={(e) =>
                            handleFormValuesChange(e, 'origin_contact')
                        }
                        id="origin_contact"
                        label="Origin Contact"
                    />
                </Grid>
                <FieldSep />
                <Grid item xs={4}>
                    <Typography variant="h6">Perks:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="perks"
                        variant="outlined"
                        required
                        value={state.newProject.perks}
                        onChange={(e) => handleFormValuesChange(e, 'perks')}
                        id="perks"
                        label="Perks"
                    />
                </Grid>
                <FieldSep />
                <Grid item xs={4}>
                    <Typography variant="h6">Requirements:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="requirements"
                        variant="outlined"
                        required
                        value={state.newProject.requirements}
                        onChange={(e) =>
                            handleFormValuesChange(e, 'requirements')
                        }
                        id="requirements"
                        label="Requirements"
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
                            checked={state.newProject.display_on_website}
                            onChange={(e) =>
                                handleFormValuesChange(e, 'display_on_website')
                            }
                        />
                    </Grid>
                </Grid>
                <FieldSep />
                <Grid container item xs={12} alignItems="center">
                    <Grid item xs={5}>
                        <Typography variant="h6">Internal Project: </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            checked={state.newProject.is_internal}
                            onChange={(e) =>
                                handleFormValuesChange(e, 'is_internal')
                            }
                        />
                    </Grid>
                </Grid>
                <FieldSep />
                <Grid container item xs={12} alignItems="center">
                    <Grid item xs={5}>
                        <Typography variant="h6">Showcase Project: </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            checked={state.newProject.showcase}
                            onChange={(e) =>
                                handleFormValuesChange(e, 'showcase')
                            }
                        />
                    </Grid>
                </Grid>
                <FieldSep />
                <Grid item xs={12}>
                    <Typography variant="h6">Add Labels:</Typography>
                </Grid>
                <Grid container item alignItems="center" xs={12}>
                    {state.newProject.labels.map((labelField, index) => (
                        <>
                            <Grid item xs={8} sm={7}>
                                <TextField
                                    style={{ width: '90%' }}
                                    small
                                    margin="normal"
                                    label="Label"
                                    id="label"
                                    name="label"
                                    variant="outlined"
                                    value={labelField}
                                    onChange={(e) =>
                                        handleLabelFieldChange(index, e)
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip title="Delete this label">
                                    <IconButton
                                        edge="start"
                                        style={{
                                            color: '#fff',
                                        }}
                                        onClick={() =>
                                            handleRemoveLabelFields(index)
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </>
                    ))}
                    <Grid item xs={2}>
                        <Tooltip title="Add new url field">
                            <IconButton
                                style={{
                                    color: '#fff',
                                }}
                                onClick={() => handleAddLabelFields()}
                            >
                                <AddCircleRounded />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <FieldSep />
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
                            {type === 'web_url' ? null : (
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
                            onClick={submitProjectForm}
                            variant="contained"
                            color="primary"
                        >
                            Create Project
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
    createProject: PropTypes.func.isRequired,
    projectError: PropTypes.string.isRequired,
};
