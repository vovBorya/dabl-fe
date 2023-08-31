import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import {LoginScreen} from "../login";
import {accountSelector, fetchUser, IAccountState} from "../account";
import {TReduxState} from "../../store";
import {useApiService} from "../api";

const AppRouter = () => {
    const apiService =useApiService();
    const dispatch = useDispatch();
    const {accessToken, user, userLoading} = useSelector<TReduxState, IAccountState>(accountSelector);

    useEffect(() => {
        if (!apiService.initialized) {
            apiService.initialize();
        }
    }, [])

    useEffect(() => {
        if (!user && !userLoading) { // @ts-ignore
            dispatch(fetchUser());
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {accessToken ? (
                    <>
                        <Route
                            element={<Navigate to={'/'} replace={true} />}
                            path={routes.login}
                        />
                        <Route
                            path={routes.home}
                            element={<div>HOME</div>}
                        />
                    </>
                ) : (
                    <>
                        <Route
                            element={<Navigate to={routes.login} replace={true} />}
                            path={'/'}
                        />
                        <Route
                            path={routes.login}
                            element={<LoginScreen />}
                        />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;