import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Dialog,
    DialogContent,
    TextField,
    Paper,
    Backdrop,
    CircularProgress,
    InputAdornment,
    IconButton,
    Avatar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardFooter,
    CardLink,
    Button,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    CardHeader,
    CardSubtitle,
} from 'reactstrap';
import EditOtherUserForm from './EditOtherUserForm';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
    },
    paper: {
        margin: '2em',
        height: document.documentElement.clientHeight * 0.9,
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
    const classes = useStyles();
    const curUser = props.users.user;
    const dumUsers = props.users.allUsers;
    const { deleteAllUsers, rejectAllUnapproved } = props;

    const [search, setSearch] = React.useState({
        admins: '',
        approved: '',
        unapproved: '',
    });

    const [deleteAll, setDeleteState] = React.useState(false);
    const [rejectAll, setRejectState] = React.useState(false);

    const searchChange = (event) => {
        event.preventDefault();

        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
    };

    const confirmDeleteOpen = () => {
        setDeleteState(true);
    };

    const confirmDeleteClose = () => {
        setDeleteState(false);
    };

    const confirmRejectOpen = () => {
        setRejectState(true);
    };

    const confirmRejectClose = () => {
        setRejectState(false);
    };

    const admins = dumUsers
        .filter((user) => user.privelege_level === 'Admin')
        .filter((user) =>
            user.name.toLowerCase().startsWith(search.admins.toLowerCase())
        );
    const approved = dumUsers
        .filter((user) => user.privelege_level === 'Approved_User')
        .filter((user) =>
            user.name.toLowerCase().startsWith(search.approved.toLowerCase())
        );
    const unapproved = dumUsers
        .filter((user) => user.privelege_level === 'Unapproved_User')
        .filter((user) =>
            user.name.toLowerCase().startsWith(search.unapproved.toLowerCase())
        );

    return (
        <Grid container justify="space-evenly">
            {props.users.usersErrMess !== null ? (
                <Typography variant="h4" color="textSecondary">
                    Failed to fetch Users
                </Typography>
            ) : null}
            <Backdrop
                className={classes.backdrop}
                open={props.users.usersLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog open={rejectAll} maxWidth="md" onClose={confirmRejectClose}>
                <DialogContent>
                    {unapproved.length === 0 ? (
                        <Typography variant="h5">
                            No Approved Users !
                        </Typography>
                    ) : (
                        <Typography variant="h5">
                            This is a highly sensitive operation. Do you Really
                            want to <b>REJECT ALL</b> unapproved users ?
                        </Typography>
                    )}
                    <Row style={{ marginTop: '1em' }} className="form-group">
                        {unapproved.length !== 0 ? (
                            <Col
                                xs={{ size: 7, offset: 1 }}
                                md={{ size: 4, offset: 3 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={rejectAllUnapproved}
                                    color="primary"
                                >
                                    Reject All
                                </Button>
                            </Col>
                        ) : null}
                        <Col xs={3} md={{ size: 2 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={confirmRejectClose}
                            >
                                {unapproved.length === 0 ? `Close` : `Cancel`}
                            </Button>
                        </Col>
                    </Row>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteAll} maxWidth="md" onClose={confirmDeleteClose}>
                <DialogContent>
                    <Typography variant="h5">
                        This is a highly sensitive operation. Do you Really want
                        to <b>DELETE ALL</b> users ?
                    </Typography>
                    <Row style={{ marginTop: '1em' }} className="form-group">
                        <Col
                            xs={{ size: 7, offset: 1 }}
                            md={{ size: 4, offset: 3 }}
                        >
                            <Button
                                variant="contained"
                                onClick={deleteAllUsers}
                                color="primary"
                            >
                                Delete All
                            </Button>
                        </Col>
                        <Col xs={3} md={{ size: 2 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={confirmDeleteClose}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </DialogContent>
            </Dialog>
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h4"
                    align="center"
                    className={{ width: '100%' }}
                >
                    Admins
                </Typography>
                <TextField
                    className={classes.search}
                    label="Search"
                    name="admins"
                    fullWidth
                    value={search.admins}
                    onChange={searchChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                {search.admins === '' ? (
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={() => {
                                            setSearch({
                                                ...search,
                                                admins: '',
                                            });
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
                <Paper
                    elevation={3}
                    variant="outlined"
                    className={classes.paper}
                >
                    <ListGroup>
                        {admins.length === 0 ? (
                            <Typography variant="h4" color="textSecondary">
                                No admins of the club!! SHIT!!
                            </Typography>
                        ) : (
                            admins.map((user, index) => {
                                return (
                                    <Fragment key={`${user}~${index}`}>
                                        <ListGroupItem>
                                            <Card
                                                body
                                                style={{
                                                    borderColor: '#0288d1',
                                                }}
                                            >
                                                <CardHeader>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={9}
                                                            md={9}
                                                        >
                                                            <Typography variant="h3">
                                                                {user.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            md={3}
                                                        >
                                                            <Avatar
                                                                alt=""
                                                                src={user.url.get(
                                                                    'picture_url'
                                                                )}
                                                                className={
                                                                    classes.large
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardHeader>
                                                <CardBody>
                                                    <CardTitle>
                                                        <Typography variant="h5">
                                                            {user.entry_no}
                                                        </Typography>
                                                    </CardTitle>
                                                    <CardSubtitle>
                                                        <Typography variant="h6">
                                                            {user.category}
                                                        </Typography>
                                                    </CardSubtitle>
                                                    <CardText>
                                                        <Typography variant="body1">
                                                            {user.intro}
                                                        </Typography>
                                                        <Typography variant="body1">{`Interests: ${user.interests}`}</Typography>
                                                        <Typography variant="body1">{`Specializations: ${user.specialization}`}</Typography>
                                                        <Typography variant="body1">{`Hostel: ${user.hostel}`}</Typography>
                                                        <Typography variant="caption">{`Email: ${user.email}`}</Typography>
                                                        <Typography variant="body1">{`Mobile: ${user.mobile_number}`}</Typography>
                                                        {Array.from(
                                                            user.url
                                                        ).map(
                                                            ([key, value]) => {
                                                                return (
                                                                    <Typography variant="body1">
                                                                        {`${key}: `}
                                                                        <CardLink
                                                                            href={
                                                                                value
                                                                            }
                                                                        >{`${value.substr(
                                                                            0,
                                                                            30
                                                                        )}...`}</CardLink>
                                                                    </Typography>
                                                                );
                                                            }
                                                        )}
                                                    </CardText>
                                                </CardBody>
                                                {/* For admin to give up admin priveleges */}
                                                {/* <CardFooter>
                          {
                            curUser._id === user._id
                            ?
                            <EditOtherUserForm
                              thisUser={true}
                              removeUser={props.removeUser}
                              dumUsers={approved}
                              editUser={props.editOtherUser} 
                              index={index}
                              serverError={props.users.serverError} />
                            : null
                          }
                        </CardFooter> */}
                                            </Card>
                                        </ListGroupItem>
                                    </Fragment>
                                );
                            })
                        )}
                    </ListGroup>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h4"
                    align="center"
                    className={{ width: '100%' }}
                >
                    Approved Users
                </Typography>
                <Grid container alignItems="center">
                    {/* <Grid item xs={7}> */}
                    <TextField
                        className={classes.search}
                        label="Search"
                        name="approved"
                        fullWidth
                        value={search.approved}
                        onChange={searchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    {search.approved === '' ? (
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() => {
                                                setSearch({
                                                    ...search,
                                                    approved: '',
                                                });
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* </Grid> */}
                    {/* <Grid item xs={5}>
            { 
              curUser.privelege_level === 'Admin'
              ? 
              <Button onClick={() => { 
                confirmDeleteOpen(); 
              }} 
                style={{ marginTop: '1em', marginLeft: 'auto', marginRight: 'auto' }}
                color="primary"
                variant="contained"
              >
                Delete All
              </Button>
              : null
            }
          </Grid> */}
                </Grid>
                <Paper
                    elevation={3}
                    variant="outlined"
                    className={classes.paper}
                >
                    <ListGroup>
                        {approved.length === 0 ? (
                            <Typography variant="h4" color="textSecondary">
                                No approved Users
                            </Typography>
                        ) : (
                            approved.map((user, index) => {
                                return (
                                    <Fragment key={`${user}~${index}`}>
                                        <ListGroupItem>
                                            <Card
                                                body
                                                style={{
                                                    borderColor: '#00c853',
                                                }}
                                            >
                                                <CardHeader>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={9}
                                                            md={9}
                                                        >
                                                            <Typography variant="h3">
                                                                {user.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            md={3}
                                                        >
                                                            <Avatar
                                                                alt=""
                                                                src={user.url.get(
                                                                    'picture_url'
                                                                )}
                                                                className={
                                                                    classes.large
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardHeader>
                                                <CardBody>
                                                    <CardTitle>
                                                        <Typography variant="h5">
                                                            {user.entry_no}
                                                        </Typography>
                                                    </CardTitle>
                                                    <CardSubtitle>
                                                        <Typography variant="h6">
                                                            {user.category}
                                                        </Typography>
                                                    </CardSubtitle>
                                                    <CardText>
                                                        <Typography variant="body1">
                                                            {user.intro}
                                                        </Typography>
                                                        <Typography variant="body1">{`Interests: ${user.interests}`}</Typography>
                                                        <Typography variant="body1">{`Specializations: ${user.specialization}`}</Typography>
                                                        <Typography variant="body1">{`Hostel: ${user.hostel}`}</Typography>
                                                        <Typography variant="caption">{`Email: ${user.email}`}</Typography>
                                                        <Typography variant="body1">{`Mobile: ${user.mobile_number}`}</Typography>
                                                        {Array.from(
                                                            user.url
                                                        ).map(
                                                            ([key, value]) => {
                                                                return (
                                                                    <Typography variant="body1">
                                                                        {`${key}: `}
                                                                        <CardLink
                                                                            href={
                                                                                value
                                                                            }
                                                                        >{`${value.substr(
                                                                            0,
                                                                            30
                                                                        )}...`}</CardLink>
                                                                    </Typography>
                                                                );
                                                            }
                                                        )}
                                                    </CardText>
                                                </CardBody>
                                                <CardFooter>
                                                    {curUser.privelege_level ===
                                                    'Admin' ? (
                                                        <EditOtherUserForm
                                                            removeUser={
                                                                props.removeUser
                                                            }
                                                            dumUsers={approved}
                                                            editUser={
                                                                props.editOtherUser
                                                            }
                                                            index={index}
                                                            serverError={
                                                                props.users
                                                                    .serverError
                                                            }
                                                        />
                                                    ) : null}
                                                </CardFooter>
                                            </Card>
                                        </ListGroupItem>
                                    </Fragment>
                                );
                            })
                        )}
                    </ListGroup>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography
                    variant="h4"
                    align="center"
                    className={{ width: '100%' }}
                >
                    Unapproved Users
                </Typography>
                <Grid container alignItems="center">
                    <Grid item xs={7}>
                        <TextField
                            className={classes.search}
                            label="Search"
                            name="unapproved"
                            fullWidth
                            value={search.unapproved}
                            onChange={searchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        {search.unapproved === '' ? (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() => {
                                                    setSearch({
                                                        ...search,
                                                        unapproved: '',
                                                    });
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        {curUser.privelege_level === 'Admin' ? (
                            <Button
                                onClick={() => {
                                    confirmRejectOpen();
                                }}
                                style={{
                                    marginTop: '1em',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                                color="primary"
                                variant="contained"
                            >
                                Reject All
                            </Button>
                        ) : null}
                    </Grid>
                </Grid>
                <Paper
                    elevation={3}
                    variant="outlined"
                    className={classes.paper}
                >
                    <ListGroup>
                        {unapproved.length === 0 ? (
                            <Typography variant="h4" color="textSecondary">
                                No unappproved Users
                            </Typography>
                        ) : (
                            unapproved.map((user, index) => {
                                return (
                                    <Fragment key={`${user}~${index}`}>
                                        <ListGroupItem>
                                            <Card
                                                body
                                                style={{
                                                    borderColor: '#00c853',
                                                }}
                                            >
                                                <CardHeader>
                                                    <Grid container>
                                                        <Grid
                                                            item
                                                            xs={9}
                                                            md={9}
                                                        >
                                                            <Typography variant="h3">
                                                                {user.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            md={3}
                                                        >
                                                            <Avatar
                                                                alt=""
                                                                src={user.url.get(
                                                                    'picture_url'
                                                                )}
                                                                className={
                                                                    classes.large
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardHeader>
                                                <CardBody>
                                                    <CardTitle>
                                                        <Typography variant="h5">
                                                            {user.entry_no}
                                                        </Typography>
                                                    </CardTitle>
                                                    <CardSubtitle>
                                                        <Typography variant="h6">
                                                            {user.category}
                                                        </Typography>
                                                    </CardSubtitle>
                                                    <CardText>
                                                        <Typography variant="caption">{`Email: ${user.email}`}</Typography>
                                                    </CardText>
                                                </CardBody>
                                                <CardFooter>
                                                    {curUser.privelege_level ===
                                                    'Admin' ? (
                                                        <EditOtherUserForm
                                                            removeUser={
                                                                props.removeUser
                                                            }
                                                            dumUsers={
                                                                unapproved
                                                            }
                                                            editUser={
                                                                props.editOtherUser
                                                            }
                                                            index={index}
                                                            serverError={
                                                                props.users
                                                                    .serverError
                                                            }
                                                        />
                                                    ) : null}
                                                </CardFooter>
                                            </Card>
                                        </ListGroupItem>
                                    </Fragment>
                                );
                            })
                        )}
                    </ListGroup>
                </Paper>
            </Grid>
        </Grid>
    );
}
