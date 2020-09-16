import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import * as Sentry from '@sentry/react';
import App from './App';
import configStore from './store/index';

Sentry.init({ dsn: 'https://85edf32c295a4364a46f779c6ecdd7b4@o431887.ingest.sentry.io/5391721' });

const store = configStore();

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <App />
    </Provider>
  </AlertProvider>,
  document.getElementById('root'),
);
