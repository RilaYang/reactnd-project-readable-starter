import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import App from './App';

import reducers from './reducers';
const reducer = combineReducers(Object.assign({}, reducers));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
