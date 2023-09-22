import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type IChat, type IChatsState, type IMessage } from './types';
import { CHATS_STORE_NAME } from './constants';
import { fetchChatsThunk, fetchChatThunk, sendMessageThunk } from './thunks';
import { type TRootState } from '../store';

const DEFAULT_STATE: IChatsState = {
    chatsLoading: false,
    chatLoading: false,
    chats: [],
    chat: null
};

export const chatsSlice = createSlice<IChatsState, {}, typeof CHATS_STORE_NAME>({
    initialState: DEFAULT_STATE,
    name: CHATS_STORE_NAME,
    reducers: {
        onNewMessageReceived: (state: IChatsState, action: PayloadAction<IMessage>) => {
            const { chat } = state;

            if (chat?.id === action.payload.chatId) {
                chat.messages.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatsThunk.pending, (state) => {
            state.chatsLoading = true;
        });

        builder.addCase(fetchChatsThunk.fulfilled, (state, action: PayloadAction<IChat[]>) => {
            state.chatsLoading = false;
            state.chats = action.payload;
        });

        builder.addCase(fetchChatsThunk.rejected, (state) => {
            state.chatsLoading = false;
        });

        builder.addCase(fetchChatThunk.pending, (state) => {
            state.chatLoading = true;
        });

        builder.addCase(fetchChatThunk.fulfilled, (state, action: PayloadAction<IChat>) => {
            state.chatLoading = false;
            state.chat = action.payload;
        });

        builder.addCase(fetchChatThunk.rejected, (state) => {
            state.chatLoading = false;
        });

        builder.addCase(sendMessageThunk.fulfilled, (state, action: PayloadAction<IMessage>) => {
            if (state.chat?.id === action.payload.chatId) {
                state.chat.messages.push(action.payload);
            }
        });

    }
});

export const chatsSelector = (state: TRootState): IChatsState => state[CHATS_STORE_NAME];

export const { // @ts-ignore
    onNewMessageReceived
} = chatsSlice.actions;

export const chatsReducer = chatsSlice.reducer;
