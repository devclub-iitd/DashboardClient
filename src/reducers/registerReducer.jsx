/* eslint-disable no-undef */
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

const Register = (
    state = {
        isLoading: false,
        errMess: null,
        isRegistered: false,
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: 'Error',
                isRegistered: false,
            };

        case ActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                isRegistered: false,
            };

        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMess: 'Success',
                isRegistered: true,
            };

        case ActionTypes.REGISTER_FIN:
            return {
                ...state,
                errMess: null,
            };

        default:
            return state;
    }
};

export default Register;
