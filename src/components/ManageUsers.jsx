import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl,
  TextField, Fab, Checkbox, ListItemText, Paper, Snackbar,
  Backdrop, CircularProgress,
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
    paper: {
        margin: '2em',
        height: document.documentElement.clientHeight*0.9,
        overflowY: 'scroll',
    },
}));


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
//         display_on_website: event.target.value,
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
//     console.log('Deleting: ', this.state.user.name);
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

export default function ManageUsers(props) {
  
  // const [state, setState] = React.useState({
  //   curUser: {},
  //   dumUsers: [],
  // });
  
  // React.useEffect(() => {
  //   props.fetchAllUsers();
  // }, []);
  const classes = useStyles();
  const curUser = props.users.user;
  const dumUsers = props.users.allUsers;

  const admins = dumUsers.filter((user) => user.privelege_level === 'Admin');
  const approved = dumUsers.filter((user) => user.privelege_level === 'Approved_User');
  const unapproved = dumUsers.filter((user) => user.privelege_level === 'Unapproved_User');

  console.log('Admins: ', admins);
  console.log('Approved: ', approved);
  console.log('Unapproved: ', unapproved);

  return (
      // props.users.errMess !== null
      //   ?
      //   <Typography variant='h4' color='textSecondary'>Failed to fetch Users</Typography>
      //   :
    <Grid container justify="space-evenly">
      {
        props.users.usersErrMess !== null
        ?
        <Typography variant='h4' color='textSecondary'>Failed to fetch Users</Typography>
        : null
      }
      <Backdrop className={classes.backdrop} open={props.users.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item xs={12} md={6}>
        <Typography variant='h4' align='center' className={{ width: '100%' }}>Admins</Typography>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          <ListGroup>
            {
              admins.length === 0
              ?
              <Typography variant='h4' color='textSecondary'>No admins of the club!! SHIT!!</Typography>
              :
              admins.map((user, index) => {
                return(
                  <Fragment key={`${user}~${index}`}>
                    <ListGroupItem>
                      <Card color="primary" outline>
                        <CardHeader>
                          <Typography variant='h2'>{user.name}</Typography>
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
                            <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                            <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                            <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                            <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                            {
                              Array.from(user.url).map(([key, value]) => {
                                return(
                                  <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
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
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h4' align='center' className={{ width: '100%' }}>Approved Users</Typography>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          <ListGroup>
            {
              approved.length === 0
              ?
              <Typography variant='h4' color='textSecondary'>No approved Users</Typography>
              :
              approved.map((user, index) => {
                return(
                  <Fragment key={`${user}~${index}`}>
                    <ListGroupItem>
                      <Card color="primary" outline>
                        <CardHeader>
                          <Typography variant='h2'>{user.name}</Typography>
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
                            <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                            <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                            <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                            <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                            {
                              Array.from(user.url).map(([key, value]) => {
                                return(
                                  <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                );
                              })
                            }
                          </CardText>
                        </CardBody>
                        <CardFooter>
                          {
                            curUser.privelege_level === 'Admin'
                            ?
                            <EditOtherUserForm
                              removeUser={props.removeUser}
                              dumUsers={approved}
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
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h4' align='center' className={{ width: '100%' }}>Unapproved Users</Typography>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          <ListGroup>
            {
              unapproved.length === 0
              ?
              <Typography variant='h4' color='textSecondary'>No unappproved Users</Typography>
              :
              unapproved.map((user, index) => {
                return(
                  <Fragment key={`${user}~${index}`}>
                    <ListGroupItem>
                      <Card color="primary" outline>
                        <CardHeader>
                          <Typography variant='h2'>{user.name}</Typography>
                        </CardHeader>
                        <CardBody>
                          <CardTitle>
                            <Typography variant='h5'>{user.entry_no}</Typography>
                          </CardTitle>
                          <CardSubtitle>
                            <Typography variant='h6'>{user.category}</Typography>
                          </CardSubtitle>
                          <CardText>
                            {/* <Typography variant='body1'>{user.intro}</Typography>
                            <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                            <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                            <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography> */}
                            <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                            {/* <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography> */}
                            {/* {
                              Array.from(user.url).map(([key, value]) => {
                                return(
                                  <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                );
                              })
                            } */}
                          </CardText>
                        </CardBody>
                        <CardFooter>
                          {
                            curUser.privelege_level === 'Admin'
                            ?
                            <EditOtherUserForm
                              removeUser={props.removeUser}
                              dumUsers={unapproved}
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
        </Paper>
      </Grid>
    </Grid>
  );
}
