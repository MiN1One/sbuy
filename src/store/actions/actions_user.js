import actionTypes from './actionTypes';

export const setFavorites = (ad) => ({ type: actionTypes.ON_SET_FAVORITES, ad });

export const logOut = () => ({ type: actionTypes.ON_LOG_OUT });

export const logIn = (token) => ({ type: actionTypes.ON_LOG_IN, token });