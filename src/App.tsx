import React, { type FC } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { SnackbarProvider } from './features/snackbars';
import { AppRouter } from './features/routes';
import { store } from './features/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

const App: FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <SnackbarProvider>
                    <AppRouter />
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
