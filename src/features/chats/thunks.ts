import { createAsyncThunk } from '@reduxjs/toolkit';

import { type IChat, type IMessage, type IMessageSend } from './types';
import { CHATS_STORE_NAME } from './constants';
import { chatsAPI } from './chatsAPI';
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

export const fetchChatThunk = createAsyncThunk<IChat, string>(
    `${CHATS_STORE_NAME}/fetch-chat`,
    async (chatId, thunkAPI) => {
        try {
            return await chatsAPI.fetchChat(chatId);
        } catch (err) {
            thunkAPI.dispatch(showSnackbar({ // @ts-ignore
                message: err.message,
                variant: 'error'
            }));

            return thunkAPI.rejectWithValue(undefined);
        }
    }
);

export const sendMessageThunk = createAsyncThunk<IMessage, IMessageSend>(
    `${CHATS_STORE_NAME}/send-message`,
    async ({ text, authorId, chatId }, thunkAPI) => {
        try {
            return await chatsAPI.sendMessage(text, authorId, chatId);
        } catch (err) {
            thunkAPI.dispatch(showSnackbar({ // @ts-ignore
                message: err.message,
                variant: 'error'
            }));

            return thunkAPI.rejectWithValue(undefined);
        }
    }
);
