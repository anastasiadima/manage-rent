import { combineReducers } from 'redux';
import {
    FETCH_PLANS_BEGIN,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_ERROR
} from '../actions/actions'

import {
    FETCH_CURRENT_USER_BEGIN,
    FETCH_CURRENT_USER_ERROR,
    FETCH_CURRENT_USER_SUCCESS
} from '../actions/userAction'

const initialState = {
    plans: [],
    error: null,
    isLoading: false
}

function planReducer(state = initialState, {type, payload}){
    switch(type){
        case FETCH_PLANS_BEGIN:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_PLANS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                plans: payload
            };
        case FETCH_PLANS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            };
        default:
            return state;
    }
}
function userReducer(state = [], {type, payload}){
    switch(type){
        case FETCH_CURRENT_USER_BEGIN:
            return {
                ...state,
                isCurrentUserLoading:true,
                currentUserError: null
            }
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                isCurrentUserLoading: false,
                ...state,
                currentUser: payload
            };
        case FETCH_CURRENT_USER_ERROR:
            return {
                ...state,
                isCurrentUserLoading: false,
                error: payload.error
            };
        default:
            return state;
    }
}

import {
    FETCH_HOUSES_BEGIN,
    FETCH_HOUSES_ERROR,
    FETCH_HOUSES_SUCCESS
} from "../actions/house.actions"

function houseReducer(state = [], {type, payload}){
    switch(type){
        case FETCH_HOUSES_BEGIN:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_HOUSES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                houses: payload
            };
        case FETCH_HOUSES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    userReducer,
    planReducer,
    houseReducer
});

export default rootReducer;