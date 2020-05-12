/* eslint-disable indent */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    InputAdornment,
    IconButton,
    TextField,
    Typography,
    Grid,
    Backdrop,
    CircularProgress,
    Tooltip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardFooter,
    CardHeader,
    CardLink,
} from 'reactstrap';
import EditResourceForm from './EditResourceForm';
import CreateResourceForm from './CreateResourceForm';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
    },
    popCardBody: {
        fontSize: '0.75rem',
    },
    popCardFooter: {
        fontSize: '0.5rem',
    },
    tileScroll: {
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
    },
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    grid: {
        padding: '1em',
        height: '28em',
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
    },
    head: {
        padding: '0.5em',
    },
    search: {
        marginTop: '0.5em',
    },
    paper: {
        margin: '2em',
        height: document.documentElement.clientHeight * 0.6,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
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

    const [search, setSearch] = React.useState({
        current: '',
        archives: '',
    });

    const searchChange = (event) => {
        event.preventDefault();

        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
    };

    const current = allResources
        .filter((resource) => !resource.archive)
        .filter((res) =>
            res.name.toLowerCase().startsWith(search.current.toLowerCase())
        );
    const archives = allResources
        .filter((resource) => resource.archive)
        .filter((res) =>
            res.name.toLowerCase().startsWith(search.archives.toLowerCase())
        );

    const [createOpen, setCreateOpen] = React.useState(false);

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreateClose = () => {
        setCreateOpen(false);
    };

    return (
        <>
            {resources.errMess !== null ? (
                <Typography variant="h4" color="textSecondary">
                    Failed to fetch Resources
                </Typography>
            ) : null}
            <Tooltip title="Create New Resource" aria-label="add">
                <Fab color="secondary" onClick={handleCreateOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Backdrop className={classes.backdrop} open={resources.isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
                <Grid container justify="flex-start">
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h4"
                            color="primary"
                            className={classes.head}
                        >
                            Current
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label="Search"
                            name="current"
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            value={search.current}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        {search.current === '' ? (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() => {
                                                    setSearch({
                                                        ...search,
                                                        current: '',
                                                    });
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.grid}>
                    {current.length === 0 ? (
                        <Typography variant="h4" color="textSecondary">
                            No current resources
                        </Typography>
                    ) : (
                        current.map((res, index) => (
                            <Grid
                                key={`${res}~${index}`}
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                        <Typography variant="h4">
                                            {res.name}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <CardTitle>
                                            <Typography variant="h6">
                                                {res.directory_year}
                                            </Typography>
                                            <Typography variant="body1">
                                                ({res.internal_name})
                                            </Typography>
                                        </CardTitle>
                                        <CardText>
                                            <Typography variant="body1">
                                                {res.description}
                                            </Typography>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <CardLink href={res.url}>
                                            Access resource
                                        </CardLink>
                                        {curUser.privelege_level === 'Admin' ? (
                                            <EditResourceForm
                                                deleteResource={deleteResource}
                                                dumResources={current}
                                                dumUsers={users.allUsers}
                                                editResource={editResource}
                                                index={index}
                                                serverError={
                                                    resources.serverError
                                                }
                                            />
                                        ) : null}
                                    </CardFooter>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Paper>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
                <Grid container justify="flex-start">
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h4"
                            color="primary"
                            className={classes.head}
                        >
                            Archived
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label="Search"
                            name="archives"
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            value={search.archives}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        {search.archives === '' ? (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() => {
                                                    setSearch({
                                                        ...search,
                                                        archives: '',
                                                    });
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.grid}>
                    {archives.length === 0 ? (
                        <Typography variant="h4" color="textSecondary">
                            No archived resources
                        </Typography>
                    ) : (
                        archives.map((res, index) => (
                            // <GridListTile key={`${resource}~${index}`} cols={2} rows={2}>
                            <Grid
                                key={`${res}~${index}`}
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                        <Typography variant="h4">
                                            {res.name}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <CardTitle>
                                            <Typography variant="h6">
                                                {res.directory_year}
                                            </Typography>
                                            {/* {
                                curUser.privelege_level !== 'Unapproved_User'
                                ?
                                <Typography variant='body1'>({res.internal_name})</Typography>
                                : null
                            } */}
                                            <Typography variant="body1">
                                                ({res.internal_name})
                                            </Typography>
                                        </CardTitle>
                                        <CardText>
                                            <Typography variant="body1">
                                                {res.description}
                                            </Typography>
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <CardLink href={res.url}>
                                            Access resource
                                        </CardLink>
                                        {curUser.privelege_level === 'Admin' ? (
                                            <EditResourceForm
                                                deleteResource={deleteResource}
                                                dumResources={archives}
                                                dumUsers={users.allUsers}
                                                editResource={editResource}
                                                index={index}
                                                serverError={
                                                    resources.serverError
                                                }
                                            />
                                        ) : null}
                                    </CardFooter>
                                </Card>
                            </Grid>
                            // </GridListTile>
                        ))
                    )}
                </Grid>
            </Paper>
            <Dialog open={createOpen} maxWidth="md" onClose={handleCreateClose}>
                <DialogTitle>
                    <Typography variaeventErrornt="h5" align="center" fullWidth>
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

export default ResourcesPage;
