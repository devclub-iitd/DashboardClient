/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
    Backdrop,
    CircularProgress,
    Button,
} from '@material-ui/core';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardFooter,
    CardLink,
    Popover,
    PopoverHeader,
    PopoverBody,
    ListGroup,
    ListGroupItem,
    CardHeader,
    CardSubtitle,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import EditEventForm from './EditEventForm';
import EditProjectForm from './EditProjectForm';
import EditResourceForm from './EditResourceForm';
import EditOtherUserForm from './EditOtherUserForm';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
    },
    table: {
        // minWidth: 250,
        maxHeight: 250,
        width: '100%',
    },
    gridL: {
        border: '3px solid',
        marginTop: '2em',
        marginBottom: '2em',
    },
    gridR: {
        border: '3px solid',
        marginTop: '2em',
        marginBottom: '2em',
        // maxHeight: 330,
        // scrollBehavior: 'smooth',
    },
    textPadding: {
        paddingTop: '1em',
        paddingBottom: '0.5em',
    },
    borderJ: {
        border: '3px solid',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    // tableContainer: {
    //   maxHeight:
    // }
    cardBorderL: {
        // border: '3px solid',
        // height: 450,
        // overflowY: 'scroll',
    },
    cardBorderR: {
        // border: '3px solid',
        height: 450,
        overflowY: 'scroll',
    },
    popBody: {
        height: document.documentElement.clientHeight * 0.3,
        // minwidth: '80%',
        // width: 500,
        padding: 0,
        overflowY: 'scroll',
    },
    popHeader: {
        // width: 500,
    },
    popCardBody: {
        fontSize: '0.75rem',
    },
    popCardFooter: {
        fontSize: '0.5rem',
    },
    dialog: {
        maxWidth: '60%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    card: {
        '&:hover': {
            borderColor: '#00c853',
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginLeft: '1em',
    },
}));

