import actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorite_ads_sbuy')) || [],
    token: 'dkfjgndkfjnjf',
    // token: localStorage.getItem('auth-token'),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ON_SET_FAVORITES: 
            let newList = null;

            const exists = state.favorites.find(el => el === action.ad);

            if (exists) newList = state.favorites.filter(el => el !== action.ad);
            else newList = [...state.favorites, action.ad];

            localStorage.setItem('favorite_ads_sbuy', JSON.stringify(newList));
            return { ...state, favorites: newList };

        case actionTypes.ON_LOG_IN: return { ...state, token: action.token };

        case actionTypes.ON_LOG_OUT: 
            localStorage.removeItem('auth-token');
            return { ...state, token: null };

        default: return state;
    }
};

export default reducer;