import actionTypes from './actionTypes';

export const changeLocation = (location) => {
    return {
        type: actionTypes.CHANGE_LOCATION,
        location
    }
};

export const changeLanguage = (lang, title) => {
    return {
        type: actionTypes.CHANGE_LANG,
        lang,
        title
    }
};

export const changeSearchLoc = (location) => {
    return {
        type: actionTypes.CHANGE_SEARCH_LOC,
        location
    }
};