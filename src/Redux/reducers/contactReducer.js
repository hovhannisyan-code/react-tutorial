import actionTypes from '../actionTypes';
import {
    isRequired,
    maxLength,
    minLength,
    emailValidation
} from '../../Components/helpers/validators';
const maxLength25 = maxLength(25);
const minLength3 = minLength(3);
const initialState = {

    formData: {
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
        }
    },
    loading: false

};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CONTACT_FORM: {
            const { value, name } = action.data;
            let error = null;
            //validators
            switch (name) {
                case "name":
                case "email":
                case "message":
                    error = isRequired(value) ||
                        (name === "email" && emailValidation(value)) ||
                        minLength3(value) ||
                        maxLength25(value);
                    break;
                default: ;
            }
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [name]: {
                        value,
                        valid: !!!error,
                        error
                    }
                }
            }
        }
        case actionTypes.ADD_CONTACT_FORM: {
            return {
                ...state,
                formData: {
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
                    }
                }
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