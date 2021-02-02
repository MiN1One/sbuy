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