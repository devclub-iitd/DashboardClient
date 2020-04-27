import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl, Avatar,
  TextField, Fab, Checkbox, ListItemText, Backdrop, CircularProgress, Snackbar,
 } from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import { Card, CardImg, CardImgOverlay, CardText, 
  CardBody, CardTitle, CardFooter, CardLink, Button, Popover,
  PopoverHeader, PopoverBody, ListGroup, ListGroupItem,
  Row, Col, CardHeader, CardSubtitle, Label,
  TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import classnames from 'classnames';
import { LocalForm, Control, Errors } from 'react-redux-form';
import EditEventForm from './EditEventForm';
import EditProjectForm from './EditProjectForm';
import EditResourceForm from './EditResourceForm';
import EditOtherUserForm from './EditOtherUserForm';
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
  table: {
    // minWidth: 250,
    maxHeight: 250,
    width: '100%',
  },
  gridL: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
  },
  gridR: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
    // maxHeight: 330,
    // scrollBehavior: 'smooth',
  },
  textPadding: {
    paddingTop: '1em',
    paddingBottom: '0.5em',
  },
  borderJ: {
    border: '3px solid',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // tableContainer: {
  //   maxHeight: 
  // }
  cardBorderL: {
    // border: '3px solid',
    // height: 450,
    // overflowY: 'scroll',
  },
  cardBorderR: {
    // border: '3px solid',
    height: 450,
    overflowY: 'scroll',
  },
  popBody: {
    height: document.documentElement.clientHeight * 0.3,
    // minwidth: '80%',
    // width: 500,
    padding: 0,
    overflowY: 'scroll',
  },
  popHeader: {
    // width: 500,
  },
  popCardBody: {
    fontSize: '0.75rem',
  },
  popCardFooter: {
    fontSize: '0.5rem'
  },
  dialog: {
    maxWidth: '60%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  card: {
    '&:hover': {
      borderColor: '#00c853',
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: '1em',
  },
}));

const required = val => val && val.length;
const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => (val) && (val.length >= len);

// class EditOtherUserForm extends Component {
//   constructor (props) {
//     super(props);

//     this.state = {
//       user: this.props.dumUsers[this.props.index],
//       isDailogOpen: false,
//       isDeleteDailogOpen: false,
//       serverError: this.props.editFailed || this.props.removeFailed,
//       // privelege_level: this.state.dumUsers[this.props.index].privelege_level,
//       // display_on_website: this.state.dumUsers[this.props.index].display_on_website,
//     };

//     this.changeDisplayState = this.changeDisplayState.bind(this);
//     this.changePrivLevel = this.changePrivLevel.bind(this);
//     this.handleFormOpen = this.handleFormOpen.bind(this);
//     this.handleFormClose = this.handleFormClose.bind(this);
//     this.cancelUserEdit = this.cancelUserEdit.bind(this);
//     this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
//     this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
//     this.handleDelete = this.handleDelete.bind(this);
//     this.handleServerErrorClose = this.handleServerErrorClose.bind(this);
//   }

//   handleServerErrorClose = () => {
//     this.setState({
//       ...this.state,
//       serverError: false,
//     });
//   };

//   changeDisplayState = (event) => {
//     this.setState({
//       ...this.state,
//       user: {
//         ...this.state.user,
//         display_on_website: event.target.checked,
//       },
//     });
//   };

//   changePrivLevel = (event) => {
//     this.setState({
//       ...this.state,
//       user: {
//         ...this.state.user,
//         privelege_level: event.target.value,
//       },
//     });
//   };

//   handleFormOpen = () => {
//     this.setState({
//       ...this.state,
//       isDailogOpen: true,
//     });
//   };

//   handleFormClose = () => {
//     this.setState({
//       ...this.state,
//       isDailogOpen: false,
//     });
//   };

//   cancelUserEdit = () => {
//     this.handleFormClose();
//   };

//   confirmDeleteOpen = () => {
//     this.setState({
//       ...this.state,
//       isDeleteDailogOpen: true,
//     });
//   };

//   confirmDeleteClose = () => {
//     this.setState({
//       ...this.state,
//       isDeleteDailogOpen: false,
//     });
//   };

