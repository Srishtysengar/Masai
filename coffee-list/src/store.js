import {thunk} from "redux-thunk";
import { coffeeReducer } from "./coffeeReduces";
import{createStore, applyMiddleware, combineReducers} from "redux"

const rootReducer=combineReducers({
    coffee:coffeeReducer
});

export const store=createStore(rootReducer, applyMiddleware(thunk))