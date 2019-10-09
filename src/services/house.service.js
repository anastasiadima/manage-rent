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
    let user = userService.getAuthenticatedUser();
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

    return fetch(`${apiConfig.getApiUrl()}/houses`, options).then(handleResponse);
}

function _delete(id){
    const options = {
        method: 'DELETE',
        type: 'application/json',
        header: authHeader()
    }

    return fetch(`${apiConfig.getApiUrl()}/houses/${id}`, options).then(handleResponse);
}

function getById(id){
    const options = {
        method: 'GET',
        type: 'application/json',
        header: authHeader()
    }

    return fetch(`${apiConfig.getApiUrl()}/houses/${id}`, options).then(handleResponse);
}

function getAll(){
    const options = {
        method:'GET',
        header: authHeader()
    }

    return fetch(`${apiConfig.getApiUrl()}/houses`, options).then(handleResponse);
}