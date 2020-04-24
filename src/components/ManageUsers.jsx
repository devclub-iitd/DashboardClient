import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl,
  TextField, Fab, Checkbox, ListItemText, Paper, Snackbar,
  Backdrop, CircularProgress, InputAdornment, IconButton, Avatar
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
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
import Logo from './logo.png';
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
    search: {
      marginTop: '0.5em',
      marginLeft: '2em',
      // marginRight: 'auto',
      width: '60%',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginLeft: '1em',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

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

  const [search, setSearch] = React.useState({
    admins: '',
    approved: '',
    unapproved: '',
  });

  const searchChange = (event) => {
      event.preventDefault();
      
      setSearch({
          ...search,
          [event.target.name]: event.target.value,
      });
  };

  const admins = dumUsers.filter((user) => user.privelege_level === 'Admin').filter(user => user.name.toLowerCase().startsWith(search.admins.toLowerCase()));
  const approved = dumUsers.filter((user) => user.privelege_level === 'Approved_User').filter(user => user.name.toLowerCase().startsWith(search.approved.toLowerCase()));
  const unapproved = dumUsers.filter((user) => user.privelege_level === 'Unapproved_User').filter(user => user.name.toLowerCase().startsWith(search.unapproved.toLowerCase()));

  // console.log('Admins: ', admins);
  // console.log('Approved: ', approved);
  // console.log('Unapproved: ', unapproved);

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
        <TextField
          className={classes.search}
          label='Search'
          name='admins'
          fullWidth
          value={search.admins}
          onChange={searchChange}
          InputProps={{
              endAdornment: (
              <InputAdornment>
                  {
                      search.admins === ''
                      ?
                      <IconButton>
                          <SearchIcon />
                      </IconButton>
                      :
                      <IconButton onClick={() => {setSearch({...search, admins: ''})}}>
                          <CloseIcon />
                      </IconButton>
                  }
              </InputAdornment>
              )
          }}
        />
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
                      <Card body style={{ borderColor: '#0288d1' }}>
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
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h4' align='center' className={{ width: '100%' }}>Approved Users</Typography>
        <TextField
          className={classes.search}
          label='Search'
          name='approved'
          fullWidth
          value={search.approved}
          onChange={searchChange}
          InputProps={{
              endAdornment: (
              <InputAdornment>
                  {
                      search.approved === ''
                      ?
                      <IconButton>
                          <SearchIcon />
                      </IconButton>
                      :
                      <IconButton onClick={() => {setSearch({...search, approved: ''})}}>
                          <CloseIcon />
                      </IconButton>
                  }
              </InputAdornment>
              )
          }}
        />
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
        <TextField
          className={classes.search}
          label='Search'
          name='unapproved'
          fullWidth
          value={search.unapproved}
          onChange={searchChange}
          InputProps={{
              endAdornment: (
              <InputAdornment>
                  {
                      search.unapproved === ''
                      ?
                      <IconButton>
                          <SearchIcon />
                      </IconButton>
                      :
                      <IconButton onClick={() => {setSearch({...search, unapproved: ''})}}>
                          <CloseIcon />
                      </IconButton>
                  }
              </InputAdornment>
              )
          }}
        />
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
