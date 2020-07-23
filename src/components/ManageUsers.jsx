/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Switch,
    Tooltip,
    Fab,
    Grow,
    Snackbar,
    Dialog,
    DialogContent,
    Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { CallMadeRounded } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import EditOtherUserForm from './EditOtherUserForm';
import * as Utils from '../utils';
import StatusChip from './StatusChip';
import CustomSearchRender from './CustomTableSearchBox';
import CustomToolbarSelect from './UserToolbarSelect';

const useStyles = makeStyles((theme) => ({
    tablePaper: {
        borderRadius: '4px',
        padding: theme.spacing(0, 2),
    },
}));

export default function ManageUsers({
    users,
    rejectAllUnapproved,
    approveAll,
    removeUser,
    editOtherUser,
}) {
    const classes = useStyles();
    const curUser = users.user;
    const dumUsers = users.allUsers;

    const [approveSuccess, setApproveSuccess] = React.useState(false);

    const closeApproveSuccess = () => {
        setApproveSuccess(false);
    };

    const [rejectSuccess, setRejectSuccess] = React.useState(false);

    const closeRejectSuccess = () => {
        setRejectSuccess(false);
    };

    const [rejectAll, setRejectState] = React.useState(false);

    const confirmRejectOpen = () => {
        setRejectState(true);
    };

    const confirmRejectClose = () => {
        setRejectState(false);
    };

    const unapprovedIds = dumUsers
        .filter((user) => user.privelege_level === 'Unapproved_User')
        .map((user) => user._id);

    const approveAllUsers = () => {
        approveAll(unapprovedIds);
        if (users.usersErrMess === null && users.userErrMess === null) {
            setApproveSuccess(true);
        }
    };

    const rejectAllUsers = () => {
        rejectAllUnapproved();
        if (users.usersErrMess === null && users.userErrMess === null) {
            setRejectSuccess(true);
            confirmRejectClose();
        }
    };

    const getUserRow = (user) => {
        return [
            user.name,
            Utils.UserUtils.getStatus(user),
            user.hostel,
            user.category,
            user.intro,
            user.gender,
            user.birth_date.toDateString(),
            user.join_year.toDateString(),
            user.grad_year.toDateString(),
            user.mobile_number,
            user.hometown,
            user.interests,
            user.specialization,
            user.display_on_website ? 'True' : 'False',
            user.url.get('github_url'),
        ];
    };

    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return <StatusChip status={value} />;
                },
            },
        },
        {
            name: 'hostel',
            label: 'Hostel',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'category',
            label: 'Category',
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'intro',
            label: 'Intro',
            options: {
                filter: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'gender',
            label: 'Gender',
            options: {
                filter: true,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'birth date',
            label: 'DOB',
            options: {
                filter: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'joining date',
            label: 'Joined DevC',
            options: {
                filter: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'graduating date',
            label: 'Graduates',
            options: {
                filter: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'mobile',
            label: 'Mobile',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'hometown',
            label: 'Hometown',
            options: {
                filter: false,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'interests',
            label: 'Interests',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'spec',
            label: 'Specializations',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'display',
            label: 'On Main Website',
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Tooltip
                        title={
                            curUser.privelege_level === 'Admin'
                                ? 'Go to Edit to change this'
                                : 'Only Admins can edit this'
                        }
                    >
                        <Switch checked={value === 'True'} />
                    </Tooltip>
                ),
            },
        },
        {
            name: 'url',
            label: 'URL',
            options: {
                filter: false,
                customBodyRender: (url) =>
                    /^https?:\/\/github.com\/[a-z.+*&%$#@!]+/i.test(url) ? (
                        <Tooltip title="Go to github url">
                            <Fab
                                size="small"
                                color="secondary"
                                target="_blank"
                                href={url}
                            >
                                <CallMadeRounded
                                    style={{
                                        color: '#636366',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </Fab>
                        </Tooltip>
                    ) : (
                        <Typography
                            variant="body1"
                            style={{ fontFamily: 'Monospace' }}
                        >
                            Invalid url
                        </Typography>
                    ),
            },
        },
        {
            name: 'edit',
            label: 'Edit',
            options: {
                filter: false,
                download: false,
                print: false,
                display: curUser.privelege_level === 'Admin',
                viewColumns: curUser.privelege_level === 'Admin',
                customBodyRender: (value, tableMeta) => (
                    <>
                        {curUser.privelege_level === 'Admin' ? (
                            <EditOtherUserForm
                                thisUser
                                removeUser={removeUser}
                                dumUsers={dumUsers}
                                editUser={editOtherUser}
                                index={tableMeta.rowIndex}
                                serverError={users.serverError}
                            />
                        ) : null}
                    </>
                ),
            },
        },
    ];

    const data = [...dumUsers.map((user) => getUserRow(user))];
    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        rowsPerPage: 7,
        selectableRows:
            curUser.privelege_level === 'Admin' &&
            dumUsers.filter(
                (user) => user.privelege_level === 'Unapproved_User'
            ).length === 0
                ? 'none'
                : 'multiple',
        isRowSelectable: (dataIndex) =>
            dumUsers.length !== 0 &&
            dumUsers[dataIndex].privelege_level === 'Unapproved_User',
        fixedHeader: false,
        fixedSelectColumn: false,
        rowsPerPageOptions: [5, 7, 10, 15, 25, 50, 100],
        customSearchRender: (searchText, handleSearch, hideSearch, opt) => {
            return (
                <CustomSearchRender
                    searchText={searchText}
                    onSearch={handleSearch}
                    onHide={hideSearch}
                    options={opt}
                />
            );
        },
        searchPlaceholder: 'Search Event',
    };

    return users.usersErrMess !== null ? (
        <Typography
            style={{ width: '100%' }}
            align="center"
            variant="h4"
            color="textSecondary"
        >
            Failed to fetch Users!
        </Typography>
    ) : (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={approveSuccess}
                autoHideDuration={2000}
                onClose={closeApproveSuccess}
                message="Users approved Successfully !"
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={rejectSuccess}
                autoHideDuration={2000}
                onClose={closeRejectSuccess}
                message="All Unapproved users REJECTED!"
            />
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
                                    Club Members
                                </Typography>
                            }
                            data={data}
                            columns={columns}
                            options={options}
                            className={classes.tablePaper}
                            components={{
                                TableToolbarSelect: (
                                    selectedRows,
                                    displayData,
                                    handleCustomSelectedRows
                                ) => (
                                    <CustomToolbarSelect
                                        selectedRows={selectedRows}
                                        displayData={displayData}
                                        approveAll={approveAllUsers}
                                        rejectAll={confirmRejectOpen}
                                        handleCustomSelectedRows={
                                            handleCustomSelectedRows
                                        }
                                    />
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </Grow>
            <Dialog open={rejectAll} maxWidth="sm" onClose={confirmRejectClose}>
                <DialogContent>
                    <Typography variant="h5">
                        Do you really want to REJECT all UNAPPROVED users ?
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
                                onClick={rejectAllUsers}
                                variant="contained"
                                color="primary"
                            >
                                Confirm Reject
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={confirmRejectClose}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}

ManageUsers.propTypes = {
    users: PropTypes.object.isRequired,
    rejectAllUnapproved: PropTypes.func.isRequired,
    approveAll: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    editOtherUser: PropTypes.func.isRequired,
};
