/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { Grid, Typography, Paper, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EventCard from './EventCard';
import ProjectCard from './ProjectCard';
import * as Utils from '../utils';

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
    // container: {
    //     // marginLeft: theme.spacing(2),
    //     // marginRight: theme.spacing(2),
    //     // maxHeight: '85vh',
    //     // [theme.breakpoints.down('sm')]: {
    //     //     height: '85vh',
    //     //     overflowY: 'scroll',
    //     //     scrollbarWidth: '2px',
    //     // },
    // },
}));

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
    const curUser = users.user;
    const dumUsers = users.allUsers;
    const dumEvents = events.allEvents;
    const dumProjects = projects.allProjects;
    const dumResources = resources.allResources;

    const myEvents = Utils.EventUtils.sortEventsByStatus(
        Utils.EventUtils.getUserEvents(curUser, dumEvents)
    );

    const myProjects = Utils.ProjectUtils.sortProjectsByStatus(
        Utils.ProjectUtils.getUserProjects(curUser, dumProjects)
    );

    return (
        <Grid
            id="pageContainer"
            container
            justify="center"
            className={classes.container}
        >
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
                sm={6}
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
                                            event={event}
                                            users={dumUsers}
                                            dialog
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
                                        <Tooltip title="View details">
                                            <ProjectCard
                                                project={project}
                                                users={dumUsers}
                                                dialog
                                            />
                                        </Tooltip>
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
