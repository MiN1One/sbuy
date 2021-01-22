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

export const setLoading = (val) => {
    return { type: actionTypes.ON_SET_LOADING }
}; 

export const setLoadingForLazy = (val) => {
    return {
        type: actionTypes.ON_SET_LOADING_LAZY,
        val
    }
};

export const filterByCounters = (name, index, val) => {
    return {
        type: actionTypes.ON_FILTER_BY_COUNTERS,
        name,
        val,
        index
    }
};

export const filterByOptions = (name, val) => {
    return {
        type: actionTypes.ON_FILTER_BY_OPTIONS,
        name,
        val
    }
};

