import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    Tooltip,
    IconButton,
    Grid,
    Grow,
} from '@material-ui/core';
import { ThumbDownRounded, ThumbUpRounded } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        flex: '1 1 100%',
        display: 'flex',
        position: 'relative',
        zIndex: 120,
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media print': {
            display: 'none',
        },
        borderRadius: '5px',
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: theme.spacing(1),
    },
    title: {
        paddingLeft: '26px',
    },
    iconButton: {
        marginRight: '24px',
    },
    icon: {
        color: '#fff',
    },
}));

export default function UserToolbarSelect(props) {
    const classes = useStyles();
    const { selectedRows, rejectAll, approveAll } = props;
    return (
        <Grow in style={{ transformOrigin: 'center top' }}>
            <Paper className={classes.root}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={6}>
                        <Typography
                            variant="subtitle1"
                            className={classes.title}
                        >
                            {selectedRows.selectedRows.data.length} user(s)
                            selected
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        alignItems="center"
                        justify="flex-end"
                        xs={6}
                    >
                        <Grid item xs={2} sm={1}>
                            <Tooltip title="Approve user(s)">
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={approveAll}
                                    aria-label="Approve All"
                                >
                                    <ThumbUpRounded className={classes.icon} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <Tooltip title="Reject user(s)">
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={rejectAll}
                                    aria-label="Reject All"
                                >
                                    <ThumbDownRounded
                                        className={classes.icon}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grow>
    );
}

UserToolbarSelect.propTypes = {
    selectedRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    rejectAll: PropTypes.func.isRequired,
    approveAll: PropTypes.func.isRequired,
};
