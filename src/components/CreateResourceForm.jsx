import React from 'react';
import {
    Grid,
    Button,
    Switch,
    Snackbar,
    Typography,
    TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as Utils from '../utils';

export default function CreateTasks(props) {
    const [state, setState] = React.useState({
        newRes: {
            internal_name: '',
            directory_year: '',
            subdirectory: '',
            name: '',
            archive: false,
            display_on_website: false,
            new: false,
            description: '',
            url: '',
        },
        success: false,
        urlError: true,
    });

    const handleFormValuesChange = (event, name) => {
        if (name === 'archive') {
            setState({
                ...state,
                newRes: {
                    ...state.newRes,
                    archive: event.target.checked,
                },
            });
        } else if (name === 'display_on_website') {
            setState({
                ...state,
                newRes: {
                    ...state.newRes,
                    display_on_website: event.target.checked,
                },
            });
        } else if (name === 'new') {
            setState({
                ...state,
                newRes: {
                    ...state.newRes,
                    new: event.target.checked,
                },
            });
        } else if (name === 'url') {
            const validUrl = /^https?:\/\/[a-z0-9.%+*$@]+\.[a-z]{2,5}$/;
            setState({
                ...state,
                newRes: {
                    ...state.newRes,
                    url: event.target.value,
                },
                urlError: Utils.isValidUrl(event.target.value),
            });
        } else {
            setState({
                ...state,
                newRes: {
                    ...state.newRes,
                    [event.target.name]: event.target.value,
                },
            });
        }
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
            newRes: {
                ...state.newRes,
                internal_name: '',
                directory_year: '',
                subdirectory: '',
                name: '',
                archive: false,
                display_on_website: false,
                new: false,
                description: '',
                url: '',
            },
        });
    };

    const submitResourceForm = () => {
        props.createResource(state.newRes);
        if (props.resourceError === null) {
            setState({
                ...state,
                newRes: {
                    ...state.newRes,
                    internal_name: '',
                    directory_year: '',
                    subdirectory: '',
                    name: '',
                    archive: false,
                    display_on_website: false,
                    new: false,
                    description: '',
                    url: '',
                },
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
                message="Resource created successfully !"
            />
            <Grid container justify="center" alignItems="center">
                <Grid item xs={4}>
                    <Typography variant="h6">Internal Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="internal_name"
                        variant="outlined"
                        required
                        value={state.newRes.internal_name}
                        onChange={(e) =>
                            handleFormValuesChange(e, 'internal_name')
                        }
                        id="internal_name"
                        label="Internal Name"
                    />
                </Grid>
                <FieldSep />
                <FieldSep />
                <Grid item xs={4}>
                    <Typography variant="h6">Directory year:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="directory_year"
                        variant="outlined"
                        required
                        value={state.newRes.directory_year}
                        onChange={(e) =>
                            handleFormValuesChange(e, 'directory_year')
                        }
                        id="directory_year"
                        label="Directory Year"
                    />
                </Grid>
                <FieldSep />
                <FieldSep />
                <Grid item xs={4}>
                    <Typography variant="h6">Sub-Directory:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="subdirectory"
                        variant="outlined"
                        required
                        value={state.newRes.subdirectory}
                        onChange={(e) =>
                            handleFormValuesChange(e, 'subdirectory')
                        }
                        id="subdirectory"
                        label="Sub-Directory"
                    />
                </Grid>
                <FieldSep />
                <FieldSep />
                <Grid item xs={4}>
                    <Typography variant="h6">Name of Resource:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="name"
                        variant="outlined"
                        required
                        value={state.newRes.name}
                        onChange={(e) => handleFormValuesChange(e, 'name')}
                        id="name"
                        label="Name"
                    />
                </Grid>
                <FieldSep />
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
                        value={state.newRes.description}
                        onChange={(e) =>
                            handleFormValuesChange(e, 'description')
                        }
                    />
                </Grid>
                <FieldSep />
                <FieldSep />
                <Grid item xs={4}>
                    <Typography variant="h6">Url of Resource:</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        name="url"
                        variant="outlined"
                        required
                        value={state.newRes.url}
                        onChange={(e) => handleFormValuesChange(e, 'url')}
                        id="url"
                        label="Url"
                        error={!state.urlError}
                    />
                </Grid>
                <FieldSep />
                <FieldSep />
                <Grid container item xs={12} alignItems="center">
                    <Grid item xs={5}>
                        <Typography variant="h6">
                            Display on website:{' '}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            checked={state.newRes.display_on_website}
                            onChange={(e) =>
                                handleFormValuesChange(e, 'display_on_website')
                            }
                        />
                    </Grid>
                </Grid>
                <FieldSep />
                <Grid container item xs={12} alignItems="center">
                    <Grid item xs={5}>
                        <Typography variant="h6">Archive: </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            checked={state.newRes.archive}
                            onChange={(e) =>
                                handleFormValuesChange(e, 'archive')
                            }
                        />
                    </Grid>
                </Grid>
                <FieldSep />
                <Grid container item xs={12} alignItems="center">
                    <Grid item xs={5}>
                        <Typography variant="h6">New Resource: </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            checked={state.newRes.new}
                            onChange={(e) => handleFormValuesChange(e, 'new')}
                        />
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
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            onClick={submitResourceForm}
                            variant="contained"
                            color="primary"
                        >
                            Create Resource
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
    createResource: PropTypes.func.isRequired,
    resourceError: PropTypes.string.isRequired,
};
