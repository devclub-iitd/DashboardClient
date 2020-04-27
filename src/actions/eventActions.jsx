import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';
import { logoutUser } from './userActions';

export const addEvents = events => ({
  type: ActionTypes.ADD_EVENTS,
  payload: events,
});

export const eventsFailed = errmess => ({
  type: ActionTypes.EVENTS_FAILED,
  payload: errmess,
});

export const eventsLoading = () => ({
  type: ActionTypes.EVENTS_LOADING,
});

export const eventServerError = () => ({
  type: ActionTypes.EVENT_SERVER_ERROR,
});

export const eventErrorFin = () => ({
  type: ActionTypes.EVENT_MISC_ERROR_FIN,
});

function objToStrMap(obj) {
  const strMap = new Map();
  Object.keys(obj).map(k => strMap.set(k, obj[k]));
  return strMap;
}

export const fetchAllEvents = () => (dispatch) => {
  dispatch(eventsLoading(true));

  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(API.eventGetAllDBAPI, {
    method: 'GET',
    // body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
      // Origin: 'localhost:3001/',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      // console.log(error);
      throw error;
    },
    (error) => {
      const errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then((events) => {
      const gotEvents = events.data;
      // fetch gets url as an object, converting to map strings required
      const allEvents = gotEvents.map(event => ({
        ...event,
        url: objToStrMap(event.url),
        assignee: event.assignee === null || event.assignee === undefined ? [] : event.assignee,
        start_date: event.start_date === null || event.start_date === undefined ? new Date() : new Date(event.start_date),
        end_date: event.end_date === null || event.end_date === undefined ? new Date() : new Date(event.end_date),
      }));
      dispatch(addEvents(allEvents));
    })
    .catch(error => dispatch(eventsFailed(error.message)));
};

export const createEvent = event => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(API.eventAPI, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cEvent) => {
      // console.log('New Event: ', cEvent);
      dispatch(fetchAllEvents());
    })
    .catch(error => dispatch(eventServerError(error.message)));
};

export const editEvent = event => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(`${API.eventAPI}${event._id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cEvent) => {
      // console.log('Updated Event: ', cEvent);
      dispatch(fetchAllEvents());
    })
    .catch(error => dispatch(eventServerError(error.message)));
};

export const deleteEvent = eventId => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

  return fetch(API.eventDeleteAPI, {
    method: 'POST',
    body: JSON.stringify({ id: eventId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response;
      }
      response.json()
        .then((res) => {
          // console.log('Server response: ', res);
          if (res.name === 'Unauthorized') {
            dispatch(logoutUser('timeout'));
          }
        });
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((res) => {
      // console.log('User data updated', user);
      // console.log(res);
      dispatch(fetchAllEvents());
    })
    .catch(error => dispatch(eventServerError(error.message)));
};
