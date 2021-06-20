/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Grid,
    IconButton,
    Switch,
    Avatar,
    Grow,
    Snackbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { CallMadeRounded } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import EditProjectForm from './EditProjectForm';
import CreateProjectForm from './CreateProjectForm';
import StatusChip from './StatusChip';
import CustomSearchRender from './CustomTableSearchBox';
import TableTitle from './CustomTableTitle';
import ProjectDialog from './ProjectDialog';
import * as Utils from '../utils';
import UserDialog from './UserDialog';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    tablePaper: {
        borderRadius: '4px',
        padding: theme.spacing(0, 2),
    },
    memAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        cursor: 'pointer',
    },
}));

const ProjectsPage = ({
    projects,
    editProject,
    deleteProject,
    users,
    createProject,
    projectError,
}) => {
    const classes = useStyles();
    const { allProjects } = projects;
    const curUser = users.user;
    const dumUsers = users.allUsers;

    const [editSuccess, setEditSuccess] = React.useState(false);

    const toggleProjectOnWebsite = (e, id) => {
        const upProject = {
            _id: id,
            display_on_website: e.target.checked,
        };

        editProject(upProject, () => {
            if (projectError === null) {
                setEditSuccess(true);
            }
        });
    };

    const toggleProjectInternal = (e, id) => {
        const upProject = {
            _id: id,
            is_internal: e.target.checked,
        };

        editProject(upProject, () => {
            if (projectError === null) {
                setEditSuccess(true);
            }
        });
    };

    const toggleProjectShowcase = (e, id) => {
        const upProject = {
            _id: id,
            showcase: e.target.checked,
        };

        editProject(upProject, () => {
            if (projectError === null) {
                setEditSuccess(true);
            }
        });
    };

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

    const [createOpen, setCreateOpen] = React.useState(false);

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreateClose = () => {
        setCreateOpen(false);
    };

    const getProjectRow = (project) => {
        return [
            project.name,
            project.status.toLowerCase(),
            project.description,
            project.start_date.toDateString(),
            project.end_date.toDateString(),
            project.origin,
            project.origin_contact,
            project.perks,
            project.requirements,
            project.display_on_website ? 'True' : 'False',
            project.is_internal ? 'True' : 'False',
            project.showcase ? 'True' : 'False',
            [...project.labels],
            [
                ...dumUsers
                    .filter((user) => project.members.includes(user._id))
                    .map((user) => user.name),
            ],
            project.url.get('web_url'),
            project._id,
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
                sort: true,
                customBodyRender: (value) => {
                    return <StatusChip status={value} />;
                },
            },
        },
        {
            name: 'description',
            label: 'Description',
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
            name: 'startDate',
            label: 'Start Date',
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
            name: 'endDate',
            label: 'End Date',
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
            name: 'origin',
            label: 'Origin',
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
            name: 'origin contact',
            label: 'Origin Contact',
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
            name: 'perks',
            label: 'Perks',
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
            name: 'requirements',
            label: 'Requirements',
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
            name: 'display',
            label: 'On Main Website',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => (
                    <Tooltip title="Click to toggle value">
                        <Switch
                            onChange={(e) =>
                                toggleProjectOnWebsite(
                                    e,
                                    [...tableMeta.rowData].pop()
                                )
                            }
                            checked={value === 'True'}
                        />
                    </Tooltip>
                ),
            },
        },
        {
            name: 'internal',
            label: 'Internal',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => (
                    <Tooltip title="Click to toggle value">
                        <Switch
                            onChange={(e) =>
                                toggleProjectInternal(
                                    e,
                                    [...tableMeta.rowData].pop()
                                )
                            }
                            checked={value === 'True'}
                        />
                    </Tooltip>
                ),
            },
        },
        {
            name: 'showcase',
            label: 'Showcase',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta) => (
                    <Tooltip title="Click to toggle value">
                        <Switch
                            onChange={(e) =>
                                toggleProjectShowcase(
                                    e,
                                    [...tableMeta.rowData].pop()
                                )
                            }
                            checked={value === 'True'}
                        />
                    </Tooltip>
                ),
            },
        },
        {
            name: 'labels',
            label: 'Labels',
            options: {
                filter: false,
                sort: true,
                display: false,
                customBodyRender: (value) => {
                    return (
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                            {value.join(', ')}
                        </Typography>
                    );
                },
            },
        },
        {
            name: 'mems',
            label: 'Members',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    const eventMems = dumUsers.filter((user) =>
                        value.includes(user.name)
                    );
                    let itemWidth;
                    let flag;
                    if (value.length === 0) {
                        flag = 0;
                        itemWidth = 12;
                    } else if (value.length >= 1 && value.length <= 4) {
                        flag = 1;
                        itemWidth = 12 / value.length;
                    } else if (value.length === 5 || value.length === 6) {
                        flag = 1;
                        itemWidth = 2;
                    } else if (value.length > 6 && value.length <= 12) {
                        flag = 1;
                        itemWidth = 1;
                    } else {
                        flag = 2;
                        itemWidth = 2;
                    }
                    return (
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="center"
                        >
                            {flag === 0 && (
                                <Typography
                                    variant="body1"
                                    style={{
                                        fontFamily: 'Monospace',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    No Members Assigned
                                </Typography>
                            )}
                            {flag === 2 && (
                                <Typography
                                    variant="body1"
                                    style={{
                                        fontFamily: 'Monospace',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Too many members !
                                </Typography>
                            )}
                            {eventMems.map((mem) => (
                                <Grid item xs={itemWidth}>
                                    <Tooltip title={mem.name}>
                                        <Avatar
                                            className={classes.memAvatar}
                                            onClick={() =>
                                                openUserDialog(
                                                    dumUsers.findIndex(
                                                        (u) => u._id === mem._id
                                                    )
                                                )
                                            }
                                            src={
                                                mem.url.get('picture_url') !==
                                                    'https://' &&
                                                mem.url.get('picture_url') !==
                                                    'http://'
                                                    ? mem.url.get('picture_url')
                                                    : ''
                                            }
                                            alt=""
                                        />
                                    </Tooltip>
                                </Grid>
                            ))}
                        </Grid>
                    );
                },
            },
        },
        {
            name: 'url',
            label: 'URL',
            options: {
                filter: false,
                customBodyRender: (url) =>
                    Utils.isValidUrl(url) ? (
                        <Tooltip title="Go to project website">
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
                viewColumn:
                    curUser.privelege_level === 'Admin' ||
                    curUser.privelege_level === 'Approved_User',
                customBodyRender: (value) => {
                    const pIndex = allProjects.findIndex(
                        (pro) => pro._id === value
                    );
                    return (
                        <>
                            <EditProjectForm
                                deleteProject={deleteProject}
                                dumProjects={allProjects}
                                dumUsers={users.allUsers}
                                editProject={editProject}
                                index={pIndex}
                                serverError={projects.serverError}
                            />
                        </>
                    );
                },
            },
        },
    ];

    const data = [...allProjects.map((project) => getProjectRow(project))];

    const options = {
        filterType: 'checkbox',
        // responsive: 'scrollMaxHeight',
        responsive: 'standard',
        rowsPerPage: 6,
        selectableRows: 'none',
        fixedHeader: false,
        fixedSelectColumn: false,
        onCellClick: (colData, cellMeta) => {
            if (
                cellMeta.colIndex !== 9 &&
                cellMeta.colIndex !== 10 &&
                cellMeta.colIndex !== 11 &&
                cellMeta.colIndex !== 13 &&
                cellMeta.colIndex !== 14 &&
                cellMeta.colIndex !== 15
            ) {
                openProjectDialog(cellMeta.dataIndex);
            }
        },
        rowsPerPageOptions: [5, 6, 10, 15, 25, 50, 100],
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

    return projects.errMess !== null ? (
        <Typography
            style={{ width: '100%' }}
            align="center"
            variant="h4"
            color="textSecondary"
        >
            Failed to fetch Projects
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
                message="Project updated Successfully !"
            />
            {projectDialog.open ? (
                <ProjectDialog
                    project={projectDialog.dialogProject}
                    close={closeProjectDialog}
                    users={dumUsers}
                />
            ) : null}
            {userDialog.open ? (
                <UserDialog
                    user={userDialog.dialogUser}
                    close={closeUserDialog}
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
                                <TableTitle addAction={handleCreateOpen}>
                                    Add Project
                                </TableTitle>
                            }
                            data={data}
                            columns={columns}
                            options={options}
                            className={classes.tablePaper}
                        />
                    </Grid>
                </Grid>
            </Grow>
            <Dialog open={createOpen} maxWidth="sm" onClose={handleCreateClose}>
                <DialogTitle>
                    <Typography variant="h5" align="center" fullWidth>
                        Create A Project
                    </Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleCreateClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ scrollbarWidth: 'none' }}>
                    <CreateProjectForm
                        createProject={createProject}
                        projectError={projectError}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

ProjectsPage.propTypes = {
    projects: PropTypes.object.isRequired,
    editProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    projectError: PropTypes.string.isRequired,
};

export default ProjectsPage;
