import React, { type FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ChatsPage } from '../chats';
import { routes } from './routes';
import { LoginScreen, SignUpScreen } from '../login';
import { accountSelector, fetchUserThunk, useInitAccessToken } from '../account';
import { useSubscribeSSE } from '../sse';

const AppRouter: FC = () => {
    const dispatch = useDispatch();
    const { accessToken, user, userLoading, hasErrorOnFetch } = useSelector(accountSelector);

    useInitAccessToken();

    useSubscribeSSE();

    useEffect(() => {
        if (accessToken && !user && !userLoading && !hasErrorOnFetch) { // @ts-ignore
            dispatch(fetchUserThunk());
        }
    }, [ accessToken, dispatch, hasErrorOnFetch, user, userLoading ]);

    const hasAccessToken = useMemo(() => {
        const accessToken = localStorage.getItem('accessToken');

        return Boolean(accessToken);
    }, [ accessToken ]);

    return (
        <BrowserRouter>
            <Routes>
                {hasAccessToken ? (
                    <>

                        <Route
                            element={<ChatsPage />}
                            path={routes.chat}
                        />

                        <Route
                            element={<ChatsPage />}
                            path={routes.chats}
                        />

                        <Route
                            element={<Navigate
                            replace={true}
                            to={routes.chats} />}
                            path={'*'}
                        />
                    </>
                ) : (
                    <>
                        <Route
                            element={<LoginScreen />}
                            path={routes.login}
                        />

                        <Route
                            element={<SignUpScreen />}
                            path={routes.signUp}
                        />

                        <Route
                            element={(
                                <Navigate
                                    replace={true}
                                    to={routes.login} />
                            )}
                            path={'*'}
                        />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
