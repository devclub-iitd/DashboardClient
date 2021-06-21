/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    // Dialog,
    // DialogTitle,
    Tooltip,
    // DialogContent,
    TextField,
    Fab,
    MenuItem,
    Snackbar,
    Paper,
    Button,
    Link,
    IconButton,
    Grow,
} from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import PhoneIcon from '@material-ui/icons/Phone';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import {
    Facebook,
    LinkedIn,
    GitHub,
    PhotoCamera,
    AddCircleRounded,
    Delete,
    // VpnKeyRounded,
} from '@material-ui/icons';
// import ChangePassword from './ChangePassword';
import * as Utils from '../utils';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(2),
        },
        boxSizing: 'auto',
    },
    image: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1),
        },
    },
    fieldPaper: {
        padding: theme.spacing(3, 4, 3, 4),
        borderRadius: '15px',
        [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
    },
    picPaper: {
        padding: theme.spacing(4, 0, 3, 0),
        borderRadius: '15px',
        maxHeight: '79vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
    },
    urlPaper: {
        backgroundColor: '#48484a',
        padding: theme.spacing(1, 1, 2, 2),
        borderRadius: '15px',
        maxHeight: '47vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
    },
    specPaper: {
        backgroundColor: '#48484a',
        padding: theme.spacing(1, 1, 2, 2),
        borderRadius: '15px',
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(4),
        },
    },
    intPaper: {
        backgroundColor: '#48484a',
        padding: theme.spacing(1, 1, 2, 2),
        borderRadius: '15px',
        marginTop: theme.spacing(4),
    },
    categoryField: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
    intro: {
        marginTop: theme.spacing(2),
    },
    urlField: {
        marginTop: theme.spacing(1),
    },
    urlSpecContainer: {
        marginTop: theme.spacing(4),
    },
    namePart: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
        },
    },
    buttonBox: {
        marginTop: 'auto',
        marginBottom: 'auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    save: {
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(1),
        },
    },
    cancel: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
        },
    },
    passButton: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(2),
        },
    },
}));

const ProfileField = ({ title, value }) => {
    return (
        <>
            <Typography
                style={{ fontWeight: 500, color: '#8e8e93' }}
                variant="h5"
            >
                {title}
            </Typography>
            <Typography style={{ fontWeight: 500 }} variant="h5">
                {value}
            </Typography>
        </>
    );
};

ProfileField.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

const FieldSep = () => <Grid item xs={12} style={{ height: '16px' }} />;

