import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';
import { logoutUser } from './userActions';

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

export const projectServerError = () => ({
  type: ActionTypes.PROJECT_SERVER_ERROR,
});

export const projectErrorFin = () => ({
  type: ActionTypes.PROJECT_MISC_ERROR_FIN,
});

function objToStrMap(obj) {
  const strMap = new Map();
  // for (const k of Object.keys(obj)) {
  //   strMap.set(k, obj[k]);
  // }
  Object.keys(obj).map(k => strMap.set(k, obj[k]));
  return strMap;
}

export const fetchAllProjects = () => (dispatch) => {
  dispatch(projectsLoading(true));

  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(`${API.projectGetAllDBAPI}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      // console.log(error);
      throw error;
    },
    (error) => {
      const errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then((projects) => {
      const gotProjects = projects.data;
      // fetch gets url as an object, converting to map strings required
      const allProjects = gotProjects.map(pro => ({
        ...pro,
        url: objToStrMap(pro.url),
        members: pro.members === null || pro.members === undefined ? [] : pro.members,
        start_date: pro.start_date === null || pro.start_date === undefined ? new Date() : new Date(pro.start_date),
        end_date: pro.end_date === null || pro.end_date === undefined ? new Date() : new Date(pro.end_date),
      }));
      dispatch(addProjects(allProjects));
    })
    .catch(error => dispatch(projectsFailed(error.message)));
};

export const createProject = project => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(API.projectAPI, {
    method: 'POST',
    body: JSON.stringify(project),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cProject) => {
      // console.log('New Project: ', cProject);
      dispatch(fetchAllProjects());
    })
    .catch(error => dispatch(projectServerError(error.message)));
};

export const editProject = project => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(`${API.projectAPI}${project._id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cEvent) => {
      // console.log('Updated Project: ', cEvent);
      dispatch(fetchAllProjects());
    })
    .catch(error => dispatch(projectServerError(error.message)));
};

export const deleteProject = projectId => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(API.projectDeleteAPI, {
    method: 'POST',
    body: JSON.stringify({ id: projectId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
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
      // console.log(res);
      dispatch(fetchAllProjects());
    })
    .catch(error => dispatch(projectServerError(error.message)));
};
