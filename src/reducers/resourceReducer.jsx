/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumResources from '../components/dumResources';

const Resources = (
  state = {
    isLoading: true,
    errMess: null,
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
        allResources: action.payload,
      };

    case ActionTypes.RESOURCES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.RESOURCES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};

export default Resources;
