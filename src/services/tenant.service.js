import * as config from '../helpers/api-config';
import { authHeader}  from '../helpers/auth-header';
import { handleResponse }  from '../helpers/handle-response';

export const tenantService = {
    getAll,
    create,
    update,
    delete: _delete,
    getById
};

function getAll(){
    const requestOptions = {method: 'GET', headears: authHeader()};
    return fetch(`${config.getApiUrl()}/tenants`, requestOptions).then(handleResponse);
}

function getById(id){
    const requestOptions = {
        method: 'GET',
        headears: authHeader()
    };

    return fetch(`${config.getApiUrl()}/tenants/${id}`, requestOptions).then(handleResponse);
}

function update(tenant){
    const requestOptions = {
        method: 'PUT',
        headears: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(tenant)
    }

    return fetch(`${config.getApiUrl()}/tenants/${tenant.id}`, requestOptions).then(handleResponse);
}

function create(tenant){
    const requestOptions = {
        method: 'POST',
        headears: {'Content-Type': 'application/json'},
        body: JSON.stringify(tenant)
    }

    return fetch(`${config.getApiUrl()}/tenants/create`, requestOptions).then(handleResponse);
}

function _delete(id){
    const requestOptions = {
        method:'DELETE',
        headears: {...authHeader(), 'Content-Type': 'application/json'}
    }

    return fetch(`${config.getApiUrl()}/tenants/${id}`, requestOptions).then(handleResponse);
}