import React from 'react';
import {
    Typography,
    Paper,
    Grid,
    IconButton,
    Hidden,
    Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
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
    left: {
        // height: document.documentElement.clientHeight * 0.085,
        borderRadius: '10px',
        // fontSize: '2.7849rem',
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 'auto',
        },
        // [theme.breakpoints.up('md')]: {
        //     paddingBottom: theme.spacing(1.8),
        // },
    },
    right: {
        // height: document.documentElement.clientHeight * 0.085,
        borderRadius: '10px',
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const PageNamePart = ({ className, name, openDrawer, logout }) => (
    <Paper className={className}>
        <Grid container justify="flex-start" alignItems="center">
            <Hidden only={['drawerMin', 'xl']}>
                <Grid item xs={2} md={1}>
                    <Tooltip title="Sneak open the Drawer">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={openDrawer}
                        >
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Hidden>
            <Grid item xs={8} sm={7} md={10}>
                <Typography style={{ fontWeight: 500 }} variant="h3">
                    {name}
                </Typography>
            </Grid>
            <Hidden only={['sm', 'md', 'lg', 'drawerMin', 'xl']}>
                <Grid item xs={2}>
                    <Tooltip title="Logout">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="logout"
                            onClick={logout}
                        >
                            <ExitToAppOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Hidden>
        </Grid>
    </Paper>
);

PageNamePart.propTypes = {
    className: PropTypes.objectOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    openDrawer: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

const UserPart = ({ className, name, isAdmin, logout }) => (
    <Paper className={className}>
        <Grid container justify="flex-start" alignItems="center">
            <Grid item xs={12} sm={10}>
                <Typography
                    style={{ fontWeight: 600 }}
                    variant={isAdmin ? 'h5' : 'h4'}
                >
                    Hi {name} !
                </Typography>
                {isAdmin ? (
                    <Typography style={{ fontWeight: 500 }} variant="body1">
                        Administrator
                    </Typography>
                ) : null}
            </Grid>
            <Hidden only={['xs']}>
                <Grid item xs={2}>
                    <Tooltip title="Logout">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="logout"
                            onClick={logout}
                        >
                            <ExitToAppOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Hidden>
        </Grid>
    </Paper>
);

UserPart.propTypes = {
    className: PropTypes.objectOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};

export default function AppBar({ page, openDrawer, user, isAdmin, logout }) {
    const classes = useStyles();
    return (
        <Grid justify="center" alignItems="flex-start" container>
            <Grid item md={8} sm={6} xs={10}>
                <PageNamePart
                    name={page}
                    className={classes.left}
                    openDrawer={openDrawer}
                    logout={logout}
                />
            </Grid>
            <Hidden only={['xs']}>
                <Grid item md={4} sm={6} xs={7}>
                    <UserPart
                        isAdmin={isAdmin}
                        name={user}
                        className={classes.right}
                        logout={logout}
                    />
                </Grid>
            </Hidden>
        </Grid>
    );
}

AppBar.propTypes = {
    page: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    openDrawer: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};
