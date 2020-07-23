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
    Snackbar,
    Fab,
    Grid,
    TextField,
    MenuItem,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import { EditRounded, Delete, AddCircleRounded } from '@material-ui/icons';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import * as Utils from '../utils';

export default function EditOtherUserForm(props) {
    const { dumUsers, index, serverError } = props;
    const User = dumUsers[index];

    const [state, setState] = React.useState({
        orgUser: { ...User },
        editUser: { ...User },
        urlFields:
            User.url === undefined
                ? []
                : Array.from(User.url).map(([idx, value]) => ({
                      type: idx,
                      url: value,
                  })),
        isDailogOpen: false,
        isDeleteDailogOpen: false,
        success: false,
    });

    React.useEffect(() => {
        setState({
            orgUser: { ...User },
            editUser: { ...User },
            urlFields:
                User.url === undefined
                    ? []
                    : Array.from(User.url).map(([idx, value]) => ({
                          type: idx,
                          url: value,
                      })),
            isDailogOpen: false,
            isDeleteDailogOpen: false,
            success: false,
        });
    }, [User]);

    const handleFormValuesChange = (event, name) => {
        if (name === 'birth_date') {
            setState({
                ...state,
                editUser: {
                    ...state.editUser,
                    birth_date: event,
                },
            });
        } else if (name === 'join_year') {
            setState({
                ...state,
                editUser: {
                    ...state.editUser,
                    join_year: event,
                },
            });
        } else if (name === 'grad_year') {
            setState({
                ...state,
                editUser: {
                    ...state.editUser,
                    grad_year: event,
                },
            });
        } else if (name === 'display_on_website') {
            setState({
                ...state,
                editUser: {
                    ...state.editUser,
                    display_on_website: event.target.checked,
                },
            });
        } else {
            setState({
                ...state,
                editUser: {
                    ...state.editUser,
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

    const handleRemoveUrlFields = (idx) => {
        const values = [...state.urlFields];
        values.splice(idx, 1);
        setState({
            ...state,
            urlFields: values,
        });
    };

    const handleUrlFieldChange = (idx, event) => {
        const values = [...state.urlFields];
        if (event.target.name === 'type') {
            if (
                values[idx].type === 'picture_url' ||
                values[idx].type === 'fb_url' ||
                values[idx].type === 'github_url'
            ) {
                return;
            }
            values[idx].type = event.target.value;
        } else {
            values[idx].url = event.target.value;
        }
        setState({
            ...state,
            urlFields: values,
        });
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

    const cancelEdit = () => {
        setState((prevState) => ({
            ...prevState,
            editUser: {
                ...prevState.orgUser,
            },
            urlFields:
                User.url === undefined
                    ? []
                    : Array.from(User.url).map(([idx, value]) => ({
                          type: idx,
                          url: value,
                      })),
        }));
        handleFormClose();
    };

    const handleSuccessClose = () => {
        setState((prevState) => ({
            ...prevState,
            success: false,
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
        const { removeUser } = props;
        const { orgUser } = state;
        removeUser(orgUser._id);
        confirmDeleteClose();
    };

    const handleSubmit = () => {
        const urlMap = new Map();
        const { editUser } = props;
        state.urlFields.forEach((urlField) => {
            const fixedUrl =
                urlField.url.startsWith('https://') ||
                urlField.url.startsWith('http://')
                    ? urlField.url
                    : ['https://', urlField.url].join('');
            urlMap.set(urlField.type, fixedUrl);
        });
        const newUser = {
            ...state.editUser,
            url: Utils.UserUtils.strMapToObj(urlMap),
        };

        editUser(newUser);

        if (serverError === null) {
            setState({
                ...state,
                success: true,
                orgUser: {
                    ...state.editUser,
                    url: urlMap,
                },
                urlFields:
                    urlMap === undefined
                        ? []
                        : Array.from(urlMap).map(([idx, value]) => ({
                              type: idx,
                              url: value,
                          })),
            });
        }
        handleFormClose();
    };

    const FieldSep = () => {
        return <Grid item xs={12} style={{ height: '8px' }} />;
    };

    const hostels = Utils.UserUtils.userHostels;

    const categories = Utils.UserUtils.userCategories;

    const {
        success,
        isDailogOpen,
        editUser,
        urlFields,
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
                message="User updated Successfully !"
            />
            <Fab onClick={() => handleFormOpen()} size="small" color="primary">
                <EditRounded fontSize="small" style={{ color: '#636366' }} />
            </Fab>
            <Dialog
                open={isDailogOpen}
                maxWidth="sm"
                fullWidth
                onClose={handleFormClose}
                scroll="paper"
            >
                <DialogTitle>
                    <Typography variant="h4">Edit User</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="h6">Name: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                value={editUser.name}
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
                            <Typography variant="h6">Status: </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup
                                row
                                aria-label="privelege_level"
                                name="privelege_level"
                                defaultValue={editUser.privelege_level}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'privelege_level')
                                }
                            >
                                <FormControlLabel
                                    value="Unapproved_User"
                                    control={<Radio color="secondary" />}
                                    label="Unapprove User"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="Approved_User"
                                    control={<Radio color="secondary" />}
                                    label="Approve User"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="Admin"
                                    control={<Radio color="primary" />}
                                    label="Make Admin"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={4}>
                            <Typography variant="h6">Hostel: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="hostel"
                                select
                                margin="dense"
                                name="hostel"
                                label="Hostel"
                                variant="outlined"
                                value={editUser.hostel}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'hostel')
                                }
                                style={{ width: '90%' }}
                                required
                            >
                                {hostels.map((option) => (
                                    <MenuItem
                                        key={option}
                                        value={option.toUpperCase()}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={4}>
                            <Typography variant="h6">Category: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="category"
                                select
                                margin="dense"
                                name="category"
                                label="Category"
                                variant="outlined"
                                value={editUser.category}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'category')
                                }
                                style={{ width: '90%' }}
                                required
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">Intro: </Typography>
                        </Grid>
                        <FieldSep />
                        <Grid item xs={10} sm={8}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                multiline
                                rowsMax={5}
                                id="intro"
                                name="intro"
                                label="Introduction"
                                value={editUser.intro}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'intro')
                                }
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={4}>
                            <Typography variant="h6">Gender: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="gender"
                                select
                                style={{ width: '90%' }}
                                margin="dense"
                                name="gender"
                                label="Gender"
                                variant="outlined"
                                value={editUser.gender}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'gender')
                                }
                                required
                            >
                                {['female', 'male', 'other'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={4}>
                            <Typography variant="h6">
                                Date of Birth:{' '}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="birth_date"
                                    label="Date of Birth"
                                    format="MM/dd/yyyy"
                                    value={editUser.birth_date}
                                    name="birth_date"
                                    onChange={(date) =>
                                        handleFormValuesChange(
                                            date,
                                            'birth_date'
                                        )
                                    }
                                    maxDate={Date.now()}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    required
                                    inputVariant="outlined"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Date of Joining DevClub:{' '}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="join_year"
                                    label="Date of Joining DevClub"
                                    format="MM/dd/yyyy"
                                    value={editUser.join_year}
                                    name="join_year"
                                    onChange={(date) =>
                                        handleFormValuesChange(
                                            date,
                                            'join_year'
                                        )
                                    }
                                    maxDate={Date.now()}
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
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Date of Graduating:{' '}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="grad_year"
                                    label="Date of Graduating"
                                    format="MM/dd/yyyy"
                                    value={editUser.grad_year}
                                    name="grad_year"
                                    onChange={(date) =>
                                        handleFormValuesChange(
                                            date,
                                            'grad_year'
                                        )
                                    }
                                    minDate={editUser.join_year}
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
                        <Grid item xs={4}>
                            <Typography variant="h6">Mobile: </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name="mobile_number"
                                variant="outlined"
                                required
                                value={editUser.mobile_number}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'mobile_number')
                                }
                                id="mobile_number"
                                label="Mobile"
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">Interests: </Typography>
                        </Grid>
                        <FieldSep />
                        <Grid item xs={10} sm={8}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                multiline
                                rowsMax={5}
                                id="interests"
                                name="interests"
                                label="Interests"
                                value={editUser.interests}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'interests')
                                }
                            />
                        </Grid>
                        <FieldSep />
                        <FieldSep />
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Specializations:{' '}
                            </Typography>
                        </Grid>
                        <FieldSep />
                        <Grid item xs={10} sm={8}>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                multiline
                                rowsMax={5}
                                id="specialization"
                                name="specialization"
                                label="Specialization"
                                value={editUser.specialization}
                                onChange={(e) =>
                                    handleFormValuesChange(e, 'specialization')
                                }
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
                                    checked={editUser.display_on_website}
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
                                    <Grid item xs={10} sm={5}>
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
                                    {type === 'picture_url' ||
                                    type === 'fb_url' ||
                                    type === 'github_url' ? null : (
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
                                    Delete User
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
                                    Are you sure you want to delete the user{' '}
                                    {editUser.name}
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

EditOtherUserForm.propTypes = {
    dumUsers: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    removeUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    serverError: PropTypes.string.isRequired,
};
