/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumUsers from '../components/dumUser';

const Users = (state = {
  isLoading: false,
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
        isLoading: false,
        userErrMess: null,
        serverError: null,
        user: action.payload,
      };

    case ActionTypes.ADD_ALL_USERS:
      return {
        ...state,
        isLoading: false,
        usersErrMess: null,
        serverError: null,
        allUsers: action.payload,
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        userErrMess: null,
        serverError: null,
        isLoading: true,
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        serverError: null,
        userErrMess: action.payload,
      };

    case ActionTypes.USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        serverError: null,
        usersErrMess: null,
      };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        serverError: null,
        userErrMess: null,
        usersErrMess: action.payload,
      };

    case ActionTypes.USER_SERVER_ERROR:
      return {
        ...state,
        isLoading: false,
        serverError: 'ERROR',
      };

    case ActionTypes.USER_MISC_ERROR_FIN:
      return {
        ...state,
        isLoading: false,
        serverError: null,
      };

    default:
      return state;
  }
};

export default Users;
