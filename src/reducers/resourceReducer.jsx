/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumResources from '../components/dumResources';

const Resources = (
  state = {
    isLoading: true,
    errMess: null,
    serverError: null,
    allResources: [],
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_RESOURCES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        serverError: null,
        allResources: action.payload,
      };

    case ActionTypes.RESOURCES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        serverError: null,
      };

    case ActionTypes.RESOURCES_FAILED:
      return {
        ...state,
        isLoading: false,
        serverError: null,
        errMess: action.payload,
      };

    case ActionTypes.RESOURCE_SERVER_ERROR:
      return {
        ...state,
        isLoading: false,
        serverError: 'ERROR',
        errMess: null,
      };

    case ActionTypes.RESOURCE_MISC_ERROR_FIN:
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

export default Resources;
