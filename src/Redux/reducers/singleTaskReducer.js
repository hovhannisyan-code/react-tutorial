
import actionTypes from '../actionTypes';
const initialState = {
    singleTask: null,
    showModal: false,
    openTaskModal: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_ST_CONFIRM_MODAL:
            return {
                ...state,
                showModal: !state.showModal
            }
        case actionTypes.TOGGLE_ST_MODAL:
            return {
                ...state,
                openTaskModal: !state.openTaskModal
            }
        case actionTypes.TOGGLE_ST_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case actionTypes.SET_ST:
            return {
                ...state,
                singleTask: action.task
            }
        default: return state;
    }
}

export default reducer;