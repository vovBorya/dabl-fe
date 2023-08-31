import { createStore, applyMiddleware, combineReducers, Store } from "redux"
import thunk from "redux-thunk"

import {reducers} from './reducers'
import {useDispatch} from "react-redux";

const rootReducer = combineReducers(reducers)

export const store: Store = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch
