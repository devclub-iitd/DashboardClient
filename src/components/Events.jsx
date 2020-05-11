import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    TextField,
    Tooltip,
    Fab,
    Typography,
    Grid,
    Backdrop,
    CircularProgress,
    InputAdornment,
    IconButton,
    Hidden,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardFooter,
    CardHeader,
    CardLink,
} from 'reactstrap';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add';
import EditEventForm from './EditEventForm';
import CreateEventForm from './CreateEventForm';

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
        height: '29em',
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
        height: document.documentElement.clientHeight * 0.63,
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

const EventsPage = ({
    events,
    editEvent,
    deleteEvent,
    users,
    createEvent,
    eventError,
}) => {
    const classes = useStyles();
    const allEvents = events.allEvents;
    const curUser = users.user;
    const dumUsers = users.allUsers;

    const [search, setSearch] = React.useState({
        ongoing: '',
        upcoming: '',
        completed: '',
    });

    const searchChange = (event) => {
        event.preventDefault();

        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
    };

    function isOngoing(startDate, endDate) {
        let today = new Date();
        if (today >= startDate && today <= endDate) {
            return true;
        } else {
            return false;
        }
    }

    function isCompleted(endDate) {
        let today = new Date();
        if (today > endDate) {
            return true;
        } else {
            return false;
        }
    }

    function isUpcoming(startDate: Date) {
        let today = new Date();
        if (today < startDate) {
            return true;
        } else {
            return false;
        }
    }

    const ongoing = allEvents
        .filter((event) => isOngoing(event.start_date, event.end_date))
        .filter((event) => event.name.startsWith(search.ongoing));
    const upcoming = allEvents
        .filter((event) => isUpcoming(event.start_date))
        .filter((event) => event.name.startsWith(search.upcoming));
    const completed = allEvents
        .filter((event) => isCompleted(event.end_date))
        .filter((event) => event.name.startsWith(search.completed));

    const getEventRow = (event) => {
        return [
            event.name,
            event.description,
            event.start_date.toDateString(),
            event.end_date.toDateString(),
            event.display_on_website ? 'True' : 'False',
            dumUsers
                .filter((user) => event.assignee.includes(user._id))
                .map((user) => user.name + ', '),
        ];
    };

    // const [dataTable, setdataTable] = React.useState({
    const columns = [
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: true,
                sort: true,
                setCellHeaderProps: (value) => ({
                    style: { fontWeight: 'bold' },
                }),
            },
        },
        {
            name: 'description',
            label: 'Description',
            options: {
                filter: false,
                sort: false,
                setCellHeaderProps: (value) => ({
                    style: { fontWeight: 'bold' },
                }),
            },
        },
        {
            name: 'startDate',
            label: 'Starting',
            options: {
                filter: false,
                sort: true,
                setCellHeaderProps: (value) => ({
                    style: { fontWeight: 'bold' },
                }),
            },
        },
        {
            name: 'endDate',
            label: 'Ending',
            options: {
                filter: false,
                sort: true,
                setCellHeaderProps: (value) => ({
                    style: { fontWeight: 'bold' },
                }),
            },
        },
        {
            name: 'display',
            label: 'On Main Website',
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => ({
                    style: { fontWeight: 'bold' },
                }),
            },
        },
        {
            name: 'mems',
            label: 'Members',
            options: {
                filter: false,
                sort: false,
                setCellHeaderProps: (value) => ({
                    style: { fontWeight: 'bold' },
                }),
            },
        },
        {
            name: 'edit',
            label: 'Edit',
            options: {
                filter: false,
                sort: false,
                download: false,
                print: false,
                display: curUser.privelege_level === 'Admin',
                setCellHeaderProps: (value) => ({
                    style: { fontWeight: 'bold' },
                }),
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {/* <IconButton onClick={() => setTableEdit({ index: tableMeta.rowIndex, value: true })} variant="outlined" color="secondary" component="span">
                <EditIcon fontSize="small" color="secondary" />
              </IconButton> */}
                        {curUser.privelege_level === 'Admin' ? (
                            <EditEventForm
                                isInTable={true}
                                deleteEvent={deleteEvent}
                                dumEvents={allEvents}
                                dumUsers={users.allUsers}
                                editEvent={editEvent}
                                index={tableMeta.rowIndex}
                                serverError={events.serverError}
                            />
                        ) : null}
                    </>
                ),
            },
        },
    ];
    const data = [...allEvents.map((event) => getEventRow(event))];
    const options = {
        filterType: 'checkbox',
        responsive: 'scrollMaxHeight',
        rowsPerPage: 7,
        selectableRows: 'none',
        fixedHeaderOptions: {
            xAxis: false,
            yAxis: true,
        },
        rowsPerPageOptions: [5, 7, 10, 15, 25, 50, 100],
        // customSearchRender: (searchText, handleSearch, hideSearch, options)
    };

    const [createOpen, setCreateOpen] = React.useState(false);

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreateClose = () => {
        setCreateOpen(false);
    };

    // });
    // console.log(data);

    return (
        <>
            {events.errMess !== null ? (
                <Typography variant="h4" color="textSecondary">
                    Failed to fetch Events
                </Typography>
            ) : null}
            <Tooltip title="Create New Event" aria-label="add">
                <Fab color="secondary" onClick={handleCreateOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            {/* <Hidden > */}
            {/* <MUIDataTable
            title="Club Events"
            data={data}
            columns={columns}
            options={options}
          /> */}
            {/* </Hidden> */}
            <Backdrop className={classes.backdrop} open={events.isLoading}>
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
                            Ongoing
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label="Search"
                            name="ongoing"
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            value={search.ongoing}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        {search.ongoing === '' ? (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() => {
                                                    setSearch({
                                                        ...search,
                                                        ongoing: '',
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
                    {ongoing.length === 0 ? (
                        <Typography variant="h4" color="textSecondary">
                            No ongoing events
                        </Typography>
                    ) : (
                        ongoing.map((event, index) => (
                            // <GridListTile key={`${event}~${index}`} cols={2} rows={2}>
                            <Grid
                                key={`${event}~${index}`}
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                        <Typography variant="h4">
                                            {event.name}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <CardTitle>
                                            <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                        </CardTitle>
                                        <CardText>
                                            <Typography variant="body1">
                                                {event.description}
                                            </Typography>
                                            {Array.from(event.url).map(
                                                ([key, value]) => {
                                                    return (
                                                        <Typography variant="body1">
                                                            {`${key}: `}
                                                            <CardLink
                                                                href={value}
                                                            >{`${value.substr(
                                                                0,
                                                                30
                                                            )}...`}</CardLink>
                                                        </Typography>
                                                    );
                                                }
                                            )}
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        {/* Assigned to: {event.assignee} */}
                                        Assigned to:
                                        {dumUsers
                                            .filter((user) =>
                                                event.assignee.includes(
                                                    user._id
                                                )
                                            )
                                            .map((user) => user.name + ', ')}
                                        {curUser.privelege_level === 'Admin' ? (
                                            <EditEventForm
                                                deleteEvent={deleteEvent}
                                                dumEvents={ongoing}
                                                dumUsers={users.allUsers}
                                                editEvent={editEvent}
                                                index={index}
                                                serverError={events.serverError}
                                            />
                                        ) : null}
                                    </CardFooter>
                                    {/* <CardFooter>
                                    Assigned to: {event.assignee}
                                </CardFooter> */}
                                </Card>
                            </Grid>
                            // </GridListTile>
                        ))
                    )}
                </Grid>
            </Paper>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
                {/* <GridList spacing={1} className={classes.gridList}> */}
                {/* <Typography variant='h4' color="primary" className={classes.head}>Upcoming</Typography> */}
                <Grid container justify="flex-start">
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h4"
                            color="primary"
                            className={classes.head}
                        >
                            Upcoming
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label="Search"
                            name="upcoming"
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            value={search.upcoming}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        {search.upcoming === '' ? (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() => {
                                                    setSearch({
                                                        ...search,
                                                        upcoming: '',
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
                    {upcoming.length === 0 ? (
                        <Typography variant="h4" color="textSecondary">
                            No upcoming events
                        </Typography>
                    ) : (
                        upcoming.map((event, index) => (
                            // <GridListTile key={`${event}~${index}`} cols={2} rows={2}>
                            <Grid
                                key={`${event}~${index}`}
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                        <Typography variant="h4">
                                            {event.name}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <CardTitle>
                                            <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                        </CardTitle>
                                        <CardText>
                                            <Typography variant="body1">
                                                {event.description}
                                            </Typography>
                                            {Array.from(event.url).map(
                                                ([key, value]) => {
                                                    return (
                                                        <Typography variant="body1">
                                                            {`${key}: `}
                                                            <CardLink
                                                                href={value}
                                                            >{`${value.substr(
                                                                0,
                                                                30
                                                            )}...`}</CardLink>
                                                        </Typography>
                                                    );
                                                }
                                            )}
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        {/* Assigned to: {event.assignee} */}
                                        Assigned to:
                                        {dumUsers
                                            .filter((user) =>
                                                event.assignee.includes(
                                                    user._id
                                                )
                                            )
                                            .map((user) => user.name + ', ')}
                                        {curUser.privelege_level === 'Admin' ? (
                                            <EditEventForm
                                                deleteEvent={deleteEvent}
                                                dumEvents={upcoming}
                                                dumUsers={users.allUsers}
                                                editEvent={editEvent}
                                                index={index}
                                                serverError={events.serverError}
                                            />
                                        ) : null}
                                    </CardFooter>
                                    {/* <CardFooter>
                                    Assigned to: {event.assignee}
                                </CardFooter> */}
                                </Card>
                            </Grid>
                            // </GridListTile>
                        ))
                    )}
                </Grid>
                {/* </GridList> */}
            </Paper>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
                {/* <GridList spacing={1} className={classes.gridList}> */}
                {/* <Typography variant='h4' color="primary" className={classes.head}>Completed</Typography> */}
                <Grid container justify="flex-start">
                    <Grid item xs={12} sm={4}>
                        <Typography
                            variant="h4"
                            color="primary"
                            className={classes.head}
                        >
                            Completed
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <TextField
                            className={classes.search}
                            label="Search"
                            name="completed"
                            value={search.completed}
                            fullWidth
                            style={{ marginLeft: '1em' }}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        {search.completed === '' ? (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() => {
                                                    setSearch({
                                                        ...search,
                                                        completed: '',
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
                    {completed.length === 0 ? (
                        <Typography variant="h4" color="textSecondary">
                            No completed events
                        </Typography>
                    ) : (
                        completed.map((event, index) => (
                            // <GridListTile key={`${event}~${index}`} cols={2} rows={2}>
                            <Grid
                                key={`${event}~${index}`}
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                        <Typography variant="h4">
                                            {event.name}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <CardTitle>
                                            <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                        </CardTitle>
                                        <CardText>
                                            <Typography variant="body1">
                                                {event.description}
                                            </Typography>
                                            {Array.from(event.url).map(
                                                ([key, value]) => {
                                                    return (
                                                        <Typography variant="body1">
                                                            {`${key}: `}
                                                            <CardLink
                                                                href={value}
                                                            >{`${value.substr(
                                                                0,
                                                                30
                                                            )}...`}</CardLink>
                                                        </Typography>
                                                    );
                                                }
                                            )}
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        {/* Assigned to: {event.assignee} */}
                                        Assigned to:
                                        {dumUsers
                                            .filter((user) =>
                                                event.assignee.includes(
                                                    user._id
                                                )
                                            )
                                            .map((user) => user.name + ', ')}
                                        {curUser.privelege_level === 'Admin' ? (
                                            <EditEventForm
                                                deleteEvent={deleteEvent}
                                                dumEvents={completed}
                                                dumUsers={users.allUsers}
                                                editEvent={editEvent}
                                                index={index}
                                                serverError={events.serverError}
                                            />
                                        ) : null}
                                    </CardFooter>
                                    {/* <CardFooter>
                                    Assigned to: {event.assignee}
                                </CardFooter> */}
                                </Card>
                            </Grid>
                            // </GridListTile>
                        ))
                    )}
                </Grid>
                {/* </GridList> */}
            </Paper>
            <Dialog open={createOpen} maxWidth="md" onClose={handleCreateClose}>
                <DialogTitle>
                    <Typography variant="h5" align="center" fullWidth>
                        Create An Event
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
                    <CreateEventForm
                        createEvent={createEvent}
                        eventError={eventError}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EventsPage;
