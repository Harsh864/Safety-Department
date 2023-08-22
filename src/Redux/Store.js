import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import thunk from "redux-thunk";
import { userReducer } from "./Redux";


const rootReducers = combineReducers({

    userQuery:userReducer

});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))