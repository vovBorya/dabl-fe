import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type IAccountState, type IUser } from './index';
import { ACCOUNT_STORE_NAME } from './constants';
import { fetchUserThunk, updateUserThunk } from './thunks';
import { type TRootState } from '../store';

const DEFAULT_STATE: IAccountState = {
    user: null,
    userLoading: false,
    isAuthenticated: false,
    hasErrorOnFetch: false
};

export const accountSlice = createSlice<IAccountState, {}, typeof ACCOUNT_STORE_NAME>({
    name: ACCOUNT_STORE_NAME,
    initialState: DEFAULT_STATE,
    reducers: {
        onAccountFetchedSuccessfully: (state: IAccountState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setIsAuthenticated: (state: IAccountState, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        reset: () => {
            return DEFAULT_STATE;
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
            state.userLoading = false;
            state.hasErrorOnFetch = true;
        });

        builder.addCase(updateUserThunk.pending, (state) => {
            state.userLoading = true;
        });

        builder.addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<IUser | undefined>) => {
            if (action.payload) {
                state.user = action.payload;
            }
            state.userLoading = false;
        });

        builder.addCase(updateUserThunk.rejected, (state) => {
            state.userLoading = false;
        });
    }
});

export const { // @ts-ignore
    setIsAuthenticated, // @ts-ignore
    onAccountFetchedSuccessfully, // @ts-ignore
    reset
} = accountSlice.actions;

export const accountSelector = (state: TRootState): IAccountState => {
    return state[ACCOUNT_STORE_NAME];
};

export const accountReducer = accountSlice.reducer;
