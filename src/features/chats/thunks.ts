import { createAsyncThunk } from '@reduxjs/toolkit';

import { type IChat } from './types';
import { CHATS_STORE_NAME } from './constants';
import chatsAPI from './chatsAPI';
import { showSnackbar } from '../snackbars';

export const fetchChatsThunk = createAsyncThunk<IChat[]>(
    `${CHATS_STORE_NAME}/fetch-chats`,
    async (_, thunkAPI) => {
        try {
            return await chatsAPI.fetchChats();
        } catch (err) {
            thunkAPI.dispatch(showSnackbar({ // @ts-ignore
                message: err.message,
                variant: 'error'
            }));

            return thunkAPI.rejectWithValue(undefined);
        }
    }
);