export default function Home({
    users,
    events,
    projects,
    resources,
    removeUser,
    editOtherUser,
    deleteEvent,
    editEvent,
    deleteProject,
    editProject,
    deleteResource,
    editResource,
    history,
}) {
    const classes = useStyles();
    // const curUser = dumUsers[0];
    const curUser = users.user;
    const dumUsers = users.allUsers;
    const dumEvents = events.allEvents;
    const dumProjects = projects.allProjects;
    const dumResources = resources.allResources;

    const [eventPopOpen, setEventPopOpen] = React.useState(false);
    const toggleEventPop = () => {
        if (!events.isLoading && events.errMess === null) {
            setEventPopOpen(!eventPopOpen);
        }
    };

    const [projectPopOpen, setProjectPopOpen] = React.useState(false);
    const toggleProjectPop = () => {
        if (!projects.isLoading && projects.errMess === null) {
            setProjectPopOpen(!projectPopOpen);
        }
    };

    const [resourcePopOpen, setResourcePopOpen] = React.useState(false);
    const toggleResourcePop = () => {
        if (!resources.isLoading && resources.errMess === null) {
            setResourcePopOpen(!resourcePopOpen);
        }
    };

    const [memPopOpen, setMemPopOpen] = React.useState(false);
    const toggleMemPop = () => {
        if (!users.isLoading && users.usersErrMess === null) {
            setMemPopOpen(!memPopOpen);
        }
    };

    const [eventDailogOpen, setEventDailogOpen] = React.useState(false);
    const [projectDailogOpen, setProjectDailogOpen] = React.useState(false);
    const [resourceDailogOpen, setResourceDailogOpen] = React.useState(false);
    const [userDailogOpen, setUserDailogOpen] = React.useState(false);

    const handleEventCardOpen = () => {
        // console.log('Event card clicked');
        if (!events.isLoading && events.errMess === null) {
            setEventDailogOpen(true);
        }
    };
    const handleEventCardClose = () => {
        // console.log('Event card clicked');
        setEventDailogOpen(false);
    };

    const [activeTab, setActiveTab] = React.useState('Ongoing');
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const [activeTaskTab, setActiveTaskTab] = React.useState('Events');
    const toggleTask = (tab) => {
        if (activeTaskTab !== tab) {
            setActiveTaskTab(tab);
        }
    };

    const handleProjectCardOpen = () => {
        // console.log('Project card clicked');
        if (!projects.isLoading && projects.errMess === null) {
            setProjectDailogOpen(true);
        }
    };

    const handleProjectCardClose = () => {
        // console.log('Project card clicked');
        setProjectDailogOpen(false);
    };

    const handleResourceCardOpen = () => {
        // console.log('card clicked');
        if (!resources.isLoading && resources.errMess === null) {
            setResourceDailogOpen(true);
        }
    };
    const handleResourceCardClose = () => {
        // console.log('card clicked');
        setResourceDailogOpen(false);
    };

    const handleUserCardOpen = () => {
        // console.log('card clicked');
        if (!users.isLoading && users.usersErrMess === null) {
            setUserDailogOpen(true);
        }
    };
    const handleUserCardClose = () => {
        // console.log('card clicked');
        setUserDailogOpen(false);
    };

    function isOngoing(startDate, endDate) {
        const today = new Date();
        if (today >= startDate && today <= endDate) {
            return true;
        }
        return false;
    }

    function isCompleted(endDate) {
        const today = new Date();
        if (today > endDate) {
            return true;
        }
        return false;
    }

    function isUpcoming(startDate) {
        const today = new Date();
        if (today < startDate) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <Grid
                id="pageContainer"
                container
                spacing={3}
                justify="space-evenly"
            >
                <Grid
                    item
                    id="popContainer"
                    spacing={3}
                    container
                    xs={12}
                    md={5}
                    justify="space-evenly"
                    className={classes.cardBorderL}
                >
                    <Grid item xs={12}>
                        <Typography align="center" variant="h4">
                            Club Activities
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card
                            body
                            className="btn"
                            style={{ borderColor: '#00c853' }}
                            id="eventCard"
                            onClick={handleEventCardOpen}
                        >
                            {events.errMess !== null ? (
                                <h4>Error fetching events</h4>
                            ) : (
                                <CardBody>
                                    <Backdrop
                                        className={classes.backdrop}
                                        open={events.isLoading}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <CardTitle>Events</CardTitle>
                                    <CardText>{dumEvents.length}</CardText>
                                </CardBody>
                            )}
                        </Card>
                        <Dialog
                            open={eventDailogOpen}
                            maxWidth="sm"
                            fullWidth
                            onClose={handleEventCardClose}
                            scroll="paper"
                        >
                            <DialogTitle>
                                <Typography variant="h4">
                                    View Club Events
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Nav tabs>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active: activeTab === 'Ongoing',
                                            })}
                                            onClick={() => toggle('Ongoing')}
                                        >
                                            Ongoing
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    activeTab === 'Upcoming',
                                            })}
                                            onClick={() => toggle('Upcoming')}
                                        >
                                            Upcoming
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    activeTab === 'Completed',
                                            })}
                                            onClick={() => toggle('Completed')}
                                        >
                                            Completed
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="Ongoing">
                                        {events.errMess !== null ? (
                                            <div>
                                                <h4>Failed to fetch Events</h4>
                                                <h4>{events.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumEvents
                                                    .filter((event) =>
                                                        isOngoing(
                                                            event.start_date,
                                                            event.end_date
                                                        )
                                                    )
                                                    .map((event) => {
                                                        return (
                                                            <Fragment
                                                                key={`${event}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    event.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        event.description
                                                                                    }
                                                                                </Typography>
                                                                                {Array.from(
                                                                                    event.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography variant="body1">
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                            {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
                                                                            Assigned
                                                                            to:
                                                                            {dumUsers
                                                                                .filter(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        event.assignee.includes(
                                                                                            user._id
                                                                                        )
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        `${user.name}, `
                                                                                )}
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                    <TabPane tabId="Upcoming">
                                        {events.errMess !== null ? (
                                            <div>
                                                <h4>Failed to fetch Events</h4>
                                                <h4>{events.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumEvents
                                                    .filter((event) =>
                                                        isUpcoming(
                                                            event.start_date
                                                        )
                                                    )
                                                    .map((event) => {
                                                        return (
                                                            <Fragment
                                                                key={`${event}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    event.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        event.description
                                                                                    }
                                                                                </Typography>
                                                                                {Array.from(
                                                                                    event.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography variant="body1">
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                            {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
                                                                            Assigned
                                                                            to:
                                                                            {dumUsers
                                                                                .filter(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        event.assignee.includes(
                                                                                            user._id
                                                                                        )
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        `${user.name}, `
                                                                                )}
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                    <TabPane tabId="Completed">
                                        {events.errMess !== null ? (
                                            <div>
                                                <h4>Failed to fetch Events</h4>
                                                <h4>{events.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumEvents
                                                    .filter((event) =>
                                                        isCompleted(
                                                            event.end_date
                                                        )
                                                    )
                                                    .map((event) => {
                                                        return (
                                                            <Fragment
                                                                key={`${event}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    event.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        event.description
                                                                                    }
                                                                                </Typography>
                                                                                {Array.from(
                                                                                    event.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography variant="body1">
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                            {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
                                                                            Assigned
                                                                            to:
                                                                            {dumUsers
                                                                                .filter(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        event.assignee.includes(
                                                                                            user._id
                                                                                        )
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        `${user.name}, `
                                                                                )}
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                </TabContent>
                            </DialogContent>
                        </Dialog>
                        <Popover
                            placement="bottom"
                            isOpen={eventPopOpen}
                            target="eventCard"
                            // container="pageContainer"
                            // className={classes.pops}
                            // boundariesElement='popContainer'
                            toggle={toggleEventPop}
                            trigger="hover"
                        >
                            <PopoverHeader className={classes.popHeader}>
                                <Typography>Club Events</Typography>
                            </PopoverHeader>
                            <PopoverBody className={classes.popBody}>
                                <ListGroup>
                                    {dumEvents.length === 0 ? (
                                        <div>
                                            <h4>No Club Events</h4>
                                        </div>
                                    ) : (
                                        dumEvents.map((event, index) => {
                                            return (
                                                <Fragment key={`${event}`}>
                                                    <ListGroupItem>
                                                        <Card body>
                                                            <CardBody>
                                                                <CardTitle>
                                                                    <Typography color="secondary">
                                                                        {
                                                                            event.name
                                                                        }
                                                                    </Typography>
                                                                </CardTitle>
                                                                <CardText>
                                                                    <Typography
                                                                        className={
                                                                            classes.popCardBody
                                                                        }
                                                                    >
                                                                        {
                                                                            event.description
                                                                        }
                                                                    </Typography>
                                                                </CardText>
                                                            </CardBody>
                                                            <CardFooter>
                                                                <Typography
                                                                    className={
                                                                        classes.popCardFooter
                                                                    }
                                                                    color="textSecondary"
                                                                >{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                                                {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
                                                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                                                Assigned to:
                                                                {dumUsers
                                                                    .filter(
                                                                        (
                                                                            user
                                                                        ) =>
                                                                            event.assignee.includes(
                                                                                user._id
                                                                            )
                                                                    )
                                                                    .map(
                                                                        (
                                                                            user
                                                                        ) =>
                                                                            `${user.name}, `
                                                                    )}{' '}
                                                                {curUser.privelege_level ===
                                                                'Admin' ? (
                                                                    <EditEventForm
                                                                        deleteEvent={
                                                                            deleteEvent
                                                                        }
                                                                        dumEvents={
                                                                            dumEvents
                                                                        }
                                                                        dumUsers={
                                                                            dumUsers
                                                                        }
                                                                        editEvent={
                                                                            editEvent
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        serverError={
                                                                            events.serverError
                                                                        }
                                                                    />
                                                                ) : null}
                                                            </CardFooter>
                                                        </Card>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        })
                                    )}
                                </ListGroup>
                            </PopoverBody>
                        </Popover>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card
                            body
                            className="btn"
                            style={{ borderColor: '#00c853' }}
                            id="projectCard"
                            onClick={handleProjectCardOpen}
                        >
                            {projects.errMess !== null ? (
                                <h4>Error fetching projects</h4>
                            ) : (
                                <CardBody>
                                    <Backdrop
                                        className={classes.backdrop}
                                        open={projects.isLoading}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <CardTitle>Projects</CardTitle>
                                    <CardText>{dumProjects.length}</CardText>
                                </CardBody>
                            )}
                        </Card>
                        <Dialog
                            open={projectDailogOpen}
                            maxWidth="sm"
                            fullWidth
                            onClose={handleProjectCardClose}
                            scroll="paper"
                        >
                            <DialogTitle>
                                <Typography variant="h4">
                                    View Club Projects
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Nav tabs>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active: activeTab === 'Ongoing',
                                            })}
                                            onClick={() => toggle('Ongoing')}
                                        >
                                            Ongoing
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    activeTab === 'Upcoming',
                                            })}
                                            onClick={() => toggle('Upcoming')}
                                        >
                                            Upcoming
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    activeTab === 'Completed',
                                            })}
                                            onClick={() => toggle('Completed')}
                                        >
                                            Completed
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="Ongoing">
                                        {projects.errMess !== null ? (
                                            <div>
                                                <h4>
                                                    Failed to fetch Projects
                                                </h4>
                                                <h4>{projects.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumProjects
                                                    .filter(
                                                        (project) =>
                                                            project.status ===
                                                            'ONGOING'
                                                    )
                                                    .map((project) => {
                                                        return (
                                                            <Fragment
                                                                key={`${project}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    project.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        project.description
                                                                                    }
                                                                                </Typography>
                                                                                {Array.from(
                                                                                    project.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography variant="body1">
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                            Assigned
                                                                            to:
                                                                            {dumUsers
                                                                                .filter(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        project.members.includes(
                                                                                            user._id
                                                                                        )
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        `${user.name}, `
                                                                                )}
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                    <TabPane tabId="Upcoming">
                                        {projects.errMess !== null ? (
                                            <div>
                                                <h4>
                                                    Failed to fetch Projects
                                                </h4>
                                                <h4>{projects.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumProjects
                                                    .filter(
                                                        (project) =>
                                                            project.status ===
                                                            'IDEA'
                                                    )
                                                    .map((project) => {
                                                        return (
                                                            <Fragment
                                                                key={`${project}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    project.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        project.description
                                                                                    }
                                                                                </Typography>
                                                                                {Array.from(
                                                                                    project.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography variant="body1">
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                            Assigned
                                                                            to:
                                                                            {dumUsers
                                                                                .filter(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        project.members.includes(
                                                                                            user._id
                                                                                        )
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        `${user.name}, `
                                                                                )}
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                    <TabPane tabId="Completed">
                                        {projects.errMess !== null ? (
                                            <div>
                                                <h4>
                                                    Failed to fetch Projects
                                                </h4>
                                                <h4>{projects.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumProjects
                                                    .filter(
                                                        (project) =>
                                                            project.status ===
                                                            'COMPLETED'
                                                    )
                                                    .map((project) => {
                                                        return (
                                                            <Fragment
                                                                key={`${project}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    project.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        project.description
                                                                                    }
                                                                                </Typography>
                                                                                {Array.from(
                                                                                    project.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography variant="body1">
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                            Assigned
                                                                            to:
                                                                            {dumUsers
                                                                                .filter(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        project.members.includes(
                                                                                            user._id
                                                                                        )
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        user
                                                                                    ) =>
                                                                                        `${user.name}, `
                                                                                )}
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                </TabContent>
                            </DialogContent>
                        </Dialog>
                        <Popover
                            placement="bottom"
                            isOpen={projectPopOpen}
                            target="projectCard"
                            toggle={toggleProjectPop}
                            trigger="hover"
                        >
                            <PopoverHeader className={classes.popHeader}>
                                <Typography>Club Projects</Typography>
                            </PopoverHeader>
                            <PopoverBody className={classes.popBody}>
                                <ListGroup>
                                    {dumProjects.length === 0 ? (
                                        <div>
                                            <h4>No Club Projects</h4>
                                        </div>
                                    ) : (
                                        dumProjects.map((project, index) => {
                                            return (
                                                <Fragment key={`${project}`}>
                                                    <ListGroupItem>
                                                        <Card body>
                                                            <CardBody>
                                                                <CardTitle>
                                                                    <Typography color="secondary">
                                                                        {
                                                                            project.name
                                                                        }
                                                                    </Typography>
                                                                </CardTitle>
                                                                <CardText>
                                                                    <Typography
                                                                        className={
                                                                            classes.popCardBody
                                                                        }
                                                                    >
                                                                        {
                                                                            project.description
                                                                        }
                                                                    </Typography>
                                                                </CardText>
                                                            </CardBody>
                                                            <CardFooter>
                                                                <Typography
                                                                    className={
                                                                        classes.popCardFooter
                                                                    }
                                                                    color="textSecondary"
                                                                >{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}\n${
                                                                    project
                                                                        .members
                                                                        .length !==
                                                                    0
                                                                        ? dumUsers
                                                                              .filter(
                                                                                  (
                                                                                      user
                                                                                  ) =>
                                                                                      project.members.includes(
                                                                                          user._id
                                                                                      )
                                                                              )
                                                                              .map(
                                                                                  (
                                                                                      user
                                                                                  ) =>
                                                                                      `${user.name}, `
                                                                              )[0]
                                                                        : ''
                                                                }...`}</Typography>
                                                                {curUser.privelege_level ===
                                                                'Admin' ? (
                                                                    <EditProjectForm
                                                                        deleteProject={
                                                                            deleteProject
                                                                        }
                                                                        dumProjects={
                                                                            dumProjects
                                                                        }
                                                                        dumUsers={
                                                                            dumUsers
                                                                        }
                                                                        editProject={
                                                                            editProject
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        serverError={
                                                                            projects.serverError
                                                                        }
                                                                    />
                                                                ) : null}
                                                            </CardFooter>
                                                        </Card>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        })
                                    )}
                                </ListGroup>
                            </PopoverBody>
                        </Popover>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card
                            id="resourceCard"
                            body
                            className="btn"
                            style={{ borderColor: '#00c853' }}
                            onClick={handleResourceCardOpen}
                        >
                            {resources.errMess !== null ? (
                                <h4>Error fetching resources</h4>
                            ) : (
                                <CardBody>
                                    <Backdrop
                                        className={classes.backdrop}
                                        open={resources.isLoading}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <CardTitle>Resources</CardTitle>
                                    <CardText>{dumResources.length}</CardText>
                                </CardBody>
                            )}
                        </Card>
                        <Dialog
                            open={resourceDailogOpen}
                            maxWidth="sm"
                            fullWidth
                            onClose={handleResourceCardClose}
                            scroll="paper"
                        >
                            <DialogTitle>
                                <Typography variant="h4">
                                    View Club Resources
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Nav tabs>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    activeTab === 'Completed',
                                            })}
                                            onClick={() => toggle('Completed')}
                                        >
                                            Archived
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active: activeTab === 'Ongoing',
                                            })}
                                            onClick={() => toggle('Ongoing')}
                                        >
                                            Current
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="Completed">
                                        {resources.errMess !== null ? (
                                            <div>
                                                <h4>
                                                    Failed to fetch Resources
                                                </h4>
                                                <h4>{resources.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumResources
                                                    .filter(
                                                        (res) => res.archive
                                                    )
                                                    .map((res) => {
                                                        return (
                                                            <Fragment
                                                                key={`${res}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    res.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">
                                                                                    {
                                                                                        res.directory_year
                                                                                    }
                                                                                </Typography>
                                                                                {curUser.privelege_level !==
                                                                                'Unapproved_User' ? (
                                                                                    <Typography variant="body1">
                                                                                        (
                                                                                        {
                                                                                            res.internal_name
                                                                                        }

                                                                                        )
                                                                                    </Typography>
                                                                                ) : null}
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        res.description
                                                                                    }
                                                                                </Typography>
                                                                            </CardText>
                                                                        </CardBody>
                                                                        <CardFooter>
                                                                            <CardLink
                                                                                href={
                                                                                    res.url
                                                                                }
                                                                            >
                                                                                Access
                                                                                resource
                                                                            </CardLink>
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                    <TabPane tabId="Ongoing">
                                        {resources.errMess !== null ? (
                                            <div>
                                                <h4>
                                                    Failed to fetch Resources
                                                </h4>
                                                <h4>{resources.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumResources
                                                    .filter(
                                                        (res) => !res.archive
                                                    )
                                                    .map((res) => {
                                                        return (
                                                            <Fragment
                                                                key={`${res}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Typography variant="h4">
                                                                                {
                                                                                    res.name
                                                                                }
                                                                            </Typography>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h6">
                                                                                    {
                                                                                        res.directory_year
                                                                                    }
                                                                                </Typography>
                                                                                {curUser.privelege_level !==
                                                                                'Unapproved_User' ? (
                                                                                    <Typography variant="body1">
                                                                                        (
                                                                                        {
                                                                                            res.internal_name
                                                                                        }

                                                                                        )
                                                                                    </Typography>
                                                                                ) : null}
                                                                            </CardTitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        res.description
                                                                                    }
                                                                                </Typography>
                                                                            </CardText>
                                                                        </CardBody>
                                                                        <CardFooter>
                                                                            <CardLink
                                                                                href={
                                                                                    res.url
                                                                                }
                                                                            >
                                                                                Access
                                                                                resource
                                                                            </CardLink>
                                                                        </CardFooter>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                </TabContent>
                            </DialogContent>
                        </Dialog>
                        <Popover
                            placement="bottom"
                            isOpen={resourcePopOpen}
                            target="resourceCard"
                            toggle={toggleResourcePop}
                            trigger="hover"
                        >
                            <PopoverHeader className={classes.popHeader}>
                                <Typography>Club Resources</Typography>
                            </PopoverHeader>
                            <PopoverBody className={classes.popBody}>
                                <ListGroup>
                                    {dumResources.length === 0 ? (
                                        <div>
                                            <h4>No Club Resources</h4>
                                        </div>
                                    ) : (
                                        dumResources.map((res, index) => {
                                            return (
                                                <Fragment key={`${res}`}>
                                                    <ListGroupItem>
                                                        <Card body>
                                                            <CardBody>
                                                                <CardTitle>
                                                                    <Typography color="secondary">
                                                                        {
                                                                            res.name
                                                                        }
                                                                    </Typography>
                                                                </CardTitle>
                                                                <CardText>
                                                                    <Typography
                                                                        className={
                                                                            classes.popCardBody
                                                                        }
                                                                    >{`${res.description.substr(
                                                                        0,
                                                                        30
                                                                    )}...`}</Typography>
                                                                </CardText>
                                                            </CardBody>
                                                            <CardFooter>
                                                                {/* <Typography className={classes.popCardFooter} color="textSecondary">{res.url}</Typography> */}
                                                                <CardLink
                                                                    href={
                                                                        res.url
                                                                    }
                                                                >
                                                                    Access
                                                                    resource
                                                                </CardLink>
                                                                {curUser.privelege_level ===
                                                                'Admin' ? (
                                                                    <EditResourceForm
                                                                        deleteResource={
                                                                            deleteResource
                                                                        }
                                                                        dumResources={
                                                                            dumResources
                                                                        }
                                                                        dumUsers={
                                                                            dumUsers
                                                                        }
                                                                        editResource={
                                                                            editResource
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        serverError={
                                                                            resources.serverError
                                                                        }
                                                                    />
                                                                ) : null}
                                                            </CardFooter>
                                                        </Card>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        })
                                    )}
                                </ListGroup>
                            </PopoverBody>
                        </Popover>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card
                            id="memCard"
                            body
                            className="btn"
                            style={{ borderColor: '#00c853' }}
                            onClick={handleUserCardOpen}
                        >
                            {users.usersErrMess !== null ? (
                                <h4>Error fetching members</h4>
                            ) : (
                                <CardBody>
                                    <Backdrop
                                        className={classes.backdrop}
                                        open={users.usersLoading}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <CardTitle>Members</CardTitle>
                                    <CardText>{dumUsers.length}</CardText>
                                </CardBody>
                            )}
                        </Card>
                        <Dialog
                            open={userDailogOpen}
                            maxWidth="sm"
                            fullWidth
                            onClose={handleUserCardClose}
                            scroll="paper"
                        >
                            <DialogTitle>
                                <Typography variant="h4">
                                    View Members
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Nav tabs>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active: activeTab === 'Ongoing',
                                            })}
                                            onClick={() => toggle('Ongoing')}
                                        >
                                            Admin
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    activeTab === 'Upcoming',
                                            })}
                                            onClick={() => toggle('Upcoming')}
                                        >
                                            Approved
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="btn">
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    activeTab === 'Completed',
                                            })}
                                            onClick={() => toggle('Completed')}
                                        >
                                            Unapproved
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="Ongoing">
                                        {users.userErrMess !== null ? (
                                            <div>
                                                <h4>Failed to fetch Members</h4>
                                                <h4>{users.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumUsers
                                                    .filter(
                                                        (user) =>
                                                            user.privelege_level ===
                                                            'Admin'
                                                    )
                                                    .map((user) => {
                                                        return (
                                                            <Fragment
                                                                key={`${user}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Grid
                                                                                container
                                                                            >
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        9
                                                                                    }
                                                                                >
                                                                                    <Typography variant="h3">
                                                                                        {
                                                                                            user.name
                                                                                        }
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        3
                                                                                    }
                                                                                >
                                                                                    <Avatar
                                                                                        alt=""
                                                                                        src={user.url.get(
                                                                                            'picture_url'
                                                                                        )}
                                                                                        className={
                                                                                            classes.large
                                                                                        }
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h5">
                                                                                    {
                                                                                        user.entry_no
                                                                                    }
                                                                                </Typography>
                                                                            </CardTitle>
                                                                            <CardSubtitle>
                                                                                <Typography variant="h6">
                                                                                    {
                                                                                        user.category
                                                                                    }
                                                                                </Typography>
                                                                            </CardSubtitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        user.intro
                                                                                    }
                                                                                </Typography>
                                                                                <Typography variant="body1">{`Interests: ${user.interests}`}</Typography>
                                                                                <Typography variant="body1">{`Specializations: ${user.specialization}`}</Typography>
                                                                                <Typography variant="body1">{`Hostel: ${user.hostel}`}</Typography>
                                                                                <Typography variant="caption">{`Email: ${user.email}`}</Typography>
                                                                                <Typography variant="body1">{`Mobile: ${user.mobile_number}`}</Typography>
                                                                                {Array.from(
                                                                                    user.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography
                                                                                                key={`${key}`}
                                                                                                variant="body1"
                                                                                            >
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                    <TabPane tabId="Upcoming">
                                        {users.userErrMess !== null ? (
                                            <div>
                                                <h4>Failed to fetch Members</h4>
                                                <h4>{users.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumUsers
                                                    .filter(
                                                        (user) =>
                                                            user.privelege_level ===
                                                            'Approved_User'
                                                    )
                                                    .map((user) => {
                                                        return (
                                                            <Fragment
                                                                key={`${user}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Grid
                                                                                container
                                                                            >
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        9
                                                                                    }
                                                                                >
                                                                                    <Typography variant="h3">
                                                                                        {
                                                                                            user.name
                                                                                        }
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        3
                                                                                    }
                                                                                >
                                                                                    <Avatar
                                                                                        alt=""
                                                                                        src={user.url.get(
                                                                                            'picture_url'
                                                                                        )}
                                                                                        className={
                                                                                            classes.large
                                                                                        }
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h5">
                                                                                    {
                                                                                        user.entry_no
                                                                                    }
                                                                                </Typography>
                                                                            </CardTitle>
                                                                            <CardSubtitle>
                                                                                <Typography variant="h6">
                                                                                    {
                                                                                        user.category
                                                                                    }
                                                                                </Typography>
                                                                            </CardSubtitle>
                                                                            <CardText>
                                                                                <Typography variant="body1">
                                                                                    {
                                                                                        user.intro
                                                                                    }
                                                                                </Typography>
                                                                                <Typography variant="body1">{`Interests: ${user.interests}`}</Typography>
                                                                                <Typography variant="body1">{`Specializations: ${user.specialization}`}</Typography>
                                                                                <Typography variant="body1">{`Hostel: ${user.hostel}`}</Typography>
                                                                                <Typography variant="caption">{`Email: ${user.email}`}</Typography>
                                                                                <Typography variant="body1">{`Mobile: ${user.mobile_number}`}</Typography>
                                                                                {Array.from(
                                                                                    user.url
                                                                                ).map(
                                                                                    ([
                                                                                        key,
                                                                                        value,
                                                                                    ]) => {
                                                                                        return (
                                                                                            <Typography variant="body1">
                                                                                                {`${key}: `}
                                                                                                <CardLink
                                                                                                    href={
                                                                                                        value
                                                                                                    }
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
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                    <TabPane tabId="Completed">
                                        {users.userErrMess !== null ? (
                                            <div>
                                                <h4>Failed to fetch Members</h4>
                                                <h4>{users.errMess}</h4>
                                            </div>
                                        ) : null}
                                        {
                                            <ListGroup>
                                                {dumUsers
                                                    .filter(
                                                        (user) =>
                                                            user.privelege_level ===
                                                            'Unapproved_User'
                                                    )
                                                    .map((user) => {
                                                        return (
                                                            <Fragment
                                                                key={`${user}`}
                                                            >
                                                                <ListGroupItem>
                                                                    <Card
                                                                        body
                                                                        style={{
                                                                            borderColor:
                                                                                '#00c853',
                                                                        }}
                                                                    >
                                                                        <CardHeader>
                                                                            <Grid
                                                                                container
                                                                            >
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        9
                                                                                    }
                                                                                >
                                                                                    <Typography variant="h3">
                                                                                        {
                                                                                            user.name
                                                                                        }
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid
                                                                                    item
                                                                                    xs={
                                                                                        12
                                                                                    }
                                                                                    md={
                                                                                        3
                                                                                    }
                                                                                >
                                                                                    <Avatar
                                                                                        alt=""
                                                                                        src={user.url.get(
                                                                                            'picture_url'
                                                                                        )}
                                                                                        className={
                                                                                            classes.large
                                                                                        }
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </CardHeader>
                                                                        <CardBody>
                                                                            <CardTitle>
                                                                                <Typography variant="h5">
                                                                                    {
                                                                                        user.entry_no
                                                                                    }
                                                                                </Typography>
                                                                            </CardTitle>
                                                                            <CardSubtitle>
                                                                                <Typography variant="h6">
                                                                                    {
                                                                                        user.category
                                                                                    }
                                                                                </Typography>
                                                                            </CardSubtitle>
                                                                            <CardText>
                                                                                <Typography variant="caption">{`Email: ${user.email}`}</Typography>
                                                                            </CardText>
                                                                        </CardBody>
                                                                    </Card>
                                                                </ListGroupItem>
                                                            </Fragment>
                                                        );
                                                    })}
                                            </ListGroup>
                                        }
                                    </TabPane>
                                </TabContent>
                            </DialogContent>
                        </Dialog>
                        <Popover
                            placement="bottom"
                            isOpen={memPopOpen}
                            target="memCard"
                            toggle={toggleMemPop}
                            trigger="hover"
                        >
                            <PopoverHeader className={classes.popHeader}>
                                <Typography>All Dashboard Users</Typography>
                            </PopoverHeader>
                            <PopoverBody className={classes.popBody}>
                                <ListGroup>
                                    {dumUsers.length === 0 ? (
                                        <div>
                                            <h4>No Club Members</h4>
                                        </div>
                                    ) : (
                                        dumUsers.map((user, index) => {
                                            return (
                                                <Fragment key={`${user}`}>
                                                    <ListGroupItem>
                                                        <Card body>
                                                            <CardBody>
                                                                <CardTitle>
                                                                    <Typography color="secondary">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </Typography>
                                                                    <Typography variant="body2">
                                                                        {
                                                                            user.entry_no
                                                                        }
                                                                    </Typography>
                                                                </CardTitle>
                                                                <CardText>
                                                                    <Typography
                                                                        className={
                                                                            classes.popCardBody
                                                                        }
                                                                    >{`${user.intro.substr(
                                                                        0,
                                                                        30
                                                                    )}...`}</Typography>
                                                                </CardText>
                                                            </CardBody>
                                                            <CardFooter>
                                                                <Typography
                                                                    className={
                                                                        classes.popCardFooter
                                                                    }
                                                                    color="textSecondary"
                                                                >{`${
                                                                    user.category
                                                                }\n${
                                                                    user.privelege_level ===
                                                                    'Unapproved_User'
                                                                        ? 'Unapproved'
                                                                        : ''
                                                                }`}</Typography>
                                                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                                                {curUser.privelege_level ===
                                                                    'Admin' &&
                                                                user.privelege_level !==
                                                                    'Admin' ? (
                                                                    <EditOtherUserForm
                                                                        removeUser={
                                                                            removeUser
                                                                        }
                                                                        dumUsers={
                                                                            dumUsers
                                                                        }
                                                                        editUser={
                                                                            editOtherUser
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        serverError={
                                                                            users.serverError
                                                                        }
                                                                    />
                                                                ) : null}
                                                            </CardFooter>
                                                        </Card>
                                                    </ListGroupItem>
                                                </Fragment>
                                            );
                                        })
                                    )}
                                </ListGroup>
                            </PopoverBody>
                        </Popover>
                    </Grid>
                </Grid>
                <Grid
                    item
                    id="myTaskContainer"
                    xs={12}
                    md={5}
                    className={classes.cardBorderR}
                >
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            onClick={() => {
                                history.push('/dashboard/myTasks');
                            }}
                        >
                            <Typography
                                className="btn"
                                align="center"
                                variant="h4"
                            >
                                My Tasks
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Nav tabs>
                            <NavItem className="btn">
                                <NavLink
                                    className={classnames({
                                        active: activeTaskTab === 'Events',
                                    })}
                                    onClick={() => toggleTask('Events')}
                                >
                                    Events
                                </NavLink>
                            </NavItem>
                            <NavItem className="btn">
                                <NavLink
                                    className={classnames({
                                        active: activeTaskTab === 'Upcoming',
                                    })}
                                    onClick={() => toggleTask('Projects')}
                                >
                                    Projects
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTaskTab}>
                            <TabPane tabId="Events">
                                {dumEvents.filter((event) =>
                                    event.assignee.includes(curUser._id)
                                ).length === 0 ? (
                                    <Typography
                                        variant="h4"
                                        color="textSecondary"
                                    >
                                        No events for you
                                    </Typography>
                                ) : (
                                    <ListGroup>
                                        {dumEvents
                                            .filter((event) =>
                                                event.assignee.includes(
                                                    curUser._id
                                                )
                                            )
                                            .map((event) => {
                                                return (
                                                    <Fragment key={`${event}`}>
                                                        <ListGroupItem>
                                                            <Card
                                                                body
                                                                style={{
                                                                    borderColor:
                                                                        '#00c853',
                                                                }}
                                                            >
                                                                <CardHeader>
                                                                    <Typography variant="h4">
                                                                        {
                                                                            event.name
                                                                        }
                                                                    </Typography>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <CardTitle>
                                                                        <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                                                    </CardTitle>
                                                                    <CardText>
                                                                        <Typography variant="body1">
                                                                            {
                                                                                event.description
                                                                            }
                                                                        </Typography>
                                                                        {Array.from(
                                                                            event.url
                                                                        ).map(
                                                                            ([
                                                                                key,
                                                                                value,
                                                                            ]) => {
                                                                                return (
                                                                                    <Typography variant="body1">
                                                                                        {`${key}: `}
                                                                                        <CardLink
                                                                                            href={
                                                                                                value
                                                                                            }
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
                                                                {/* <CardFooter>
                                  Assigned to: {event.assignee}
                                </CardFooter> */}
                                                            </Card>
                                                        </ListGroupItem>
                                                    </Fragment>
                                                );
                                            })}
                                    </ListGroup>
                                )}
                            </TabPane>
                            <TabPane tabId="Projects">
                                {dumProjects.filter(
                                    (project) =>
                                        project.members.indexOf(curUser._id) !==
                                        -1
                                ).length === 0 ? (
                                    <Typography
                                        variant="h4"
                                        color="textSecondary"
                                    >
                                        No projects for you
                                    </Typography>
                                ) : (
                                    <ListGroup>
                                        {dumProjects
                                            .filter(
                                                (project) =>
                                                    project.members.indexOf(
                                                        curUser._id
                                                    ) !== -1
                                            )
                                            .map((project) => {
                                                return (
                                                    <Fragment
                                                        key={`${project}`}
                                                    >
                                                        <ListGroupItem>
                                                            <Card
                                                                body
                                                                style={{
                                                                    borderColor:
                                                                        '#00c853',
                                                                }}
                                                            >
                                                                <CardHeader>
                                                                    <Typography variant="h4">
                                                                        {
                                                                            project.name
                                                                        }
                                                                    </Typography>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <CardTitle>
                                                                        <Typography variant="h6">
                                                                            {
                                                                                project.status
                                                                            }
                                                                        </Typography>
                                                                        <Typography variant="h6">{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                                                    </CardTitle>
                                                                    <CardText>
                                                                        <Typography variant="body1">
                                                                            {
                                                                                project.description
                                                                            }
                                                                        </Typography>
                                                                        {Array.from(
                                                                            project.url
                                                                        ).map(
                                                                            ([
                                                                                key,
                                                                                value,
                                                                            ]) => {
                                                                                return (
                                                                                    <Typography variant="body1">
                                                                                        {`${key}: `}
                                                                                        <CardLink
                                                                                            href={
                                                                                                value
                                                                                            }
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
                                                                    Assigned to:
                                                                    {dumUsers
                                                                        .filter(
                                                                            (
                                                                                user
                                                                            ) =>
                                                                                project.members.includes(
                                                                                    user._id
                                                                                )
                                                                        )
                                                                        .map(
                                                                            (
                                                                                user
                                                                            ) =>
                                                                                `${user.name}, `
                                                                        )}
                                                                </CardFooter>
                                                            </Card>
                                                        </ListGroupItem>
                                                    </Fragment>
                                                );
                                            })}
                                    </ListGroup>
                                )}
                            </TabPane>
                        </TabContent>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

Home.propTypes = {
    users: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired,
    editOtherUser: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
};
