/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';

const Users = (state = {
  userLoading: false,
  usersLoading: false,
  userErrMess: null,
  usersErrMess: null,
  user: {},
  serverError: null,
  allUsers: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        userLoading: false,
        userErrMess: null,
        serverError: null,
        user: action.payload,
      };

    case ActionTypes.ADD_ALL_USERS:
      return {
        ...state,
        usersLoading: false,
        usersErrMess: null,
        serverError: null,
        allUsers: action.payload,
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        userErrMess: null,
        serverError: null,
        userLoading: true,
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        userLoading: false,
        serverError: null,
        userErrMess: action.payload,
      };

    case ActionTypes.USERS_LOADING:
      return {
        ...state,
        usersLoading: true,
        serverError: null,
        usersErrMess: null,
      };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        usersLoading: false,
        serverError: null,
        userErrMess: null,
        usersErrMess: action.payload,
      };

    case ActionTypes.USER_SERVER_ERROR:
      return {
        ...state,
        userLoading: false,
        usersLoading: false,
        serverError: 'ERROR',
      };

    case ActionTypes.USER_MISC_ERROR_FIN:
      return {
        ...state,
        userLoading: false,
        usersLoading: false,
        serverError: null,
      };

    default:
      return state;
  }
};

export default Users;
