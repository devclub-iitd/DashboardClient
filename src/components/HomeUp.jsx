/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import {
    Grid,
    Typography,
    Avatar,
    Backdrop,
    CircularProgress,
    Paper,
    Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EventDialog from './EventDialog';
import ProjectDialog from './ProjectDialog';
import StatusChip from './StatusChip';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    actCard: {
        borderWidth: '3px',
        borderColor: '#979797',
        borderRadius: '15px',
        backgroundColor: '#323234',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginTop: theme.spacing(3),
        cursor: 'pointer',
    },
    eventCard: {
        borderWidth: '3px',
        borderColor: '#979797',
        borderRadius: '15px',
        backgroundColor: '#323234',
        margin: theme.spacing(2, 3, 1, 3),
        padding: theme.spacing(2),
        cursor: 'pointer',
    },
    projectCard: {
        borderWidth: '3px',
        borderColor: '#979797',
        borderRadius: '15px',
        backgroundColor: '#323234',
        margin: theme.spacing(2, 3, 1, 3),
        padding: theme.spacing(2),
        cursor: 'pointer',
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            height: '85vh',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
        },
    },
}));

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

const EventCard = ({ className, event, users }) => {
    let status;
    if (isOngoing(event.start_date, event.end_date)) {
        status = 'ongoing';
    } else if (isCompleted(event.end_date)) {
        status = 'completed';
    } else if (isUpcoming(event.start_date)) {
        status = 'upcoming';
    }

    const [open, setOpen] = React.useState(false);

    const openEventDialog = () => {
        setOpen(true);
    };
    const closeEventDialog = () => {
        setOpen(false);
    };
    return (
        <Paper
            onClick={openEventDialog}
            variant="outlined"
            className={className}
        >
            <Typography
                align="center"
                variant="h4"
                style={{ fontWeight: 500, width: '100%' }}
            >
                {event.name}
            </Typography>
            <Grid
                style={{ marginTop: '8px' }}
                container
                justify="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <Typography
                        variant="h5"
                        align="center"
                        style={{
                            fontWeight: 300,
                        }}
                    >
                        {event.start_date.toDateString()}
                    </Typography>
                </Grid>
                <Grid container justify="center" item xs={6}>
                    <StatusChip status={status} />
                </Grid>
            </Grid>
            {open ? (
                <EventDialog
                    open={open}
                    event={event}
                    close={closeEventDialog}
                    users={users}
                />
            ) : null}
        </Paper>
    );
};

EventCard.propTypes = {
    className: PropTypes.objectOf(PropTypes.string).isRequired,
    event: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
};

const ProjectCard = ({ className, project, users }) => {
    const mems = users.filter((user) => project.members.includes(user._id));
    const dis = mems.length <= 3 ? mems : mems.slice(3);
    const [open, setOpen] = React.useState(false);

    const openProjectDialog = () => {
        setOpen(true);
    };
    const closeProjectDialog = () => {
        setOpen(false);
    };
    return (
        <Paper
            onClick={openProjectDialog}
            variant="outlined"
            className={className}
        >
            <Typography
                align="center"
                variant="h4"
                style={{ width: '100%', fontWeight: 500 }}
            >
                {project.name}
            </Typography>
            <Grid
                style={{ marginTop: '8px' }}
                container
                justify="center"
                alignItems="center"
            >
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    item
                    xs={6}
                >
                    {dis.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{
                                    fontFamily: 'Monospace',
                                    fontWeight: 'bold',
                                }}
                            >
                                No members assigned
                            </Typography>
                        </Grid>
                    ) : (
                        dis.map((mem) => (
                            <Grid item xs={4}>
                                <Tooltip title={mem.name}>
                                    <Avatar
                                        alt=""
                                        src={mem.url.get('picture_url')}
                                    />
                                </Tooltip>
                            </Grid>
                        ))
                    )}
                </Grid>
                <Grid container justify="center" item xs={6}>
                    <StatusChip status={project.status.toLowerCase()} />
                </Grid>
            </Grid>
            {open ? (
                <ProjectDialog
                    open={open}
                    project={project}
                    close={closeProjectDialog}
                    users={users}
                />
            ) : null}
        </Paper>
    );
};

