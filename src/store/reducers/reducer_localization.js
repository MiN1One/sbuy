import actionTypes from '../actions/actionTypes';

const systemLanguage = navigator.language.split('-')[0];

const initialState = {
    lang: localStorage.getItem('SBUY_LANGUAGE') || systemLanguage,
    location: 'Tashkent',
    loading: false,
    searchLocation: JSON.parse(localStorage.getItem('SBUY_SEARCH_LOCATION')) || ['all'],
    translations: {
        regionsList: null,
        categoriesList: null,
        filtersList: {},
        base: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CHANGE_LOCATION: return { ...state, location: action.location };

        case actionTypes.CHANGE_LANG:
            localStorage.setItem('SBUY_LANGUAGE', action.lang);
            return { ...state, lang: action.lang };
            
        case actionTypes.CHANGE_SEARCH_LOC: 
            localStorage.setItem('SBUY_SEARCH_LOCATION', JSON.stringify([action.location]));
            return { ...state, searchLocation: [action.location] };

        case actionTypes.IMPORT_REQUISITES: 
            return {
                ...state,
                translations: {
                    ...state.translations,
                    [action.requisite]: action.list
                }
            }

        case actionTypes.ON_SET_LOADING_MAIN: return { ...state, loading: action.value }
        
        case actionTypes.ADD_SEARCH_LOCATION:
            let newArr = [action.location];
            const exists = state.searchLocation.findIndex(el => el === action.location) !== -1;
            
            if (exists && state.searchLocation.length > 1) {
                newArr = state.searchLocation.filter(el => {
                    if (el === action.location || el === 'all') return null;
                    else return el;
                });
            } else if (state.searchLocation[0] !== action.location) {
                newArr = [...state.searchLocation, action.location].filter(el => el !== 'all');
            }

            localStorage.setItem('SBUY_SEARCH_LOCATION', JSON.stringify(newArr));
            return { ...state, searchLocation: newArr };

        default: return state;
    }
};

export default reducer;