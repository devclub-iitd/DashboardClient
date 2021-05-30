/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';
import { receiveLogout, registerError, loginError } from './userActions';

export const addEvents = (events) => ({
    type: ActionTypes.ADD_EVENTS,
    payload: events,
});

export const eventsFailed = (errmess) => ({
    type: ActionTypes.EVENTS_FAILED,
    payload: errmess,
});

export const eventsLoading = () => ({
    type: ActionTypes.EVENTS_LOADING,
});

export const eventServerError = () => ({
    type: ActionTypes.EVENT_SERVER_ERROR,
});

export const eventErrorFin = () => ({
    type: ActionTypes.EVENT_MISC_ERROR_FIN,
});

function objToStrMap(obj) {
    const strMap = new Map();
    Object.keys(obj).map((k) => strMap.set(k, obj[k]));
    return strMap;
}

export const fetchAllEvents = () => (dispatch) => {
    dispatch(eventsLoading(true));
    return fetch(API.eventGetAllDBAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(receiveLogout('logout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                const errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then((response) => response.json())
        .then((events) => {
            const gotEvents = events.data;
            const allEvents = gotEvents.map((event) => {
                const upEvent = {
                    ...event,
                    url: objToStrMap(event.url),
                    assignee:
                        event.assignee === null || event.assignee === undefined
                            ? []
                            : event.assignee,
                    start_date:
                        event.start_date === null ||
                        event.start_date === undefined
                            ? new Date()
                            : new Date(event.start_date),
                    end_date:
                        event.end_date === null || event.end_date === undefined
                            ? new Date()
                            : new Date(event.end_date),
                };
                if (!upEvent.url.has('url')) {
                    upEvent.url.set('url', '');
                }
                return upEvent;
            });
            dispatch(addEvents(allEvents));
        })
        .catch((error) => dispatch(eventsFailed(error.message)));
};

export const createEvent = (event, cb) => (dispatch) => {
    return fetch(API.eventAPI, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(receiveLogout('logout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            if (cb) {
                cb();
            }
            dispatch(fetchAllEvents());
        })
        .catch((error) => dispatch(eventServerError(error.message)));
};

export const editEvent = (event, cb) => (dispatch) => {
    return fetch(`${API.eventAPI}${event._id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(receiveLogout('logout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            if (cb) {
                cb();
            }
            dispatch(fetchAllEvents());
        })
        .catch((error) => dispatch(eventServerError(error.message)));
};

export const deleteEvent = (eventId, cb) => (dispatch) => {
    return fetch(API.eventDeleteAPI, {
        method: 'POST',
        body: JSON.stringify({ id: eventId }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(receiveLogout('logout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            if (cb) {
                cb();
            }
            dispatch(fetchAllEvents());
        })
        .catch((error) => dispatch(eventServerError(error.message)));
};
