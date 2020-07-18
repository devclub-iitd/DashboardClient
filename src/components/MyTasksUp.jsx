/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as Utils from '../utils';
import EventCard from './EventCard';
import ProjectCard from './ProjectCard';
import ToDoBox from './ToDo';

export default function MyTasks({ users, events, projects }) {
    const curUser = users.user;
    const dumUsers = users.allUsers;
    const dumEvents = events.allEvents;
    const dumProjects = projects.allProjects;

    const myEvents = Utils.EventUtils.sortEventsByStatus(
        Utils.EventUtils.getUserEvents(curUser, dumEvents)
    );
    const myProjects = Utils.ProjectUtils.sortProjectsByStatus(
        Utils.ProjectUtils.getUserProjects(curUser, dumProjects)
    );

    const todos = [
        {
            title: 'To Do',
            desc: 'Have to complete this todo you fool ! Coming SOON !',
        },
    ];

    // console.log('Ongoing Events: ', ongoingEvents.length);
    // console.log('Upcoming Events: ', upcomingEvents.length);
    // console.log('Completed Events: ', completedEvents.length);
    return (
        <Grid container justify="space-evenly" alignItems="flex-start">
            <Grid item lg={3} md={4} xs={12}>
                <Typography
                    align="center"
                    variant="h4"
                    style={{ fontWeight: 500, marginBottom: '16px' }}
                >
                    Events
                </Typography>
                <div
                    style={{
                        maxHeight: '75vh',
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
                                wordWrap: 'break-word',
                            }}
                        >
                            No events for you :(
                        </Typography>
                    ) : (
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="center"
                        >
                            {myEvents.map((event) => {
                                return (
                                    <Grid item xs={12} sm={6} md={12}>
                                        <Fragment key={event._id}>
                                            <EventCard
                                                event={event}
                                                users={dumUsers}
                                                dialog
                                            />
                                        </Fragment>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </div>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
                <Typography
                    align="center"
                    variant="h4"
                    style={{ fontWeight: 500, marginBottom: '16px' }}
                >
                    Projects
                </Typography>
                <div
                    style={{
                        maxHeight: '75vh',
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
                                wordWrap: 'break-word',
                            }}
                        >
                            No projects for you :(
                        </Typography>
                    ) : (
                        <Grid
                            container
                            justify="flex-start"
                            alignItems="center"
                        >
                            {myProjects.map((project) => {
                                return (
                                    <Grid item xs={12} sm={6} md={12}>
                                        <Fragment key={project._id}>
                                            <ProjectCard
                                                project={project}
                                                users={dumUsers}
                                                dialog
                                            />
                                        </Fragment>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </div>
            </Grid>
            <Grid item lg={3} md={4} xs={11}>
                <Typography
                    align="center"
                    variant="h4"
                    style={{ fontWeight: 500, marginBottom: '16px' }}
                >
                    To Do
                </Typography>
                <div
                    style={{
                        maxHeight: '75vh',
                        overflowY: 'scroll',
                        scrollbarWidth: 'none',
                    }}
                >
                    <ToDoBox todos={todos} />
                </div>
            </Grid>
        </Grid>
    );
}

MyTasks.propTypes = {
    users: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
};
