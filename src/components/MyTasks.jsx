/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Paper,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardFooter,
    CardLink,
    ListGroup,
    ListGroupItem,
    CardHeader,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
    },
    paper: {
        margin: '2em',
        height: document.documentElement.clientHeight * 0.7,
        overflowY: 'scroll',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function MyTasks({ users, events, projects }) {
    const curUser = users.user;
    const dumUsers = users.allUsers;
    const dumEvents = events.allEvents;
    const dumProjects = projects.allProjects;
    const classes = useStyles();

    const [activeEventTab, setActiveEventTab] = React.useState('Ongoing');
    const toggleEventTab = (tab) => {
        if (activeEventTab !== tab) {
            setActiveEventTab(tab);
        }
    };

    const [activeProjectTab, setActiveProjectTab] = React.useState('Idea');
    const toggleProjectTab = (tab) => {
        if (activeProjectTab !== tab) {
            setActiveProjectTab(tab);
        }
    };

    function isOngoing(startDate, endDate) {
        const today = new Date();
        if (today > startDate && today < endDate) {
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

    const ongoingEvents = dumEvents
        .filter((event) => event.assignee.includes(curUser._id))
        .filter((event) => isOngoing(event.start_date, event.end_date));
    const upcomingEvents = dumEvents
        .filter((event) => event.assignee.includes(curUser._id))
        .filter((event) => isUpcoming(event.start_date));
    const completedEvents = dumEvents
        .filter((event) => event.assignee.includes(curUser._id))
        .filter((event) => isCompleted(event.end_date));

    const ideaProjects = dumProjects
        .filter((project) => project.members.includes(curUser._id))
        .filter((project) => project.status === 'IDEA');
    const ongoingProjects = dumProjects
        .filter((project) => project.members.includes(curUser._id))
        .filter((project) => project.status === 'ONGOING');
    const completedProjects = dumProjects
        .filter((project) => project.members.includes(curUser._id))
        .filter((project) => project.status === 'COMPLETED');

    // console.log('Ongoing Events: ', ongoingEvents.length);
    // console.log('Upcoming Events: ', upcomingEvents.length);
    // console.log('Completed Events: ', completedEvents.length);

    return (
        <Grid container justify="space-evenly">
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h4"
                    align="center"
                    className={{ width: '100%' }}
                >
                    My Events
                </Typography>
                <Paper
                    elevation={3}
                    variant="outlined"
                    className={classes.paper}
                >
                    {/* <Typography variant='h4' align='center' className={{ width: '100%' }}>My Events</Typography> */}
                    <Backdrop
                        className={classes.backdrop}
                        open={events.isLoading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Nav tabs>
                        <NavItem className="btn">
                            <NavLink
                                className={classnames({
                                    active: activeEventTab === 'Ongoing',
                                })}
                                onClick={() => toggleEventTab('Ongoing')}
                            >
                                Ongoing
                            </NavLink>
                        </NavItem>
                        <NavItem className="btn">
                            <NavLink
                                className={classnames({
                                    active: activeEventTab === 'Upcoming',
                                })}
                                onClick={() => toggleEventTab('Upcoming')}
                            >
                                Upcoming
                            </NavLink>
                        </NavItem>
                        <NavItem className="btn">
                            <NavLink
                                className={classnames({
                                    active: activeEventTab === 'Completed',
                                })}
                                onClick={() => toggleEventTab('Completed')}
                            >
                                Completed
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeEventTab}>
                        <TabPane tabId="Ongoing">
                            {events.errMess !== null ? (
                                <div>
                                    <h4>Failed to fetch Events</h4>
                                    <h4>{events.errMess}</h4>
                                </div>
                            ) : null}
                            {ongoingEvents.length === 0 ? (
                                <Typography variant="h4" color="textSecondary">
                                    No ongoing events for you
                                </Typography>
                            ) : (
                                <ListGroup>
                                    {ongoingEvents.map((event) => {
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
                                                                {event.name}
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
                                                                                >
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </CardLink>
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
                                                                    (user) =>
                                                                        event.assignee.includes(
                                                                            user._id
                                                                        )
                                                                )
                                                                .map(
                                                                    (user) =>
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
                        <TabPane tabId="Upcoming">
                            {events.errMess !== null ? (
                                <div>
                                    <h4>Failed to fetch Events</h4>
                                    <h4>{events.errMess}</h4>
                                </div>
                            ) : null}
                            {upcomingEvents.length === 0 ? (
                                <Typography variant="h4" color="textSecondary">
                                    No upcoming events for you
                                </Typography>
                            ) : (
                                <ListGroup>
                                    {upcomingEvents.map((event) => {
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
                                                                {event.name}
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
                                                                                >
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </CardLink>
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
                                                                    (user) =>
                                                                        event.assignee.includes(
                                                                            user._id
                                                                        )
                                                                )
                                                                .map(
                                                                    (user) =>
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
                        <TabPane tabId="Completed">
                            {events.errMess !== null ? (
                                <div>
                                    <h4>Failed to fetch Events</h4>
                                    <h4>{events.errMess}</h4>
                                </div>
                            ) : null}
                            {completedEvents.length === 0 ? (
                                <Typography variant="h4" color="textSecondary">
                                    No completed events for you
                                </Typography>
                            ) : (
                                <ListGroup>
                                    {completedEvents.map((event) => {
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
                                                                {event.name}
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
                                                                                >
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </CardLink>
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
                                                                    (user) =>
                                                                        event.assignee.includes(
                                                                            user._id
                                                                        )
                                                                )
                                                                .map(
                                                                    (user) =>
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
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h4"
                    align="center"
                    className={{ width: '100%' }}
                >
                    My Projects
                </Typography>
                <Paper
                    elevation={3}
                    variant="outlined"
                    className={classes.paper}
                >
                    {/* <Typography variant='h4' align='center' className={{ width: '100%' }}>My Projects</Typography> */}
                    <Backdrop
                        className={classes.backdrop}
                        open={projects.isLoading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Nav tabs>
                        <NavItem className="btn">
                            <NavLink
                                className={classnames({
                                    active: activeProjectTab === 'Idea',
                                })}
                                onClick={() => toggleProjectTab('Idea')}
                            >
                                Idea
                            </NavLink>
                        </NavItem>
                        <NavItem className="btn">
                            <NavLink
                                className={classnames({
                                    active: activeProjectTab === 'Ongoing',
                                })}
                                onClick={() => toggleProjectTab('Ongoing')}
                            >
                                Ongoing
                            </NavLink>
                        </NavItem>
                        <NavItem className="btn">
                            <NavLink
                                className={classnames({
                                    active: activeProjectTab === 'Completed',
                                })}
                                onClick={() => toggleProjectTab('Completed')}
                            >
                                Completed
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeProjectTab}>
                        <TabPane tabId="Idea">
                            {projects.errMess !== null ? (
                                <div>
                                    <h4>Failed to fetch Projects</h4>
                                    <h4>{projects.errMess}</h4>
                                </div>
                            ) : null}
                            {ideaProjects.length === 0 ? (
                                <Typography variant="h4" color="textSecondary">
                                    No ideated projects for you
                                </Typography>
                            ) : (
                                <ListGroup>
                                    {ideaProjects.map((project) => {
                                        return (
                                            <Fragment key={`${project}`}>
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
                                                                {project.name}
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
                                                                                >
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </CardLink>
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
                                                                    (user) =>
                                                                        project.members.includes(
                                                                            user._id
                                                                        )
                                                                )
                                                                .map(
                                                                    (user) =>
                                                                        ` ${user.name},`
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
                        <TabPane tabId="Ongoing">
                            {projects.errMess !== null ? (
                                <div>
                                    <h4>Failed to fetch Projects</h4>
                                    <h4>{projects.errMess}</h4>
                                </div>
                            ) : null}
                            {ongoingProjects.length === 0 ? (
                                <Typography variant="h4" color="textSecondary">
                                    No ongoing Projects for you
                                </Typography>
                            ) : (
                                <ListGroup>
                                    {ongoingProjects.map((project) => {
                                        return (
                                            <Fragment key={`${project}`}>
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
                                                                {project.name}
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
                                                                                >
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </CardLink>
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
                                                                    (user) =>
                                                                        project.members.includes(
                                                                            user._id
                                                                        )
                                                                )
                                                                .map(
                                                                    (user) =>
                                                                        ` ${user.name},`
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
                        <TabPane tabId="Completed">
                            {projects.errMess !== null ? (
                                <div>
                                    <h4>Failed to fetch Projects</h4>
                                    <h4>{projects.errMess}</h4>
                                </div>
                            ) : null}
                            {completedProjects.length === 0 ? (
                                <Typography variant="h4" color="textSecondary">
                                    No completed projects for you
                                </Typography>
                            ) : (
                                <ListGroup>
                                    {completedProjects.map((project) => {
                                        return (
                                            <Fragment key={`${project}`}>
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
                                                                {project.name}
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
                                                                                >
                                                                                    {
                                                                                        value
                                                                                    }
                                                                                </CardLink>
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
                                                                    (user) =>
                                                                        project.members.includes(
                                                                            user._id
                                                                        )
                                                                )
                                                                .map(
                                                                    (user) =>
                                                                        ` ${user.name},`
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
                </Paper>
            </Grid>
        </Grid>
    );
}

MyTasks.propTypes = {
    users: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
};
