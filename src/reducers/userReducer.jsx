/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';

const Users = (state = {
  isLoading: true,
  errMess: null,
  user: null,
  allUsers: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: action.payload,
        allUsers: [],
      };

    case ActionTypes.ADD_ALL_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: state.user,
        allUsers: action.payload,
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        user: null,
        allUsers: [],
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: null,
        allUsers: [],
      };

    case ActionTypes.USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        user: state.user,
        allUsers: [],
      };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: state.user,
        allUsers: [],
      };

    default:
      return state;
  }
};

export default Users;
