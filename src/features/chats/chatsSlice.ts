import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type IChat, type IChatsState } from './types';
import { CHATS_STORE_NAME } from './constants';
import { fetchChatsThunk } from './thunks';
import { type TRootState } from '../store';

const DEFAULT_STATE: IChatsState = {
    chatsLoading: false,
    chatLoading: false,
    chats: []
};

export const chatsSlice = createSlice<IChatsState, {}, typeof CHATS_STORE_NAME>({
    initialState: DEFAULT_STATE,
    name: CHATS_STORE_NAME,
    reducers: {},
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
    }
});

export const chatsSelector = (state: TRootState): IChatsState => state[CHATS_STORE_NAME];

export const chatsReducer = chatsSlice.reducer;