ProjectCard.propTypes = {
    className: PropTypes.objectOf(PropTypes.string).isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ActCard = ({ className, name, num, redirect }) => {
    return (
        <Tooltip title={`Go to ${name}`} placement="right">
            <Paper onClick={redirect} variant="outlined" className={className}>
                <Typography
                    align="center"
                    variant="h5"
                    style={{ fontWeight: 500, width: '100%' }}
                >
                    {name}
                </Typography>
                <Typography
                    align="center"
                    variant="h3"
                    style={{ fontWeight: 500, width: '100%' }}
                >
                    {num}
                </Typography>
            </Paper>
        </Tooltip>
    );
};

ActCard.propTypes = {
    className: PropTypes.objectOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
    redirect: PropTypes.func.isRequired,
};

export default function Home({ users, events, projects, resources, redirect }) {
    const classes = useStyles();
    // const curUser = dumUsers[0];
    const curUser = users.user;
    const dumUsers = users.allUsers;
    const dumEvents = events.allEvents;
    const dumProjects = projects.allProjects;
    const dumResources = resources.allResources;

    const myEvents =
        dumEvents !== null && dumEvents !== undefined
            ? dumEvents.filter((event) => event.assignee.includes(curUser._id))
            : [];

    const myProjects =
        dumProjects !== null && dumProjects !== undefined
            ? dumProjects.filter((project) =>
                  project.members.includes(curUser._id)
              )
            : [];

    return (
        <Grid
            id="pageContainer"
            container
            spacing={3}
            justify="space-evenly"
            className={classes.container}
        >
            <Backdrop
                className={classes.backdrop}
                open={events.isLoading || projects.isLoading || users.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item md={4} sm={5} xs={11}>
                <Typography
                    align="center"
                    variant="h3"
                    style={{ width: '100%', fontWeight: 500 }}
                >
                    Club Activities
                </Typography>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <ActCard
                            className={classes.actCard}
                            name="Events"
                            num={dumEvents.length}
                            redirect={redirect('events', () => {})}
                        />
                        <ActCard
                            className={classes.actCard}
                            name="Projects"
                            num={dumProjects.length}
                            redirect={redirect('projects', () => {})}
                        />
                        <ActCard
                            className={classes.actCard}
                            name="Resources"
                            num={dumResources.length}
                            redirect={redirect('resources', () => {})}
                        />
                        <ActCard
                            className={classes.actCard}
                            name="Members"
                            num={dumUsers.length}
                            redirect={redirect('users', () => {})}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                justify="space-around"
                alignItems="flex-start"
                alignContent="flex-start"
                item
                md={8}
                sm={7}
                xs={11}
                className={classes.taskContainer}
            >
                <Grid item xs={12}>
                    <Typography
                        align="center"
                        style={{ fontWeight: 400 }}
                        variant="h3"
                    >
                        My Tasks
                    </Typography>
                </Grid>
                <Grid item lg={5} md={6} xs={12}>
                    <Typography
                        align="center"
                        variant="h4"
                        style={{ fontWeight: 500, marginBottom: '16px' }}
                    >
                        Events
                    </Typography>
                    <div
                        style={{
                            maxHeight: '72vh',
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {myEvents.length === 0 ? (
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{
                                    fontFamily: 'Monospace',
                                    fontWeight: 'bold',
                                }}
                            >
                                No events for you :(
                            </Typography>
                        ) : (
                            myEvents.map((event) => {
                                return (
                                    <Fragment key={event._id}>
                                        <EventCard
                                            className={classes.eventCard}
                                            event={event}
                                            users={dumUsers}
                                        />
                                    </Fragment>
                                );
                            })
                        )}
                    </div>
                </Grid>
                <Grid item lg={5} md={6} xs={12}>
                    <Typography
                        align="center"
                        variant="h4"
                        style={{ fontWeight: 500, marginBottom: '16px' }}
                    >
                        Projects
                    </Typography>
                    <div
                        style={{
                            maxHeight: '72vh',
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {myProjects.length === 0 ? (
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{
                                    fontFamily: 'Monospace',
                                    fontWeight: 'bold',
                                }}
                            >
                                No projects for you :(
                            </Typography>
                        ) : (
                            myProjects.map((project) => {
                                return (
                                    <Fragment key={project._id}>
                                        <ProjectCard
                                            className={classes.projectCard}
                                            project={project}
                                            users={dumUsers}
                                        />
                                    </Fragment>
                                );
                            })
                        )}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

Home.propTypes = {
    users: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
};
