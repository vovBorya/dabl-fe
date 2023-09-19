import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchUserThunk, type IAccountState, type IUser } from './index';
import { ACCOUNT_STORE_NAME } from './constants';
import { type TRootState } from '../store';

const DEFAULT_STATE: IAccountState = {
    user: null,
    userLoading: false,
    accessToken: null,
    hasErrorOnFetch: false
};

export const accountSlice = createSlice<IAccountState, {}, typeof ACCOUNT_STORE_NAME>({
    name: ACCOUNT_STORE_NAME,
    initialState: DEFAULT_STATE,
    reducers: {
        onAccountFetchedSuccessfully: (state: IAccountState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setAccessToken: (state: IAccountState, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserThunk.pending, (state) => {
            state.userLoading = true;
        });

        builder.addCase(fetchUserThunk.fulfilled, (state, action: PayloadAction<IUser | undefined>) => {
            if (action.payload) {
                state.user = action.payload;
            }
            state.userLoading = false;
        });

        builder.addCase(fetchUserThunk.rejected, (state) => {
            console.log('fetchUserThunk.rejected > ', fetchUserThunk.rejected);
            state.userLoading = false;
            state.hasErrorOnFetch = true;
        });
    }
});

export const { // @ts-ignore
    setAccessToken, // @ts-ignore
    onAccountFetchedSuccessfully
} = accountSlice.actions;

export const accountSelector = (state: TRootState): IAccountState => {
    return state[ACCOUNT_STORE_NAME];
};

export const accountReducer = accountSlice.reducer;
