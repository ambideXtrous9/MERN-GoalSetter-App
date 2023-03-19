import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// whenever we create redux resource or state resource like(users or goals)
// in the app folder 'store.js' we just need to add our reducer what is called
// a slice and add it to our store.
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