export default function Profile({ user, serverError, updateUser }) {
    const [editMode, setEditMode] = React.useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // const [User] = React.useState(
    //     Utils.UserUtils.getProperUser(
    //         JSON.parse(localStorage.getItem('currentUser'))
    //     )
    // );
    // const [User, setUser] = React.useState(user);
    const User = { ...user };
    const [state, setState] = React.useState({
        editUser: { ...User },
        orgUser: { ...User },
        urlFields:
            User.url === undefined
                ? []
                : Array.from(User.url).map(([index, value]) => ({
                      type: index,
                      url: value,
                  })),
        editSuccess: false,
        isModalOpen: false,
        isChangePassOpen: false,
        password: '',
        confirmPassError: null,
        changeSuccess: false,
    });

    const classes = useStyles();

    const handleSuccessClose = () => {
        setState({
            ...state,
            editSuccess: false,
            changeSuccess: false,
        });
    };

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

    // const handlePasswordOpen = () => {
    //     setState({
    //         ...state,
    //         isChangePassOpen: true,
    //     });
    // };

    // const handlePasswordClose = () => {
    //     setState({
    //         ...state,
    //         isChangePassOpen: false,
    //     });
    // };

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
            if (
                values[index].type === 'picture_url' ||
                values[index].type === 'fb_url' ||
                values[index].type === 'linkedin_url' ||
                values[index].type === 'github_url'
            ) {
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

    const handleSubmit = () => {
        const urlMap = new Map();
        state.urlFields.forEach((urlField) => {
            const fixedUrl = Utils.isValidUrl(urlField.url)
                ? urlField.url
                : ['https://', urlField.url].join('');
            urlMap.set(urlField.type, fixedUrl);
        });
        const newUser = {
            ...state.editUser,
            url: Utils.UserUtils.strMapToObj(urlMap),
        };

        // atomic update
        const finUser = Utils.getNewFields(state.orgUser, newUser);

        updateUser(finUser, () => {
            if (serverError === null) {
                setState({
                    ...state,
                    editSuccess: true,
                    orgUser: {
                        ...state.editUser,
                        url: urlMap,
                    },
                    urlFields:
                        urlMap === undefined
                            ? []
                            : Array.from(urlMap).map(([index, value]) => ({
                                  type: index,
                                  url: value,
                              })),
                });
            }
            toggleEditMode();
        });
    };

    const cancelEdit = () => {
        setState({
            ...state,
            editUser: {
                ...User,
            },
            urlFields:
                User.url === undefined
                    ? []
                    : Array.from(User.url).map(([index, value]) => ({
                          type: index,
                          url: value,
                      })),
        });
        toggleEditMode();
    };

    const hostels = Utils.UserUtils.userHostels;

    const categories = Utils.UserUtils.userCategories;

    return (
        <Grid
            className={classes.container}
            container
            justify="center"
            alignItems="flex-start"
        >
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={state.editSuccess}
                autoHideDuration={3000}
                onClose={handleSuccessClose}
                message="Profile updated Successfully !"
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={state.changeSuccess}
                autoHideDuration={2000}
                onClose={handleSuccessClose}
                message="Password changed succesfully !"
            />
            {/* <Dialog
                open={state.isChangePassOpen}
                maxWidth="xs"
                onClose={handlePasswordClose}
            >
                <DialogTitle>
                    <Typography
                        fullWidth
                        align="center"
                        variant="h4"
                        className={classes.head}
                    >
                        Change Your Password
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <ChangePassword
                        changePass={changePassword}
                        users={users}
                        closeDialog={handlePasswordClose}
                    />
                </DialogContent>
            </Dialog> */}
            <Grow in style={{ transformOrigin: 'center top' }} timeout={750}>
                <Grid
                    component={Paper}
                    className={classes.fieldPaper}
                    item
                    xs={10}
                    md={5}
                    container
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        {!editMode ? (
                            <ProfileField
                                title="Gender"
                                value={state.orgUser.gender}
                            />
                        ) : (
                            <Grow
                                in={editMode}
                                style={{ transformOrigin: '100 100 0' }}
                                timeout={editMode ? 1000 : 0}
                            >
                                <TextField
                                    id="gender"
                                    select
                                    name="gender"
                                    label="Gender"
                                    variant="outlined"
                                    value={state.editUser.gender}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'gender')
                                    }
                                    className={classes.categoryField}
                                    margin="dense"
                                    required
                                >
                                    {['female', 'male', 'other'].map(
                                        (option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Grow>
                        )}
                    </Grid>
                    <FieldSep />
                    <Grid item xs={12}>
                        {!editMode ? (
                            <ProfileField
                                title="Date Of Birth"
                                value={
                                    state.orgUser.birth_date
                                        ? state.orgUser.birth_date.toDateString()
                                        : new Date().toDateString()
                                }
                            />
                        ) : (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grow
                                    in={editMode}
                                    style={{ transformOrigin: '100 100 0' }}
                                    timeout={editMode ? 1000 : 0}
                                >
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="birth_date"
                                        label="Date of Birth"
                                        format="MM/dd/yyyy"
                                        value={state.editUser.birth_date}
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
                                </Grow>
                            </MuiPickersUtilsProvider>
                        )}
                    </Grid>
                    <FieldSep />
                    <Grid item xs={12}>
                        {!editMode ? (
                            <ProfileField
                                title="Entry Number"
                                value={state.orgUser.entry_no}
                            />
                        ) : (
                            <Grow
                                in={editMode}
                                style={{ transformOrigin: '100 100 0' }}
                                timeout={editMode ? 1000 : 0}
                            >
                                <TextField
                                    name="entry_no"
                                    variant="outlined"
                                    required
                                    value={state.editUser.entry_no}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'entry_no')
                                    }
                                    margin="normal"
                                    id="entry_no"
                                    label="Entry Number"
                                />
                            </Grow>
                        )}
                    </Grid>
                    <FieldSep />
                    <Grid item xs={12}>
                        {!editMode ? (
                            <ProfileField
                                title="Category"
                                value={state.orgUser.category}
                            />
                        ) : (
                            <Grow
                                in={editMode}
                                style={{ transformOrigin: '100 100 0' }}
                                timeout={editMode ? 1000 : 0}
                            >
                                <TextField
                                    id="category"
                                    select
                                    name="category"
                                    label="Category"
                                    variant="outlined"
                                    value={state.editUser.category}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'category')
                                    }
                                    className={classes.categoryField}
                                    margin="dense"
                                    required
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grow>
                        )}
                    </Grid>
                    <FieldSep />
                    <Grid
                        item
                        container
                        justify="flex-start"
                        alignItems="center"
                        xs={12}
                    >
                        <Grid item xs={12} sm={6}>
                            {!editMode ? (
                                <ProfileField
                                    title="Hostel"
                                    value={state.orgUser.hostel}
                                />
                            ) : (
                                <Grow
                                    in={editMode}
                                    style={{ transformOrigin: '100 100 0' }}
                                    timeout={editMode ? 1000 : 0}
                                >
                                    <TextField
                                        id="hostel"
                                        select
                                        name="hostel"
                                        label="Hostel"
                                        variant="outlined"
                                        value={state.editUser.hostel}
                                        onChange={(e) =>
                                            handleFormValuesChange(e, 'hostel')
                                        }
                                        style={{ width: '90%' }}
                                        margin="dense"
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
                                </Grow>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {!editMode ? (
                                <ProfileField
                                    title="Hometown"
                                    value={state.orgUser.hometown}
                                />
                            ) : (
                                <Grow
                                    in={editMode}
                                    style={{ transformOrigin: '100 100 0' }}
                                    timeout={editMode ? 1000 : 0}
                                >
                                    <TextField
                                        name="hometown"
                                        variant="outlined"
                                        required
                                        value={state.editUser.hometown}
                                        onChange={(e) =>
                                            handleFormValuesChange(
                                                e,
                                                'hometown'
                                            )
                                        }
                                        margin="normal"
                                        id="hometown"
                                        label="Hometown"
                                    />
                                </Grow>
                            )}
                        </Grid>
                    </Grid>
                    <FieldSep />
                    <Grid
                        item
                        container
                        justify="flex-start"
                        alignItems="center"
                        xs={12}
                    >
                        <Grid item xs={12} sm={6}>
                            {!editMode ? (
                                <ProfileField
                                    title="Join Date"
                                    value={
                                        state.orgUser.join_year
                                            ? state.orgUser.join_year.toDateString()
                                            : new Date().toDateString()
                                    }
                                />
                            ) : (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grow
                                        in={editMode}
                                        style={{ transformOrigin: '100 100 0' }}
                                        timeout={editMode ? 1000 : 0}
                                    >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="join_year"
                                            label="Date of Joining DevClub"
                                            format="MM/dd/yyyy"
                                            value={state.editUser.join_year}
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
                                    </Grow>
                                </MuiPickersUtilsProvider>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={5} md={6}>
                            {!editMode ? (
                                <ProfileField
                                    title="Grad Date"
                                    value={
                                        state.orgUser.grad_year
                                            ? state.orgUser.grad_year.toDateString()
                                            : new Date().toDateString()
                                    }
                                />
                            ) : (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grow
                                        in={editMode}
                                        style={{ transformOrigin: '100 100 0' }}
                                        timeout={editMode ? 1000 : 0}
                                    >
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="grad_year"
                                            label="Date of Graduating"
                                            format="MM/dd/yyyy"
                                            value={state.editUser.grad_year}
                                            name="grad_year"
                                            onChange={(date) =>
                                                handleFormValuesChange(
                                                    date,
                                                    'grad_year'
                                                )
                                            }
                                            minDate={state.editUser.join_year}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            required
                                            style={{ width: '90%' }}
                                            inputVariant="outlined"
                                        />
                                    </Grow>
                                </MuiPickersUtilsProvider>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grow>
            <Grow in style={{ transformOrigin: 'center bottom' }} timeout={750}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={classes.buttonBox}
                    item
                    md={1}
                    xs={10}
                >
                    {!editMode ? (
                        <>
                            <Grid
                                container
                                justify="center"
                                item
                                xs={10}
                                // md={10}
                            >
                                <Tooltip title="Edit Profile">
                                    <Fab
                                        color="primary"
                                        onClick={toggleEditMode}
                                    >
                                        <EditIcon fontSize="large" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                            {/* <Grid
                                container
                                justify="center"
                                item
                                xs={2}
                                md={10}
                                className={classes.passButton}
                            >
                                <Tooltip title="Change your password">
                                    <Fab
                                        color="secondary"
                                        onClick={handlePasswordOpen}
                                    >
                                        <VpnKeyRounded fontSize="large" />
                                    </Fab>
                                </Tooltip>
                            </Grid> */}
                        </>
                    ) : (
                        <>
                            <Grid
                                container
                                justify="center"
                                item
                                xs={3}
                                md={10}
                                className={classes.save}
                            >
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid
                                container
                                justify="center"
                                item
                                xs={3}
                                md={10}
                                className={classes.cancel}
                            >
                                <Button
                                    onClick={cancelEdit}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grow>
            <Grow in style={{ transformOrigin: 'center top' }} timeout={750}>
                <Grid
                    component={Paper}
                    className={classes.picPaper}
                    item
                    xs={10}
                    md={5}
                    container
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid className={classes.image} item xs={8} sm={5}>
                        <img
                            style={{ width: '100%', height: 'auto' }}
                            src={state.orgUser.url.get('picture_url')}
                            alt="DP"
                        />
                    </Grid>
                    <Grid className={classes.namePart} item xs={8} sm={5}>
                        {!editMode ? (
                            <Typography
                                style={{ fontWeight: 500 }}
                                variant="h5"
                            >
                                {state.orgUser.name}
                            </Typography>
                        ) : (
                            <Grow
                                in={editMode}
                                style={{ transformOrigin: '100 100 0' }}
                                timeout={editMode ? 1000 : 0}
                            >
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    required
                                    value={state.editUser.name}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'name')
                                    }
                                    margin="normal"
                                    id="name"
                                    label="Name"
                                />
                            </Grow>
                        )}
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item xs={2}>
                                <PhoneIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={10}>
                                {!editMode ? (
                                    <Typography variant="h6">
                                        {state.orgUser.mobile_number}
                                    </Typography>
                                ) : (
                                    <Grow
                                        in={editMode}
                                        style={{ transformOrigin: '100 100 0' }}
                                        timeout={editMode ? 1000 : 0}
                                    >
                                        <TextField
                                            name="mobile_number"
                                            variant="outlined"
                                            required
                                            value={state.editUser.mobile_number}
                                            onChange={(e) =>
                                                handleFormValuesChange(
                                                    e,
                                                    'mobile_number'
                                                )
                                            }
                                            margin="normal"
                                            id="mobile_number"
                                            label="Mobile"
                                        />
                                    </Grow>
                                )}
                            </Grid>
                            <Grid item xs={2}>
                                <EmailOutlinedIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={10}>
                                {!editMode ? (
                                    <Tooltip title={state.orgUser.email}>
                                        <Typography
                                            noWrap
                                            style={{ fontWeight: 400 }}
                                            variant="h6"
                                        >
                                            {state.orgUser.email}
                                        </Typography>
                                    </Tooltip>
                                ) : (
                                    <Grow
                                        in={editMode}
                                        style={{ transformOrigin: '100 100 0' }}
                                        timeout={editMode ? 1000 : 0}
                                    >
                                        <TextField
                                            name="email"
                                            variant="outlined"
                                            required
                                            value={state.editUser.email}
                                            onChange={(e) =>
                                                handleFormValuesChange(
                                                    e,
                                                    'email'
                                                )
                                            }
                                            margin="normal"
                                            id="email"
                                            label="Email"
                                        />
                                    </Grow>
                                )}
                            </Grid>
                            {/* {
                                state.orgUser.category === 'Alumni'?
                                <>
                                    <Grid item xs={2}>
                                        <Tooltip title='Company/University'>
                                            <BusinessRoundedIcon fontSize="small" />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={10}>
                                        {!editMode ? (
                                            <Tooltip title={state.orgUser.company}>
                                                <Typography
                                                    noWrap
                                                    style={{ fontWeight: 400 }}
                                                    variant="h6"
                                                >
                                                    {state.orgUser.company}
                                                </Typography>
                                            </Tooltip>
                                        ) : (
                                            <Grow
                                                in={editMode}
                                                style={{ transformOrigin: '100 100 0' }}
                                                timeout={editMode ? 1000 : 0}
                                            >
                                                <TextField
                                                    name="company"
                                                    variant="outlined"
                                                    required
                                                    value={state.editUser.company}
                                                    onChange={(e) =>
                                                        handleFormValuesChange(e, 'company')
                                                    }
                                                    margin="normal"
                                                    id="company"
                                                    label="Company/University"
                                                />
                                            </Grow>
                                        )}
                                    </Grid>
                                </>
                                : null
                            } */}
                        </Grid>
                    </Grid>
                    <Grid className={classes.intro} item xs={10}>
                        {!editMode ? (
                            <Typography
                                style={{ fontWeight: 500 }}
                                variant="body1"
                                align="center"
                            >
                                {state.orgUser.intro}
                            </Typography>
                        ) : (
                            <Grow
                                in={editMode}
                                style={{ transformOrigin: '100 100 0' }}
                                timeout={editMode ? 1000 : 0}
                            >
                                <TextField
                                    required
                                    variant="outlined"
                                    small
                                    fullWidth
                                    margin="dense"
                                    multiline
                                    rowsMax={5}
                                    id="intro"
                                    name="intro"
                                    label="Introduction"
                                    value={state.editUser.intro}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'intro')
                                    }
                                />
                            </Grow>
                        )}
                    </Grid>
                    <Grid
                        container
                        className={classes.urlSpecContainer}
                        justify="space-evenly"
                        alignItems="stretch"
                        item
                        xs={12}
                    >
                        <Grid
                            component={Paper}
                            className={classes.urlPaper}
                            item
                            md={6}
                            xs={10}
                            container
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid className={classes.urlField} item xs={12}>
                                <Typography
                                    style={{ color: '#8e8e93' }}
                                    variant="h6"
                                >
                                    URLs
                                </Typography>
                            </Grid>
                            {!editMode ? (
                                <>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={2}
                                    >
                                        <Facebook fontSize="large" />
                                    </Grid>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={10}
                                    >
                                        <Tooltip
                                            title={
                                                state.orgUser.url
                                                    ? state.orgUser.url.get(
                                                          'fb_url'
                                                      )
                                                    : 'None'
                                            }
                                        >
                                            <Link
                                                target="_blank"
                                                display="block"
                                                style={{ width: '100%' }}
                                                noWrap
                                                variant="body1"
                                                href={
                                                    state.orgUser.url
                                                        ? state.orgUser.url.get(
                                                              'fb_url'
                                                          )
                                                        : '#'
                                                }
                                            >
                                                {state.orgUser.url.get(
                                                    'fb_url'
                                                )}
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={2}
                                    >
                                        <LinkedIn fontSize="large" />
                                    </Grid>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={10}
                                    >
                                        <Tooltip
                                            title={
                                                state.orgUser.url
                                                    ? state.orgUser.url.get(
                                                          'linkedin_url'
                                                      )
                                                    : 'None'
                                            }
                                        >
                                            <Link
                                                target="_blank"
                                                display="block"
                                                style={{ width: '100%' }}
                                                noWrap
                                                variant="body1"
                                                href={
                                                    state.orgUser.url
                                                        ? state.orgUser.url.get(
                                                              'linkedin_url'
                                                          )
                                                        : '#'
                                                }
                                            >
                                                {state.orgUser.url.get(
                                                    'linkedin_url'
                                                )}
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={2}
                                    >
                                        <GitHub fontSize="large" />
                                    </Grid>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={10}
                                    >
                                        <Tooltip
                                            title={state.orgUser.url.get(
                                                'github_url'
                                            )}
                                        >
                                            <Link
                                                target="_blank"
                                                display="block"
                                                style={{ width: '100%' }}
                                                noWrap
                                                variant="body1"
                                                href={state.orgUser.url.get(
                                                    'github_url'
                                                )}
                                            >
                                                {state.orgUser.url.get(
                                                    'github_url'
                                                )}
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={2}
                                    >
                                        <PhotoCamera fontSize="large" />
                                    </Grid>
                                    <Grid
                                        className={classes.urlField}
                                        item
                                        xs={10}
                                    >
                                        <Tooltip
                                            title={
                                                state.orgUser.url
                                                    ? state.orgUser.url.get(
                                                          'picture_url'
                                                      )
                                                    : 'None'
                                            }
                                        >
                                            <Link
                                                target="_blank"
                                                display="block"
                                                style={{ width: '100%' }}
                                                noWrap
                                                variant="body1"
                                                href={
                                                    state.orgUser.url
                                                        ? state.orgUser.url.get(
                                                              'picture_url'
                                                          )
                                                        : '#'
                                                }
                                            >
                                                {state.orgUser.url
                                                    .get('picture_url')
                                                    .substr(0, 50)}
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    {Array.from(state.orgUser.url)
                                        .slice(4)
                                        .map(([key, value]) => (
                                            <>
                                                <Grid item xs={3}>
                                                    <Typography
                                                        noWrap
                                                        variant="body1"
                                                    >
                                                        {key}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Tooltip title={value}>
                                                        <Link
                                                            target="_blank"
                                                            display="block"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            noWrap
                                                            href={value}
                                                        >
                                                            {value}
                                                        </Link>
                                                    </Tooltip>
                                                </Grid>
                                            </>
                                        ))}
                                </>
                            ) : (
                                <Grow
                                    in={editMode}
                                    style={{ transformOrigin: '100 100 0' }}
                                    timeout={editMode ? 1000 : 0}
                                >
                                    <Grid
                                        container
                                        justify="flex-start"
                                        item
                                        xs={12}
                                    >
                                        {state.urlFields.map(
                                            ({ type, url }, index) => (
                                                <>
                                                    <Grid
                                                        style={{
                                                            marginTop: '8px',
                                                        }}
                                                        item
                                                        xs={8}
                                                        md={5}
                                                    >
                                                        <TextField
                                                            required
                                                            small
                                                            fullWidth
                                                            margin="dense"
                                                            label="type"
                                                            id="type"
                                                            name="type"
                                                            variant="outlined"
                                                            value={type}
                                                            onChange={(event) =>
                                                                handleUrlFieldChange(
                                                                    index,
                                                                    event
                                                                )
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        container
                                                        xs={12}
                                                        justify="space-between"
                                                        alignItems="center"
                                                        style={{
                                                            marginBottom: '8px',
                                                        }}
                                                    >
                                                        <Grid item xs={10}>
                                                            <TextField
                                                                required
                                                                small
                                                                fullWidth
                                                                margin="dense"
                                                                label="url"
                                                                id="url"
                                                                name="url"
                                                                variant="outlined"
                                                                value={url}
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handleUrlFieldChange(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </Grid>
                                                        {type ===
                                                            'picture_url' ||
                                                        type === 'fb_url' ||
                                                        type === 'linkedin_url' ||
                                                        type ===
                                                            'github_url' ? null : (
                                                            <Grid item xs={2}>
                                                                <Tooltip title="Delete this url field">
                                                                    <IconButton
                                                                        edge="end"
                                                                        style={{
                                                                            color: '#fff',
                                                                        }}
                                                                        onClick={() =>
                                                                            handleRemoveUrlFields(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <Delete fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </>
                                            )
                                        )}
                                        <Tooltip title="Add new url field">
                                            <IconButton
                                                style={{
                                                    color: '#fff',
                                                    marginTop: '-0.5em',
                                                }}
                                                onClick={() =>
                                                    handleAddUrlFields()
                                                }
                                            >
                                                <AddCircleRounded fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grow>
                            )}
                        </Grid>
                        <Grid
                            component={Paper}
                            className={classes.specPaper}
                            container
                            justify="flex-start"
                            alignItems="center"
                            alignContent="flex-start"
                            item
                            md={5}
                            xs={10}
                        >
                            <Grid item xs={12}>
                                <Typography
                                    style={{ color: '#8e8e93' }}
                                    variant="h6"
                                >
                                    Specializations
                                </Typography>
                            </Grid>
                            {!editMode ? (
                                state.orgUser.specialization
                                    .split(',')
                                    .map((spec) => (
                                        <Grid item xs={9}>
                                            <Typography noWrap variant="body1">
                                                {spec}
                                            </Typography>
                                        </Grid>
                                    ))
                            ) : (
                                <Grow
                                    in={editMode}
                                    style={{ transformOrigin: '100 100 0' }}
                                    timeout={editMode ? 1000 : 0}
                                >
                                    <TextField
                                        required
                                        variant="outlined"
                                        small
                                        fullWidth
                                        margin="dense"
                                        multiline
                                        style={{ width: '90%' }}
                                        rowsMax={5}
                                        id="specialization"
                                        name="specialization"
                                        label="Specialization"
                                        value={state.editUser.specialization}
                                        onChange={(e) =>
                                            handleFormValuesChange(
                                                e,
                                                'specialization'
                                            )
                                        }
                                    />
                                </Grow>
                            )}
                        </Grid>
                    </Grid>
                    <Grid
                        component={Paper}
                        className={classes.intPaper}
                        item
                        xs={11}
                    >
                        <Typography style={{ color: '#8e8e93' }} variant="h6">
                            Interests
                        </Typography>
                        {!editMode ? (
                            <Typography variant="body1">
                                {state.orgUser.interests}
                            </Typography>
                        ) : (
                            <Grow
                                in={editMode}
                                style={{ transformOrigin: '100 100 0' }}
                                timeout={editMode ? 1000 : 0}
                            >
                                <TextField
                                    required
                                    variant="outlined"
                                    small
                                    style={{ width: '90%' }}
                                    margin="dense"
                                    multiline
                                    rowsMax={5}
                                    id="interests"
                                    name="interests"
                                    label="Interests"
                                    value={state.editUser.interests}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'interests')
                                    }
                                />
                            </Grow>
                        )}
                    </Grid>
                </Grid>
            </Grow>
        </Grid>
    );
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    serverError: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired,
    // changePassword: PropTypes.func.isRequired,
    // users: PropTypes.object.isRequired,
};
