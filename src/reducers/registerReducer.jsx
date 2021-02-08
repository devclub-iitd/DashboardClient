/* eslint-disable no-undef */
import * as ActionTypes from '../actions/ActionTypes';

const Register = (
    state = {
        isLoading: false,
        errMess: null,
        isRegistered: true,
        newReg: false,
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload === 'register' ? 'register':'Error',
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
        
        case ActionTypes.NEW_REG:
            return {
                ...state,
                newReg: true,
            };
        
        case ActionTypes.NEW_REG_DONE:
            return {
                ...state,
                newReg: false,
            };

        default:
            return state;
    }
};

export default Register;
