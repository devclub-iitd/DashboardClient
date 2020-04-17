/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumResources from '../components/dumResources';

const Resources = (
  state = {
    isLoading: true,
    errMess: null,
    newFailed: false,
    editFailed: false,
    removeFailed: false,
    allResources: dumResources,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_RESOURCES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
        allResources: action.payload,
      };

    case ActionTypes.RESOURCES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
      };

    case ActionTypes.RESOURCES_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
        errMess: action.payload,
      };

    case ActionTypes.CREATE_RESOURCE_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: true,
        editFailed: false,
        removeFailed: false,
        errMess: null,
      };

    case ActionTypes.EDIT_RESOURCE_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: false,
        editFailed: true,
        removeFailed: false,
        errMess: null,
      };

    case ActionTypes.REMOVE_RESOURCE_FAILED:
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

export default Resources;
