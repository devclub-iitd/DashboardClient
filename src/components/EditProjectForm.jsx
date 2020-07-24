/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
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
    Grid,
    Tooltip,
    IconButton,
    Hidden,
    Avatar,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
    Delete,
    AddCircleRounded,
    EditRounded,
} from '@material-ui/icons';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import * as Utils from '../utils';

export default function EditProjectForm(props) {
    const { dumProjects, index, dumUsers } = props;

    const [state, setState] = React.useState({
        urlFields: Array.from(dumProjects[index].url).map(([key, value]) => ({
            type: key,
            url: value,
        })),
        memberNames: dumUsers
            .filter((user) => user.privelege_level !== 'Unapproved_User')
            .map((user) => user.name),
        selectedMembers: dumProjects[index].members.map((userId) =>
            dumUsers.filter((user) => user._id === userId)[0]
                ? dumUsers.filter((user) => user._id === userId)[0].name
                : ''
        ),
        project: dumProjects[index],
        orgProject: dumProjects[index],
        isDailogOpen: false,
        isDeleteDailogOpen: false,
        success: false,
    });

    React.useEffect(() => {
        setState({
            urlFields: Array.from(dumProjects[index].url).map(
                ([key, value]) => ({
                    type: key,
                    url: value,
                })
            ),
            memberNames: dumUsers
                .filter((user) => user.privelege_level !== 'Unapproved_User')
                .map((user) => user.name),
            selectedMembers: dumProjects[index].members.map((userId) =>
                dumUsers.filter((user) => user._id === userId)[0]
                    ? dumUsers.filter((user) => user._id === userId)[0].name
                    : ''
            ),
            project: dumProjects[index],
            orgProject: dumProjects[index],
            isDailogOpen: false,
            isDeleteDailogOpen: false,
            success: false,
        });
    }, [dumProjects, index, dumUsers]);

    const handleSuccessClose = () => {
        setState((prevState) => ({
            ...prevState,
            success: false,
        }));
    };

    const handleFormValuesChange = (event, name) => {
        if (name === 'start_date') {
            setState({
                ...state,
                project: {
                    ...state.project,
                    start_date: event,
                },
            });
        } else if (name === 'end_date') {
            setState({
                ...state,
                project: {
                    ...state.project,
                    end_date: event,
                },
            });
        } else if (name === 'display_on_website') {
            setState({
                ...state,
                project: {
                    ...state.project,
                    display_on_website: event.target.checked,
                },
            });
        } else if (name === 'is_internal') {
            setState({
                ...state,
                project: {
                    ...state.project,
                    is_internal: event.target.checked,
                },
            });
        } else if (name === 'showcase') {
            setState({
                ...state,
                project: {
                    ...state.project,
                    showcase: event.target.checked,
                },
            });
        } else {
            setState({
                ...state,
                project: {
                    ...state.project,
                    [event.target.name]: event.target.value,
                },
            });
        }
    };

    const handleAddLabelFields = () => {
        const { project } = state;
        const values = [...project.labels];
        values.push('');
        setState((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                labels: values,
            },
        }));
    };

    const handleRemoveLabelFields = (idx) => {
        const { project } = state;
        const values = [...project.labels];
        values.splice(idx, 1);
        setState((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                labels: values,
            },
        }));
    };

    const handleLabelFieldChange = (idx, event) => {
        const { project } = state;
        const values = [...project.labels];
        values[idx] = event.target.value;
        setState((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                labels: values,
            },
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
            if (
                values[index].type === 'web_url' ||
                values[index].type === 'photo_url'
            ) {
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

    const handleMemberChange = (values) => {
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

    const handleDelete = () => {
        const { deleteProject } = props;
        deleteProject(dumProjects[index]._id);
        confirmDeleteClose();
    };

    const cancelEdit = () => {
        setState((prevState) => ({
            ...prevState,
            project: {
                ...prevState.orgProject,
            },
            urlFields: Array.from(
                prevState.orgProject.url
            ).map(([key, value]) => ({ type: key, url: value })),
            memberNames: dumUsers
                .filter((user) => user.privelege_level !== 'Unapproved_User')
                .map((user) => user.name),
            // selectedMembers: prevState.orgProject.members.map(
            //     (userId) =>
            //         dumUsers.filter((user) => user._id === userId)[0].name
            // ),
            selectedMembers: dumUsers
                .filter((user) =>
                    prevState.orgProject.members.includes(user._id)
                )
                .map((user) => user.name),
        }));
        handleFormClose();
    };

    const handleSubmit = () => {
        const urlMap = new Map();
        const { urlFields, project, selectedMembers } = state;
        const { editProject, serverError } = props;
        urlFields.forEach((urlField) => {
            const fixedUrl = Utils.isValidUrl(urlField.url)
                ? urlField.url
                : ['https://', urlField.url].join('');
            urlMap.set(urlField.type, fixedUrl);
        });

        const updatedProject = {
            ...project,
            url: Utils.strMapToObj(urlMap),
            // members: selectedMembers.map(
            //     (name) => dumUsers.filter((user) => user.name === name)[0]._id
            // ),
            members: dumUsers
                .filter((user) => selectedMembers.includes(user.name))
                .map((user) => user._id),
        };

        editProject(updatedProject);
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
        project,
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
                message="Project updated Successfully !"
            />
            <Tooltip title="Edit Project">
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
                    <Typography variant="h4">Edit Project</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="h6">
                                Name of Project:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                value={project.name}
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
                                value={project.description}
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
                                    value={project.start_date}
                                    name="start_date"
                                    onChange={(date) =>
                                        handleFormValuesChange(
                                            date,
                                            'start_date'
                                        )
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
                                    value={project.start_date}
                                    name="end_date"
                                    onChange={(date) =>
                                        handleFormValuesChange(date, 'end_date')
                                    }
                                    minDate={project.start_date}
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
                        <FieldSep />
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">
                                Origin of Project:
                            </Typography>
                        </Grid>
                        <Hidden only={['sm', 'md', 'lg', 'drawerMin', 'xl']}>
                            <FieldSep />
                        </Hidden>
                        <Grid item xs={10} sm={8}>
                            <TextField
                                name="origin"
                                variant="outlined"
                                required
                                value={project.origin}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'origin')
                                }
                                id="origin"
                                label="Origin"
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">
                                Contact of Origin:
                            </Typography>
                        </Grid>
                        <Hidden only={['sm', 'md', 'lg', 'drawerMin', 'xl']}>
                            <FieldSep />
                        </Hidden>
                        <Grid item xs={10} sm={8}>
                            <TextField
                                name="origin_contact"
                                variant="outlined"
                                required
                                value={project.origin}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'origin_contact')
                                }
                                id="origin_contact"
                                label="Origin Contact"
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">Perks:</Typography>
                        </Grid>
                        <Hidden only={['sm', 'md', 'lg', 'drawerMin', 'xl']}>
                            <FieldSep />
                        </Hidden>
                        <Grid item xs={10} sm={8}>
                            <TextField
                                name="perks"
                                variant="outlined"
                                required
                                value={project.perks}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'perks')
                                }
                                id="perks"
                                label="Pe5rks"
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6">Requirements:</Typography>
                        </Grid>
                        <Hidden only={['sm', 'md', 'lg', 'drawerMin', 'xl']}>
                            <FieldSep />
                        </Hidden>
                        <Grid item xs={10} sm={8}>
                            <TextField
                                name="requirements"
                                variant="outlined"
                                required
                                value={project.requirements}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'requirements')
                                }
                                id="requirements"
                                label="Requirements"
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid container item xs={12} alignItems="center">
                            <Grid item xs={7} sm={5}>
                                <Typography variant="h6">
                                    Display on website:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch
                                    checked={project.display_on_website}
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
                        <FieldSep />
                        <Grid container item xs={12} alignItems="center">
                            <Grid item xs={7} sm={5}>
                                <Typography variant="h6">
                                    Internal Project:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch
                                    checked={project.is_internal}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'is_internal')
                                    }
                                />
                            </Grid>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid container item xs={12} alignItems="center">
                            <Grid item xs={7} sm={5}>
                                <Typography variant="h6">
                                    Showcase Project:{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch
                                    checked={project.showcase}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'showcase')
                                    }
                                />
                            </Grid>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Set status of project:{' '}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <RadioGroup
                                row
                                aria-label="status"
                                name="status"
                                defaultValue={project.status}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'status')
                                }
                            >
                                <FormControlLabel
                                    value="IDEA"
                                    control={<Radio color="secondary" />}
                                    label="Idea"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="ONGOING"
                                    control={<Radio color="secondary" />}
                                    label="Ongoing"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="COMPLETED"
                                    control={<Radio color="primary" />}
                                    label="Completed"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">Add Labels:</Typography>
                        </Grid>
                        <Grid container item alignItems="center" xs={12}>
                            {project.labels.map((labelField, idx) => (
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
                                                handleLabelFieldChange(idx, e)
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
                                                    handleRemoveLabelFields(idx)
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </>
                            ))}
                            <Grid item xs={2}>
                                <Tooltip title="Add new label">
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
                                    {type === 'web_url' ||
                                    type === 'photo_url' ? null : (
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
                        <Grid xs={11} sm={10}>
                            <Autocomplete
                                multiple
                                fullWidth
                                id="members"
                                options={memberNames}
                                disableCloseOnSelect
                                value={selectedMembers}
                                onChange={(e, v) => handleMemberChange(v)}
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
                                    Delete Project
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
                                    Are you sure you want to delete the project{' '}
                                    {project.name}
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

EditProjectForm.propTypes = {
    dumProjects: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    dumUsers: PropTypes.object.isRequired,
    deleteProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    serverError: PropTypes.string.isRequired,
};
