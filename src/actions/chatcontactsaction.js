import {authenticationService} from "../services/authentication.service";

export const FETCH_CONTACTS_BEGIN = 'FETCH_CONTACTS_BEGIN';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_ERROR = 'FETCH_CONTACTS_ERROR'


export const fetchCurrentUserSuccess = (currentUser) => ({
    type: FETCH_CONTACTS_SUCCESS,
    payload: currentUser
});

export const fetchCurrentUserError = (currentUserError) => ({
    type: FETCH_CONTACTS_ERROR,
    payload: {currentUserError}
});

export const fetchCurrentUserBegin = () => ({
    type: FETCH_CONTACTS_BEGIN,
});

export function fetchCurrentUser(){
    return function(dispatch){
        dispatch(fetchCurrentUserBegin());
        return authenticationService.getCurrentUserValue()
        .then(res => {dispatch(fetchCurrentUserSuccess(res))})
        .catch(err => dispatch(fetchCurrentUserError(err)));
    }
}