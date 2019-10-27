import { authHeader} from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';
import * as apiConfig from '../helpers/api-config';
import { userService } from './user.service';

export const houseService = {
    create,
    update,
    delete: _delete,
    getById,
    getAll
}

function create(house){
    let userModel = userService.getAuthenticatedUser();
    let user = JSON.parse(userModel);
    house.ownerId = user.id;

    const options = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(house)
    }

    return fetch(`${apiConfig.getApiUrl()}/houses/create`, options).then(handleResponse);
}

function update(house){
    const options = {
        method:'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(house)
    }

    return fetch(`${apiConfig.getApiUrl()}/houses/${house.id}`, options).then(handleResponse);
}

function _delete(id){
    const options = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    }

    return fetch(`${apiConfig.getApiUrl()}/houses/${id}`, options).then(handleResponse);
}

function getById(id){
    const options = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    }

    return fetch(`${apiConfig.getApiUrl()}/houses/${id}`, options).then(handleResponse);
}

function getAll(){
    const options = {
        method:'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    }

    return fetch(`${apiConfig.getApiUrl()}/houses`, options).then(handleResponse);
}