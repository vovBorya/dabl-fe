import { DELETE_CURRENT_SNACKBAR, SHOW_SNACKBAR } from './actionTypes';
import { AUTO_HIDE_DURATION_MS } from './constants';
import { ISnackbar } from './types';

/**
 * Show Snackbar.
 *
 * @param {Object} snackbar - Details of snackbar.
 *
 * @returns {Object}
 */
export const showSnackbar = ({
    autoHideDuration = AUTO_HIDE_DURATION_MS,
    ...rest
}: ISnackbar) => {
    return {
        type: SHOW_SNACKBAR,
        snackbar: {
            autoHideDuration,
            ...rest
        }
    };
};

/**
 * Delete the first Snackbar in the queue.
 *
 * @returns {Object}
 */
export const deleteCurrentSnackbar = () => {
    return {
        type: DELETE_CURRENT_SNACKBAR
    };
};
