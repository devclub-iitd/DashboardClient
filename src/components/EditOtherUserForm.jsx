/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    Switch,
    Button,
    Snackbar,
} from '@material-ui/core';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardFooter,
    CardLink,
    Row,
    Col,
    CardHeader,
    CardSubtitle,
    Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { LocalForm } from 'react-redux-form';

class EditOtherUserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orgUser: props.dumUsers[props.index],
            user: props.dumUsers[props.index],
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

    componentWillReceiveProps(props) {
        this.setState((prevState) => ({
            ...prevState,
            orgUser: props.dumUsers[props.index],
            user: props.dumUsers[props.index],
        }));
    }

    handleSuccessClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            success: false,
        }));
    };

    changeDisplayState = (event) => {
        const { checked } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                display_on_website: checked,
            },
        }));
    };

    changePrivLevel = (event) => {
        const { value } = event.target;
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                privelege_level: value,
            },
        }));
    };

    handleFormOpen = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDailogOpen: true,
        }));
    };

    handleFormClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDailogOpen: false,
        }));
    };

    cancelUserEdit = () => {
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                ...prevState.orgUser,
            },
        }));
        this.handleFormClose();
    };

    confirmDeleteOpen = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDeleteDailogOpen: true,
        }));
    };

    confirmDeleteClose = () => {
        this.setState((prevState) => ({
            ...prevState,
            isDeleteDailogOpen: false,
        }));
    };

    handleDelete = () => {
        // Call delete thunk here,
        const { removeUser } = this.props;
        const { user } = this.state;
        removeUser(user._id);
        // console.log('Deleting: ', this.state.user.name);
        this.confirmDeleteClose();
    };

    handleApprove = () => {
        const { user } = this.state;
        const { editUser, serverError } = this.props;
        const newUser = {
            ...user,
            privelege_level: 'Approved_User',
        };
        editUser(newUser);
        if (serverError === null) {
            this.setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        }
    };

    handleSubmit = () => {
        // console.log('Editing user: ', this.state.user);
        const { editUser, serverError } = this.props;
        const { user } = this.state;
        editUser(user);
        if (serverError === null) {
            this.setState((prevState) => ({
                ...prevState,
                success: true,
            }));
        }
        this.handleFormClose();
    };

    render() {
        const {
            success,
            orgUser,
            isDeleteDailogOpen,
            isDailogOpen,
        } = this.state;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={success}
                    autoHideDuration={2000}
                    onClose={this.handleSuccessClose}
                    message="User edited successfully !"
                />
                {orgUser.privelege_level === 'Unapproved_User' ? (
                    <div>
                        <Button
                            onClick={() => {
                                this.confirmDeleteOpen();
                            }}
                            color="secondary"
                            variant="outlined"
                        >
                            Reject User
                        </Button>
                        <Button
                            onClick={() => {
                                this.handleApprove();
                            }}
                            style={{ marginLeft: '1em' }}
                            variant="contained"
                            color="secondary"
                        >
                            Approve User
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={() => {
                            this.handleFormOpen();
                        }}
                        color="secondary"
                        variant={
                            orgUser.privelege_level === 'Unapproved_User'
                                ? 'outlined'
                                : 'contained'
                        }
                    >
                        Edit User
                    </Button>
                )}
                <Dialog
                    open={isDeleteDailogOpen}
                    maxWidth="md"
                    onClose={this.confirmDeleteClose}
                >
                    <DialogContent>
                        <Typography variant="h5">
                            Are you sure you want to remove the user{' '}
                            {orgUser.name}
                        </Typography>
                        <Row className="form-group">
                            <Col
                                xs={{ size: 7, offset: 1 }}
                                md={{ size: 4, offset: 3 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={this.handleDelete}
                                    color="primary"
                                >
                                    Confirm Delete
                                </Button>
                            </Col>
                            <Col xs={3} md={{ size: 2 }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.confirmDeleteClose}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={isDailogOpen}
                    maxWidth="sm"
                    fullWidth
                    onClose={this.handleFormClose}
                    scroll="paper"
                >
                    <DialogTitle>
                        <Typography variant="h4">Manage User</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Card>
                            <CardHeader>
                                <Typography variant="h2">
                                    {orgUser.name}
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                <CardTitle>
                                    <Typography variant="h5">
                                        {orgUser.entry_no}
                                    </Typography>
                                </CardTitle>
                                <CardSubtitle>
                                    <Typography variant="h6">
                                        {orgUser.category}
                                    </Typography>
                                </CardSubtitle>
                                <CardText>
                                    <Typography variant="body1">
                                        {orgUser.intro}
                                    </Typography>
                                    <Typography variant="body1">{`Interests: ${orgUser.interests}`}</Typography>
                                    <Typography variant="body1">{`Specializations: ${orgUser.specializations}`}</Typography>
                                    <Typography variant="body1">{`Hostel: ${orgUser.hostel}`}</Typography>
                                    <Typography variant="caption">{`Email: ${orgUser.email}`}</Typography>
                                    <Typography variant="body1">{`Mobile: ${orgUser.mobile_number}`}</Typography>
                                    {Array.from(orgUser.url).map(
                                        ([key, value]) => {
                                            return (
                                                <Typography variant="body1">
                                                    {`${key}: `}
                                                    <CardLink href={value}>
                                                        {value}
                                                    </CardLink>
                                                </Typography>
                                            );
                                        }
                                    )}
                                </CardText>
                            </CardBody>
                            <CardFooter>
                                <LocalForm>
                                    <Row className="form-group">
                                        <Label
                                            htmlFor="privelege_level"
                                            md={12}
                                        >
                                            <h6>Set privelege level:</h6>
                                        </Label>
                                        <Col sm={12}>
                                            <RadioGroup
                                                row
                                                aria-label="privelege_level"
                                                name="privelege_level"
                                                defaultValue={
                                                    orgUser.privelege_level
                                                }
                                                onChange={this.changePrivLevel}
                                            >
                                                <FormControlLabel
                                                    value="Unapproved_User"
                                                    control={
                                                        <Radio color="secondary" />
                                                    }
                                                    label="Unapprove User"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="Approved_User"
                                                    control={
                                                        <Radio color="secondary" />
                                                    }
                                                    label="Approve User"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="Admin"
                                                    control={
                                                        <Radio color="primary" />
                                                    }
                                                    label="Make Admin"
                                                    labelPlacement="end"
                                                />
                                                {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col>
                                            <Label
                                                htmlFor="display_on_website"
                                                sm={5}
                                            >
                                                <h6>Display on website: </h6>
                                            </Label>
                                            <FormControlLabel
                                                sm={2}
                                                // label="Display on Website"
                                                control={
                                                    <Switch
                                                        defaultChecked={
                                                            orgUser.display_on_website
                                                        }
                                                        onChange={
                                                            this
                                                                .changeDisplayState
                                                        }
                                                    />
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </CardFooter>
                        </Card>
                        <Row className="form-group">
                            {/* md={{ size: 2 }} */}
                            <Col sm={{ size: 6, offset: 3 }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.confirmDeleteOpen}
                                >
                                    Remove User
                                </Button>
                            </Col>
                            <Dialog
                                open={isDeleteDailogOpen}
                                fullWidth
                                onClose={this.confirmDeleteClose}
                            >
                                <DialogContent>
                                    <Typography variant="h5">
                                        Are you sure you want to remove the user{' '}
                                        {orgUser.name}
                                    </Typography>
                                    <Row
                                        style={{ marginTop: '2em' }}
                                        className="form-group"
                                    >
                                        <Col
                                            xs={{ size: 7, offset: 1 }}
                                            md={{ size: 4, offset: 3 }}
                                        >
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                onClick={this.handleDelete}
                                                color="primary"
                                            >
                                                Confirm Delete
                                            </Button>
                                        </Col>
                                        <Col xs={3} md={{ size: 2 }}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="primary"
                                                onClick={
                                                    this.confirmDeleteClose
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </DialogContent>
                            </Dialog>
                        </Row>
                        <Row className="form-group">
                            <Col
                                xs={{ size: 7, offset: 1 }}
                                md={{ size: 4, offset: 3 }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit}
                                >
                                    Save Changes
                                </Button>
                            </Col>
                            <Col xs={3} md={2}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.cancelUserEdit}
                                >
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
}

EditOtherUserForm.propTypes = {
    dumUsers: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    removeUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    serverError: PropTypes.string.isRequired,
};

export default EditOtherUserForm;
