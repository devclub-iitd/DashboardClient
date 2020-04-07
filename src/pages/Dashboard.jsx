import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
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
  updateUser, editOtherUser
} from '../actions/userActions';
import { 
  fetchAllEvents, createEvent,
  editEvent
} from '../actions/eventActions';
import {
  fetchAllProjects, createProject,
  editProject
} from '../actions/projectActions';
import {
  fetchAllResources, createResource,
  editResource
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
            user={props.users.user}
            error={props.users.errMess}
            updateUser={props.updateUser}  
          />
        </div>
      );
    case 'changePassword':
      return (
        <div>
          <ChangePassword />
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
          />
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
            user={props.users.user}
            users={props.users}
            editEvent={props.editEvent}
            editProject={props.editProject}
            editResource={props.editResource}
            editOtherUser={props.editOtherUser}
          />
        </div>
      );
  }
}

// class Dashboard extends Component {
  
//   constructor (props) {
//     super(props);

//     this.state = {
//       open: false,
//     };

//     this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
//     this.handleDrawerClose = this.handleDrawerClose.bind(this);
//   }

//   componentWillMount() {
//     this.props.fetchAllEvents();
//     this.props.fetchAllUsers();
//     this.props.fetchAllProjects();
//     this.props.fetchAllResources();
//   }
//   // const classes = useStyles();
//   // const [open, setOpen] = React.useState(false);
//   handleDrawerOpen = () => {
//     // setOpen(true);
//     this.setState({
//       ...this.state,
//       open: true,
//     });
//   };
//   handleDrawerClose = () => {
//     // setOpen(false);
//     this.setState({
//       ...this.state,
//       open: false,
//     });
//   };

  

//   render() {
//     const {classes} = this.props;
//     const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
//   // console.log(props);
//     const { match } = this.props;
//     const { params } = match;
//     const { subPage } = params;

//     return (
//       <div className={classes.root}>
//         <CssBaseline />
//         <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
//           <Toolbar className={classes.toolbar}>
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={this.handleDrawerOpen}
//               className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
//               {subPage}
//             </Typography>
//             <IconButton color="inherit">
//               Welcome {this.props.users.user.name}!
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           // variant="permanent"
//           classes={{
//             paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
//           }}
//           open={this.state.open}
//         >
//           <div className={classes.toolbarIcon}>
//             <IconButton onClick={this.handleDrawerClose}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </div>
//           <Divider />
//           <List>
//             <MainListItems logout={this.props.logoutUser} />
//           </List>
//         </Drawer>
//         <main className={classes.content}>
//           <div className={classes.appBarSpacer} />
//           <Container maxWidth="lg" className={classes.container}>
//             {renderPage(subPage, fixedHeightPaper, classes.paper, this.props)}
//           </Container>
//           {/* <MadeWithLove /> */}
//         </main>
//       </div>
//     );
//   }
// }

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
  fetchUser: () => { dispatch(fetchUser()) },
  fetchAllUsers: () => { dispatch(fetchAllUsers()) },
  logoutUser: () => { dispatch(logoutUser()) },
  updateUser: (user) => { dispatch(updateUser(user)) },
  editOtherUser: () => { dispatch(editOtherUser()) },
  fetchAllEvents: () => { dispatch(fetchAllEvents()) },
  createEvent: (newEvent) => { dispatch(createEvent(newEvent)) },
  editEvent: (updatedEvent) => { dispatch(editEvent(updatedEvent)) },
  fetchAllProjects: () => { dispatch(fetchAllProjects()) },
  createProject: (newProject) => { dispatch(createProject(newProject)) },
  editProject: (updatedProject) => { dispatch(editProject(updatedProject)) },
  fetchAllResources: () => { dispatch(fetchAllResources()) },
  createResource: (newResource) => { dispatch(createResource(newResource)) },
  editResource: (updatedResource) => { dispatch(editResource(updatedResource)) },
});

function Dashboard(props) {

  // if(!props.auth.isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

  ////////////only this call here

  // props.fetchUser();
  
  // props.fetchAllEvents();
  // props.fetchAllUsers();
  // props.fetchAllProjects();
  // props.fetchAllResources();
  
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
  const {
    fetchAllEvents,
    fetchAllProjects,
    fetchAllResources,
    fetchAllUsers,
  } = props;

  React.useEffect(() => {
    fetchAllEvents();
    fetchAllUsers();
    fetchAllProjects();
    fetchAllResources();
  }, []);

  console.log('Users: ', props.users.allUsers);
  console.log('Projects: ', props.projects.allProjects);
  console.log('Events: ', props.events.allEvents);
  console.log('Resources: ', props.resources.allResources);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
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
            {subPage}
          </Typography>
          <IconButton color="inherit">
            Welcome {props.users.user.name}!
            <Badge badgeContent={4} color="secondary">
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
          <MainListItems logout={props.logoutUser} />
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
  auth: PropTypes.func.isRequired,
  users: PropTypes.func.isRequired,
  events: PropTypes.func.isRequired,
  projects: PropTypes.func.isRequired,
  resources: PropTypes.func.isRequired,
  resetEventForm: PropTypes.func.isRequired,
  resetProjectForm: PropTypes.func.isRequired,
  resetResourceForm: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  editOtherUser: PropTypes.func.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
  fetchAllProjects: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  fetchAllResources: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  editResource: PropTypes.func.isRequired,
  // classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
