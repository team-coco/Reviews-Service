import React from 'react';
import {renderToString} from 'react-dom/server';
import ReviewsService from '../../client/js/components/AppRoot.jsx';
// import deactivatedStore from './store.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {END} from 'redux-saga';
import rootSaga from '../../client/js/saga.js';
import configureStore from './store.js';
import actions from '../../client/js/actions';

//const sagaMiddleware = createSagaMiddleware();

module.exports = {
    renderComponents: function (url, data) {
        return new Promise((resolve, reject) => {
            //edited slightly from docs
        
            //var store = createStore(deactivatedStore(url), applyMiddleware(sagaMiddleware));
            var store = configureStore(url, data)
            //store.runSaga = sagaMiddleware.run;
            // store.close = () => store.dispatch(END);

            store.runSaga(rootSaga).done.then(() => {
                // Grab the initial state from our Redux store
                const preloadedState = store.getState()
                console.log('getstate2: ', store.getState());
                const html = renderToString(
                    <Provider store={store}>
                        <ReviewsService />
                    </Provider>
                )
                resolve([html, preloadedState])
            })

            renderToString(
                <Provider store={store}>
                    <ReviewsService />
                </Provider>
            )
            store.close();

        })
    },
    renderFullpage(html, preloadedState) {
        console.log('Rendering HTML and preloaded state :', preloadedState);
        return `
            <!doctype html>
            <html lang="en-US">
                <head>
                    <meta charset="UTF-8">
                    <title>Chompy Reviews Module</title>
                </head>
                <body>
                    <div id="reviews-module">${html}</div>
                    <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                    </script>
                    <script src="js/app.js"></script>
                </body>
            </html>
        `
    }
}