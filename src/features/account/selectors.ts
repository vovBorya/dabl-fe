import {STORE_NAME} from "./constants";
import {TReduxState} from "../../store";
import {IAccountState} from "./types";

export const accountSelector = (state: TReduxState): IAccountState => {
    return state[STORE_NAME];
}