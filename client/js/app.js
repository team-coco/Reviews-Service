import ReactDOM from 'react-dom';
import css from '../styles.css';

import React from 'react'
import { hydrate } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/AppRoot.jsx'
import deactivatedStore from './store'

//doing the saga stuff
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../../client/js/saga.js'
const sagaMiddleware = createSagaMiddleware();
 
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__REVIEWS_INITIAL_STATE__
 console.log(preloadedState);
// Allow the passed state to be garbage-collected
delete window.__REVIEWS_INITIAL_STATE__
 
// Create Redux store with initial state
var store = createStore(deactivatedStore, preloadedState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

 
hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('reviews-module')
)
console.log('Client store state after hydrate: ', store.getState())