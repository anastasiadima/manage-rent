import {paymentService } from "../services/payment.service";
export const ADD_USER = 'ADD_USER';
export const FETCH_PLANS_BEGIN = 'FETCH_PLANS_BEGIN';
export const FETCH_PLANS_SUCCESS= 'FETCH_PLANS_SUCCESS';
export const FETCH_PLANS_ERROR = 'FETCH_PLANS_ERROR';


export const createUser = (user) => ({
    type: ADD_USER,
    payload: [{}]
});


export const fetchPlansBegin = () =>({
    type: FETCH_PLANS_BEGIN
})

export const fetchPlansSuccess = (plans) =>({
    type: FETCH_PLANS_SUCCESS,
    payload: plans
})

export const fetchPlansError = (error) =>({
    type: FETCH_PLANS_ERROR,
    payload: {error}
})


export function fetchPlans(){
    return dispatch => {
        dispatch(fetchPlansBegin())
        return paymentService.getAll()
        .then(response =>dispatch(fetchPlansSuccess(response)))
        .catch(error => dispatch(fetchPlansError(error)))
    }
}