import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { accountSelector, setIsAuthenticated, reset as resetAccountSlice } from './accountSlice';
import { reset as resetChatsSlice } from '../chats';
import { reset as resetSnackbarsSlice } from '../snackbars';
import { fetchUserThunk } from './thunks';

export const useInitAccessToken = (): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            dispatch(setIsAuthenticated(true));
        }

    }, [ dispatch ]);
};

export const useFetchUserOnInit = (): void => {
    const dispatch = useDispatch();
    const { isAuthenticated, user, userLoading, hasErrorOnFetch } = useSelector(accountSelector);

    useEffect(() => {
        if (isAuthenticated && !user && !userLoading && !hasErrorOnFetch) { // @ts-ignore
            dispatch(fetchUserThunk());
        }
    }, [ isAuthenticated, dispatch, hasErrorOnFetch, user, userLoading ]);
};

export const logout = (): void => {
    localStorage.removeItem('accessToken');
};

export const useLogout = (): () => void => {
    const dispatch = useDispatch();

    return useCallback(() => {
        dispatch(setIsAuthenticated(false));
        dispatch(resetAccountSlice());
        dispatch(resetChatsSlice());
        dispatch(resetSnackbarsSlice());
        logout();
    }, [ dispatch ]);
};
