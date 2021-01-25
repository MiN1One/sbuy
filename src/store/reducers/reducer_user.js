import actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: localStorage.getItem('favorite_ads_sbuy') ? JSON.parse(localStorage.getItem('favorite_ads_sbuy')) : [],
    token: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ON_SET_FAVORITES: return { ...state, favorites: action.list };

        case actionTypes.ON_LOG_IN: return { ...state, token: action.token };

        case actionTypes.ON_LOG_OUT: return { ...state, token: null };

        default: return state;
    }
};

export default reducer;