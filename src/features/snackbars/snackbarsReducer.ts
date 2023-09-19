import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type ISnackbarState, type ISnackbar } from './types';
import { SNACKBARS_STORE_NAME, TRANSITION_DURATION_MS } from './constants';

const DEFAULT_STATE: ISnackbarState = {
    snackbars: []
};

export const snackbarSlice = createSlice({
    initialState: DEFAULT_STATE,
    name: SNACKBARS_STORE_NAME,
    reducers: {
        showSnackbar: (state: ISnackbarState, action: PayloadAction<ISnackbar>) => {
            const newSnackbar = state.snackbars.length ? {
                ...action.payload,
                delay: TRANSITION_DURATION_MS
            } : action.payload;

            state.snackbars.push(newSnackbar);
        },
        deleteCurrentSnackbar: (state: ISnackbarState) => {
            state.snackbars.pop();
        }
    }
});

export const {
    showSnackbar,
    deleteCurrentSnackbar
} = snackbarSlice.actions;

export const snackbarsReducer = snackbarSlice.reducer;
