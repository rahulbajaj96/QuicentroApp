import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, LOGOUT_FAILURE } from "../constants";

let initialState = {
    auth_token: null,
    user_data: null,
    isLoggingIn: false,
    response_from_login_Api: '',
    login_error: false,

    isLogoutPending: false,
    logout_response: '',
}

export const loginReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                login_error: false,
                response_from_login_Api: actions.payload,
                user_data: actions.payload.user,
                auth_token: actions.payload.token.api_token

            };
        case LOGIN_FAILURE:
            return {
                ...state,
                login_error: false,
                response_from_login_Api: actions.payload,
            };

        case LOGIN_ERROR: return {
            ...state,
            login_error: true,
            response_from_login_Api: actions.payload,
        };


        case LOGOUT_SUCCESS: return {
            ...state,
            auth_token: null,
            user_data: null,
            isLogoutPending:false,
            logout_response:actions.payload
        };
        case LOGOUT_ERROR: return {
            ...state,
            isLogoutPending:false,
            logout_response:actions.payload
        };
        case LOGOUT_FAILURE:return{
            ...state,
            isLogoutPending:false,
            logout_response:actions.payload
        }


        default: return state;
    }
}   