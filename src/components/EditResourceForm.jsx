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
    Snackbar,
    Fab,
    Grid,
    TextField,
    Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { EditRounded } from '@material-ui/icons';
import * as Utils from '../utils';

export default function EditResourceForm(props) {
    const { dumResources, index } = props;

    const [state, setState] = React.useState({
        resource: dumResources[index],
        orgResource: dumResources[index],
        isDailogOpen: false,
        isDeleteDailogOpen: false,
        success: false,
        deleteSucc: false,
        urlError: true,
    });

    React.useEffect(() => {
        setState({
            resource: dumResources[index],
            orgResource: dumResources[index],
            isDailogOpen: false,
            isDeleteDailogOpen: false,
            success: false,
            deleteSucc: false,
            urlError: true,
        });
    }, [dumResources, index]);

    const handleFormValuesChange = (event, fieldName) => {
        const { checked, value, name } = event.target;
        if (fieldName === 'archive') {
            setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    archive: checked,
                },
            }));
        } else if (fieldName === 'display_on_website') {
            setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    display_on_website: checked,
                },
            }));
        } else if (fieldName === 'new') {
            setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    new: checked,
                },
            }));
        } else if (name === 'url') {
            setState({
                ...state,
                resource: {
                    ...state.resource,
                    url: event.target.value,
                },
                urlError: Utils.isValidUrl(event.target.value),
            });
        } else {
            setState((prevState) => ({
                ...prevState,
                resource: {
                    ...prevState.resource,
                    [name]: value,
                },
            }));
        }
    };

    const handleSuccessClose = () => {
        setState((prevState) => ({
            ...prevState,
            success: false,
            deleteSucc: false,
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

    const handleDelete = () => {
        const { deleteResource, serverError } = props;
        deleteResource(dumResources[index]._id, () => {
            if (serverError === null) {
                setState((prevState) => ({
                    ...prevState,
                    deleteSucc: true,
                }));
            }
            handleFormClose();
            confirmDeleteClose();
        });
    };

    const cancelEdit = () => {
        setState((prevState) => ({
            ...prevState,
            resource: {
                ...prevState.orgResource,
            },
        }));
        handleFormClose();
    };

    const handleSubmit = () => {
        const { resource } = state;
        const { editResource, serverError } = props;
        editResource(resource, () => {
            if (serverError === null) {
                setState((prevState) => ({
                    ...prevState,
                    success: true,
                }));
            }
            handleFormClose();
        });
    };

    const FieldSep = () => {
        return <Grid item xs={12} style={{ height: '8px' }} />;
    };

    const {
        success,
        deleteSucc,
        isDailogOpen,
        resource,
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
                message="Resource updated successfully !"
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={deleteSucc}
                autoHideDuration={2000}
                onClose={handleSuccessClose}
                message="Resource deleted successfully !"
            />
            <Tooltip title="Edit Resource">
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
                    <Typography variant="h4">Edit Resource</Typography>
                </DialogTitle>
                <DialogContent style={{ scrollbarWidth: 'none' }}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="h6">Internal Name:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="internal_name"
                                variant="outlined"
                                required
                                value={resource.internal_name}
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
                            <Typography variant="h6">
                                Directory year:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="directory_year"
                                variant="outlined"
                                required
                                value={resource.directory_year}
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
                                value={resource.subdirectory}
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
                            <Typography variant="h6">
                                Name of Resource:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                value={resource.name}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'name')
                                }
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
                                value={resource.description}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'description')
                                }
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={4}>
                            <Typography variant="h6">
                                Url of Resource:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="url"
                                variant="outlined"
                                required
                                value={resource.url}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'url')
                                }
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
                                    checked={resource.display_on_website}
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
                        <Grid container item xs={12} alignItems="center">
                            <Grid item xs={5}>
                                <Typography variant="h6">Archive: </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch
                                    checked={resource.archive}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'archive')
                                    }
                                />
                            </Grid>
                        </Grid>
                        <FieldSep />
                        <Grid container item xs={12} alignItems="center">
                            <Grid item xs={5}>
                                <Typography variant="h6">
                                    New Resource:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch
                                    checked={resource.new}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'new')
                                    }
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
                            xs={12}
                        >
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={confirmDeleteOpen}
                                >
                                    Delete Resource
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
                                    Are you sure you want to delete the resource{' '}
                                    {resource.name}
                                </Typography>
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    spacing={3}
                                    style={{ marginTop: '1em', width: '100%' }}
                                >
                                    <Grid item xs={8} sm={4}>
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

EditResourceForm.propTypes = {
    dumResources: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    serverError: PropTypes.string.isRequired,
};
