import { configureStore } from '@reduxjs/toolkit';

import { accountReducer } from '../account';
import { ACCOUNT_STORE_NAME } from '../account/constants';
import { snackbarsReducer, SNACKBARS_STORE_NAME } from '../snackbars';
import { CHATS_STORE_NAME, chatsReducer } from '../chats';

export const store = configureStore({
    reducer: {
        [ACCOUNT_STORE_NAME]: accountReducer,
        [SNACKBARS_STORE_NAME]: snackbarsReducer,
        [CHATS_STORE_NAME]: chatsReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type TAppDispatch = typeof store.dispatch
