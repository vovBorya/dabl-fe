import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import {LoginScreen} from "../components/LoginScreen";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={<Navigate to={routes.login} replace={true} />}
                    path={'/'}
                />
                <Route
                    path={routes.login}
                    element={<LoginScreen />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;