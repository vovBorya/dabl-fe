import {accountReducer, STORE_NAME as ACCOUNT_STORE_NAME} from "../features/account";
import {snackbarsReducer, STORE_NAME, STORE_NAME as SNACKBAR_STORE_NAME} from "../features/snackbars";

export const reducers = {
    [ACCOUNT_STORE_NAME]: accountReducer,
    [SNACKBAR_STORE_NAME]: snackbarsReducer
}