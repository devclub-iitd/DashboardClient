/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import * as ActionTypes from './ActionTypes';
import * as API from '../data/api_links';
import * as UserUtils from '../utils/userUtils';

export const userLoading = () => ({
    type: ActionTypes.USER_LOADING,
});

export const userFailed = (errmess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errmess,
});

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING,
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess,
});

export const addUser = (upUser) => ({
    type: ActionTypes.ADD_USER,
    payload: upUser,
});
export const addAllUsers = (users) => ({
    type: ActionTypes.ADD_ALL_USERS,
    payload: users,
});

export const userServerError = () => ({
    type: ActionTypes.USER_SERVER_ERROR,
});

export const userErrorFin = () => ({
    type: ActionTypes.USER_MISC_ERROR_FIN,
});

export const requestLogin = (creds) => ({
    type: ActionTypes.LOGIN_REQUEST,
    creds,
});

export const receiveLogin = () => ({
    type: ActionTypes.LOGIN_SUCCESS,
    // token: response.token,
});

export const loginError = (message) => ({
    type: ActionTypes.LOGIN_FAILURE,
    message,
});

export const loginErrorFin = () => ({
    type: ActionTypes.LOGIN_FAILURE_FIN,
});

export const requestLogout = () => ({
    type: ActionTypes.LOGOUT_REQUEST,
});

export const receiveLogout = (logoutType) => ({
    type: ActionTypes.LOGOUT_SUCCESS,
    payload: logoutType,
});

export const regErrorFin = () => ({
    type: ActionTypes.REGISTER_FIN,
});

export const requestRegister = () => ({
    type: ActionTypes.REGISTER_REQUEST,
});

export const receiveRegister = () => ({
    type: ActionTypes.REGISTER_SUCCESS,
});

export const registerError = (message) => ({
    type: ActionTypes.REGISTER_FAILED,
    payload: message,
});

export const newReg = () => ({
    type: ActionTypes.NEW_REG,
});

export const newRegDone = () => ({
    type: ActionTypes.NEW_REG_DONE,
});

export const logoutUser =
    (type = '') =>
    (dispatch) => {
        dispatch(requestLogout());
        // localStorage.removeItem('dcIITDDashboardToken');
        // localStorage.removeItem('userId');
        return fetch(`${API.logoutAPI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(
                (response) => {
                    if (response.status === 401 || response.ok) {
                        // localStorage.removeItem('currentUser');
                        dispatch(receiveLogout(type));
                    } else {
                        const error = new Error(
                            `Error ${response.status}: ${response.statusText}`
                        );
                        error.response = response;
                        throw error;
                    }
                },
                (error) => {
                    const errmess = new Error(error.message);
                    throw errmess;
                }
            )
            .catch((error) => dispatch(userFailed(error.message)));
    };

// export const fetchUser = (id) => (dispatch) => {
//     dispatch(userLoading(true));

//     const bearer = `Bearer ${localStorage.getItem('dcIITDDashboardToken')}`;

//     const query = {
//         query: {
//             _id: id,
//         },
//     };
//     return fetch(API.userQueryAPI, {
//         method: 'POST',
//         body: JSON.stringify(query),
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: bearer,
//         },
//         credentials: 'include',
//     })
//         .then(
//             (response) => {
//                 if (response.ok || response.status === 304) {
//                     return response;
//                 }
//                 response.json().then((res) => {
//                     if (res.name === 'Unauthorized') {
//                         dispatch(logoutUser('timeout'));
//                     }
//                 });
//                 const error = new Error(
//                     `Error ${response.status}: ${response.statusText}`
//                 );
//                 error.response = response;
//                 throw error;
//             },
//             (error) => {
//                 const errmess = new Error(error.message);
//                 throw errmess;
//             }
//         )
//         .then((response) => response.json())
//         .then(({ data }) => {
//             localStorage.setItem('currentUser', JSON.stringify(data[0]));
//             const upUser = UserUtils.getProperUser(data[0]);
//             dispatch(addUser(upUser));
//         })
//         .catch((error) => dispatch(userFailed(error.message)));
// };

export const fetchUser = () => (dispatch) => {
    dispatch(userLoading(true));

    return fetch(API.userProfileAPI, {
        method: 'GET',
        // body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name.toLowerCase() === 'unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name.toLowerCase() === 'unregistered') {
                        dispatch(receiveLogin());
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name.toLowerCase() === 'unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });

                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                const errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then((response) => response.json())
        .then(({ data }) => {
            dispatch(receiveLogin());
            // localStorage.setItem('currentUser', JSON.stringify(user));
            const upUser = UserUtils.getProperUser(data);
            // localStorage.setItem('currentUser', JSON.stringify(upUser));
            // if (user.privelege_level === 'Unapproved_user') {
            //     dispatch(loginError('Unapproved'));
            // }
            // console.log('upUser:');
            // console.log(upUser);
            dispatch(addUser(upUser));
            // dispatch(receiveLogin());
        })
        .catch((error) => dispatch(userFailed(error.message)));
};

export const fetchAllUsers = () => (dispatch) => {
    dispatch(usersLoading(true));

    return fetch(`${API.userGetAllDBAPI}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                const errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then((response) => response.json())
        .then((users) => {
            const gotUsers = users.data;
            const allUsers = gotUsers.map((cUser) =>
                UserUtils.getProperUser(cUser)
            );
            dispatch(addAllUsers(allUsers));
        })
        .catch((error) => dispatch(usersFailed(error.message)));
};

// export const loginUser = (creds) => (dispatch) => {
//     dispatch(requestLogin(creds));

//     return fetch(API.loginAPI, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(creds),
//     })
//         .then(
//             (response) => {
//                 if (response.ok || response.status === 304) {
//                     return response;
//                 }
//                 const error = new Error(
//                     `Error ${response.status}: ${response.statusText}`
//                 );
//                 error.response = response;
//                 response.json().then((res) => {
//                     if (res.name === 'Unapproved user') {
//                         dispatch(loginError('Unapproved'));
//                     }
//                 });
//                 throw error;
//             },
//             (error) => {
//                 throw error;
//             }
//         )
//         .then((response) => response.json())
//         .then((response) => {
//             if (response.status === 200) {
//                 localStorage.setItem('dcIITDDashboardToken', response.token);
//                 localStorage.setItem('userId', response.result._id);
//                 dispatch(receiveLogin(response));
//             }
//         })
//         .catch((error) => dispatch(loginError(error.message)));
// };

export const registerUser = (registerCreds) => (dispatch) => {
    dispatch(requestRegister);
    fetch(API.registerAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerCreds),
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response.json();
                }
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then(() => {
            dispatch(receiveRegister());
            dispatch(loginError('registered'));
        })
        .catch((error) => dispatch(registerError(error.message)));
};

