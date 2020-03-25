// /* eslint-disable import/prefer-default-export */
// // import { userAPI } from '../data/api_links';
// import * as ActionTypes from '../actions/ActionTypes';
// import { localhostAPI } from '../data/api_links';

// export const profileLoading = () => ({
//   type: ActionTypes.PROFILE_LOADING,
// });

// export const profileFailed = errmess => ({
//   type: ActionTypes.PROFILE_FAILED,
//   payload: errmess,
// });

// export const giveUserProfile = user => ({
//   type: ActionTypes.GET_PROFILE,
//   payload: user,
// });

// export const fetchUserProfile = uname => (dispatch) => {
//   dispatch(profileLoading(true));

//   return fetch(localhostAPI + uname)
//     .then((response) => {
//       if (response.ok) {
//         return response;
//       }
//       const error = new Error(`Error ${response.status}: ${response.statusText}`);
//       error.response = response;
//       throw error;
//     },
//     (error) => {
//       const errmess = new Error(error.message);
//       throw errmess;
//     })
//     .then(response => response.json())
//     .then(user => dispatch(giveUserProfile(user)))
//     .catch(error => dispatch(profileFailed(error.message)));
// };
