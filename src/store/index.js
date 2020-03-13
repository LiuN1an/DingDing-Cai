import { createStore, applyMiddleware  } from "redux"
import allReducer from "./reducer.js"
import thunk from 'redux-thunk'

export default createStore(
	allReducer,
	applyMiddleware(thunk)
);
