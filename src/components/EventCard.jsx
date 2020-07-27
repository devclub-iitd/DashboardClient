/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import EventDialog from './EventDialog';
import StatusChip from './StatusChip';
import * as EventUtils from '../utils/eventUtils';

const useStyles = makeStyles((theme) => ({
    eventCard: {
        borderWidth: '3px',
        borderColor: '#979797',
        borderRadius: '15px',
        backgroundColor: '#323234',
        margin: theme.spacing(2, 3, 1, 3),
        padding: theme.spacing(2),
    },
    pointer: {
        cursor: 'pointer',
    },
}));

export default function EventCard({ event, users, dialog }) {
    const classes = useStyles();
    const status = EventUtils.getStatus(event);

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
            className={clsx(classes.eventCard, dialog && classes.pointer)}
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
            {open && dialog ? (
                <EventDialog
                    open={open}
                    event={event}
                    close={closeEventDialog}
                    users={users}
                />
            ) : null}
        </Paper>
    );
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    dialog: PropTypes.bool.isRequired,
};
