/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';
import dumEvents from '../components/dumEvents';

const Events = (
  state = {
    isLoading: true,
    errMess: null,
    serverError: null,
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
        serverError: null,
        allEvents: action.payload,
      };

    case ActionTypes.EVENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        serverError: null,
      };

    case ActionTypes.EVENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        serverError: null,
        errMess: action.payload,
      };

    case ActionTypes.EVENT_SERVER_ERROR:
      return {
        ...state,
        isLoading: false,
        serverError: 'ERROR',
        errMess: action.payload,
      };

    case ActionTypes.EVENT_MISC_ERROR_FIN:
      return {
        ...state,
        isLoading: false,
        serverError: null,
        errMess: action.payload,
      };

    default:
      return state;
  }
};

export default Events;
