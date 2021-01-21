import actionTypes from './actionTypes';
import axios from 'axios';

export const changeSearchInput = (input) => {
    return {
        type: actionTypes.ON_SEARCH_INPUT,
        search: input
    }
};

export const handleError = (e) => {
    return {
        type: actionTypes.ON_CATCH_ERROR,
        error: e
    }
};

const setLoading = (val) => {
    return { type: actionTypes.ON_SET_LOADING }
}; 

export const setLoadingForLazy = (val) => {
    return {
        type: actionTypes.ON_SET_LOADING_LAZY,
        val
    }
}

const fetchSuccess = (data) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        
    };
};

export const fetchForHomePage = () => {
    return (dispatch) => {

    };
};

export const fetchForMainPage = () => {
    return (dispatch) => {
        dispatch(setLoading());
        axios('https://jsonplaceholder.typicode.com/todos')
            .then((res) => {
                console.log(res);
                dispatch(fetchSuccess(res));
            })
            .catch(er => {
                console.log(er);
                dispatch(handleError(er));
            });
    };
};

export const performSearch = () => {
    return (dispatch) => {

    };
};
