import {houseService} from "../services/house.service";

export const FETCH_HOUSES_BEGIN = 'FETCH_HOUSES_BEGIN';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
export const FETCH_HOUSES_ERROR = 'FETCH_HOUSES_ERROR'


export const fetchHousesSuccess = (houses) => ({
    type: FETCH_HOUSES_SUCCESS,
    payload: houses
});

export const fetchHousesError = (housesError) => ({
    type: FETCH_HOUSES_ERROR,
    payload: {housesError}
});

export const fetchHousesBegin = () => ({
    type: FETCH_HOUSES_BEGIN,
});

export function fetchHouses(){
    return function(dispatch){
        dispatch(fetchHousesBegin());
        return houseService.getAll()
        .then(res => {dispatch(fetchHousesSuccess(res))})
        .catch(err => dispatch(fetchHousesError(err)));
    }
}