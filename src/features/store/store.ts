import { configureStore } from '@reduxjs/toolkit';

import { accountReducer, ACCOUNT_STORE_NAME } from '../account';
import { snackbarsReducer, SNACKBARS_STORE_NAME } from '../snackbars';
import { chatsReducer, CHATS_STORE_NAME } from '../chats';
import { usersAPI } from '../users';

export const store = configureStore({
    reducer: {
        [ACCOUNT_STORE_NAME]: accountReducer,
        [SNACKBARS_STORE_NAME]: snackbarsReducer,
        [CHATS_STORE_NAME]: chatsReducer,
        [usersAPI.reducerPath]: usersAPI.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersAPI.middleware);
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type TAppDispatch = typeof store.dispatch
