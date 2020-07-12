/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
    Dialog,
    Card,
    Typography,
    CardContent,
    Grid,
    Divider,
    Link,
    Tooltip,
    Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EventIcon from '@material-ui/icons/Event';
import StatusChip from './StatusChip';

const useStyles = makeStyles((theme) => ({
    divider: {
        backgroundColor: '#979797',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    info: {
        marginTop: theme.spacing(1),
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
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

function getStatus(event) {
    if (isOngoing(event.start_date, event.end_date)) {
        return 'ongoing';
    }
    if (isCompleted(event.end_date)) {
        return 'completed';
    }
    if (isUpcoming(event.start_date)) {
        return 'upcoming';
    }
    return '';
}

export default function EventDialog({ event, close, users }) {
    const classes = useStyles();
    const mems = users.filter((user) => event.assignee.includes(user._id));
    const closeDialog = () => {
        close();
    };
    return (
        <Dialog
            open
            onClose={closeDialog}
            maxWidth="sm"
            fullWidth
            scroll="paper"
            PaperComponent="div"
        >
            <Grid style={{ width: '100%' }} container justify="center">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography
                                style={{ fontWeight: 500 }}
                                variant="h3"
                            >
                                {event !== undefined ? event.name : 'jbkbkb'}
                            </Typography>
                            <Divider
                                variant="fullwidth"
                                className={classes.divider}
                            />
                            <Grid
                                container
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item xs={1}>
                                    <EventIcon />
                                </Grid>
                                <Grid item xs={6} sm={8}>
                                    <Typography variant="h6">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                </Grid>
                                <Grid item xs={5} sm={3}>
                                    <StatusChip status={getStatus(event)} />
                                </Grid>
                            </Grid>
                            <Typography
                                className={classes.info}
                                variant="body1"
                            >
                                {event.description}
                            </Typography>
                            {Array.from(event.url).map(([key, value]) => {
                                return (
                                    <Typography
                                        className={classes.info}
                                        variant="body1"
                                    >
                                        {`${key}: `}
                                        <Link
                                            target="_blank"
                                            href={value}
                                            underline="none"
                                        >{`${value.substr(0, 30)}...`}</Link>
                                    </Typography>
                                );
                            })}
                            <Grid
                                container
                                justify="flex-start"
                                alignItems="center"
                                className={classes.info}
                            >
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="body1">
                                        Managers:
                                    </Typography>
                                </Grid>
                                <Grid
                                    xs={10}
                                    sm={9}
                                    item
                                    container
                                    justify={
                                        mems.length === 0
                                            ? 'flex-start'
                                            : 'center'
                                    }
                                    alignItems="center"
                                >
                                    {mems.length === 0 ? (
                                        <Grid item xs={2}>
                                            <Typography
                                                variant="body1"
                                                style={{
                                                    fontFamily: 'Monospace',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                None
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        mems.map((mem) => (
                                            <Grid item xs={2}>
                                                <Tooltip title={mem.name}>
                                                    <Avatar
                                                        className={
                                                            classes.avatar
                                                        }
                                                        alt=""
                                                        src={mem.url.get(
                                                            'picture_url'
                                                        )}
                                                    />
                                                </Tooltip>
                                            </Grid>
                                        ))
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Dialog>
    );
}

EventDialog.propTypes = {
    event: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
};