//   handleDelete = () => {
//     // Call delete thunk here,
//     this.props.removeUser(this.state.user._id);
//     // console.log('Deleting: ', this.state.user.name);
//     this.confirmDeleteClose();
//   }

//   handleSubmit = () => {

//   }

//   render() {
    
//     // const { editFailed, removeFailed } = this.props;
        
//     // const [serverError, setServerError] = React.useState(editFailed || removeFailed);

//     // const handleClose = () => {
//     //   setServerError(false);
//     // };

//     return(
//       <div>
//         <Snackbar
//           anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//           }}
//           open={this.state.serverError}
//           autoHideDuration={2000}
//           onClose={this.handleServerErrorClose}
//           message="Server Error !!! Try again"
//         />
//         <Button onClick={() => { 
//           this.handleFormOpen(); 
//         }} 
//           color="primary"
//         >
//           Edit User
//         </Button>
//           <Dialog open={this.state.isDailogOpen} maxWidth="sm" fullWidth onClose={this.handleFormClose} scroll="paper">
//             <DialogTitle>
//               <Typography variant="h4">
//                 Manage User
//               </Typography>
//             </DialogTitle>
//             <DialogContent>
//               <Card>
//                 <CardHeader>
//                   <Typography variant='h2'>{this.state.user.name}</Typography>
//                 </CardHeader>
//                 <CardBody>
//                   <CardTitle>
//                     <Typography variant='h5'>{this.state.user.entry_no}</Typography>
//                   </CardTitle>
//                   <CardSubtitle>
//                     <Typography variant='h6'>{this.state.user.category}</Typography>
//                   </CardSubtitle>
//                   <CardText>
//                     <Typography variant='body1'>{this.state.user.intro}</Typography>
//                     <Typography variant='body1'>{`Interests: ${this.state.user.interests}`}</Typography>
//                     <Typography variant='body1'>{`Specializations: ${this.state.user.specializations}`}</Typography>
//                     <Typography variant='body1'>{`Hostel: ${this.state.user.hostel}`}</Typography>
//                     <Typography variant='caption'>{`Email: ${this.state.user.email}`}</Typography>
//                     <Typography variant='body1'>{`Mobile: ${this.state.user.mobile_number}`}</Typography>
//                     {
//                       Array.from(this.state.user.url).map(([key, value]) => {
//                         return(
//                           <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
//                         );
//                       })
//                     }
//                   </CardText>
//                 </CardBody>
//                 <CardFooter>
//                   <LocalForm>
//                     <Row className="form-group">
//                       <Label htmlFor="privelege_level" md={12}><h6>Set privelege level:</h6></Label>
//                       <Col sm={12}>
//                         <RadioGroup row aria-label="privelege_level" name="privelege_level" defaultValue={this.state.user.privelege_level} onChange={this.handlePrivChange}>
//                           <FormControlLabel
//                             value="Unapproved_User"
//                             control={<Radio color="primary" />}
//                             label="Unapprove User"
//                             labelPlacement="start"
//                           />
//                           <FormControlLabel
//                             value="Approved_User"
//                             control={<Radio color="primary" />}
//                             label="A[pprove User"
//                             labelPlacement="start"
//                           />
//                           <FormControlLabel
//                             value="Admin"
//                             control={<Radio color="secondary" />}
//                             label="Make Admin"
//                             labelPlacement="start"
//                           />
//                           {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
//                         </RadioGroup>
//                       </Col>
//                     </Row>
//                     <Row className="form-group">
//                       <Col>
//                         <Label htmlFor="display_on_website" sm={5}><h6>Display on website:  </h6></Label>
//                         <FormControlLabel
//                           sm={2}
//                           // label="Display on Website"
//                           control={<Switch checked={this.state.user.display_on_website} onChange={this.changeDisplayState} />}
//                         />
//                       </Col>
//                     </Row>
//                   </LocalForm>
//                 </CardFooter>
//               </Card>
//               <Row className="form-group">
//                 {/* md={{ size: 2 }} */}
//                 <Col sm={{ size: 5, offset: 4 }}>
//                   <Button color="primary" onClick={this.confirmDeleteOpen}>
//                     Remove User
//                   </Button>
//                 </Col>
//                 <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
//                   <DialogContent>
//                     <Typography variant='h5'>
//                       Are you sure you want to remove the user {this.state.user.name}
//                     </Typography>
//                     <Row className="form-group">
//                       <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
//                         <Button onClick={this.handleDelete} color="primary">
//                           Confirm Delete
//                         </Button>
//                       </Col>
//                       <Col xs={3} md={{ size: 2 }}>
//                         <Button color="primary" onClick={this.confirmDeleteClose}>
//                           Cancel
//                         </Button>
//                       </Col>
//                     </Row>
//                   </DialogContent>
//                 </Dialog>
//               </Row> 
//               <Row className="form-group">
//                 <Col sm={{ size: 4, offset: 3 }}>
//                   <Button color="primary" onClick={this.handleSubmit}>
//                     Save Changes
//                   </Button>
//                 </Col>
//                 <Col sm={{ size: 2 }}>
//                   <Button color="primary" onClick={this.cancelUserEdit}>
//                     Cancel
//                   </Button>
//                 </Col>
//               </Row>
//             </DialogContent>
//             {/* </ModalBody> */}
//           </Dialog>
//       </div>
//     );
//   }
// };

