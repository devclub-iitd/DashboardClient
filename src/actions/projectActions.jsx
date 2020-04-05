import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';

export const addProjects = projects => ({
  type: ActionTypes.ADD_PROJECTS,
  payload: projects,
});

export const projectsFailed = errmess => ({
  type: ActionTypes.PROJECTS_FAILED,
  payload: errmess,
});

export const projectsLoading = () => ({
  type: ActionTypes.PROJECTS_LOADING,
});

export const fetchAllProjects = () => (dispatch) => {
  dispatch(projectsLoading(true));

  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.projectAPI}`, {
    method: 'GET',
    // body: JSON.stringify(newComment),
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
    .then(projects => dispatch(addProjects(projects)))
    .catch(error => dispatch(projectsFailed(error.message)));
};

export const createProject = project => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.projectAPI}`, {
    method: 'POST',
    body: JSON.stringify(project),
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
    .then((cProject) => {
      console.log('New Project: ', cProject);
      dispatch(fetchAllProjects());
    })
    .catch(error => console.log(error));
};

export const editProject = project => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.projectAPI}`, {
    method: 'PUT',
    body: JSON.stringify(project),
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
    .then((cEvent) => {
      console.log('Updated Project: ', cEvent);
      dispatch(fetchAllProjects());
    })
    .catch(error => console.log(error));
};
