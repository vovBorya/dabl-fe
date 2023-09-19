import React, { type FC } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import { AppRouter } from './features/routes';
import { store } from './features/store';
import { ApiProvider } from './features/api';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App: FC = () => {

  return (
      <Provider store={store}>
          <ApiProvider store={store}>
              <AppRouter />
          </ApiProvider>
      </Provider>
  );
};

export default App;
