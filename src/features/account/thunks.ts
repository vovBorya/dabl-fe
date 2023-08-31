import {Dispatch} from "react";
import {AnyAction} from "redux";

import {apiService} from "../api";
import {IUser, onAccountFetchedSuccessfully} from "../account";
import {AppDispatch} from "../../store";

import {FETCH_ACCOUNT_ERROR, FETCH_ACCOUNT_REQUESTED} from "./actionTypes";

export const fetchUser = () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: FETCH_ACCOUNT_REQUESTED });

    try {
        const user: IUser = await apiService.fetchUser();

        dispatch(onAccountFetchedSuccessfully(user));
    } catch (err) {
        console.error(err);

        dispatch({ type: FETCH_ACCOUNT_ERROR });
    }
}