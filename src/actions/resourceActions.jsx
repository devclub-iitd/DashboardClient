import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';

export const addResources = resources => ({
  type: ActionTypes.ADD_RESOURCES,
  payload: resources,
});

export const resourcesFailed = errmess => ({
  type: ActionTypes.RESOURCES_FAILED,
  payload: errmess,
});

export const resourcesLoading = () => ({
  type: ActionTypes.RESOURCES_LOADING,
});

export const fetchAllResources = () => (dispatch) => {
  // dispatch(resourcesLoading(true));

  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(API.resourceGetAllDBAPI, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Origin: 'localhost:3001/',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      console.log(error);
      throw error;
    },
    (error) => {
      const errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(resources => dispatch(addResources(resources.data)))
    .catch(error => dispatch(resourcesFailed(error.message)));
};

export const createResource = resource => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(API.resourceAPI, {
    method: 'POST',
    body: JSON.stringify(resource),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cResource) => {
      console.log('New Resource: ', cResource);
      dispatch(fetchAllResources());
    })
    .catch(error => console.log(error));
};

export const editResource = resource => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.resourceAPI}${resource._id}`, {
    method: 'PUT',
    body: JSON.stringify(resource),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cResource) => {
      console.log('Updated Resource: ', cResource);
      dispatch(fetchAllResources());
    })
    .catch(error => console.log(error));
};

export const deleteResource = resourceId => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(API.resourceDeleteAPI, {
    method: 'POST',
    body: JSON.stringify({ id: resourceId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((res) => {
      // console.log('User data updated', user);
      console.log(res);
      dispatch(fetchAllResources());
    })
    .catch(error => console.log('Error: ', error.message));
};
