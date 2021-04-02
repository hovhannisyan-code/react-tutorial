import { createStore } from 'redux';

const initialState = {
    text: "Redux WOW",
    counter: 0,
    inputValue: ""
}
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "plusCounter":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "minusCounter":
            return {
                ...state,
                counter: state.counter - 1
            }
        case "resetCounter":
            return {
                ...state,
                counter: 0
            }
        case "setInputValue":
            return {
                ...state,
                inputValue: action.inputValue
            }
        case "resetInputValue":
        return {
            ...state,
            inputValue: ""
        }
        default: return state
    }
}
const store = createStore(reducer);
export default store;