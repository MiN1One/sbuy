import actionTypes from '../actions/actionTypes';

const systemLanguage = navigator.language.split('-')[0];

const initialState = {
    lang: localStorage.getItem('SBUY_LANGUAGE') || systemLanguage,
    location: 'Tashkent',
    searchLocation: localStorage.getItem('SBUY_SEARCH_LOCATION') || 'all'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CHANGE_LOCATION: return { ...state, location: action.location };

        case actionTypes.CHANGE_LANG:
            localStorage.setItem('SBUY_LANGUAGE', action.lang);
            return { ...state, lang: action.lang };
            
        case actionTypes.CHANGE_SEARCH_LOC: 
            localStorage.setItem('SBUY_SEARCH_LOCATION', action.location);
            return { ...state, searchLocation: action.location };

        default: return state;
    }
};

export default reducer;