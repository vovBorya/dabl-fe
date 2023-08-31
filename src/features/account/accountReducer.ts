import {IAccountState} from "./index";
import {IAction} from "../../store";
import {FETCH_ACCOUNT_ERROR, FETCH_ACCOUNT_REQUESTED, FETCH_ACCOUNT_SUCCESS, SET_ACCESS_TOKEN} from "./actionTypes";

const DEFAULT_STATE: IAccountState = {
    user: null,
    userLoading: false,
    accessToken: null
};

export const accountReducer = (state: IAccountState = DEFAULT_STATE, action: IAction) => {
    switch (action.type) {
        case FETCH_ACCOUNT_REQUESTED:
            return {
                ...state,
                userLoading: false
            }
        case FETCH_ACCOUNT_SUCCESS:
            return {
                ...state,
                userLoading: true,
                user: action.payload
            }
        case FETCH_ACCOUNT_ERROR:
            return {
                ...state,
                userLoading: false
            }
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        default: return state
    }
};
