import actionTypes from '../actions/actionTypes';

const initialState = {
    lang: {
        title: 'English',
        val: 'en'
    },
    location: 'Tashkent',
    searchLocation: localStorage.getItem('sbuySL') ? localStorage.getItem('sbuySL') : 'Whole country'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOCATION:
            return {
                ...state,
                location: action.location
            }
        case actionTypes.CHANGE_LANG:
            return {
                ...state,
                lang: {
                    ...state.lang,
                    val: action.lang,
                    title: action.title
                }
            }
        case actionTypes.CHANGE_SEARCH_LOC:
            return {
                ...state,
                searchLocation: action.location
            }
        default: return state;
    }
};

export default reducer;