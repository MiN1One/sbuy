import actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorite_ads_sbuy')) || [],
    token: 'dkfjgndkfjnjf',
    // token: localStorage.getItem('auth-token'),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ON_SET_FAVORITES: return { ...state, favorites: action.list };

        case actionTypes.ON_LOG_IN: return { ...state, token: action.token };

        case actionTypes.ON_LOG_OUT: 
            localStorage.removeItem('auth-token');
            return { ...state, token: null };

        default: return state;
    }
};

export default reducer;