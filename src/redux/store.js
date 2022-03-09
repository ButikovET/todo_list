import { applyMiddleware, combineReducers, createStore } from "redux";
import todoItemsReducer from './todoItemsReducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";


const reducers = combineReducers({ todoItemsReducer });

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;

