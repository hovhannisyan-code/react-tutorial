import actionTypes from '../actionTypes';
const initialState = {

    name: {
        value: "",
        valid: false,
        error: null
    },
    email: {
        value: "",
        valid: false,
        error: null
    },
    message: {
        value: "",
        valid: false,
        error: null
    },
    loading: false

};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CONTACT_FORM: {
            const { name, value, error } = action.data;
            console.log(action)
            return {
                ...state,
                [name]: {
                    value,
                    valid: !!!error,
                    error
                }
            }
        }
        case actionTypes.ADD_CONTACT_FORM: {
            const contactFormEmptyState = action.data
            return {
                ...state,
                ...contactFormEmptyState
            }
        }
        case actionTypes.TOGGLE_CONTACT_LOADING: {
            return {
                ...state,
                loading: action.isLoading

            }
        }
        default: return state;
    }
}

export default reducer;