import { createAsyncThunk } from '@reduxjs/toolkit';

import { type IUser, ACCOUNT_STORE_NAME, type TUserUpdate } from '../account';
import { accountAPI } from './accountAPI';
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

            console.log({ updatedUser });

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
