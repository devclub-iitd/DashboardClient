import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, Snackbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainListItems from '../components/MainListItems';
import Home from '../components/Home';
import Profile from '../components/Profile';
import ChangePassword from '../components/ChangePassword';
import EventsPage from '../components/Events';
import ProjectsPage from '../components/Projects';
import ResourcesPage from '../components/Resources';
import ManageUsers from '../components/ManageUsers';
import MyTasks from '../components/MyTasks';
import DeployManager from '../components/Deploy';
import ApproveUsers from '../components/ApproveUsers';
import CreateTasks from '../components/CreateTasks';
import AssignTasks from '../components/AssignTasks';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {fetchUserProfile} from '../redux/userActionCreator';
import { actions } from 'react-redux-form';
import { 
  fetchUser, fetchAllUsers, logoutUser,
  updateUser, editOtherUser, changePassword,
  removeOtherUser, userErrorFin, deleteAllUsers, rejectAllUnapproved,
} from '../actions/userActions';
import { 
  fetchAllEvents, createEvent,
  editEvent, deleteEvent, eventErrorFin,
} from '../actions/eventActions';
import {
  fetchAllProjects, createProject,
  editProject, deleteProject, projectErrorFin,
} from '../actions/projectActions';
import {
  fetchAllResources, createResource,
  editResource, deleteResource, resourceErrorFin,
} from '../actions/resourceActions';
import { render } from 'react-dom';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    backgroundImage: "url('./logo.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

// const classes = useStyles;

function renderPage(subPage, classProp, classPaper, props) {
  switch (subPage) {
    case 'profile':
      return (
        <div>
          <Profile
            // user={props.users.user}
            // error={props.users.errMess}
            fetchUser={props.fetchUser}
            user={props.users.user}
            // events={props.events}
            // editEvent={props.editEvent}
            serverError={props.users.serverError}
            updateUser={props.updateUser}  
          />
        </div>
      );

    case 'changePassword':
      return (
        <div>
          <ChangePassword changePass={props.changePass} users={props.users} />
        </div>
      );
    // case 'approveUsers': return (<div><ApproveUsers /></div>);
    case 'createTasks':
      return (
        <div>
          <CreateTasks
            resetEventForm={props.resetEventForm} 
            resetProjectForm={props.resetProjectForm}
            resetResourceForm={props.resetResourceForm}
            createEvent={props.createEvent}
            createProject={props.createProject}
            createResource={props.createResource}
            eventError={props.events.serverError}
            projectError={props.projects.serverError}
            resourceError={props.resources.serverError}
          />
        </div>
      );
    
    case 'events':
      return (
        <div>
          <EventsPage
            events={props.events}
            fetchAllEvents={props.fetchAllEvents}
            editEvent={props.editEvent}
            deleteEvent={props.deleteEvent}
            users={props.users}
          />
        </div>
      );
    
    case 'projects':
      return (
        <div>
          <ProjectsPage
            projects={props.projects}
            fetchAllProjects={props.fetchAllProjects}
            editProject={props.editProject}
            deleteProject={props.deleteProject}
            users={props.users}
          />
        </div>
      );
    
    case 'resources':
      return (
        <div>
          <ResourcesPage
            resources={props.resources}
            fetchAllResources={props.fetchAllResources}
            editResource={props.editResource}
            deleteResource={props.deleteResource}
            users={props.users}
          />
        </div>
      );
    
    case 'users':
      return (
        <div>
          <ManageUsers
            users={props.users}
            fetchAllUsers={props.fetchAllUsers}
            removeUser={props.removeUser}
            deleteAllUsers={props.deleteAllUsers}
            rejectAllUnapproved={props.rejectAllUnapproved}
            editOtherUser={props.editOtherUser}
          />
        </div>
      );

    case 'myTasks':
      return (
        <div>
          <MyTasks
            users={props.users}
            events={props.events}
            projects={props.projects}
          />
        </div>
      );

    case 'deploy':
      return (
        <div>
          <DeployManager />
        </div>
      );
    // case 'assignTasks': return (<div><AssignTasks /></div>);
    // default: return (<div><Home fixedHeightPaper={classProp} paperClass={classPaper} /></div>);
    default:
      return (
        <div>
          <Home
            events={props.events}
            projects={props.projects}
            resources={props.resources}
            fetchUser={props.fetchUser}
            fetchAllUsers={props.fetchAllUsers}
            fetchAllEvents={props.fetchAllEvents}
            fetchAllProjects={props.fetchAllProjects}
            fetchAllResources={props.fetchAllResources}
            // user={props.users.user}
            users={props.users}
            editEvent={props.editEvent}
            editProject={props.editProject}
            editResource={props.editResource}
            editOtherUser={props.editOtherUser}
            removeUser={props.removeUser}
            deleteEvent={props.deleteEvent}
            deleteProject={props.deleteProject}
            deleteResource={props.deleteResource}
          />
        </div>
      );
  }
}

