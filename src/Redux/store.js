import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/todoReducer';
import singleTaskReducer from './reducers/singleTaskReducer';
import contactReducer from './reducers/contactReducer';
import filterReducer from './reducers/filterReducer';
import logger from 'redux-logger';

const middlewares = [thunk, logger];
const reducers = combineReducers({
    todoState: todoReducer,
    contactFormState: contactReducer,
    singleTaskState: singleTaskReducer,
    filterState: filterReducer
});

const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;

