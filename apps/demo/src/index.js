import dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import App from './containers/App';

dotenv.config()

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

