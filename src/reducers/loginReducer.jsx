import * as ActionTypes from '../actions/ActionTypes';

export default function Auth(
    state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('dcIITDDashboardToken') !== null,
        sessionTimeout: false,
        token: localStorage.getItem('dcIITDDashboardToken'),
        errMess: null,
    },
    action
) {
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
