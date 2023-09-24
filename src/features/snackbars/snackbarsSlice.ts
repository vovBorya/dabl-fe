import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type TRootState } from '../store';
import { type ISnackbarState, type ISnackbar } from './types';
import { SNACKBARS_STORE_NAME } from './constants';

const DEFAULT_STATE: ISnackbarState = {
    snackbar: null
};

export const snackbarsSlice = createSlice({
    initialState: DEFAULT_STATE,
    name: SNACKBARS_STORE_NAME,
    reducers: {
        showSnackbar: (state: ISnackbarState, action: PayloadAction<ISnackbar>) => {

            state.snackbar = action.payload;
        }
    }
});

export const snackbarsSelector = (state: TRootState): ISnackbarState => state[SNACKBARS_STORE_NAME];

export const {
    showSnackbar
} = snackbarsSlice.actions;

export const snackbarsReducer = snackbarsSlice.reducer;
