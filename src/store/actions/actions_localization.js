import actionTypes from './actionTypes';

export const changeLocation = (location) => ({
    type: actionTypes.CHANGE_LOCATION,
    location
});

export const changeLanguage = (lang) => ({
    type: actionTypes.CHANGE_LANG,
    lang
});

export const importRequisites = (requisite, list) => ({
    type: actionTypes.IMPORT_REQUISITES,
    requisite,
    list
});

export const setLoadingMain = (val) => ({
    type: actionTypes.ON_SET_LOADING_MAIN,
    value: val
});