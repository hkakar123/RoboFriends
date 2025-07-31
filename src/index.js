import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';
import './index.css';
import App from './containers/App'; 
import reportWebVitals from './reportWebVitals';
import { searchRobots, requestRobots } from './reducers';
import 'tachyons';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const logger = createLogger(); 

const store = createStore(rootReducer, applyMiddleware(thunk, logger))  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App/> 
  </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
