/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumProjects from '../components/dumProjects';

const Projects = (
  state = {
    isLoading: true,
    errMess: null,
    serverError: null,
    allProjects: dumProjects,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        serverError: null,
        allProjects: action.payload,
      };

    case ActionTypes.PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        serverError: null,
        errMess: null,
      };

    case ActionTypes.PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        serverError: null,
        errMess: action.payload,
      };

    case ActionTypes.PROJECT_SERVER_ERROR:
      return {
        ...state,
        isLoading: false,
        serverError: 'ERROR',
        errMess: null,
      };

    case ActionTypes.PROJECT_MISC_ERROR_FIN:
      return {
        ...state,
        isLoading: false,
        serverError: null,
        errMess: null,
      };

    default:
      return state;
  }
};

export default Projects;
