/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumEvents from '../components/dumEvents';

const Events = (
  state = {
    isLoading: true,
    errMess: null,
    newFailed: false,
    editFailed: false,
    removeFailed: false,
    allEvents: dumEvents,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_EVENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
        allEvents: action.payload,
      };

    case ActionTypes.EVENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
      };

    case ActionTypes.EVENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: false,
        editFailed: false,
        removeFailed: false,
        errMess: action.payload,
      };

    case ActionTypes.CREATE_EVENT_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: true,
        editFailed: false,
        removeFailed: false,
        errMess: null,
      };

    case ActionTypes.EDIT_EVENT_FAILED:
      return {
        ...state,
        isLoading: false,
        newFailed: false,
        editFailed: true,
        removeFailed: false,
        errMess: null,
      };

    case ActionTypes.REMOVE_EVENT_FAILED:
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

export default Events;
