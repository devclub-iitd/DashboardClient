import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';

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

export const fetchAllEvents = () => (dispatch) => {
  // dispatch(eventsLoading(true));

  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.eventAPI}`, {
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
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      console.log(error);
      throw error;
    },
    (error) => {
      const errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then((events) => {
      const gotEvents = events.data;
      const allEvents = gotEvents.map(event => ({
        ...event,
        start_date: event.start_date === null ? new Date() : new Date(event.start_date),
        end_date: event.end_date === null ? new Date() : new Date(event.end_date),
      }));
      dispatch(addEvents(allEvents));
    })
    .catch(error => dispatch(eventsFailed(error.message)));
};

export const createEvent = event => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.eventAPI}`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cEvent) => {
      console.log('New Event: ', cEvent);
      dispatch(fetchAllEvents());
    })
    .catch(error => console.log(error));
};

export const editEvent = event => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.eventAPI}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    },
    (error) => {
      throw error;
    })
    .then(response => response.json())
    .then((cEvent) => {
      console.log('Updated Event: ', cEvent);
      dispatch(fetchAllEvents());
    })
    .catch(error => console.log(error));
};

export const deleteEvent = eventId => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.eventAPI}delete/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
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
      console.log(res);
      dispatch(fetchAllEvents());
    })
    .catch(error => console.log('Error: ', error.message));
};
