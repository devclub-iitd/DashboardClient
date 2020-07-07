import React from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
// import { clsx } from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    // appBarShift: {
    //     marginLeft: drawerWidth,
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    left: {
        height: document.documentElement.clientHeight * 0.085,
        borderRadius: '10px',
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    right: {
        height: document.documentElement.clientHeight * 0.085,
        borderRadius: '10px',
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const PageNamePart = ({ className, name }) => (
    <Paper className={className}>
        <Typography style={{ fontWeight: 500 }} variant="h3">
            {name}
        </Typography>
    </Paper>
);

PageNamePart.propTypes = {
    className: PropTypes.objectOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
};

const UserPart = ({ className, name, isAdmin }) => (
    <Paper className={className}>
        <Typography style={{ fontWeight: 600 }} variant={isAdmin ? 'h5' : 'h4'}>
            Hi {name} !
        </Typography>
        {isAdmin ? (
            <Typography style={{ fontWeight: 500 }} variant="body1">
                Administrator
            </Typography>
        ) : null}
    </Paper>
);

UserPart.propTypes = {
    className: PropTypes.objectOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default function AppBar({ page, drawerWidth, user, isAdmin }) {
    const classes = useStyles();
    return (
        <Grid
            className={classes.appBar}
            style={{
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
            }}
            justify="space-between"
            alignItems="flex-start"
            container
        >
            <Grid item xs={8}>
                <PageNamePart name={page} className={classes.left} />
            </Grid>
            <Grid item xs={4}>
                <UserPart
                    isAdmin={isAdmin}
                    name={user}
                    className={classes.right}
                />
            </Grid>
        </Grid>
    );
}

AppBar.propTypes = {
    page: PropTypes.string.isRequired,
    drawerWidth: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};
