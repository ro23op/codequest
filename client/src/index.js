import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { legacy_createStore as createstore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import dotenv from 'dotenv';

dotenv.config();

const store = createstore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
const client_id = process.env.GOOGLE_CLIENT_ID
root.render(
  <GoogleOAuthProvider clientId={client_id}>
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
