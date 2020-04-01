import * as config from '../helpers/api-config';
import { authHeader}  from '../helpers/auth-header';
import { handleResponse }  from '../helpers/handle-response';
import { userService } from './user.service';

export const paymentService = {
    getAll,
    create,
    update,
    delete: _delete,
    getById,
    createPlan,
    subscribeUsers,
    getPlanDetails,
    getSubscribedUsers
};

function createPlan(plan){
    let userModel = userService.getAuthenticatedUser();
    let user = JSON.parse(userModel);
    plan.ownerId = user.id;
    
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(plan)
    }

    return fetch(`${config.getApiUrl()}/payment/createplan`, requestOptions).then(handleResponse);
}

function getPlanDetails(id){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${config.getApiUrl()}/payment/plan/${id}`, requestOptions).then(handleResponse);
}

function getAll(){
    const requestOptions = {method: 'GET', headers: { ...authHeader(), 'Content-Type': 'application/json' }};
    return fetch(`${config.getApiUrl()}/payment/list`, requestOptions).then(handleResponse);
}

function getById(id){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${config.getApiUrl()}/payment/${id}`, requestOptions).then(handleResponse);
}

function update(tenant){
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(tenant)
    }

    return fetch(`${config.getApiUrl()}/payment/${tenant.id}`, requestOptions).then(handleResponse);
}

function create(tenant){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(tenant)
    }

    return fetch(`${config.getApiUrl()}/payment/create`, requestOptions).then(handleResponse);
}

function _delete(id){
    const requestOptions = {
        method:'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    }

    return fetch(`${config.getApiUrl()}/payment/${id}`, requestOptions).then(handleResponse);
}

function getSubscribedUsers(id){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`${config.getApiUrl()}/payment/subscribedUsers/${id}`, requestOptions).then(handleResponse);
}

function subscribeUsers(userPlan){
    console.log(userPlan);
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(userPlan)
    };

    return fetch(`${config.getApiUrl()}/payment/subscribeUsers/`, requestOptions).then(handleResponse);
}