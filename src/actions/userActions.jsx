/* eslint-disable import/prefer-default-export */
// import { userConstants } from '../_constants';
// import { userService } from '../_services';
// import { alertActions } from '.';
// import { history } from '../_helpers';
import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING,
});

export const userFailed = errmess => ({
  type: ActionTypes.USER_FAILED,
  payload: errmess,
});

export const unapprovedUserFailed = errmess => ({
  type: ActionTypes.UNAPPROVED_USERS_FAILED,
  payload: errmess,
});

export const addUser = user => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const addUsers = users => ({
  type: ActionTypes.ADD_USERS,
  payload: users,
});

export const addUnapprovedUsers = users => ({
  type: ActionTypes.ADD_UNAPPROVED_USERS,
  payload: users,
});

// export const changePassword = () => ({
//   type: ActionTypes.USER_PASSWORD_CHANGE,
// });

export const changePasswordFailed = errMess => ({
  type: ActionTypes.USER_PASSWORD_CHANGE_FAILED,
  payload: errMess,
});

export const requestLogin = creds => ({
  type: ActionTypes.LOGIN_REQUEST,
  creds,
});

export const receiveLogin = response => ({
  type: ActionTypes.LOGIN_SUCCESS,
  token: response.token,
});

export const loginError = message => ({
  type: ActionTypes.LOGIN_FAILURE,
  message,
});

export const requestLogout = () => ({
  type: ActionTypes.LOGOUT_REQUEST,
});

export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});

export const fetchUser = () => (dispatch) => {
  dispatch(userLoading(true));

  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(API.userAPI, {
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
    .then(user => dispatch(addUser(user)))
    .catch(error => dispatch(userFailed(error.message)));
};

export const fetchAllUsers = () => (dispatch) => {
  dispatch(userLoading(true));

  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.userAPI}all`, {
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
    .then(users => dispatch(addUsers(users)))
    .catch(error => dispatch(userFailed(error.message)));
};

export const loginUser = creds => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(API.loginAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
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
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        // Dispatch the success action
        dispatch(fetchUser());
        dispatch(receiveLogin(response));
      } else {
        const error = new Error(`Error ${response.status}`);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.message)));
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(userFailed('Error 401: Unauthorized'));
  dispatch(receiveLogout());
};

// update user profile data, only the user can update profile, not even the admin
export const updateUser = updatedUser => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.userAPI}update`, {
    method: 'PUT',
    body: JSON.stringify(updatedUser),
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
    .then((creds) => {
      // console.log('User data updated', user);
      dispatch(loginUser(creds));
    })
    .catch(error => dispatch(changePasswordFailed(error.message)));
};

// change password
/*
  {
    "password": "pass",
  }
*/
export const changePassword = updatedPass => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;
  const creds = localStorage.getItem('creds');
  creds.password = updatedPass;
  return fetch(`${API.userAPI}changePassword`, {
    method: 'PUT',
    body: JSON.stringify(creds),
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
    .then((user) => {
      console.log('User password changed', user);
      dispatch(addUser(user));
    })
    .catch(error => dispatch(userFailed(error.message)));
};

/* approve users: only by an admin
  users: [
    {"entryNo": ""},
    {"entryNo": ""},
    ...
  ]
*/
export const approveUsers = approvedUsers => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.postApproveAPI}`, {
    method: 'PUT',
    body: JSON.stringify(approvedUsers),
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
    .then((users) => {
      console.log('Approved users: \n', users);
    })
    .catch(error => dispatch(userFailed(error.message)));
};

// get unapproved users
export const getUnapprovedUsers = () => (dispatch) => {
  const bearer = `Bearer ${localStorage.getItem('token')}`;

  return fetch(`${API.postApproveAPI}`, {
    method: 'GET',
    // body: JSON.stringify(approvedUsers),
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
    .then((users) => {
      console.log('Unapproved users: \n', users);
      dispatch(addUnapprovedUsers(users));
    })
    .catch(error => dispatch(unapprovedUserFailed(error.message)));
};

// function login(username, password) {
//   return (dispatch) => {
//     dispatch(request({ username }));

//     userService.login(username, password)
//       .then(
//         (user) => {
//           dispatch(success(user));
//           history.push('/');
//         },
//         (error) => {
//           dispatch(failure(error.toString()));
//           dispatch(alertActions.error(error.toString()));
//         },
//       );
//   };

//   function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
//   function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
//   function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
// }

// function logout() {
//   userService.logout();
//   return { type: userConstants.LOGOUT };
// }

// function register(user) {
//   return (dispatch) => {
//     dispatch(request(user));

//     userService.register(user)
//       .then(
//         (user) => {
//           dispatch(success());
//           history.push('/login');
//           dispatch(alertActions.success('Registration successful'));
//         },
//         (error) => {
//           dispatch(failure(error.toString()));
//           dispatch(alertActions.error(error.toString()));
//         },
//       );
//   };

//   function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
//   function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
//   function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }
// }

// function getAll() {
//   return (dispatch) => {
//     dispatch(request());

//     userService.getAll()
//       .then(
//         users => dispatch(success(users)),
//         error => dispatch(failure(error.toString())),
//       );
//   };

//   function request() { return { type: userConstants.GETALL_REQUEST }; }
//   function success(users) { return { type: userConstants.GETALL_SUCCESS, users }; }
//   function failure(error) { return { type: userConstants.GETALL_FAILURE, error }; }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   return (dispatch) => {
//     dispatch(request(id));

//     userService.delete(id)
//       .then(
//         user => dispatch(success(id)),
//         error => dispatch(failure(id, error.toString())),
//       );
//   };

//   function request(id) { return { type: userConstants.DELETE_REQUEST, id }; }
//   function success(id) { return { type: userConstants.DELETE_SUCCESS, id }; }
//   function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error }; }
// }

// export const userActions = {
//   login,
//   logout,
//   register,
//   getAll,
//   delete: _delete,
// };
