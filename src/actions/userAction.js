import {authenticationService} from "../services/authentication.service";

export const FETCH_CURRENT_USER_BEGIN = 'FETCH_CURRENT_USER_BEGIN';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_ERROR = 'FETCH_CURRENT_USER_ERROR'


export const fetchCurrentUserSuccess = (currentUser) => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    payload: currentUser
});

export const fetchCurrentUserError = (currentUserError) => ({
    type: FETCH_CURRENT_USER_ERROR,
    payload: {currentUserError}
});

export const fetchCurrentUserBegin = () => ({
    type: FETCH_CURRENT_USER_BEGIN,
});

export function fetchCurrentUser(){
    return function(dispatch){
        dispatch(fetchCurrentUserBegin());
        return authenticationService.getCurrentUserValue()
        .then(res => { console.log(res); dispatch(fetchCurrentUserSuccess(res))})
        .catch(err => dispatch(fetchCurrentUserError(err)));
    }
}