import { type } from 'jquery';
import actionTypes from './actionTypes';

export const setFavorites = (list) => ({ type: actionTypes.ON_SET_FAVORITES, list });

export const logOut = () => ({ type: actionTypes.ON_LOG_OUT });

export const logIn = (token) => ({ type: actionTypes.ON_LOG_IN, token });