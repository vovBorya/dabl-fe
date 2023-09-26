import { createAsyncThunk } from '@reduxjs/toolkit';

import { type IUser, type TUserUpdate } from '../account';
import { accountAPI } from './accountAPI';
import { ACCOUNT_STORE_NAME } from './constants';
import { showSnackbar } from '../snackbars';

export const fetchUserThunk = createAsyncThunk<IUser | undefined>(
    `${ACCOUNT_STORE_NAME}/fetch-user`,
    async (_, thunkAPI) => {
        try {
            const user: IUser = await accountAPI.fetchUser();

            return user;
        } catch (err) {
            console.error(err);

            thunkAPI.rejectWithValue(undefined);
        }
    }
);

export const updateUserThunk = createAsyncThunk<IUser | undefined, TUserUpdate>(
    `${ACCOUNT_STORE_NAME}/update-user`,
    async ({ onSuccess, ...user }, thunkAPI) => {
        try {
            const updatedUser: IUser = await accountAPI.updateUser(user);

            onSuccess?.();

            thunkAPI.dispatch(showSnackbar({
                message: 'User updated',
                variant: 'success'
            }));

            return updatedUser;
        } catch (err) {
            console.error(err);

            thunkAPI.rejectWithValue(undefined);
        }
    }
);
