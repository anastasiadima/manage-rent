import { BehaviorSubject } from 'rxjs';
import * as config from '../helpers/api-config';
import { handleResponse } from '../helpers/handle-response'; 

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser,
    getCurrentUserValue,
    get currentUserValue () { return currentUserSubject.value }
};

function currentUser(){
    return currentUserSubject.asObservable()
}
function getCurrentUserValue(){
    return new Promise(function(resolve, reject) {
        resolve(currentUserSubject.value);
        reject(new Error("connot loaad current user"));
  });
  
} 

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.getApiUrl()}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
