import actionTypes from './actionTypes';

export const changeSearchInput = (input) => ({
    type: actionTypes.ON_SEARCH_INPUT,
    search: input
});

export const handleError = (e) => ({
    type: actionTypes.ON_CATCH_ERROR,
    error: e
});

export const setLoading = () => ({ type: actionTypes.ON_SET_LOADING });

export const setLoadingForLazy = (val) => ({
    type: actionTypes.ON_SET_LOADING_LAZY,
    val
});

export const filterByCounters = (name, index, val) => ({
    type: actionTypes.ON_FILTER_BY_COUNTERS,
    name,
    val,
    index
});

export const filterByOptions = (name, val) => ({
    type: actionTypes.ON_FILTER_BY_OPTIONS,
    name,
    val
});

export const matchSmallMedia = (val) => ({
    type: actionTypes.ON_MATCH_SMALL_MEDIA,
    value: val
});

