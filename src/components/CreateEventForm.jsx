import React, { Fragment } from 'react';
import { emphasize, makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    FormControlLabel,
    Button,
    Switch,
    Fab,
    Snackbar,
    TextField,
} from '@material-ui/core';
import { Row, Col, Label } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import * as Utils from '../utils';

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

export default function CreateTasks(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        newEvent: {
            name: '',
            description: '',
            start_date: new Date(),
            end_date: new Date(),
            embed_code: '',
            display_on_website: false,
            url: new Map([['url', '']]),
            assignee: [],
        },
        urlFields: [{ type: 'url', url: '' }],
        success: false,
    });

    const handleFormValuesChange = (event, name) => {
        if (name === 'start_date') {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    start_date: event,
                },
            });
        } else if (name === 'end_date') {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    end_date: event,
                },
            });
        } else if (name === 'display') {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    display_on_website: event.target.checked,
                },
            });
        } else {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    [event.target.name]: event.target.value,
                },
            });
        }
    };

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    const handleAddUrlFields = () => {
        const values = [...state.urlFields];
        values.push({ type: '', url: '' });
        setState({
            ...state,
            urlFields: values,
        });
    };

    const handleRemoveUrlFields = (index) => {
        const values = [...state.urlFields];
        values.splice(index, 1);
        setState({
            ...state,
            urlFields: values,
        });
    };

    const handleUrlFieldChange = (index, event) => {
        const values = [...state.urlFields];
        if (event.target.name === 'type') {
            if (values[index].type === 'url') {
                return;
            }
            values[index].type = event.target.value;
        } else {
            values[index].url = event.target.value;
        }
        setState({
            ...state,
            urlFields: values,
        });
    };

    const handleSuccessClose = () => {
        setState({
            ...state,
            success: false,
        });
    };

    const resetForm = () => {
        setState({
            ...state,
            newEvent: {
                ...state.newEvent,
                name: '',
                description: '',
                start_date: new Date(),
                end_date: new Date(),
                embed_code: '',
                display_on_website: false,
                url: new Map([['url', '']]),
                assignee: [],
            },
            urlFields: [{ type: 'url', url: '' }],
        });
    };

    const submitEventForm = () => {
        const urlMap = new Map();
        state.urlFields.map((urlField) =>
            urlMap.set(urlField.type, urlField.url)
        );
        const newEvent = {
            ...state.newEvent,
            url: Utils.strMapToObj(urlMap),
        };
        // console.log('event: ', newEvent);
        props.createEvent(newEvent);
        if (props.eventError === null) {
            setState({
                ...state,
                newEvent: {
                    ...state.newEvent,
                    name: '',
                    description: '',
                    start_date: new Date(),
                    end_date: new Date(),
                    embed_code: '',
                    display_on_website: false,
                    url: new Map([['url', '']]),
                    assignee: [],
                },
                urlFields: [{ type: 'url', url: '' }],
                success: true,
            });
        }
        // resetForm();
    };

    return (
        <div>
            {/* {'Change type of field (date/checkbox/text) accordingly'}
      <br /> */}
            <Grid container direction="row" justify="center">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={state.success}
                    autoHideDuration={2000}
                    onClose={handleSuccessClose}
                    message="Event created successfully !"
                />
                <LocalForm onSubmit={submitEventForm}>
                    <Row className="form-group">
                        <Label htmlFor="name" md={4}>
                            <h6>Name of Event:</h6>
                        </Label>
                        <Col md={8}>
                            <Control.text
                                model=".name"
                                id="name"
                                name="name"
                                placeholder="Event Name*"
                                className="form-control"
                                value={state.newEvent.name}
                                onChange={handleFormValuesChange}
                                validators={{
                                    required,
                                    minLength: minLength(1),
                                    maxLength: maxLength(20),
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    required: 'Required ',
                                    minLength:
                                        'Must be greater than 2 characters',
                                    maxLength: 'Must be 25 characters or less',
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="description" md={12}>
                            <h6>Description:</h6>
                        </Label>
                        <Col md={12}>
                            <Control.textarea
                                model=".description"
                                id="description"
                                name="description"
                                placeholder="Event Description*"
                                rows="8"
                                value={state.newEvent.description}
                                onChange={handleFormValuesChange}
                                className="form-control"
                                validators={{
                                    required,
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".description"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Select Start Date of Event"
                                    format="MM/dd/yyyy"
                                    value={state.newEvent.start_date}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'start_date')
                                    }
                                    minDate={Date.now()}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Select End Date of Event"
                                    format="MM/dd/yyyy"
                                    value={state.newEvent.end_date}
                                    onChange={(e) =>
                                        handleFormValuesChange(e, 'end_date')
                                    }
                                    minDate={state.newEvent.start_date}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="embed_code" md={12}>
                            <h6>Embedded Code:</h6>
                        </Label>
                        <Col md={{ size: 8, offset: 2 }}>
                            <Control.textarea
                                model=".embed_code"
                                id="embed_code"
                                name="embed_code"
                                placeholder="Type embedded code"
                                rows="4"
                                value={state.newEvent.embed_code}
                                onChange={handleFormValuesChange}
                                className="form-control"
                                validators={{
                                    required,
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".embed_code"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="embed_code" sm={5}>
                                <h6>Display on website: </h6>
                            </Label>
                            <FormControlLabel
                                sm={2}
                                control={
                                    <Switch
                                        checked={
                                            state.newEvent.display_on_website
                                        }
                                        onChange={(e) =>
                                            handleFormValuesChange(e, 'display')
                                        }
                                    />
                                }
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="urlFields" md={12}>
                            <h6>Url:</h6>
                        </Label>
                        <Col sm={12}>
                            {state.urlFields.map((urlField, index) => (
                                <Fragment key={`${urlField}`}>
                                    <Row className="form-group">
                                        {/* sm={12} md={{ size: 4, offset: 1 }} */}
                                        <Col
                                            sm={12}
                                            md={{ size: 4, offset: 1 }}
                                        >
                                            <TextField
                                                label="type"
                                                className={classes.urlField}
                                                id="type"
                                                name="type"
                                                variant="filled"
                                                value={urlField.type}
                                                onChange={(event) =>
                                                    handleUrlFieldChange(
                                                        index,
                                                        event
                                                    )
                                                }
                                            />
                                        </Col>
                                        {/* sm={12} md={4} */}
                                        <Col sm={12} md={4}>
                                            <TextField
                                                label="url"
                                                className={classes.urlField}
                                                id="url"
                                                name="url"
                                                variant="filled"
                                                value={urlField.url}
                                                onChange={(event) =>
                                                    handleUrlFieldChange(
                                                        index,
                                                        event
                                                    )
                                                }
                                            />
                                        </Col>
                                        {/* sm={2} */}
                                        {urlField.type === 'url' ? null : (
                                            <Col md={2}>
                                                <Fab
                                                    size="small"
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        handleRemoveUrlFields(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <DeleteOutlinedIcon />
                                                </Fab>
                                            </Col>
                                        )}
                                    </Row>
                                </Fragment>
                            ))}
                            <Fab
                                size="small"
                                color="secondary"
                                aria-label="add"
                                onClick={() => handleAddUrlFields()}
                            >
                                <AddIcon />
                            </Fab>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        {/* md={{ size: 4, offset: 3 }} */}
                        <Col
                            xs={{ size: 7, offset: 1 }}
                            md={{ size: 4, offset: 3 }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Create Event
                            </Button>
                        </Col>
                        {/* md={{ size: 2 }} */}
                        <Col xs={3} md={{ size: 2 }}>
                            <Button
                                type="reset"
                                variant="contained"
                                color="primary"
                                onClick={() => resetForm()}
                            >
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </Grid>
        </div>
    );
}

CreateTasks.propTypes = {
    createEvent: PropTypes.func.isRequired,
    eventError: PropTypes.string.isRequired,
};
