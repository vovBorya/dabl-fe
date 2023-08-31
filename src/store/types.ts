import {IAccountState, STORE_NAME as ACCOUNT_STORE_NAME} from "../features/account";

export interface IAction {
    type: string;
    payload: any;
}

export type TReduxState = {
    [ACCOUNT_STORE_NAME]: IAccountState
};