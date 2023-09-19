import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiService } from '../api';
import { type IUser, ACCOUNT_STORE_NAME } from '../account';

export const fetchUserThunk = createAsyncThunk<IUser | undefined>(
    `${ACCOUNT_STORE_NAME}/fetch-user`,
    async (_, thunkAPI) => {
        try {
            const user: IUser = await apiService.fetchUser();

            return user;
        } catch (err) {
            console.log('IN THUNK');
            console.error(err);

            thunkAPI.rejectWithValue(undefined);
        }
    }
);
