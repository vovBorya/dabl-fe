import React, { type FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import { ChatsList, Chat } from '../../chats';
import { routes } from '../routes';
import { LoginScreen, SignUpScreen } from '../../login';
import { accountSelector, fetchUserThunk, useInitAccessToken } from '../../account';
import { useSubscribeSSE } from '../../sse';
import TabsWrapper from './TabsWrapper';

const useStyles = makeStyles(theme => {
    return {
        appContainer: {
            height: '100vh',
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
        }
    };
});

const AppRouter: FC = () => {
    const classes = useStyles();
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
                            element={(
                                <div className={classes.appContainer}>
                                    <Outlet />

                                    <Chat />
                                </div>
                            )}>
                            <Route element={ <TabsWrapper /> }>
                                <Route path={routes.chats}>
                                    <Route
                                        element={<ChatsList />}
                                        path={routes.chat}
                                    />

                                    <Route
                                        element={<ChatsList />}
                                        path={''}
                                    />
                                </Route>
                            </Route>
                        </Route>
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
