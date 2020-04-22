import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Paper, GridList, GridListTileBar, GridListTile,
  Typography, Grid, Backdrop, CircularProgress
} from '@material-ui/core';
import { Card, CardBody, CardText, CardTitle, CardFooter,
    CardHeader, CardLink
} from 'reactstrap';
import EditEventForm from './EditEventForm';

const useStyles = makeStyles(theme => ({
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
        fontSize: '0.5rem'
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
        height: '25em',
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
    },
    head: {
        padding: '0.5em',
    },
    paper: {
        margin: '2em',
    },
}));

const EventsPage = ({ events, fetchAllEvents, editEvent, deleteEvent, users }) => {
    const classes = useStyles();
    const allEvents = events.allEvents;
    const curUser = users.user;
    const dumUsers = users.allUsers;

    function isOngoing (startDate: Date, endDate: Date) {
        let today = new Date();
        if(today > startDate && today < endDate) {
          return true;
        }
        else {
          return false;
        }
    }
    
    function isCompleted (endDate: Date) {
        let today = new Date();
        if(today > endDate) {
            return true;
        }
        else {
            return false;
        }
    }

    function isUpcoming (startDate: Date) {
        let today = new Date();
        if(today < startDate) {
            return true;
        }
        else {
            return false;
        }
    }

    const ongoing = allEvents.filter((event) => isOngoing(event.start_date, event.end_date));
    const upcoming = allEvents.filter((event) => isUpcoming(event.start_date));
    const completed = allEvents.filter((event) => isCompleted(event.end_date));

    return (
        <>
        {
          events.errMess !== null
          ?
          <Typography variant='h4' color='textSecondary'>Failed to fetch Events</Typography>
          : null
        }
        <Backdrop className={classes.backdrop} open={events.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant='h4' color="primary" className={classes.head}>Ongoing</Typography>
                <Grid container spacing={2} className={classes.grid}>
                    {
                      ongoing.length === 0
                      ?
                      <Typography variant='h4' color='textSecondary'>No ongoing events</Typography>
                      :
                        ongoing.map((event, index) => (
                        // <GridListTile key={`${event}~${index}`} cols={2} rows={2}>
                        <Grid key={`${event}~${index}`} item xs={12} md={6} lg={4}>
                            <Card color="primary" outline>
                                <CardHeader>
                                    <Typography variant='h4'>{event.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                    <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                    </CardTitle>
                                    <CardText>
                                    <Typography variant='body1' >{event.description}</Typography>
                                    {
                                        Array.from(event.url).map(([key, value]) => {
                                        return(
                                            <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                        );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    {/* Assigned to: {event.assignee} */}
                                    Assigned to:
                                    {
                                        dumUsers.filter(user => event.assignee.includes(user._id)).map(user => (user.name + ', '))
                                    }                                    
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditEventForm 
                                          deleteEvent={deleteEvent} 
                                          dumEvents={ongoing}
                                          dumUsers={users.allUsers} 
                                          editEvent={editEvent} 
                                          index={index}
                                          serverError={events.serverError} />
                                        : null
                                    }
                                </CardFooter>
                                {/* <CardFooter>
                                    Assigned to: {event.assignee}
                                </CardFooter> */}
                            </Card>
                        </Grid>
                        // </GridListTile>
                    ))}
                </Grid>
            {/* </GridList> */}
        </Paper>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant='h4' color="primary" className={classes.head}>Upcoming</Typography>
                <Grid container spacing={2} className={classes.grid}>
                    {
                      upcoming.length === 0
                      ?
                      <Typography variant='h4' color='textSecondary'>No upcoming events</Typography>
                      :
                      upcoming.map((event, index) => (
                        // <GridListTile key={`${event}~${index}`} cols={2} rows={2}>
                        <Grid key={`${event}~${index}`} item xs={12} md={6} lg={4}>
                            <Card color="primary" outline>
                                <CardHeader>
                                    <Typography variant='h4'>{event.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                    <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                    </CardTitle>
                                    <CardText>
                                    <Typography variant='body1' >{event.description}</Typography>
                                    {
                                        Array.from(event.url).map(([key, value]) => {
                                            return(
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    {/* Assigned to: {event.assignee} */}
                                    Assigned to:
                                    {
                                        dumUsers.filter(user => event.assignee.includes(user._id)).map(user => (user.name + ', '))
                                    }                                    
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditEventForm 
                                          deleteEvent={deleteEvent} 
                                          dumEvents={upcoming}
                                          dumUsers={users.allUsers} 
                                          editEvent={editEvent} 
                                          index={index} 
                                          serverError={events.serverError} />
                                        : null
                                    }
                                </CardFooter>
                                {/* <CardFooter>
                                    Assigned to: {event.assignee}
                                </CardFooter> */}
                            </Card>
                        </Grid>
                        // </GridListTile>
                    ))}
                </Grid>
            {/* </GridList> */}
        </Paper>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
            {/* <GridList spacing={1} className={classes.gridList}> */}
            <Typography variant='h4' color="primary" className={classes.head}>Completed</Typography>
                <Grid container spacing={2} className={classes.grid}>
                    {
                      completed.length === 0
                      ?
                      <Typography variant='h4' color='textSecondary'>No completed events</Typography>
                      :
                      completed.map((event, index) => (
                        // <GridListTile key={`${event}~${index}`} cols={2} rows={2}>
                        <Grid key={`${event}~${index}`} item xs={12} md={6} lg={4}>
                            <Card color="primary" outline>
                                <CardHeader>
                                    <Typography variant='h4'>{event.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                    <CardTitle>
                                    <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                    </CardTitle>
                                    <CardText>
                                    <Typography variant='body1' >{event.description}</Typography>
                                    {
                                        Array.from(event.url).map(([key, value]) => {
                                            return(
                                                <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                        })
                                    }
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    {/* Assigned to: {event.assignee} */}
                                    Assigned to:
                                    {
                                        dumUsers.filter(user => event.assignee.includes(user._id)).map(user => (user.name + ', '))
                                    }                                    
                                    {
                                        curUser.privelege_level === 'Admin'
                                        ?
                                        <EditEventForm 
                                          deleteEvent={deleteEvent} 
                                          dumEvents={completed}
                                          dumUsers={users.allUsers} 
                                          editEvent={editEvent} 
                                          index={index}
                                          serverError={events.serverError} />
                                        : null
                                    }
                                </CardFooter>
                                {/* <CardFooter>
                                    Assigned to: {event.assignee}
                                </CardFooter> */}
                            </Card>
                        </Grid>
                        // </GridListTile>
                    ))}
                </Grid>
            {/* </GridList> */}
        </Paper>
        </>
    );
}

export default EventsPage;