function getPageName(subPage) {
  switch (subPage) {
    case 'profile':
      return (
        'Profile'
      );
    case 'changePassword':
      return (
        'Change Password'
      );
    // case 'approveUsers': return (<div><ApproveUsers /></div>);
    case 'createTasks':
      return (
        'Create New Items'
      );
    
    case 'events':
      return (
        'Club Events'
      );
    
    case 'projects':
      return (
        'Club Projects'
      );
    
    case 'resources':
      return (
        'Club Resources'
      );
    
    case 'users':
      return (
        'Manage Club Members'
      );
    
    case 'myTasks':
      return (
        'My Tasks'
      );

    case 'deploy':
      return (
        'Deployment Manager'
      );
    // case 'assignTasks': return (<div><AssignTasks /></div>);
    // default: return (<div><Home fixedHeightPaper={classProp} paperClass={classPaper} /></div>);
    default:
      return (
        'Home'
      );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
    users: state.Users,
    events: state.Events,
    projects: state.Projects,
    resources: state.Resources,
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetEventForm: () => { dispatch(actions.reset('eventForm')) },
  resetProjectForm: () => { dispatch(actions.reset('projectForm')) },
  resetResourceForm: () => { dispatch(actions.reset('resourceForm')) },
  fetchUser: (id) => { dispatch(fetchUser(id)) },
  fetchAllUsers: () => { dispatch(fetchAllUsers()) },
  logoutUser: () => { dispatch(logoutUser()) },
  updateUser: (user) => { dispatch(updateUser(user)) },
  changePass: (newPass) => { dispatch(changePassword(newPass)) },
  editOtherUser: (user) => { dispatch(editOtherUser(user)) },
  removeUser: (uId) => { dispatch(removeOtherUser(uId)) },
  deleteAllUsers: () => { dispatch(deleteAllUsers()) },
  rejectAllUnapproved: () => { dispatch(rejectAllUnapproved()) },
  userErrorFin: () => { dispatch(userErrorFin()) },
  fetchAllEvents: () => { dispatch(fetchAllEvents()) },
  createEvent: (newEvent) => { dispatch(createEvent(newEvent)) },
  editEvent: (updatedEvent) => { dispatch(editEvent(updatedEvent)) },
  deleteEvent: (eventId) => { dispatch(deleteEvent(eventId)) },
  eventErrorFin: () => { dispatch(eventErrorFin()) },
  fetchAllProjects: () => { dispatch(fetchAllProjects()) },
  createProject: (newProject) => { dispatch(createProject(newProject)) },
  editProject: (updatedProject) => { dispatch(editProject(updatedProject)) },
  deleteProject: (projectId) => { dispatch(deleteProject(projectId)) },
  projectErrorFin: () => { dispatch(projectErrorFin()) },
  fetchAllResources: () => { dispatch(fetchAllResources()) },
  createResource: (newResource) => { dispatch(createResource(newResource)) },
  editResource: (updatedResource) => { dispatch(editResource(updatedResource)) },
  deleteResource: (resourceId) => { dispatch(deleteResource(resourceId)) },
  resourceErrorFin: () => { dispatch(resourceErrorFin()) },
});

function Dashboard(props) {
  
  const {
    fetchUser,
    fetchAllEvents,
    fetchAllProjects,
    fetchAllResources,
    fetchAllUsers,
  } = props;

  React.useEffect(() => {
    fetchAllUsers();
    fetchAllProjects();
    fetchAllEvents();
    fetchUser(localStorage.getItem('userId'));
    fetchAllResources();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // console.log(props);
  const { match } = props;
  const { params } = match;
  const { subPage } = params;

  // const [serverError, setServerError] = React.useState(props.users.passwordFailed || props.users.editFailed || props.users.removeFailed);
  const handleErrorClose = () => {
    // setServerError(false);
    props.userErrorFin();
    props.eventErrorFin();
    props.projectErrorFin();
    props.resourceErrorFin();
  };
  if(!props.auth.isAuthenticated) {
    console.log('NOT AUTHENTICATED!!!!!!!!!!!');
    return (
      <Redirect to="/login" />
    );
  }

  const isAdmin = props.users.user.privelege_level === 'Admin';

  // console.log('Users: ', props.users.allUsers);
  // console.log('Projects: ', props.projects.allProjects);
  // console.log('Events: ', props.events.allEvents);
  // console.log('Resources: ', props.resources.allResources);

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={
          props.users.serverError === 'ERROR' || props.events.serverError === 'ERROR'
          || props.projects.serverError === 'ERROR' || props.resources.serverError === 'ERROR'
        }
        autoHideDuration={2000}
        onClose={handleErrorClose}
        message="Server did not respond!!!"
      />
      <AppBar position="absolute" classes={{paper: clsx(classes.bgimage)}} className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {
              getPageName(subPage)
            }
          </Typography>
          <IconButton color="inherit">
            {`Hi ${props.users.user.name}! ${props.users.user.privelege_level === 'Admin' ? '(You\`re Admin)': ''}`}
            <Badge color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        // variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems closeDrawer={handleDrawerClose} isAdmin={isAdmin} logout={props.logoutUser} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {renderPage(subPage, fixedHeightPaper, classes.paper, props)}
        </Container>
        {/* <MadeWithLove /> */}
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  resetEventForm: PropTypes.func.isRequired,
  resetProjectForm: PropTypes.func.isRequired,
  resetResourceForm: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  changePass: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  deleteAllUsers: PropTypes.func.isRequired,
  rejectAllUnapproved: PropTypes.func.isRequired,
  userErrorFin: PropTypes.func.isRequired,
  editOtherUser: PropTypes.func.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  eventErrorFin: PropTypes.func.isRequired,
  fetchAllProjects: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  projectErrorFin: PropTypes.func.isRequired,
  fetchAllResources: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  editResource: PropTypes.func.isRequired,
  deleteResource: PropTypes.func.isRequired,
  resourceErrorFin: PropTypes.func.isRequired,
  // classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
