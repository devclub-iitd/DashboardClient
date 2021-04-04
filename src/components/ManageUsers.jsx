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
import UserDialog from './UserDialog';

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

    const [editSuccess, setEditSuccess] = React.useState(false);

    const toggleUserOnWebsite = (e, id) => {
        const upUser = {
            _id: id,
            display_on_website: e.target.checked,
        };

        editOtherUser(upUser, () => {
            if (users.usersErrMess === null) {
                setEditSuccess(true);
            }
        });
    };

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
            user.entry_no,
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
            user._id,
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
            name: 'entry_no',
            label: 'Entry No.',
            options: {
                filter: false,
                sort: true,
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
                display: curUser.privelege_level === 'Admin',
                viewColumns: curUser.privelege_level === 'Admin',
                customBodyRender: (value, tableMeta) => (
                    <Tooltip title="Click to toggle value">
                        <Switch
                            onChange={(e) => {
                                if (curUser.privelege_level === 'Admin') {
                                    toggleUserOnWebsite(
                                        e,
                                        [...tableMeta.rowData].pop()
                                    );
                                }
                            }}
                            checked={value === 'True'}
                        />
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
                    Utils.isValidUrl(url) ? (
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
                customBodyRender: (value) => {
                    const userIndex = dumUsers.findIndex(
                        (u) => u._id === value
                    );
                    return (
                        <>
                            {curUser.privelege_level === 'Admin' &&
                            dumUsers[userIndex].entry_no !== 'DEVCLUBIITD' ? (
                                <EditOtherUserForm
                                    removeUser={removeUser}
                                    dumUsers={dumUsers}
                                    editUser={editOtherUser}
                                    index={userIndex}
                                    serverError={users.serverError}
                                />
                            ) : null}
                        </>
                    );
                },
            },
        },
    ];

    const data = [...dumUsers.map((user) => getUserRow(user))];
    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        rowsPerPage: 6,
        selectableRows:
            curUser.privelege_level === 'Admin' && unapprovedIds.length !== 0
                ? 'multiple'
                : 'none',
        isRowSelectable: (dataIndex) =>
            dumUsers.length !== 0 &&
            dumUsers[dataIndex].privelege_level === 'Unapproved_User',
        fixedHeader: false,
        fixedSelectColumn: false,
        rowsPerPageOptions: [5, 6, 10, 15, 25, 50, 100],
        onCellClick: (colData, cellMeta) => {
            if (
                cellMeta.colIndex !== 14 &&
                cellMeta.colIndex !== 15 &&
                cellMeta.colIndex !== 16
            ) {
                openUserDialog(cellMeta.dataIndex);
            }
        },
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
                open={editSuccess}
                autoHideDuration={2000}
                onClose={() => setEditSuccess(false)}
                message="User updated Successfully !"
            />
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
            {userDialog.open ? (
                <UserDialog
                    user={userDialog.dialogUser}
                    close={closeUserDialog}
                    isSuper={curUser.entry_no === 'DEVCLUBIITD'}
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
