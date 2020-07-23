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
                        <Typography
                            noWrap
                            variant="body1"
                            style={{ fontWeight: 500 }}
                        >
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
                        <Typography
                            noWrap
                            variant="body1"
                            style={{ fontWeight: 500 }}
                        >
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
                    <Tooltip title="Go to Edit to change this">
                        <Switch checked={value === 'True'} />
                    </Tooltip>
                ),
            },
        },
        {
            name: 'internal',
            label: 'Internal',
            options: {
                filter: true,
                display: false,
                customBodyRender: (value) => (
                    <Tooltip title="Go to Edit to change this">
                        <Switch checked={value === 'True'} />
                    </Tooltip>
                ),
            },
        },
        {
            name: 'showcase',
            label: 'Showcase',
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <Tooltip title="Go to Edit to change this">
                        <Switch checked={value === 'True'} />
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
                        <Typography
                            noWrap
                            variant="body1"
                            style={{ fontWeight: 500 }}
                        >
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
                    /^https?:\/\/[a-z.+*&%$#@!]+\.[a-z]{2,5}\/?[a-z.+*&%$#@!/]*/i.test(
                        url
                    ) ? (
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
                customBodyRender: (value, tableMeta) => (
                    <>
                        <EditProjectForm
                            deleteProject={deleteProject}
                            dumProjects={allProjects}
                            dumUsers={users.allUsers}
                            editProject={editProject}
                            index={tableMeta.rowIndex}
                            serverError={projects.serverError}
                        />
                    </>
                ),
            },
        },
    ];

    const data = [...allProjects.map((project) => getProjectRow(project))];

    const options = {
        filterType: 'checkbox',
        // responsive: 'scrollMaxHeight',
        responsive: 'standard',
        rowsPerPage: 7,
        selectableRows: 'none',
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

    return projects.errMess !== null ? (
        <Typography variant="h4" color="textSecondary">
            Failed to fetch Projects
        </Typography>
    ) : (
        <>
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
                                <TableTitle
                                    title="Add Project"
                                    addAction={handleCreateOpen}
                                />
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
                <DialogContent>
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
