/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Grow,
    Snackbar,
    Checkbox,
    TextField,
    Chip,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import {
    CheckBoxOutlineBlankRounded,
    CheckBoxRounded,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomSearchRender from './CustomTableSearchBox';
import * as Utils from '../utils';
import EventDialog from './EventDialog';
import UserDialog from './UserDialog';
import ProjectDialog from './ProjectDialog';

const useStyles = makeStyles((theme) => ({
    tablePaper: {
        borderRadius: '4px',
        padding: theme.spacing(0, 2),
    },
}));

const TasksPage = ({
    events,
    projects,
    editEvent,
    editProject,
    users,
    eventError,
    projectError,
}) => {
    const classes = useStyles();
    const { allEvents } = events;
    const { allProjects } = projects;
    const dumUsers = users.allUsers;

    const [userTasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        setTasks(Utils.getsUserTasks(dumUsers, allProjects, allEvents));
    }, [dumUsers, allEvents, allProjects]);

    const [editState, setEditState] = React.useState({
        loading: false,
        success: false,
        err: false,
    });

    const handleSuccessClose = () => {
        setEditState({
            ...editState,
            success: false,
        });
    };

    const handleErrClose = () => {
        setEditState({
            ...editState,
            err: false,
        });
    };

    // user dialog settings-----------------------------------
    const [userDialog, setUserDialog] = React.useState({
        open: false,
        dialogUser: dumUsers[0],
    });

    const openUserDialog = (index) => {
        setUserDialog({
            dialogUser: { ...dumUsers[index] },
            open: true,
        });
    };

    const closeUserDialog = () => {
        setUserDialog({
            open: false,
        });
    };

    // project dialog settings---------------------------------
    const [projectDialog, setProjectDialog] = React.useState({
        open: false,
        dialogProject: allProjects[0],
    });

    const openProjectDialog = (index) => {
        setProjectDialog({
            dialogProject: { ...allProjects[index] },
            open: true,
        });
    };

    const closeProjectDialog = () => {
        setProjectDialog({
            open: false,
        });
    };

    // event dialog settings-----------------------------------
    const [eventDialog, setEventDialog] = React.useState({
        open: false,
        dialogEvent: allEvents[0],
    });

    const openEventDialog = (index) => {
        setEventDialog({
            dialogEvent: { ...allEvents[index] },
            open: true,
        });
    };

    const closeEventDialog = () => {
        setEventDialog({
            open: false,
        });
    };
    //---------------------------------------------------------

    const handleAddProject = (e, v, values, tableMeta) => {
        setEditState({
            ...editState,
            loading: true,
            success: false,
            err: false,
        });

        if (v.length < values.length) {
            const delPro = values.filter(
                (pro) => !v.map((p) => p.id).includes(pro.id)
            )[0];
            const uId = [...tableMeta.rowData].pop();
            const upPro = {
                _id: delPro.id,
                members: [...delPro.members.filter((memId) => memId !== uId)],
            };
            editProject(upPro, () => {
                if (projectError === null) {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: true,
                        err: false,
                    });
                } else {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: false,
                        err: true,
                    });
                }
            });
        } else if (v.length > values.length) {
            const addPro = v.filter(
                (pro) => !values.map((p) => p.id).includes(pro.id)
            )[0];
            const uId = [...tableMeta.rowData].pop();
            const upPro = {
                _id: addPro.id,
                members: [...addPro.members],
            };
            upPro.members.push(uId);
            editProject(upPro, () => {
                if (projectError === null) {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: true,
                        err: false,
                    });
                } else {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: false,
                        err: true,
                    });
                }
            });
        }
    };

    const handleAddEvent = (e, v, values, tableMeta) => {
        setEditState({
            ...editState,
            loading: true,
            success: false,
            err: false,
        });

        if (v.length < values.length) {
            const delEve = values.filter(
                (eve) => !v.map((p) => p.id).includes(eve.id)
            )[0];
            const uId = [...tableMeta.rowData].pop();
            const upEve = {
                _id: delEve.id,
                assignee: [...delEve.members.filter((memId) => memId !== uId)],
            };
            editEvent(upEve, () => {
                if (eventError === null) {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: true,
                        err: false,
                    });
                } else {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: false,
                        err: true,
                    });
                }
            });
        } else if (v.length > values.length) {
            const addEve = v.filter(
                (eve) => !values.map((p) => p.id).includes(eve.id)
            )[0];
            const uId = [...tableMeta.rowData].pop();
            const upEve = {
                _id: addEve.id,
                assignee: [...addEve.members],
            };
            upEve.assignee.push(uId);
            editEvent(upEve, () => {
                if (eventError === null) {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: true,
                        err: false,
                    });
                } else {
                    setEditState({
                        ...editState,
                        loading: false,
                        success: false,
                        err: true,
                    });
                }
            });
        }
    };

    const getTaskRow = (task) => {
        return [
            task.user.name,
            task.projects,
            task.events,
            task.projects.length + task.events.length,
            task.user.id,
        ];
    };

    const taskColumns = [
        {
            name: 'user',
            label: 'User',
            options: {
                filter: false,
                customBodyRender: (user) => {
                    return (
                        <Typography
                            onClick={() => openUserDialog()}
                            variant="body1"
                            style={{
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            {user}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'projects',
            label: 'Projects Involved In',
            options: {
                filter: false,
                customBodyRender: (values, tableMeta) => {
                    return (
                        <Autocomplete
                            multiple
                            id="userProjects"
                            options={allProjects
                                .filter((pro) => pro.status !== 'COMPLETED')
                                .map((pro) => ({
                                    id: pro._id,
                                    name: pro.name,
                                    members: [...pro.members],
                                }))}
                            disableCloseOnSelect
                            value={values}
                            onChange={(e, v) =>
                                handleAddProject(e, v, values, tableMeta)
                            }
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        clickable
                                        onClick={() =>
                                            openProjectDialog(
                                                allProjects.findIndex(
                                                    (p) => p._id === option.id
                                                )
                                            )
                                        }
                                        label={`${option.name} (${option.members.length})`}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            noOptionsText="No Projects"
                            getOptionLabel={(option) =>
                                `${option.name} (${option.members.length})`
                            }
                            getOptionSelected={(option, value) =>
                                option.id === value.id
                            }
                            renderOption={(option, { selected }) => {
                                return (
                                    <>
                                        <Checkbox
                                            icon={
                                                <CheckBoxOutlineBlankRounded fontSize="small" />
                                            }
                                            checkedIcon={
                                                <CheckBoxRounded fontSize="small" />
                                            }
                                            style={{
                                                marginRight: 8,
                                            }}
                                            checked={selected}
                                        />
                                        {`${option.name} (${option.members.length})`}
                                    </>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label={
                                        values.length > 0
                                            ? 'Projects'
                                            : 'Currently not involved in any project'
                                    }
                                    style={{ maxWidth: '550px' }}
                                    placeholder="Search"
                                />
                            )}
                        />
                    );
                },
            },
        },
        {
            name: 'events',
            label: 'Events Involved In',
            options: {
                filter: false,
                customBodyRender: (values, tableMeta) => {
                    return (
                        <Autocomplete
                            multiple
                            id="userEvents"
                            options={allEvents
                                .filter(
                                    (eve) =>
                                        Utils.EventUtils.getStatus(eve) !==
                                        'completed'
                                )
                                .map((eve) => ({
                                    id: eve._id,
                                    name: eve.name,
                                    members: [...eve.assignee],
                                }))}
                            disableCloseOnSelect
                            value={values}
                            onChange={(e, v) =>
                                handleAddEvent(e, v, values, tableMeta)
                            }
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        color="secondary"
                                        clickable
                                        onClick={() =>
                                            openEventDialog(
                                                allEvents.findIndex(
                                                    (e) => e._id === option.id
                                                )
                                            )
                                        }
                                        label={`${option.name} (${option.members.length})`}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            noOptionsText="No Events"
                            getOptionLabel={(option) =>
                                `${option.name} (${option.members.length})`
                            }
                            getOptionSelected={(option, value) =>
                                option.id === value.id
                            }
                            renderOption={(option, { selected }) => {
                                return (
                                    <>
                                        <Checkbox
                                            icon={
                                                <CheckBoxOutlineBlankRounded fontSize="small" />
                                            }
                                            checkedIcon={
                                                <CheckBoxRounded fontSize="small" />
                                            }
                                            style={{
                                                marginRight: 8,
                                            }}
                                            checked={selected}
                                        />
                                        {`${option.name} (${option.members.length})`}
                                    </>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label={
                                        values.length > 0
                                            ? 'Events'
                                            : 'Currently not involved in any event'
                                    }
                                    style={{ maxWidth: '550px' }}
                                    placeholder="Search"
                                />
                            )}
                        />
                    );
                },
            },
        },
        {
            name: 'responsibilities',
            label: 'Total Responsibilities',
            options: {
                filter: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography
                            variant="h6"
                            align="center"
                            style={{
                                fontWeight: 500,
                                width: '100%',
                            }}
                        >
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            options: {
                filter: false,
                sort: false,
                display: false,
                viewColumns: false,
            },
        },
    ];

    const taskData = [...userTasks.map((uT) => getTaskRow(uT))];

    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        rowHover: false,
        rowsPerPage: 6,
        selectableRows: 'none',
        fixedHeader: false,
        fixedSelectColumn: false,
        rowsPerPageOptions: [5, 6, 10, 15, 25, 50, 100],
        customSearchRender: (searchText, handleSearch, hideSearch, opt) => {
            return (
                <CustomSearchRender
                    searchText={searchText}
                    onSearch={handleSearch}
                    onHide={hideSearch}
                    options={opt}
                    searchLabel="Search by name of user"
                />
            );
        },
    };

    return events.errMess !== null ? (
        <Typography
            style={{ width: '100%' }}
            align="center"
            variant="h4"
            color="textSecondary"
        >
            Failed to fetch Events!
        </Typography>
    ) : (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={editState.loading}
                message="Updating ..."
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={editState.success}
                autoHideDuration={2000}
                onClose={handleSuccessClose}
                message="Done !"
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={editState.err}
                autoHideDuration={2000}
                onClose={handleErrClose}
                message="Failed, try again !"
            />
            {userDialog.open ? (
                <UserDialog
                    user={userDialog.dialogUser}
                    close={closeUserDialog}
                />
            ) : null}
            {projectDialog.open ? (
                <ProjectDialog
                    project={projectDialog.dialogProject}
                    close={closeProjectDialog}
                    users={dumUsers}
                />
            ) : null}
            {eventDialog.open ? (
                <EventDialog
                    // open={open}
                    event={eventDialog.dialogEvent}
                    close={closeEventDialog}
                    users={dumUsers}
                />
            ) : null}
            <Grow in style={{ transformOrigin: 'center top' }} timeout={750}>
                <Grid container justify="center" alignItems="center">
                    <Grid
                        item
                        style={{
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                        }}
                        xs={11}
                    >
                        <MUIDataTable
                            title={
                                <Typography
                                    variant="h6"
                                    style={{ fontWeight: 500 }}
                                >
                                    User Tasks
                                </Typography>
                            }
                            data={taskData}
                            columns={taskColumns}
                            options={options}
                            className={classes.tablePaper}
                        />
                    </Grid>
                </Grid>
            </Grow>
        </>
    );
};

TasksPage.propTypes = {
    events: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    editEvent: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    eventError: PropTypes.string.isRequired,
    projectError: PropTypes.string.isRequired,
};

export default TasksPage;
