import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl,
  TextField, Fab, Checkbox, ListItemText, Paper, Backdrop,
  CircularProgress,
} from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import {
  Card, CardImg, CardImgOverlay, CardText,
  CardBody, CardTitle, CardFooter, CardLink, Button, Popover,
  PopoverHeader, PopoverBody, ListGroup, ListGroupItem,
  Row, Col, CardHeader, CardSubtitle, Label,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import classnames from 'classnames';
import { LocalForm, Control, Errors } from 'react-redux-form';
// import {dumTasks} from './dumTasks';
import dumUsers from './dumUser';
import dumProjects from './dumProjects';
import dumEvents from './dumEvents';
import dumResources from './dumResources';
// import { classNames } from 'react-select/src/utils';

const useStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(3),
      border: `1px solid ${theme.palette.divider}`,
      overflowX: 'auto',
  },
  paper: {
      margin: '2em',
      height: document.documentElement.clientHeight * 0.7,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function MyTasks(props) {
  
  const curUser = props.users.user;
  const dumUsers = props.users.allUsers;
  const dumEvents = props.events.allEvents;
  const dumProjects = props.projects.allProjects;
  const classes = useStyles();

  const [activeEventTab, setActiveEventTab] = React.useState('Ongoing');
  const toggleEventTab = tab => {
    if (activeEventTab !== tab) {
      setActiveEventTab(tab);
    }
  };

  const [activeProjectTab, setActiveProjectTab] = React.useState('Idea');
  const toggleProjectTab = tab => {
    if (activeProjectTab !== tab) {
      setActiveProjectTab(tab);
    }
  };

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

  const ongoingEvents = dumEvents.filter((event) => event.assignee.includes(curUser._id)).filter((event) => isOngoing(event.start_date, event.end_date));
  const upcomingEvents = dumEvents.filter((event) => event.assignee.includes(curUser._id)).filter((event) => isUpcoming(event.start_date));
  const completedEvents = dumEvents.filter((event) => event.assignee.includes(curUser._id)).filter((event) => isCompleted(event.end_date));

  const ideaProjects = dumProjects.filter((project) => project.members.includes(curUser._id)).filter((project) => project.status === 'IDEA');
  const ongoingProjects = dumProjects.filter((project) => project.members.includes(curUser._id)).filter((project) => project.status === 'ONGOING');
  const completedProjects = dumProjects.filter((project) => project.members.includes(curUser._id)).filter((project) => project.status === 'COMPLETED');

  console.log('Ongoing Events: ', ongoingEvents.length);
  console.log('Upcoming Events: ', upcomingEvents.length);
  console.log('Completed Events: ', completedEvents.length);

  return (
    <Grid container justify='space-evenly'>
      <Grid item xs={12} md={6}>
        <Typography variant='h4' align='center' className={{ width: '100%' }}>My Events</Typography>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          {/* <Typography variant='h4' align='center' className={{ width: '100%' }}>My Events</Typography> */}
          <Backdrop className={classes.backdrop} open={props.events.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Nav tabs>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeEventTab === 'Ongoing' })}
                onClick={() => toggleEventTab('Ongoing')}
              >
                Ongoing
              </NavLink>
            </NavItem>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeEventTab === 'Upcoming' })}
                onClick={() => toggleEventTab('Upcoming')}
              >
                Upcoming
              </NavLink>
            </NavItem>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeEventTab === 'Completed' })}
                onClick={() => toggleEventTab('Completed')}
              >
                Completed
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeEventTab}>
            <TabPane tabId='Ongoing'>
              {
                props.events.errMess !== null
                ?
                <div>
                  <h4>Failed to fetch Events</h4>
                  <h4>{props.events.errMess}</h4>
                </div>
                : null
              }
              {
                ongoingEvents.length === 0
                ?
                <Typography variant='h4' color='textSecondary'>No ongoing events for you</Typography>
                :
                <ListGroup>
                  {
                    ongoingEvents.map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
                            <Card body style={{ borderColor: '#00c853' }}>
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
                                Assigned to:
                                {
                                  dumUsers.filter(user => event.assignee.includes(user._id)).map(user => (user.name + ', '))
                                } 
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              }
            </TabPane>
            <TabPane tabId='Upcoming'>
              {
                props.events.errMess !== null
                ?
                <div>
                  <h4>Failed to fetch Events</h4>
                  <h4>{props.events.errMess}</h4>
                </div>
                : null
              }
              {
                upcomingEvents.length === 0
                ?
                <Typography variant='h4' color='textSecondary'>No upcoming events for you</Typography>
                :
                <ListGroup>
                  {
                    upcomingEvents.map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
                            <Card body style={{ borderColor: '#00c853' }}>
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
                                Assigned to:
                                {
                                  dumUsers.filter(user => event.assignee.includes(user._id)).map(user => (user.name + ', '))
                                } 
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              }
            </TabPane>
            <TabPane tabId='Completed'>
              {
                props.events.errMess !== null
                ?
                <div>
                  <h4>Failed to fetch Events</h4>
                  <h4>{props.events.errMess}</h4>
                </div>
                : null
              }
              {
                completedEvents.length === 0
                ?
                <Typography variant='h4' color='textSecondary'>No completed events for you</Typography>
                :
                <ListGroup>
                  {
                    completedEvents.map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
                            <Card body style={{ borderColor: '#00c853' }}>
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
                                Assigned to:
                                {
                                  dumUsers.filter(user => event.assignee.includes(user._id)).map(user => (user.name + ', '))
                                } 
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              }
            </TabPane>
          </TabContent>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant='h4' align='center' className={{ width: '100%' }}>My Projects</Typography>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          {/* <Typography variant='h4' align='center' className={{ width: '100%' }}>My Projects</Typography> */}
          <Backdrop className={classes.backdrop} open={props.projects.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Nav tabs>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeProjectTab === 'Idea' })}
                onClick={() => toggleProjectTab('Idea')}
              >
                Idea
              </NavLink>
            </NavItem>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeProjectTab === 'Ongoing' })}
                onClick={() => toggleProjectTab('Ongoing')}
              >
                Ongoing
              </NavLink>
            </NavItem>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeProjectTab === 'Completed' })}
                onClick={() => toggleProjectTab('Completed')}
              >
                Completed
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeProjectTab}>
            <TabPane tabId='Idea'>
              {
                props.projects.errMess !== null
                ?
                <div>
                  <h4>Failed to fetch Projects</h4>
                  <h4>{props.projects.errMess}</h4>
                </div>
                : null
              }
              {
                ideaProjects.length === 0
                ?
                <Typography variant='h4' color='textSecondary'>No ideated projects for you</Typography>
                :
                <ListGroup>
                  {
                    ideaProjects.map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card body style={{ borderColor: '#00c853' }}>
                              <CardHeader>
                                <Typography variant='h4'>{project.name}</Typography>
                              </CardHeader>
                              <CardBody>
                                <CardTitle>
                                  <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography variant='body1' >{project.description}</Typography>
                                  {
                                    Array.from(project.url).map(([key, value]) => {
                                      return(
                                        <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                      );
                                    })
                                  }
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                Assigned to: 
                                {
                                  props.users.allUsers.filter(user => project.members.includes(user._id)).map(user => (' ' + user.name + ','))
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              }
            </TabPane>
            <TabPane tabId='Ongoing'>
              {
                props.projects.errMess !== null
                ?
                <div>
                  <h4>Failed to fetch Projects</h4>
                  <h4>{props.projects.errMess}</h4>
                </div>
                : null
              }
              {
                ongoingProjects.length === 0
                ?
                <Typography variant='h4' color='textSecondary'>No ongoing Projects for you</Typography>
                :
                <ListGroup>
                  {
                    ongoingProjects.map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card body style={{ borderColor: '#00c853' }}>
                              <CardHeader>
                                <Typography variant='h4'>{project.name}</Typography>
                              </CardHeader>
                              <CardBody>
                                <CardTitle>
                                  <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography variant='body1' >{project.description}</Typography>
                                  {
                                    Array.from(project.url).map(([key, value]) => {
                                      return(
                                        <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                      );
                                    })
                                  }
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                Assigned to: 
                                {
                                  props.users.allUsers.filter(user => project.members.includes(user._id)).map(user => (' ' + user.name + ','))
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              }
            </TabPane>
            <TabPane tabId='Completed'>
              {
                props.projects.errMess !== null
                ?
                <div>
                  <h4>Failed to fetch Projects</h4>
                  <h4>{props.projects.errMess}</h4>
                </div>
                : null
              }
              {
                completedProjects.length === 0
                ?
                <Typography variant='h4' color='textSecondary'>No completed projects for you</Typography>
                :
                <ListGroup>
                  {
                    completedProjects.map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card body style={{ borderColor: '#00c853' }}>
                              <CardHeader>
                                <Typography variant='h4'>{project.name}</Typography>
                              </CardHeader>
                              <CardBody>
                                <CardTitle>
                                  <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography variant='body1' >{project.description}</Typography>
                                  {
                                    Array.from(project.url).map(([key, value]) => {
                                      return(
                                        <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                      );
                                    })
                                  }
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                Assigned to: 
                                {
                                  props.users.allUsers.filter(user => project.members.includes(user._id)).map(user => (' ' + user.name + ','))
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              }
            </TabPane>
          </TabContent>
        </Paper>
      </Grid>
    </Grid>
  );
}
