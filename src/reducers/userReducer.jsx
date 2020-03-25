/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';

export default Users = (state = {
  isLoading: true,
  errMess: null,
  user: null,
  users: [],
  unapprovedUsers: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: action.payload,
        users: [],
        unapprovedUsers: [],
      };

    case ActionTypes.ADD_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: state.user,
        users: action.payload,
        unapprovedUsers: [],
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        user: null,
        users: [],
        unapprovedUsers: [],
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: null,
        users: [],
        unapprovedUsers: [],
      };

    case ActionTypes.ADD_UNAPPROVED_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: state.user,
        users: state.users,
        unapprovedUsers: action.payload,
      };

    case ActionTypes.UNAPPROVED_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: state.user,
        users: state.user,
        unapprovedUsers: [],
      };

    default:
      return state;
  }
};
