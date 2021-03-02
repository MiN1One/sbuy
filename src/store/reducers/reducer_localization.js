import actionTypes from '../actions/actionTypes';

const systemLanguage = navigator.language.split('-')[0];

const initialState = {
    lang: localStorage.getItem('SBUY_LANGUAGE') || systemLanguage,
    location: 'Tashkent',
    loading: false,
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

        case actionTypes.IMPORT_REQUISITES: 
            return {
                ...state,
                translations: {
                    ...state.translations,
                    [action.requisite]: action.list
                }
            }

        case actionTypes.ON_SET_LOADING_MAIN: return { ...state, loading: action.value };

        default: return state;
    }
};

export default reducer;