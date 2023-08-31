import {ISnackbarState, ISnackbar} from "./types";
import {TRANSITION_DURATION_MS} from "./constants";
import {IAction} from "../../store";
import {SHOW_SNACKBAR, DELETE_CURRENT_SNACKBAR} from "./actionTypes";

const DEFAULT_STATE: ISnackbarState = {
    snackbars: []
};

export const snackbarsReducer = (state: ISnackbarState = DEFAULT_STATE, action: IAction) => {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return _addSnackbar(state, action.payload);
        case DELETE_CURRENT_SNACKBAR:
            return _deleteCurrentSnackbar(state);
        default: return state;
    }
};
/**
 * Show Snackbar.
 *
 * @param {Object} state - The Redux state of the feature speaker-stats.
 * @param {Object} snackbar - Details of snackbar.
 *
 * @returns {Object}
 */
function _addSnackbar(state: ISnackbarState, snackbar: ISnackbar): ISnackbarState {
    const { snackbars } = state;

    const newSnackbar = snackbars.length ? {
        ...snackbar,
        delay: TRANSITION_DURATION_MS
    } : snackbar;

    const newSnackbars = [ ...snackbars, { ...newSnackbar } ];

    return {
        ...state,
        snackbars: [ ...newSnackbars ]
    };
}

/**
 * Delete the first (current) Snackbar in the queue.
 *
 * @param {Object} state - The Redux state of the feature speaker-stats.
 *
 * @returns {Object}
 */
function _deleteCurrentSnackbar(state: ISnackbarState): ISnackbarState {

    return {
        ...state,
        snackbars: [ ...state.snackbars.slice(1) ]
    };
}