export default function Home(props) {
  const classes = useStyles();
  // const curUser = dumUsers[0];
  const curUser = props.users.user;
  const dumUsers = props.users.allUsers;
  const dumEvents = props.events.allEvents;
  const dumProjects = props.projects.allProjects;
  const dumResources = props.resources.allResources;

  const [eventPopOpen, setEventPopOpen] = React.useState(false);
  const toggleEventPop = () => {
    if (!props.events.isLoading && props.events.errMess === null) {
      setEventPopOpen(!eventPopOpen);
    }
  };

  const [projectPopOpen, setProjectPopOpen] = React.useState(false);
  const toggleProjectPop = () => {
    if (!props.projects.isLoading && props.projects.errMess === null) {
      setProjectPopOpen(!projectPopOpen);
    }
  };

  const [resourcePopOpen, setResourcePopOpen] = React.useState(false);
  const toggleResourcePop = () => {
    if (!props.resources.isLoading && props.resources.errMess === null) {
      setResourcePopOpen(!resourcePopOpen);    
    }
  };

  const [memPopOpen, setMemPopOpen] = React.useState(false);
  const toggleMemPop = () => {
    if (!props.users.isLoading && props.users.usersErrMess === null) {
      setMemPopOpen(!memPopOpen);
    }
  };

  const [eventDailogOpen, setEventDailogOpen] =  React.useState(false);
  const [projectDailogOpen, setProjectDailogOpen] =  React.useState(false);
  const [resourceDailogOpen, setResourceDailogOpen] =  React.useState(false);
  const [userDailogOpen, setUserDailogOpen] =  React.useState(false);

  const handleEventCardOpen = () => {
    // console.log('Event card clicked');
    if (!props.events.isLoading && props.events.errMess === null) {
      setEventDailogOpen(true);
    }
  }
  const handleEventCardClose = () => {
    // console.log('Event card clicked');
    setEventDailogOpen(false);
  }

  const [activeTab, setActiveTab] = React.useState('Ongoing');
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [activeTaskTab, setActiveTaskTab] = React.useState('Events');
  const toggleTask = tab => {
    if (activeTaskTab !== tab) {
      setActiveTaskTab(tab);
    }
  };

  const handleProjectCardOpen = () => {
    // console.log('Project card clicked');
    if (!props.projects.isLoading && props.projects.errMess === null) {
      setProjectDailogOpen(true);
    }
  };

  const handleProjectCardClose = () => {
    // console.log('Project card clicked');
    setProjectDailogOpen(false);
  }

  const handleResourceCardOpen = () => {
    // console.log('card clicked');
    if (!props.resources.isLoading && props.resources.errMess === null) {
      setResourceDailogOpen(true);
    }
  }
  const handleResourceCardClose = () => {
    // console.log('card clicked');
    setResourceDailogOpen(false);
  }

  const handleUserCardOpen = () => {
    // console.log('card clicked');
    if (!props.users.isLoading && props.users.usersErrMess === null) {
      setUserDailogOpen(true);
    }
  }
  const handleUserCardClose = () => {
    // console.log('card clicked');
    setUserDailogOpen(false);
  }

  function isOngoing (startDate, endDate) {
    let today = new Date();
    if(today >= startDate && today <= endDate) {
      return true;
    }
    else {
      return false;
    }
  }

  function isCompleted (endDate) {
    let today = new Date();
    if(today > endDate) {
      return true;
    }
    else {
      return false;
    }
  }

  function isUpcoming (startDate) {
    let today = new Date();
    if(today < startDate) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <div>
      <Grid id="pageContainer" container spacing={3} justify="space-evenly">
        <Grid item id="popContainer" spacing={3} container xs={12} md={5} justify="space-evenly" className={classes.cardBorderL}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">Club Activities</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card body className="btn" style={{ borderColor: '#00c853' }} id="eventCard" onClick={handleEventCardOpen}>
              {
                props.events.errMess !== null
                ? 
                <h4>Error fetching events</h4>
                :
                <CardBody>
                  <Backdrop className={classes.backdrop} open={props.events.isLoading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <CardTitle>Events</CardTitle>
                  <CardText>{dumEvents.length}</CardText>
                </CardBody>
              }
            </Card>
            <Dialog open={eventDailogOpen} maxWidth="sm" fullWidth onClose={handleEventCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Events
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Ongoing
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Upcoming
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Completed
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
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
                          dumEvents.filter((event) => isOngoing(event.start_date, event.end_date)).map((event, index) => {
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
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
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
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isUpcoming(event.start_date)).map((event, index) => {
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
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
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
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isCompleted(event.end_date)).map((event, index) => {
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
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
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
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={eventPopOpen}
              target="eventCard"
              // container="pageContainer"
              // className={classes.pops}
              // boundariesElement='popContainer'
              toggle={toggleEventPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>Club Events</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumEvents.length === 0
                    ?
                    <div>
                      <h4>No Club Events</h4>
                    </div>
                    :
                    dumEvents.map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
                            <Card body>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="secondary">{event.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{event.description}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                {/* Assigned to: {(event.assignee !== '' && event.assignee !== null && event.assignee !== undefined) ? event.assignee : 'None'} */}
                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                  Assigned to:
                                  {
                                    dumUsers.filter(user => event.assignee.includes(user._id)).map(user => (user.name + ', '))
                                  }                                {
                                  curUser.privelege_level === 'Admin'
                                    ?
                                    <EditEventForm
                                      deleteEvent={props.deleteEvent}
                                      dumEvents={dumEvents}
                                      dumUsers={dumUsers}
                                      editEvent={props.editEvent}
                                      index={index}
                                      serverError={props.events.serverError} />
                                    : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card body className="btn" style={{ borderColor: '#00c853' }} id="projectCard" onClick={handleProjectCardOpen}>
              {
                props.projects.errMess !== null
                ? 
                <h4>Error fetching projects</h4>
                :
                <CardBody>
                  <Backdrop className={classes.backdrop} open={props.projects.isLoading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <CardTitle>Projects</CardTitle>
                  <CardText>{dumProjects.length}</CardText>
                </CardBody>
              }
            </Card>
            <Dialog open={projectDailogOpen} maxWidth="sm" fullWidth onClose={handleProjectCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Projects
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Ongoing
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Upcoming
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Completed
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
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
                      <ListGroup>
                        {
                          dumProjects.filter((project) => project.status === 'ONGOING').map((project, index) => {
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
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        dumUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))
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
                          dumProjects.filter((project) => project.status === 'IDEA').map((project, index) => {
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
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        dumUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))
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
                          dumProjects.filter((project) => project.status === 'COMPLETED').map((project, index) => {
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
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        dumUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))
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
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={projectPopOpen}
              target="projectCard"
              toggle={toggleProjectPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}>
                <Typography>Club Projects</Typography>
              </PopoverHeader>
              <PopoverBody className={classes.popBody}>
                <ListGroup>
                  {
                    dumProjects.length === 0
                    ?
                    <div>
                      <h4>No Club Projects</h4>
                    </div>
                    :
                    dumProjects.map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card body>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="secondary">{project.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{project.description}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}\n${project.members.length !== 0 ? dumUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))[0] : ''}...`}</Typography>
                                {
                                  curUser.privelege_level === 'Admin'
                                  ?
                                  <EditProjectForm
                                    deleteProject={props.deleteProject}
                                    dumProjects={dumProjects}
                                    dumUsers={dumUsers}
                                    editProject={props.editProject}
                                    index={index}
                                    serverError={props.projects.serverError} />
                                  : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card id="resourceCard" body className="btn" style={{ borderColor: '#00c853' }} onClick={handleResourceCardOpen}>
              {
                props.resources.errMess !== null
                ? 
                <h4>Error fetching resources</h4>
                :
                <CardBody>
                  <Backdrop className={classes.backdrop} open={props.resources.isLoading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <CardTitle>Resources</CardTitle>
                  <CardText>{dumResources.length}</CardText>
                </CardBody>
              }
            </Card>
            <Dialog open={resourceDailogOpen} maxWidth="sm" fullWidth onClose={handleResourceCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Resources
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Archived
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Current
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Completed'>
                    {
                      props.resources.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.resources.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumResources.filter((res) => res.archive).map((res, index) => {
                            return(
                              <Fragment key={`${res}~${index}`}>
                                <ListGroupItem>
                                  <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                      <Typography variant='h4'>{res.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{res.directory_year}</Typography>
                                        {
                                          curUser.privelege_level !== 'Unapproved_User'
                                          ?
                                          <Typography variant='body1'>({res.internal_name})</Typography>
                                          : null
                                        }
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{res.description}</Typography>
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      <CardLink href={res.url}>Access resource</CardLink>
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
                      props.resources.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.resources.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumResources.filter((res) => !(res.archive)).map((res, index) => {
                            return(
                              <Fragment key={`${res}~${index}`}>
                                <ListGroupItem>
                                  <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                      <Typography variant='h4'>{res.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{res.directory_year}</Typography>
                                        {
                                          curUser.privelege_level !== 'Unapproved_User'
                                          ?
                                          <Typography variant='body1'>({res.internal_name})</Typography>
                                          : null
                                        }
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{res.description}</Typography>
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      <CardLink href={res.url}>Access resource</CardLink>
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
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={resourcePopOpen}
              target="resourceCard"
              toggle={toggleResourcePop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>Club Resources</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumResources.length === 0
                    ?
                    <div>
                      <h4>No Club Resources</h4>
                    </div>
                    :
                    dumResources.map((res, index) => {
                      return(
                        <Fragment key={`${res}~${index}`}>
                          <ListGroupItem>
                            <Card body>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="secondary">{res.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{`${res.description.substr(0, 30)}...`}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                {/* <Typography className={classes.popCardFooter} color="textSecondary">{res.url}</Typography> */}
                                <CardLink href={res.url}>Access resource</CardLink>
                                {
                                  curUser.privelege_level === 'Admin'
                                  ?
                                  <EditResourceForm
                                    deleteResource={props.deleteResource}
                                    dumResources={dumResources}
                                    dumUsers={dumUsers}
                                    editResource={props.editResource}
                                    index={index}
                                    serverError={props.resources.serverError} />
                                  : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card id="memCard" body className="btn" style={{ borderColor: '#00c853' }} onClick={handleUserCardOpen}>
              {
                props.users.usersErrMess !== null
                ? 
                <h4>Error fetching members</h4>
                :
                <CardBody>
                  <Backdrop className={classes.backdrop} open={props.users.usersLoading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <CardTitle>Members</CardTitle>
                  <CardText>{dumUsers.length}</CardText>
                </CardBody>
              }
            </Card>
            <Dialog open={userDailogOpen} maxWidth="sm" fullWidth onClose={handleUserCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Members
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Admin
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Approved
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Unapproved
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Ongoing'>
                    {
                      props.users.userErrMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Members</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Admin').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                      <Grid container>
                                        <Grid item xs={12} md={9}>
                                          <Typography variant='h3'>{user.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                          <Avatar alt="" src={user.url.get('picture_url')} className={classes.large} />
                                        </Grid> 
                                      </Grid>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specialization}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography key={`${key}`} variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
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
                      props.users.userErrMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Members</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Approved_User').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                      <Grid container>
                                        <Grid item xs={12} md={9}>
                                          <Typography variant='h3'>{user.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                          <Avatar alt="" src={user.url.get('picture_url')} className={classes.large} />
                                        </Grid> 
                                      </Grid>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specialization}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
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
                      props.users.userErrMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Members</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Unapproved_User').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card body style={{ borderColor: '#00c853' }}>
                                    <CardHeader>
                                      <Grid container>
                                        <Grid item xs={12} md={9}>
                                          <Typography variant='h3'>{user.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                          <Avatar alt="" src={user.url.get('picture_url')} className={classes.large} />
                                        </Grid> 
                                      </Grid>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                      </CardText>
                                    </CardBody>
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
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={memPopOpen}
              target="memCard"
              toggle={toggleMemPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>All Dashboard Users</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumUsers.length === 0
                    ?
                    <div>
                      <h4>No Club Members</h4>
                    </div>
                    :
                    dumUsers.map((user, index) => {
                      return(
                        <Fragment key={`${user}~${index}`}>
                          <ListGroupItem>
                            <Card body>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="secondary">{user.name}</Typography>
                                  <Typography variant="body2">{user.entry_no}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{`${user.intro.substr(0, 30)}...`}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${user.category}\n${(user.privelege_level === 'Unapproved_User') ? 'Unapproved':''}`}</Typography>
                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                  {
                                    curUser.privelege_level === 'Admin' && user.privelege_level !== 'Admin'
                                    ?
                                    <EditOtherUserForm
                                      removeUser={props.removeUser}
                                      dumUsers={dumUsers}
                                      editUser={props.editOtherUser} 
                                      index={index}
                                      serverError={props.users.serverError} />
                                    : null
                                  }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
        </Grid>
        <Grid item id="myTaskContainer" xs={12} md={5} className={classes.cardBorderR}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">My Tasks</Typography>
          </Grid>
          <Grid item xs={12}>
            <Nav tabs>
              <NavItem className="btn">
                <NavLink
                  className={classnames({ active: activeTaskTab === 'Events' })}
                  onClick={() => toggleTask('Events')}
                >
                  Events
                </NavLink>
              </NavItem>
              <NavItem className="btn">
                <NavLink
                  className={classnames({ active: activeTaskTab === 'Upcoming' })}
                  onClick={() => toggleTask('Projects')}
                >
                  Projects
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTaskTab}>
              <TabPane tabId='Events'>
                {
                  dumEvents.filter((event) => event.assignee.includes(curUser._id)).length === 0
                  ?
                  <Typography variant='h4' color='textSecondary'>No events for you</Typography>
                  :
                  <ListGroup>
                    {
                      dumEvents.filter((event) => event.assignee.includes(curUser._id)).map((event, index) => {
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
                                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                        );
                                      })
                                    }
                                  </CardText>
                                </CardBody>
                                {/* <CardFooter>
                                  Assigned to: {event.assignee}
                                </CardFooter> */}
                              </Card>
                            </ListGroupItem>
                          </Fragment>
                        );
                      })
                    }
                  </ListGroup>
                }
              </TabPane>
              <TabPane tabId='Projects'>
                {
                  dumProjects.filter((project) => project.members.indexOf(curUser._id) !== -1).length === 0
                  ?
                  <Typography variant='h4' color='textSecondary'>No projects for you</Typography>
                  :
                  <ListGroup>
                    {
                      dumProjects.filter((project) => project.members.indexOf(curUser._id) !== -1).map((project, index) => {
                        return(
                          <Fragment key={`${project}~${index}`}>
                            <ListGroupItem>
                              <Card body style={{ borderColor: '#00c853' }}>
                                <CardHeader>
                                  <Typography variant='h4'>{project.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                  <CardTitle>
                                    <Typography variant='h6'>{project.status}</Typography>
                                    <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                  </CardTitle>
                                  <CardText>
                                    <Typography variant='body1' >{project.description}</Typography>
                                    {
                                      Array.from(project.url).map(([key, value]) => {
                                        return(
                                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{`${value.substr(0, 30)}...`}</CardLink></Typography>
                                        );
                                      })
                                    }
                                  </CardText>
                                </CardBody>
                                <CardFooter>
                                  Assigned to: 
                                  {
                                    dumUsers.filter(user => project.members.includes(user._id)).map(user => (user.name + ', '))
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}