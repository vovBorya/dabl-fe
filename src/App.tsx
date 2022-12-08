import React from 'react';
import './App.css';
import { Provider } from "react-redux"
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./routes";

import {store} from './store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
      <Provider store={store}>
          <AppRouter />
      </Provider>
  );
}

export default App;