export const updateUser = (updatedUser, cb) => (dispatch) => {
    dispatch(userLoading);
    return fetch(`${API.userAPI}${updatedUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            if (cb) {
                cb();
            }
            dispatch(fetchUser(updatedUser._id));
        })
        .catch((error) => dispatch(userServerError(error.message)));
};

export const removeOtherUser = (uId, cb) => (dispatch) => {
    return fetch(`${API.userAPI}delete`, {
        method: 'POST',
        body: JSON.stringify({ id: uId }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            if (cb) {
                cb();
            }
            dispatch(fetchAllUsers());
        })
        .catch((error) => dispatch(userServerError(error)));
};

export const deleteAllUsers = () => (dispatch) => {
    return fetch(`${API.userAPI}deleteAll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            dispatch(fetchAllUsers());
        })
        .catch((error) => dispatch(userServerError(error)));
};

export const rejectAllUnapproved = (cb) => (dispatch) => {
    return fetch(`${API.userAPI}rejectAll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then(() => {
            if (cb) {
                cb();
            }
            dispatch(fetchAllUsers());
        })
        .catch((error) => dispatch(userServerError(error)));
};

export const changePassword = (newPass, cb) => (dispatch) => {
    return fetch(API.userChangePassAPI, {
        method: 'POST',
        body: JSON.stringify({ newPassword: newPass }),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            if (cb) {
                cb();
            }
        })
        .catch((error) => dispatch(userServerError(error.message)));
};

export const editOtherUser = (otherUser, cb) => (dispatch) => {
    return fetch(`${API.userAPI}${otherUser._id}`, {
        method: 'PUT',
        body: JSON.stringify(otherUser),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(
            (response) => {
                if (response.ok || response.status === 304) {
                    return response;
                }
                // response.json().then((res) => {
                //     if (res.name === 'Unauthorized') {
                //         dispatch(logoutUser('timeout'));
                //     }
                // });
                response.json().then((res) => {
                    if (res.name === 'Unauthorized') {
                        dispatch(receiveLogout('logout'));
                    } else if (res.name === 'Unregistered') {
                        dispatch(registerError('register'));
                        // dispatch(newReg());
                    } else if (res.name === 'Unapproved') {
                        dispatch(loginError('Unapproved'));
                    } else {
                        return null;
                    }
                });
                const error = new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
                error.response = response;
                throw error;
            },
            (error) => {
                throw error;
            }
        )
        .then((response) => response.json())
        .then(() => {
            if (cb) {
                cb();
            }
            dispatch(fetchAllUsers());
        })
        .catch((error) => dispatch(userServerError(error.message)));
};

export const approveAllUnapproved = (unapprovedIds, cb) => (dispatch) => {
    unapprovedIds.forEach((id) => {
        const user = {
            _id: id,
            privelege_level: 'Approved_User',
        };
        dispatch(editOtherUser(user, cb));
    });
};
