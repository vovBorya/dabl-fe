import React, { type FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import { ChatsList, Chat } from '../../chats';
import { routes } from '../routes';
import { LoginScreen, SignUpScreen } from '../../login';
import { accountSelector, useFetchUserOnInit, useInitAccessToken } from '../../account';
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
    const { isAuthenticated } = useSelector(accountSelector);

    useInitAccessToken();

    useSubscribeSSE();

    useFetchUserOnInit();

    return (
        <BrowserRouter>
            <Routes>
                {isAuthenticated ? (
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

                        <Route
                            element={(
                                <Navigate
                                    replace={true}
                                    to={routes.chats} />
                            )}
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
