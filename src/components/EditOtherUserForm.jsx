import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl, 
  TextField, Fab, Checkbox, ListItemText, Snackbar } from '@material-ui/core';
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


class EditOtherUserForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: this.props.dumUsers[this.props.index],
      isDailogOpen: false,
      isDeleteDailogOpen: false,
      success: false,
      // privelege_level: this.state.dumUsers[this.props.index].privelege_level,
      // display_on_website: this.state.dumUsers[this.props.index].display_on_website,
    };

    this.changeDisplayState = this.changeDisplayState.bind(this);
    this.changePrivLevel = this.changePrivLevel.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.cancelUserEdit = this.cancelUserEdit.bind(this);
    this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
    this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSuccessClose = this.handleSuccessClose.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
  }

  componentWillReceiveProps (props) {
    this.setState({
      ...this.state,
      user: props.dumUsers[props.index],
    })
  }

  handleSuccessClose = () => {
    this.setState({
      ...this.state,
      success: false,
    });
  };

  changeDisplayState = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        display_on_website: event.target.checked,
      },
    });
  };

  changePrivLevel = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        privelege_level: event.target.value,
      },
    });
  };

  handleFormOpen = () => {
    this.setState({
      ...this.state,
      isDailogOpen: true,
    });
  };

  handleFormClose = () => {
    this.setState({
      ...this.state,
      isDailogOpen: false,
    });
  };

  cancelUserEdit = () => {
    this.handleFormClose();
  };

  confirmDeleteOpen = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: true,
    });
  };

  confirmDeleteClose = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: false,
    });
  };

  handleDelete = () => {
    // Call delete thunk here,
    this.props.removeUser(this.state.user._id);
    console.log('Deleting: ', this.state.user.name);
    this.confirmDeleteClose();
  };

  handleApprove = () => {
    const newUser = {
      ...this.state.user,
      privelege_level: 'Approved_User',
    };
    this.props.editUser(newUser);
    if (this.props.serverError === null) {
      this.setState({
        ...this.state,
        success: true,
      });
    }
  };

  handleSubmit = () => {
    console.log('Editing user: ', this.state.user);
    this.props.editUser(this.state.user);
    if (this.props.serverError === null) {
      this.setState({
        ...this.state,
        success: true,
      });
    }
    this.handleFormClose();
  };

  render() {
    
    // const { editFailed, removeFailed } = this.props;
        
    // const [serverError, setServerError] = React.useState(editFailed || removeFailed);

    // const handleClose = () => {
    //   setServerError(false);
    // };
    // console.log('users: ', this.props.dumUsers);
    // console.log('index: ', this.props.index);

    return(
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.success}
          autoHideDuration={2000}
          onClose={this.handleSuccessClose}
          message="User edited successfully !"
        />
        <Button onClick={() => { 
          this.handleFormOpen(); 
        }} 
          color="primary"
        >
          Edit User
        </Button>
        {
          this.state.user.privelege_level === 'Unapproved_User'
          ?
          <Button onClick={() => { 
            this.handleApprove(); 
          }} 
            color="secondary"
          >
            Approve User
          </Button>
          : null
        }
          <Dialog open={this.state.isDailogOpen} maxWidth="sm" fullWidth onClose={this.handleFormClose} scroll="paper">
            <DialogTitle>
              <Typography variant="h4">
                Manage User
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Card>
                <CardHeader>
                  <Typography variant='h2'>{this.state.user.name}</Typography>
                </CardHeader>
                <CardBody>
                  <CardTitle>
                    <Typography variant='h5'>{this.state.user.entry_no}</Typography>
                  </CardTitle>
                  <CardSubtitle>
                    <Typography variant='h6'>{this.state.user.category}</Typography>
                  </CardSubtitle>
                  <CardText>
                    <Typography variant='body1'>{this.state.user.intro}</Typography>
                    <Typography variant='body1'>{`Interests: ${this.state.user.interests}`}</Typography>
                    <Typography variant='body1'>{`Specializations: ${this.state.user.specializations}`}</Typography>
                    <Typography variant='body1'>{`Hostel: ${this.state.user.hostel}`}</Typography>
                    <Typography variant='caption'>{`Email: ${this.state.user.email}`}</Typography>
                    <Typography variant='body1'>{`Mobile: ${this.state.user.mobile_number}`}</Typography>
                    {
                      Array.from(this.state.user.url).map(([key, value]) => {
                        return(
                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                        );
                      })
                    }
                  </CardText>
                </CardBody>
                <CardFooter>
                  <LocalForm>
                    <Row className="form-group">
                      <Label htmlFor="privelege_level" md={12}><h6>Set privelege level:</h6></Label>
                      <Col sm={12}>
                        <RadioGroup row aria-label="privelege_level" name="privelege_level" defaultValue={this.state.user.privelege_level} onChange={this.changePrivLevel}>
                          <FormControlLabel
                            value="Unapproved_User"
                            control={<Radio color="primary" />}
                            label="Unapprove User"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="Approved_User"
                            control={<Radio color="primary" />}
                            label="Approve User"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="Admin"
                            control={<Radio color="secondary" />}
                            label="Make Admin"
                            labelPlacement="start"
                          />
                          {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                        </RadioGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col>
                        <Label htmlFor="display_on_website" sm={5}><h6>Display on website:  </h6></Label>
                        <FormControlLabel
                          sm={2}
                          // label="Display on Website"
                          control={<Switch checked={this.state.user.display_on_website} onChange={this.changeDisplayState} />}
                        />
                      </Col>
                    </Row>
                  </LocalForm>
                </CardFooter>
              </Card>
              <Row className="form-group">
                {/* md={{ size: 2 }} */}
                <Col sm={{ size: 5, offset: 4 }}>
                  <Button color="primary" onClick={this.confirmDeleteOpen}>
                    Remove User
                  </Button>
                </Col>
                <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
                  <DialogContent>
                    <Typography variant='h5'>
                      Are you sure you want to remove the user {this.state.user.name}
                    </Typography>
                    <Row className="form-group">
                      <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                        <Button onClick={this.handleDelete} color="primary">
                          Confirm Delete
                        </Button>
                      </Col>
                      <Col xs={3} md={{ size: 2 }}>
                        <Button color="primary" onClick={this.confirmDeleteClose}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </DialogContent>
                </Dialog>
              </Row> 
              <Row className="form-group">
                <Col sm={{ size: 4, offset: 3 }}>
                  <Button color="primary" onClick={this.handleSubmit}>
                    Save Changes
                  </Button>
                </Col>
                <Col sm={{ size: 2 }}>
                  <Button color="primary" onClick={this.cancelUserEdit}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </DialogContent>
            {/* </ModalBody> */}
          </Dialog>
      </div>
    );
  }
};

export default EditOtherUserForm;
