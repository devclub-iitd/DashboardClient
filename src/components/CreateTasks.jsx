import React from 'react';
import { emphasize, makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Snackbar, Typography, Paper } from '@material-ui/core';
import { Card, CardBody, CardTitle, Row, Col, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import CreateEventForm from './CreateEventForm';
import CreateProjectForm from './CreateProjectForm';
import CreateResourceForm from './CreateResourceForm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: 250,
        minWidth: 290,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light'
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
            0.08
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        // margin: theme.spacing(1),
        marginTop: '1em',
        marginBottom: '2em',
        width: '100%',
    },
    head: {
        marginBottom: '0.5em',
        marginTop: '1em',
        textAlign: 'center',
    },
    urlField: {
        marginBottom: 10,
    },
}));

export default function CreateTasks({
    createEvent,
    eventError,
    createProject,
    projectError,
    createResource,
    resourceError,
}) {
    const classes = useStyles();

    const [itemType, setItemType] = React.useState(null);
    const handleTypeChange = (value) => {
        setItemType(value);
    };

    const [successState, setSuccessState] = React.useState({
        eventSuccess: false,
        projectSuccess: false,
        resourceSuccess: false,
    });

    const handleSuccessClose = () => {
        setSuccessState({
            ...successState,
            eventSuccess: false,
            projectSuccess: false,
            resourceSuccess: false,
        });
    };

    // const {
    //     createEvent,
    //     eventError,
    //     createProject,
    //     projectError,
    //     createResource,
    //     resourceError,
    // } = props;

    return (
        <div>
            {/* {'Change type of field (date/checkbox/text) accordingly'}
      <br /> */}
            <Grid container direction="row" justify="center">
                {/* <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={successState.eventSuccess}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          message="Event created successfully !"
        /> */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={successState.projectSuccess}
                    autoHideDuration={2000}
                    onClose={handleSuccessClose}
                    message="Project created successfully !"
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={successState.resourceSuccess}
                    autoHideDuration={2000}
                    onClose={handleSuccessClose}
                    message="Resource created successfully !"
                />
                <Grid item sm={10} lg={6}>
                    <Paper elevation={3}>
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <Typography
                                        variant="h4"
                                        className={classes.head}
                                    >
                                        Create a new Item
                                    </Typography>
                                </CardTitle>
                                <Row className="form-group">
                                    <Label htmlFor="type" sm={12}>
                                        <h6>Type of Item:</h6>
                                    </Label>
                                    <Col sm={12}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                        >
                                            <Grid item sm={3}>
                                                <Button
                                                    active={
                                                        itemType === 'event'
                                                    }
                                                    variant={
                                                        itemType === 'event'
                                                            ? 'contained'
                                                            : 'outlined'
                                                    }
                                                    color="primary"
                                                    onClick={() =>
                                                        handleTypeChange(
                                                            'event'
                                                        )
                                                    }
                                                >
                                                    Event
                                                </Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button
                                                    active={
                                                        itemType === 'project'
                                                    }
                                                    variant={
                                                        itemType === 'project'
                                                            ? 'contained'
                                                            : 'outlined'
                                                    }
                                                    color="primary"
                                                    onClick={() =>
                                                        handleTypeChange(
                                                            'project'
                                                        )
                                                    }
                                                >
                                                    Project
                                                </Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button
                                                    active={
                                                        itemType === 'resource'
                                                    }
                                                    variant={
                                                        itemType === 'resource'
                                                            ? 'contained'
                                                            : 'outlined'
                                                    }
                                                    color="primary"
                                                    onClick={() =>
                                                        handleTypeChange(
                                                            'resource'
                                                        )
                                                    }
                                                >
                                                    Resource
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Col>
                                </Row>
                                {itemType === 'event' ? (
                                    <CreateEventForm
                                        createEvent={createEvent}
                                        eventError={eventError}
                                    />
                                ) : null}
                                {itemType === 'project' ? (
                                    <CreateProjectForm
                                        createProject={createProject}
                                        projectError={projectError}
                                    />
                                ) : null}
                                {itemType === 'resource' ? (
                                    <CreateResourceForm
                                        createResource={createResource}
                                        resourceError={resourceError}
                                    />
                                ) : null}
                            </CardBody>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

CreateTasks.propTypes = {
    createEvent: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    createResource: PropTypes.func.isRequired,
    eventError: PropTypes.string.isRequired,
    projectError: PropTypes.string.isRequired,
    resourceError: PropTypes.string.isRequired,
};
