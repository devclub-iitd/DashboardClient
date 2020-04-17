/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumUsers from '../components/dumUser';

const Users = (state = {
  isLoading: false,
  userErrMess: null,
  usersErrMess: null,
  user: null,
  passwordFailed: false,
  editFailed: false,
  removeFailed: false,
  allUsers: dumUsers,
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        isLoading: false,
        userErrMess: null,
        usersErrMess: null,
        passwordFailed: false,
        editFailed: false,
        removeFailed: false,
        user: action.payload,
      };

    case ActionTypes.ADD_ALL_USERS:
      return {
        ...state,
        isLoading: false,
        userErrMess: null,
        usersErrMess: null,
        passwordFailed: false,
        editFailed: false,
        removeFailed: false,
        allUsers: action.payload,
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        userErrMess: null,
        usersErrMess: null,
        passwordFailed: false,
        editFailed: false,
        removeFailed: false,
        isLoading: true,
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        passwordFailed: false,
        editFailed: false,
        userErrMess: action.payload,
        removeFailed: false,
        usersErrMess: null,
      };

    case ActionTypes.USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        passwordFailed: false,
        editFailed: false,
        removeFailed: false,
        userErrMess: null,
        usersErrMess: null,
      };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        passwordFailed: false,
        editFailed: false,
        userErrMess: null,
        removeFailed: false,
        usersErrMess: action.payload,
      };

    case ActionTypes.USER_PASSWORD_CHANGE_FAILED:
      return {
        ...state,
        userErrMess: null,
        usersErrMess: null,
        removeFailed: false,
        passwordFailed: true,
        editFailed: false,
      };

    case ActionTypes.EDIT_USER_FAILED:
      return {
        ...state,
        userErrMess: null,
        usersErrMess: null,
        passwordFailed: false,
        removeFailed: false,
        editFailed: true,
      };

    case ActionTypes.REMOVE_USER_FAILED:
      return {
        ...state,
        userErrMess: null,
        usersErrMess: null,
        passwordFailed: false,
        removeFailed: true,
        editFailed: true,
      };

    default:
      return state;
  }
};

export default Users;
