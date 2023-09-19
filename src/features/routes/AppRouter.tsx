import React, { type FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ChatsPage } from '../chats';
import { routes } from './routes';
import { LoginScreen } from '../login';
import { accountSelector, fetchUserThunk } from '../account';
import { useApiService } from '../api';

const AppRouter: FC = () => {
    const apiService =useApiService();
    const dispatch = useDispatch();
    const { accessToken, user, userLoading, hasErrorOnFetch } = useSelector(accountSelector);

    useEffect(() => {
        if (!apiService.initialized) {
            apiService.initialize();
        }
    }, [ apiService ]);

    console.log({ accessToken });

    useEffect(() => {
        if (accessToken && !user && !userLoading && !hasErrorOnFetch) { // @ts-ignore
            dispatch(fetchUserThunk());
        }
    }, [ accessToken, dispatch, hasErrorOnFetch, user, userLoading ]);

    return (
        <BrowserRouter>
            <Routes>
                {accessToken ? (
                    <>
                        <Route
                            element={<Navigate
                            replace={true}
                            to={routes.chats} />}
                            path={routes.login}
                        />
                        <Route
                            element={<Navigate
                            replace={true}
                            to={routes.chats} />}
                            path={routes.home}
                        />

                        <Route
                            element={<ChatsPage />}
                            path={routes.chats}
                        />
                    </>
                ) : (
                    <>
                        <Route
                            element={<LoginScreen />}
                            path={routes.login}
                        />

                        <Route
                            element={<Navigate
                                replace={true}
                                to={routes.login} />}
                            path={'*'}
                        />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
