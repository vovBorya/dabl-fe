import {IUser} from "../account";
import {FETCH_ACCOUNT_SUCCESS, SET_ACCESS_TOKEN} from "./actionTypes";
import {IAction} from "../../store";

export const onAccountFetchedSuccessfully = (account: IUser): IAction => ({
    type: FETCH_ACCOUNT_SUCCESS,
    payload: account
})

export const setAccessToken = (accessToken: string) => ({
    type: SET_ACCESS_TOKEN,
    payload: accessToken
})
