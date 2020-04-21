// const initState = {
//   errorMsg: '',
// };

// export default (state = initState, action) => {
//   switch (action.type) {
//     case 'SIMPLE_ACTION':
//       return {
//         result: action.payload,
//       };
//     default:
//       return state;
//   }
// };
import * as ActionTypes from '../actions/ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function Auth(state = {
  isLoading: false,
  isAuthenticated: localStorage.getItem('dcIITDDashboardToken') !== null,
  // isAuthenticated: false,
  sessionTimeout: false,
  token: localStorage.getItem('dcIITDDashboardToken'),
  // user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
  errMess: null,
}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        sessionTimeout: false,
        isAuthenticated: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        sessionTimeout: false,
        errMess: null,
        token: action.token,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        sessionTimeout: false,
        isAuthenticated: false,
        errMess: action.message,
      };

    case ActionTypes.LOGIN_FAILURE_FIN:
      return {
        ...state,
        isLoading: false,
        sessionTimeout: false,
        isAuthenticated: false,
        errMess: null,
      };

    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sessionTimeout: action.payload === 'timeout',
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
}
