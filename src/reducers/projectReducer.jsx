/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';

const Projects = (
  state = {
    isLoading: true,
    errMess: null,
    allProjects: [],
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allProjects: action.payload,
      };

    case ActionTypes.PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        allProjects: null,
      };

    case ActionTypes.PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        allProjects: null,
      };

    default:
      return state;
  }
};

export default Projects;
