import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';
import { logoutUser } from './userActions';

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

    const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

    return fetch(API.resourceGetAllDBAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Origin: 'localhost:3001/',
            Authorization: bearer,
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                response.json().then((res) => {
                    // console.log('Server response: ', res);
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                // console.log(error);
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

export const createResource = (resource) => (dispatch) => {
    const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

    return fetch(API.resourceAPI, {
        method: 'POST',
        body: JSON.stringify(resource),
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                response.json().then((res) => {
                    // console.log('Server response: ', res);
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
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
        .then((cResource) => {
            // console.log('New Resource: ', cResource);
            dispatch(fetchAllResources());
        })
        .catch((error) => dispatch(resourceServerError(error.message)));
};

export const editResource = (resource) => (dispatch) => {
    const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

    return fetch(`${API.resourceAPI}${resource._id}`, {
        method: 'PUT',
        body: JSON.stringify(resource),
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                response.json().then((res) => {
                    // console.log('Server response: ', res);
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
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
        .then((cResource) => {
            // console.log('Updated Resource: ', cResource);
            dispatch(fetchAllResources());
        })
        .catch((error) => dispatch(resourceServerError(error.message)));
};

export const deleteResource = (resourceId) => (dispatch) => {
    const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

    return fetch(API.resourceDeleteAPI, {
        method: 'POST',
        body: JSON.stringify({ id: resourceId }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                response.json().then((res) => {
                    // console.log('Server response: ', res);
                    if (res.name === 'Unauthorized') {
                        dispatch(logoutUser('timeout'));
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
        .then((res) => {
            // console.log('User data updated', user);
            // console.log(res);
            dispatch(fetchAllResources());
        })
        .catch((error) => dispatch(resourceServerError(error.message)));
};
