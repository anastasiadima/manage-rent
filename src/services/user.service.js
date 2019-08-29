import * as config from '../helpers/api-config';
import { authHeader}  from '../helpers/auth-header';
import { handleResponse }  from '../helpers/handle-response';

export const userService = {
    login,
    logout,
    register,
    getAll,
    update,
    delete: _delete,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.getApiUrl()}/users`, requestOptions).then(handleResponse);
}

function login(username, password) {
    console.log(authHeader);

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

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user),
        
    };

    console.log(requestOptions);

    return fetch(`${config.getApiUrl()}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.getApiUrl()}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.getApiUrl()}/users/${id}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.getApiUrl()}/users/${id}`, requestOptions).then(handleResponse);
}
