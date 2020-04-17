/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumProjects from '../components/dumProjects';

const Projects = (
  state = {
    isLoading: true,
    errMess: null,
    newFailed: false,
    editFailed: false,
    removeFailed: false,
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
        newFailed: false,
        editFailed: false,
        removeFailed: false,
        allProjects: action.payload,
      };

    case ActionTypes.PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
        errMess: null,
      };

    case ActionTypes.PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
        errMess: action.payload,
      };

    case ActionTypes.CREATE_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: true,
        editFailed: false,
        removeFailed: false,
        errMess: null,
      };

    case ActionTypes.EDIT_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: false,
        editFailed: true,
        removeFailed: false,
        errMess: null,
      };

    case ActionTypes.REMOVE_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: false,
        editFailed: false,
        removeFailed: true,
        errMess: null,
      };

    default:
      return state;
  }
};

export default Projects;
