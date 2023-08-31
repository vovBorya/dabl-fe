import React, {FC} from 'react';
import {Snackbar, IconButton} from '@mui/material';

type SnackbarProviderProps = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
    console.log('SnackbarProvider')
    return (
        <>
            {children}
            <Snackbar />
        </>
    );
};

export default SnackbarProvider;