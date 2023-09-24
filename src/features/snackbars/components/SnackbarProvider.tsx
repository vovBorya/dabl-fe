import React, { type FC, useEffect, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector } from 'react-redux';

import { snackbarsSelector } from '../snackbarsSlice';

type SnackbarProviderProps = {
    children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
    const { snackbar } = useSelector(snackbarsSelector);

    const [ isOpened, setIsOpened ] = useState<boolean>(false);

    useEffect(() => {

        if (snackbar) {
            setIsOpened(true);
        }
    }, [ snackbar ]);

    const handleClose = useCallback(() => {

        setIsOpened(false);
    }, []);

    return (
        <>
            {children}

            <Snackbar
                autoHideDuration={4000}
                onClose={handleClose}
                open={isOpened}>
                <Alert
                    elevation={6}
                    onClose={handleClose}
                    severity={snackbar?.variant ?? 'info'}
                    sx={{ width: '100%' }}
                    variant="filled">
                    {snackbar?.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SnackbarProvider;
