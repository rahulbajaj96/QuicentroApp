
import { SPINNER_ON, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_ERROR, SPINNER_OFF, LOGOUT_FAILURE, LOGOUT_ERROR, LOGOUT_SUCCESS } from "../constants";
import * as API from '../../apiCalls';

export const loginUser = (formdata) => async (dispatch) => {

    dispatch({ type: SPINNER_ON })
    try {
        let loginResponse = await API.UserLogin(formdata);
        console.log('login Response Action', loginResponse);
        if (loginResponse.status == 1) {
            dispatch({ type: SPINNER_OFF })
            return dispatch(Successful_login(loginResponse));
        }
        else if (loginResponse.status == 0) {
            dispatch({ type: SPINNER_OFF })
            return dispatch(UnSucessful_login(loginResponse));
        }
    }
    catch (error) {
        dispatch({ type: SPINNER_OFF })
        console.log('error of Login Api ', error);
        return dispatch(Error_login(error));
    }

}
const Successful_login = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

const UnSucessful_login = (payload) => ({
    type: LOGIN_FAILURE,
    payload
});

const Error_login = (paylaod) => ({
    type: LOGIN_ERROR,
    payload
})



export const LogoutUser = (formdata) => async (dispatch) => {

    dispatch({ type: SPINNER_ON })
    try {
        let logout_Response = await API.UserLogout(formdata);
        console.log('logout_Response Action', logout_Response);
        if (logout_Response.status == 1) {
            dispatch({ type: SPINNER_OFF })
            return dispatch(Successful_logout(logout_Response));
        }
        else if (loginResponse.status == 0) {
            dispatch({ type: SPINNER_OFF })
            return dispatch(UnSucessful_logout(logout_Response));
        }
    }
    catch (error) {
        dispatch({ type: SPINNER_OFF })
        console.log('error of Logout Api ', error);
        return dispatch(Error_logout(error));
    }
}

const Successful_logout = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload
});

const UnSucessful_logout = (payload) => ({
    type: LOGOUT_FAILURE,
    payload
});

const Error_logout = (paylaod) => ({
    type: LOGOUT_ERROR,
    payload
})
