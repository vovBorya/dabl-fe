import { createStore, applyMiddleware, combineReducers, Store } from "redux"
import thunk from "redux-thunk"

import {accountReducer} from "./reducers/account/accountReducer";

const rootReducer = combineReducers({
    accountReducer
})

export const store: Store = createStore(rootReducer, applyMiddleware(thunk))