/* eslint-disable no-underscore-dangle */
import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';
import { logoutUser, registerError, loginError } from './userActions';

export const addResources = (resources) => ({
    type: ActionTypes.ADD_RESOURCES,
    payload: resources,
});

export const resourcesFailed = (errmess) => ({
    type: ActionTypes.RESOURCES_FAILED,
    payload: errmess,
});

export const resourcesLoading = () => ({
    type: ActionTypes.RESOURCES_LOADING,
});

export const resourceServerError = () => ({
    type: ActionTypes.RESOURCE_SERVER_ERROR,
});

export const resourceErrorFin = () => ({
    type: ActionTypes.RESOURCE_MISC_ERROR_FIN,
});

export const fetchAllResources = () => (dispatch) => {
    dispatch(resourcesLoading(true));
    return fetch(API.resourceGetAllDBAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
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
        .then((resources) => dispatch(addResources(resources.data)))
        .catch((error) => dispatch(resourcesFailed(error.message)));
};

export const createResource = (resource, cb) => (dispatch) => {
    return fetch(API.resourceAPI, {
        method: 'POST',
        body: JSON.stringify(resource),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
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
            dispatch(fetchAllResources());
        })
        .catch((error) => dispatch(resourceServerError(error.message)));
};

export const editResource = (resource, cb) => (dispatch) => {
    return fetch(`${API.resourceAPI}${resource._id}`, {
        method: 'PUT',
        body: JSON.stringify(resource),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
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
            dispatch(fetchAllResources());
        })
        .catch((error) => dispatch(resourceServerError(error.message)));
};

export const deleteResource = (resourceId, cb) => (dispatch) => {
    return fetch(API.resourceDeleteAPI, {
        method: 'POST',
        body: JSON.stringify({ id: resourceId }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
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
            dispatch(fetchAllResources());
        })
        .catch((error) => dispatch(resourceServerError(error.message)));
};
