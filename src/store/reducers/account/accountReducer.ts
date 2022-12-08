import {IAccountState} from "./types";
import {IAction} from "../../types";

export const STORE_NAME = 'account'

const DEFAULT_STATE: IAccountState = {
    user: null
};

export const accountReducer = (state: IAccountState = DEFAULT_STATE, action: IAction) => {
    switch (action.type) {
        default: return state
    }
};
