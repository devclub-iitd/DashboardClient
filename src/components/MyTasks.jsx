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
      height: document.documentElement.clientWidth*0.9,
  },
}));

export default function MyTasks(props) {
  
  const curUser = props.users.user;
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

  return (
    <Grid container justify='space-evenly'>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          <Typography variant='h4' align='center' className={{ width: '100%' }}>My Events</Typography>
          <Backdrop className={classes.backdrop} open={events.isLoading}>
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
          <TabContent activeEventTab={activeEventTab}>
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
                <ListGroup>
                  {
                    dumEvents.filter((event) => event.assignee === curUser.name).filter((event) => isOngoing(event.start_date, event.end_date)).map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
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
                                Assigned to: {event.assignee}
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
                <ListGroup>
                  {
                    dumEvents.filter((event) => event.assignee === curUser.name).filter((event) => isUpcoming(event.start_date)).map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
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
                                Assigned to: {event.assignee !== '' ? event.assignee: 'None'}
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
                <ListGroup>
                  {
                    dumEvents.filter((event) => event.assignee === curUser.name).filter((event) => isCompleted(event.end_date)).map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
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
                                Assigned to: {event.assignee}
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
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          <Typography variant='h4' align='center' className={{ width: '100%' }}>My Projects</Typography>
          <Backdrop className={classes.backdrop} open={projects.isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Nav tabs>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeProjectTab === 'Idea' })}
                onClick={() => toggle('Idea')}
              >
                Idea
              </NavLink>
            </NavItem>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeEventTab === 'Ongoing' })}
                onClick={() => toggle('Ongoing')}
              >
                Ongoing
              </NavLink>
            </NavItem>
            <NavItem className="btn">
              <NavLink
                className={classnames({ active: activeEventTab === 'Completed' })}
                onClick={() => toggle('Completed')}
              >
                Completed
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeEventTab={activeEventTab}>
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
                <ListGroup>
                  {
                    dumProjects.filter((project) => project.members.indexOf(curUser._id) !== -1).filter((project) => project.status === 'IDEA').map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card color="primary" outline>
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
                                  project.members.map((mem) => ' ' +  mem.name + ',')
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
                props.projects.errMess !== null
                ?
                <div>
                  <h4>Failed to fetch Projects</h4>
                  <h4>{props.projects.errMess}</h4>
                </div>
                : null
              }
              {
                <ListGroup>
                  {
                    dumProjects.filter((project) => project.members.indexOf(curUser._id) !== -1).filter((project) => project.status === 'ONGOING').map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card color="primary" outline>
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
                                  project.members.map((mem) => ' ' +  mem.name + ',')
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
                <ListGroup>
                  {
                    dumProjects.filter((project) => project.members.indexOf(curUser._id) !== -1).filter((project) => project.status === 'COMPLETED').map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card color="primary" outline>
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
                                  project.members.map((mem) => ' ' +  mem.name + ',')
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
