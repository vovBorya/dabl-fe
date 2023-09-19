import React, { type FC } from 'react';
import { Snackbar } from '@mui/material';

type SnackbarProviderProps = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
    return (
        <>
            {children}
            <Snackbar />
        </>
    );
};

export default SnackbarProvider;
