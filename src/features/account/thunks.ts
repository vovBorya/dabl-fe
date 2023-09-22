import { createAsyncThunk } from '@reduxjs/toolkit';

import { type IUser, ACCOUNT_STORE_NAME } from '../account';
import { accountAPI } from './accountAPI';

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
