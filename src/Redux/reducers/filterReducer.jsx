import actionTypes from '../actionTypes';
const initialState = {
    search: "",
    status: null,
    sort: null,
    create_lte: "",
    create_gte: "",
    complete_lte: "",
    complete_gte: ""
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STATUS: {
            const { value, dropDownType } = action;
            return {
                ...state,
                [dropDownType]: value
            }
        }
        case actionTypes.CHANGE_SEARCH_VALUE: {
            return {
                ...state,
                search: action.value
            }
        }
        case actionTypes.SET_SORT_DATE: {
            const { dateType, date } = action;
            return {
                ...state,
                [dateType]: date
            }
        }
        case actionTypes.RESET_SEARCH_FORM: {
            return {
                ...initialState
            }
        }
        default: return state;
    }
}

export default reducer;