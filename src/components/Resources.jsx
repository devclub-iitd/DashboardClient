/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton,
    Typography,
    Grid,
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    Switch,
    Grow,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { CallMadeRounded } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import EditResourceForm from './EditResourceFormUp';
import CreateResourceForm from './CreateResourceFormUp';
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
}));

const ResourcesPage = ({
    resources,
    editResource,
    deleteResource,
    users,
    createResource,
    resourceError,
}) => {
    const classes = useStyles();
    const { allResources } = resources;
    const curUser = users.user;

    const [createOpen, setCreateOpen] = React.useState(false);

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreateClose = () => {
        setCreateOpen(false);
    };

    const getResRow = (res) => {
        return [
            res.name,
            res.internal_name,
            res.directory_year,
            res.subdirectory,
            res.description,
            res.new ? 'True' : 'False',
            res.archive ? 'True' : 'False',
            res.display_on_website ? 'True' : 'False',
            res.url,
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
            name: 'internal name',
            label: 'Internal Name',
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
            name: 'directory year',
            label: 'Directory Year',
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
            name: 'subdirectory',
            label: 'Sub-Directory',
            options: {
                filter: true,
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
            name: 'new',
            label: 'New Resource',
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
            name: 'archive',
            label: 'Archived',
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
            name: 'url',
            label: 'URL',
            options: {
                filter: false,
                customBodyRender: (url) => (
                    <Tooltip title="Go to event url">
                        <Fab
                            size="small"
                            color="secondary"
                            target="_blank"
                            href={url}
                        >
                            <CallMadeRounded
                                style={{ color: '#636366', fontWeight: 'bold' }}
                            />
                        </Fab>
                    </Tooltip>
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
                viewColumn: curUser.privelege_level === 'Admin',
                customBodyRender: (_value, tableMeta) => (
                    <>
                        {curUser.privelege_level === 'Admin' ? (
                            <EditResourceForm
                                deleteResource={deleteResource}
                                dumResources={allResources}
                                dumUsers={users.allUsers}
                                editResource={editResource}
                                index={tableMeta.rowIndex}
                                serverError={resources.serverError}
                            />
                        ) : null}
                    </>
                ),
            },
        },
    ];

    const data = [...allResources.map((res) => getResRow(res))];

    const options = {
        filterType: 'checkbox',
        responsive: 'scrollMaxHeight',
        rowsPerPage: 7,
        selectableRows: 'none',
        fixedHeader: true,
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
        searchPlaceholder: 'Search Resource',
    };

    return resources.errMess !== null ? (
        <Typography variant="h4" color="textSecondary">
            Failed to fetch Resources!
        </Typography>
    ) : (
        <>
            <Grow in style={{ transformOrigin: 'center top' }} timeout={750}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={11}>
                        <MUIDataTable
                            title={
                                <TableTitle
                                    title="Add Resource"
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
                        Create a Resource
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
                    <CreateResourceForm
                        createResource={createResource}
                        resourceError={resourceError}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

ResourcesPage.propTypes = {
    resources: PropTypes.object.isRequired,
    editResource: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    createResource: PropTypes.func.isRequired,
    resourceError: PropTypes.string.isRequired,
};

export default ResourcesPage;
