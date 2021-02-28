import actionTypes from './actionTypes';

export const changeLocation = (location) => ({
    type: actionTypes.CHANGE_LOCATION,
    location
});

export const changeLanguage = (lang) => ({
    type: actionTypes.CHANGE_LANG,
    lang
});

export const changeSearchLoc = (location) => ({
    type: actionTypes.CHANGE_SEARCH_LOC,
    location
});

export const importRequisites = (requisite, list) => ({
    type: actionTypes.IMPORT_REQUISITES,
    requisite,
    list
});

export const addSearchLocation = (location) => ({
    type: actionTypes.ADD_SEARCH_LOCATION,
    location
});

export const setLoadingMain = (val) => ({
    type: actionTypes.ON_SET_LOADING_MAIN,
    value: val
});