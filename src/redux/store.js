import { applyMiddleware, combineReducers, createStore } from "redux";
import todoItemsReducer from './todoItemsReducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({ todoItemsReducer });

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;