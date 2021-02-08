/* eslint-disable react/no-deprecated */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {
    Drawer,
    List,
    Snackbar,
    Divider,
    IconButton,
    Container,
    Hidden,
    Tooltip,
    Backdrop,
    CircularProgress,
    SwipeableDrawer,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import MainListItems from '../components/MainListItems';
import Home from '../components/Home';
import Profile from '../components/Profile';
import EventsPage from '../components/Events';
import ProjectsPage from '../components/Projects';
import ResourcesPage from '../components/Resources';
import ManageUsers from '../components/ManageUsers';
import TasksPage from '../components/UsersTasks';
import MyTasks from '../components/MyTasks';
import DeployManager from '../components/Deploy';
import AppBar from '../components/AppBar';
import {
    fetchUser,
    fetchAllUsers,
    logoutUser,
    newReg,
    updateUser,
    editOtherUser,
    changePassword,
    removeOtherUser,
    userErrorFin,
    deleteAllUsers,
    rejectAllUnapproved,
    approveAllUnapproved,
} from '../actions/userActions';
import {
    fetchAllEvents,
    createEvent,
    editEvent,
    deleteEvent,
    eventErrorFin,
} from '../actions/eventActions';
import {
    fetchAllProjects,
    createProject,
    editProject,
    deleteProject,
    projectErrorFin,
} from '../actions/projectActions';
import {
    fetchAllResources,
    createResource,
    editResource,
    deleteResource,
    resourceErrorFin,
} from '../actions/resourceActions';
import drawerIcon from '../images/drawerImage.png';

const drawerWidth = 275;

function renderPage(subPage, props, isAdmin, redirect, closeDrawer) {
    if (subPage === 'deploy' || subPage === 'userTasks') {
        if (!isAdmin) {
            redirect('home', closeDrawer);
        }
    }
    switch (subPage) {
        case 'profile':
            return (
                <Profile
                    users={props.users}
                    changePassword={props.changePass}
                    serverError={props.users.serverError}
                    updateUser={props.updateUser}
                />
            );

        case 'events':
            return (
                <EventsPage
                    events={props.events}
                    fetchAllEvents={props.fetchAllEvents}
                    createEvent={props.createEvent}
                    editEvent={props.editEvent}
                    eventError={props.events.serverError}
                    deleteEvent={props.deleteEvent}
                    users={props.users}
                />
            );

        case 'projects':
            return (
                <ProjectsPage
                    projects={props.projects}
                    createProject={props.createProject}
                    projectError={props.projects.serverError}
                    fetchAllProjects={props.fetchAllProjects}
                    editProject={props.editProject}
                    deleteProject={props.deleteProject}
                    users={props.users}
                />
            );

        case 'resources':
            return (
                <ResourcesPage
                    resources={props.resources}
                    createResource={props.createResource}
                    fetchAllResources={props.fetchAllResources}
                    editResource={props.editResource}
                    resourceError={props.resources.serverError}
                    deleteResource={props.deleteResource}
                    users={props.users}
                />
            );

        case 'users':
            return (
                <ManageUsers
                    users={props.users}
                    fetchAllUsers={props.fetchAllUsers}
                    removeUser={props.removeUser}
                    deleteAllUsers={props.deleteAllUsers}
                    rejectAllUnapproved={props.rejectAllUnapproved}
                    approveAll={props.approveAll}
                    editOtherUser={props.editOtherUser}
                />
            );

        case 'myTasks':
            return (
                <MyTasks
                    users={props.users}
                    events={props.events}
                    projects={props.projects}
                />
            );

        case 'userTasks':
            return (
                <TasksPage
                    events={props.events}
                    projects={props.projects}
                    editEvent={props.editEvent}
                    getTasks={props.getTasks}
                    editProject={props.editProject}
                    users={props.users}
                    tasks={props.tasks}
                    eventError={props.events.serverError}
                    projectError={props.projects.serverError}
                />
            );

        case 'deploy':
            return (
                <div>
                    <DeployManager />
                </div>
            );
        default:
            return (
                <Home
                    events={props.events}
                    projects={props.projects}
                    resources={props.resources}
                    fetchUser={props.fetchUser}
                    fetchAllUsers={props.fetchAllUsers}
                    fetchAllEvents={props.fetchAllEvents}
                    fetchAllProjects={props.fetchAllProjects}
                    fetchAllResources={props.fetchAllResources}
                    history={props.history}
                    users={props.users}
                    editEvent={props.editEvent}
                    editProject={props.editProject}
                    editResource={props.editResource}
                    editOtherUser={props.editOtherUser}
                    removeUser={props.removeUser}
                    deleteEvent={props.deleteEvent}
                    deleteProject={props.deleteProject}
                    deleteResource={props.deleteResource}
                    redirect={redirect}
                />
            );
    }
}

function getPageName(subPage, isAdmin) {
    if (!isAdmin) {
        if (subPage === 'deploy' || subPage === 'userTasks') {
            return 'Home';
        }
    }

    switch (subPage) {
        case 'profile':
            return 'Profile';

        case 'changePassword':
            return 'Change Password';

        case 'createTasks':
            return 'Create New Items';

        case 'events':
            return 'Events';

        case 'projects':
            return 'Projects';

        case 'resources':
            return 'Resources';

        case 'users':
            return 'Members';

        case 'myTasks':
            return 'My Tasks';

        case 'userTasks':
            return 'User Tasks';

        case 'deploy':
            return 'Deployment Manager';

        default:
            return 'Home';
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
        register: state.Register,
        users: state.Users,
        events: state.Events,
        projects: state.Projects,
        resources: state.Resources,
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => {
        dispatch(fetchUser());
    },
    fetchAllUsers: () => {
        dispatch(fetchAllUsers());
    },
    logoutUser: () => {
        dispatch(logoutUser());
    },
    newReg: () => {
        dispatch(newReg());
    },
    updateUser: (user, cb) => {
        dispatch(updateUser(user, cb));
    },
    changePass: (newPass, cb) => {
        dispatch(changePassword(newPass, cb));
    },
    editOtherUser: (user, cb) => {
        dispatch(editOtherUser(user, cb));
    },
    removeUser: (uId, cb) => {
        dispatch(removeOtherUser(uId, cb));
    },
    deleteAllUsers: () => {
        dispatch(deleteAllUsers());
    },
    rejectAllUnapproved: (cb) => {
        dispatch(rejectAllUnapproved(cb));
    },
    approveAll: (ids, cb) => {
        dispatch(approveAllUnapproved(ids, cb));
    },
    userErrorFin: () => {
        dispatch(userErrorFin());
    },
    fetchAllEvents: () => {
        dispatch(fetchAllEvents());
    },
    createEvent: (newEvent, cb) => {
        dispatch(createEvent(newEvent, cb));
    },
    editEvent: (updatedEvent, cb) => {
        dispatch(editEvent(updatedEvent, cb));
    },
    deleteEvent: (eventId, cb) => {
        dispatch(deleteEvent(eventId, cb));
    },
    eventErrorFin: () => {
        dispatch(eventErrorFin());
    },
    fetchAllProjects: () => {
        dispatch(fetchAllProjects());
    },
    createProject: (newProject, cb) => {
        dispatch(createProject(newProject, cb));
    },
    editProject: (updatedProject, cb) => {
        dispatch(editProject(updatedProject, cb));
    },
    deleteProject: (projectId, cb) => {
        dispatch(deleteProject(projectId, cb));
    },
    projectErrorFin: () => {
        dispatch(projectErrorFin());
    },
    fetchAllResources: () => {
        dispatch(fetchAllResources());
    },
    createResource: (newResource, cb) => {
        dispatch(createResource(newResource, cb));
    },
    editResource: (updatedResource, cb) => {
        dispatch(editResource(updatedResource, cb));
    },
    deleteResource: (resourceId, cb) => {
        dispatch(deleteResource(resourceId, cb));
    },
    resourceErrorFin: () => {
        dispatch(resourceErrorFin());
    },
});

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: '100%',
        [theme.breakpoints.up('drawerMin')]: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflowY: 'hidden',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),
        maxHeight: '100%',
        maxWidth: '100vw',
    },
    listPadding: {
        paddingLeft: theme.spacing(3),
        overflowY: 'auto',
        scrollbarWidth: 'none',
    },
    drawerImg: {
        marginBottom: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.redirectFunc = this.redirectFunc.bind(this);
    }

    componentDidMount() {
        const {
            fetchAllUsers: fetchAllUsersT,
            fetchUser: fetchUserT,
            fetchAllProjects: fetchAllProjectsT,
            fetchAllEvents: fetchAllEventsT,
            fetchAllResources: fetchAllResourcesT,
        } = this.props;
        // fetchUserT(localStorage.getItem('userId'));
        fetchUserT();
        fetchAllUsersT();
        fetchAllProjectsT();
        fetchAllEventsT();
        fetchAllResourcesT();
    }

    redirectFunc = (subPath, closeDrawer) => () => {
        closeDrawer();
        const { history } = this.props;
        history.push(`/dashboard/${subPath}`);
    };

    handleDrawerOpen = () => {
        this.setState((prevState) => ({
            ...prevState,
            open: true,
        }));
    };

    handleDrawerClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            open: false,
        }));
    };

    render() {
        const {
            classes,
            auth,
            register,
            users,
            events,
            projects,
            resources,
            logoutUser: logoutUserT,
            userErrorFin: userErrorFinT,
            eventErrorFin: eventErrorFinT,
            projectErrorFin: projectErrorFinT,
            resourceErrorFin: resourceErrorFinT,
            newReg: newRegT,
        } = this.props;

        const { open } = this.state;

        const handleErrorClose = () => {
            userErrorFinT();
            eventErrorFinT();
            projectErrorFinT();
            resourceErrorFinT();
        };

        if (!auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        if (!register.isRegistered) {
            newRegT();
            return <Redirect to="/register" />
        }

        const isAdmin = users.user.privelege_level === 'Admin';

        const { match } = this.props;
        const { params } = match;
        const { subPage } = params;

        return (
            <div className={classes.root}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={
                        users.serverError === 'ERROR' ||
                        events.serverError === 'ERROR' ||
                        projects.serverError === 'ERROR' ||
                        resources.serverError === 'ERROR'
                    }
                    autoHideDuration={2000}
                    onClose={handleErrorClose}
                    message="Server did not respond!!!"
                />
                <Backdrop
                    className={classes.backdrop}
                    open={
                        events.isLoading ||
                        projects.isLoading ||
                        users.userLoading ||
                        users.usersLoading ||
                        resources.isLoading ||
                        auth.isLoading
                    }
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className={classes.appBar}>
                    <AppBar
                        user={users.user.name}
                        isAdmin={isAdmin}
                        page={getPageName(subPage, isAdmin)}
                        closeDrawer={this.handleDrawerClose}
                        openDrawer={this.handleDrawerOpen}
                        logout={logoutUserT}
                    />
                </div>
                <Hidden only={['xs', 'sm', 'md', 'lg']}>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper),
                        }}
                        open
                    >
                        <img
                            style={{ width: '100%', height: 'auto' }}
                            src={drawerIcon}
                            alt=""
                            className={classes.drawerImg}
                        />
                        <List className={classes.listPadding}>
                            <MainListItems
                                closeDrawer={this.handleDrawerClose}
                                isAdmin={isAdmin}
                                logout={logoutUserT}
                                page={subPage}
                            />
                        </List>
                    </Drawer>
                </Hidden>
                <Hidden only={['drawerMin']}>
                    {isMobile ? (
                        <SwipeableDrawer
                            onClose={this.handleDrawerClose}
                            classes={{
                                paper: clsx(
                                    classes.drawerPaper,
                                    !open && classes.drawerPaperClose
                                ),
                            }}
                            anchor="left"
                            onOpen={this.handleDrawerOpen}
                            open={open}
                        >
                            <img
                                style={{ width: '100%', height: 'auto' }}
                                src={drawerIcon}
                                alt=""
                                className={classes.drawerImg}
                            />
                            <div className={classes.toolbarIcon}>
                                <Tooltip title="Slide it in">
                                    <IconButton
                                        onClick={this.handleDrawerClose}
                                    >
                                        <ChevronLeftIcon
                                            style={{
                                                color: '#fff',
                                            }}
                                            fontSize="large"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Divider />
                            <List className={classes.listPadding}>
                                <MainListItems
                                    closeDrawer={this.handleDrawerClose}
                                    isAdmin={isAdmin}
                                    logout={logoutUserT}
                                    page={subPage}
                                />
                            </List>
                        </SwipeableDrawer>
                    ) : (
                        <Drawer
                            onClose={this.handleDrawerClose}
                            classes={{
                                paper: clsx(
                                    classes.drawerPaper,
                                    !open && classes.drawerPaperClose
                                ),
                            }}
                            open={open}
                        >
                            <img
                                style={{ width: '100%', height: 'auto' }}
                                src={drawerIcon}
                                alt=""
                                className={classes.drawerImg}
                            />
                            <div className={classes.toolbarIcon}>
                                <Tooltip title="Slide it in">
                                    <IconButton
                                        onClick={this.handleDrawerClose}
                                    >
                                        <ChevronLeftIcon
                                            style={{
                                                color: '#fff',
                                            }}
                                            fontSize="large"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Divider />
                            <List className={classes.listPadding}>
                                <MainListItems
                                    closeDrawer={this.handleDrawerClose}
                                    isAdmin={isAdmin}
                                    logout={logoutUserT}
                                    page={subPage}
                                />
                            </List>
                        </Drawer>
                    )}
                </Hidden>
                <main className={classes.content}>
                    <Container maxWidth="xl" className={classes.container}>
                        {renderPage(
                            subPage,
                            this.props,
                            isAdmin,
                            this.redirectFunc,
                            this.handleDrawerClose
                        )}
                    </Container>
                </main>
            </div>
        );
    }
}

renderPage.propTypes = {
    history: PropTypes.any.isRequired,
    users: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
    fetchAllUsers: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    changePass: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    deleteAllUsers: PropTypes.func.isRequired,
    rejectAllUnapproved: PropTypes.func.isRequired,
    approveAll: PropTypes.func.isRequired,
    editOtherUser: PropTypes.func.isRequired,
    fetchAllEvents: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    fetchAllResources: PropTypes.func.isRequired,
    createResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
    getTasks: PropTypes.func.isRequired,
};

Dashboard.propTypes = {
    history: PropTypes.any.isRequired,
    match: PropTypes.any.isRequired,
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
    fetchAllUsers: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    userErrorFin: PropTypes.func.isRequired,
    fetchAllEvents: PropTypes.func.isRequired,
    eventErrorFin: PropTypes.func.isRequired,
    fetchAllProjects: PropTypes.func.isRequired,
    projectErrorFin: PropTypes.func.isRequired,
    fetchAllResources: PropTypes.func.isRequired,
    resourceErrorFin: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
);
